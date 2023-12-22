package oimo.dynamics;
import oimo.collision.broadphase.*;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;
import oimo.m.M;

/**
 * The manager of the contacts in the physics world. A contact of two
 * shapes is created when the AABBs of them begin overlapping, and
 * is destroyed when they end overlapping.
 */
@:build(oimo.m.B.bu())
class ContactManager {
	public var _numContacts:Int;
	public var _contactList:Contact;
	public var _contactListLast:Contact;
	public var _contactPool:Contact;

	public var _broadPhase:BroadPhase;
	public var _collisionMatrix:CollisionMatrix;

	@:dox(hide)
	public function new(broadPhase:BroadPhase) {
		_broadPhase = broadPhase;
		_collisionMatrix = new CollisionMatrix();
		_numContacts = 0;
	}

	// --- private ---

	function createContacts():Void {
		var pp:ProxyPair = _broadPhase._proxyPairList;
		M.list_foreach(pp, _next, {
			do {
				var s1:Shape;
				var s2:Shape;
				M.assert(pp._p1._id != pp._p2._id);
				if (pp._p1._id < pp._p2._id) {
					s1 = cast pp._p1.userData;
					s2 = cast pp._p2.userData;
				} else {
					s1 = cast pp._p2.userData;
					s2 = cast pp._p1.userData;
				}
				// collision filtering
				if (!shouldCollide(s1, s2)) {
					break;
				}

				// search for the same contact
				var b1:RigidBody = s1._rigidBody;
				var b2:RigidBody = s2._rigidBody;
				var n1:Int = b1._numContactLinks;
				var n2:Int = b2._numContactLinks;
				var l:ContactLink;
				// select shorter linked list
				if (n1 < n2) {
					l = b1._contactLinkList;
				} else {
					l = b2._contactLinkList;
				}
				var id1:Int = s1._id;
				var id2:Int = s2._id;
				var found:Bool = false;
				M.list_foreach(l, _next, {
					var c:Contact = l._contact;
					if (c._s1._id == id1 && c._s2._id == id2) {
						// the same contact found
						c._latest = true;
						found = true;
						break;
					}
				});

				// if not found, create a new contact
				if (!found) {
					// trying to pick an object up from the pool
					var c:Contact = M.singleList_pick(_contactPool, _next, new Contact());
					M.list_push(_contactList, _contactListLast, _prev, _next, c);
					c._latest = true;
					c._attach(s1, s2, _collisionMatrix.getDetector(s1._geom._type, s2._geom._type));
					_numContacts++;
				}
			} while (false);
		});
	}

	function destroyOutdatedContacts():Void {
		// whether the broadphase returns only new overlapping pairs
		var incremental:Bool = _broadPhase._incremental;

		var c:Contact = _contactList;
		M.list_foreach(c, _next, {
			do {
				if (c._latest) {
					// the contact is overlapping, make it old for the next step
					c._latest = false;
					c._shouldBeSkipped = false;
					break;
				}
				if (!incremental) {
					// the pair is separated, because the broad-phase algorithm collects
					// all the overlapping pairs and they are marked as latest
					_destroyContact(c);
					break;
				}

				var s1:Shape = c._s1;
				var s2:Shape = c._s2;
				var r1:RigidBody = s1._rigidBody;
				var r2:RigidBody = s2._rigidBody;
				var active1:Bool = !r1._sleeping && r1._type != RigidBodyType._STATIC;
				var active2:Bool = !r2._sleeping && r2._type != RigidBodyType._STATIC;
				if (!active1 && !active2) {
					// skip the pair if both rigid bodies are inactive
					c._shouldBeSkipped = true;
					break;
				}
				var aabb1:Aabb = s1._aabb;
				var aabb2:Aabb = s2._aabb;
				if (!_broadPhase.isOverlapping(s1._proxy, s2._proxy) || !shouldCollide(s1, s2)) {
					// the proxy pair is separated or shouldn't collide
					_destroyContact(c);
					break;
				}
				// the proxies are overlapping, but AABBs might be separated
				var aabbOverlapping:Bool = M.aabb_overlap(aabb1._min, aabb1._max, aabb2._min, aabb2._max);
				// needs narrow-phase collision detection if AABBs are overlapping
				c._shouldBeSkipped = !aabbOverlapping;
			} while (false);
		});
	}

	function shouldCollide(s1:Shape, s2:Shape):Bool {
		var r1:RigidBody = s1._rigidBody;
		var r2:RigidBody = s2._rigidBody;

		if (r1 == r2) {
			// they have the same parent
			return false;
		}

		if (r1._type != RigidBodyType._DYNAMIC && r2._type != RigidBodyType._DYNAMIC) {
			// none of the two bodies are dynamic
			return false;
		}

		// collision filtering
		if (
			s1._collisionGroup & s2._collisionMask == 0 ||
			s2._collisionGroup & s1._collisionMask == 0
		) {
			return false;
		}

		// search for joints the two bodies are connected to
		var jl:JointLink;
		var other:RigidBody;
		if (r1._numJointLinks < r2._numJointLinks) {
			jl = r1._jointLinkList;
			other = r2;
		} else {
			jl = r2._jointLinkList;
			other = r1;
		}
		M.list_foreach(jl, _next, {
			if (jl._other == other && !jl._joint._allowCollision) {
				// collisions between the two bodies are disabled
				return false;
			}
		});

		return true;
	}

	// --- internal ---

	public function _updateContacts():Void {
		_broadPhase.collectPairs();
		createContacts();
		destroyOutdatedContacts();
	}

	// send postSolve events
	public function _postSolve():Void {
		var c:Contact = _contactList;
		M.list_foreach(c, _next, {
			if (c._touching) {
				c._postSolve();
			}
		});
	}

	extern public inline function _updateManifolds():Void {
		var c:Contact = _contactList;
		M.list_foreach(c, _next, {
			if (!c._shouldBeSkipped) {
				c._updateManifold();
			}
		});
	}

	extern public inline function _destroyContact(contact:Contact):Void {
		M.list_remove(_contactList, _contactListLast, _prev, _next, contact);
		contact._detach();

		// put it into the pool
		M.singleList_pool(_contactPool, _next, contact);

		_numContacts--;
	}

	// --- public ---

	/**
	 * Returns the number of the contacts in the world.
	 */
	public inline function getNumContacts():Int {
		return _numContacts;
	}

	/**
	 * Returns the linked list of the contacts in the world.
	 */
	public inline function getContactList():Contact {
		return _contactList;
	}

}
