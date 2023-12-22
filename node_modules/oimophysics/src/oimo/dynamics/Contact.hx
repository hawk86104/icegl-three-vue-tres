package oimo.dynamics;
import oimo.collision.narrowphase.*;
import oimo.collision.narrowphase.detector.*;
import oimo.common.Setting;
import oimo.dynamics.callback.ContactCallback;
import oimo.dynamics.constraint.contact.*;
import oimo.dynamics.rigidbody.*;
import oimo.m.M;

/**
 * A contact is a cached pair of overlapping shapes in the physics world. contacts
 * are created by `ContactManager` when two AABBs of shapes begin overlapping.
 *
 * As AABBs are larger than its shapes, shapes of a contact don't always
 * touching or colliding though their AABBs are overlapping.
 */
@:build(oimo.m.B.bu())
class Contact {
	public var _next:Contact;
	public var _prev:Contact;

	public var _link1:ContactLink;
	public var _link2:ContactLink;

	public var _s1:Shape;
	public var _s2:Shape;
	public var _b1:RigidBody;
	public var _b2:RigidBody;

	// detector data
	public var _detector:Detector;
	public var _cachedDetectorData:CachedDetectorData;
	public var _detectorResult:DetectorResult;

	// tmp data
	public var _latest:Bool;
	public var _shouldBeSkipped:Bool;

	// constraint/manifold data
	public var _manifold:Manifold;
	public var _updater:ManifoldUpdater;
	public var _contactConstraint:ContactConstraint;
	public var _touching:Bool;

	@:dox(hide)
	public function new() {
		_next = null;
		_prev = null;

		_link1 = new ContactLink();
		_link2 = new ContactLink();

		_s1 = null;
		_s2 = null;
		_b1 = null;
		_b2 = null;

		_detector = null;
		_cachedDetectorData = new CachedDetectorData();
		_detectorResult = new DetectorResult();

		_latest = false;
		_shouldBeSkipped = false;

		_manifold = new Manifold();
		_updater = new ManifoldUpdater(_manifold);
		_contactConstraint = new ContactConstraint(_manifold);
		_touching = false;
	}

	// --- private ---

	extern inline function attachLinks():Void {
		M.list_push(_b1._contactLinkList, _b1._contactLinkListLast, _prev, _next, _link1);
		M.list_push(_b2._contactLinkList, _b2._contactLinkListLast, _prev, _next, _link2);
		_b1._numContactLinks++;
		_b2._numContactLinks++;
		_link1._other = _b2;
		_link2._other = _b1;
		_link1._contact = this;
		_link2._contact = this;
	}

	extern inline function detachLinks():Void {
		M.list_remove(_b1._contactLinkList, _b1._contactLinkListLast, _prev, _next, _link1);
		M.list_remove(_b2._contactLinkList, _b2._contactLinkListLast, _prev, _next, _link2);
		_b1._numContactLinks--;
		_b2._numContactLinks--;
		_link1._other = null;
		_link2._other = null;
		_link1._contact = null;
		_link2._contact = null;
	}

	extern inline function sendBeginContact():Void {
		var cc1:ContactCallback = _s1._contactCallback;
		var cc2:ContactCallback = _s2._contactCallback;
		if (cc1 == cc2) {
			cc2 = null; // avoid calling twice
		}
		if (cc1 != null) cc1.beginContact(this);
		if (cc2 != null) cc2.beginContact(this);
	}

	extern inline function sendEndContact():Void {
		var cc1:ContactCallback = _s1._contactCallback;
		var cc2:ContactCallback = _s2._contactCallback;
		if (cc1 == cc2) {
			cc2 = null; // avoid calling twice
		}
		if (cc1 != null) cc1.endContact(this);
		if (cc2 != null) cc2.endContact(this);
	}

	extern inline function sendPreSolve():Void {
		var cc1:ContactCallback = _s1._contactCallback;
		var cc2:ContactCallback = _s2._contactCallback;
		if (cc1 == cc2) {
			cc2 = null; // avoid calling twice
		}
		if (cc1 != null) cc1.preSolve(this);
		if (cc2 != null) cc2.preSolve(this);
	}

	extern inline function sendPostSolve():Void {
		var cc1:ContactCallback = _s1._contactCallback;
		var cc2:ContactCallback = _s2._contactCallback;
		if (cc1 == cc2) {
			cc2 = null; // avoid calling twice
		}
		if (cc1 != null) cc1.postSolve(this);
		if (cc2 != null) cc2.postSolve(this);
	}

	// --- internal ---

	extern public inline function _attach(s1:Shape, s2:Shape, detector:Detector):Void {
		_s1 = s1;
		_s2 = s2;
		_b1 = s1._rigidBody;
		_b2 = s2._rigidBody;
		_touching = false;
		attachLinks();

		_detector = detector;

		_contactConstraint._attach(s1, s2);
	}

	extern public inline function _detach():Void {
		if (_touching) {
			// touching in the last frame
			sendEndContact();
		}

		detachLinks();
		_s1 = null;
		_s2 = null;
		_b1 = null;
		_b2 = null;
		_touching = false;

		_cachedDetectorData._clear();
		_manifold._clear();

		_detector = null;

		_contactConstraint._detach();
	}

	public function _updateManifold():Void {
		if (_detector == null) return;

		var ptouching:Bool = _touching;

		var result:DetectorResult = _detectorResult;
		_detector.detect(result, _s1._geom, _s2._geom, _s1._transform, _s2._transform, _cachedDetectorData);

		var num:Int = result.numPoints;
		_touching = num > 0;

		if (_touching) {
			// update manifold basis
			_manifold._buildBasis(result.normal);

			// determine position correction algorithm
			if (result.getMaxDepth() > Setting.contactUseAlternativePositionCorrectionAlgorithmDepthThreshold) {
				// use alternative position correction method (split impulse by default) for deeply overlapped contacts
				_contactConstraint._positionCorrectionAlgorithm = Setting.alternativeContactPositionCorrectionAlgorithm;
			} else {
				// use default position correction algorithm for slightly overlapped contacts
				_contactConstraint._positionCorrectionAlgorithm = Setting.defaultContactPositionCorrectionAlgorithm;
			}

			// update contact manifold
			if (result.incremental) {
				// incremental manifold
				_updater.incrementalUpdate(result, _b1._transform, _b2._transform);
			} else {
				// one-shot manifold
				_updater.totalUpdate(result, _b1._transform, _b2._transform);
			}
		} else {
			_manifold._clear();
		}

		if (_touching && !ptouching) {
			sendBeginContact();
		}
		if (!_touching && ptouching) {
			sendEndContact();
		}
		if (_touching) {
			sendPreSolve();
		}
	}

	// called from the contact manager
	public function _postSolve():Void {
		sendPostSolve();
	}

	// --- public ---

	/**
	 * Returns the first shape of the contact.
	 */
	public inline function getShape1():Shape {
		return _s1;
	}

	/**
	 * Returns the second shape of the contact.
	 */
	public inline function getShape2():Shape {
		return _s2;
	}

	/**
	 * Returns whether the shapes are touching.
	 */
	public inline function isTouching():Bool {
		return _touching;
	}

	/**
	 * Returns the contact manifold.
	 */
	public inline function getManifold():Manifold {
		return _manifold;
	}

	/**
	 * Returns the contact constraint.
	 */
	public inline function getContactConstraint():ContactConstraint {
		return _contactConstraint;
	}

	/**
	 * Returns the previous contact in the world.
	 *
	 * If the previous contact does not exist, `null` will be returned.
	 */
	public inline function getPrev():Contact {
		return _prev;
	}

	/**
	 * Returns the next contact in the world.
	 *
	 * If the next contact does not exist, `null` will be returned.
	 */
	public inline function getNext():Contact {
		return _next;
	}

}
