package oimo.dynamics;
import haxe.ds.*;
import oimo.collision.*;
import oimo.collision.broadphase.*;
import oimo.collision.broadphase.bruteforce.*;
import oimo.collision.broadphase.bvh.*;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.detector.gjkepa.*;
import oimo.common.*;
import oimo.dynamics.callback.*;
import oimo.dynamics.common.*;
import oimo.dynamics.constraint.*;
import oimo.dynamics.constraint.contact.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;
import oimo.m.*;

/**
 * The physics simulation world. This manages entire the dynamic simulation. You can add
 * rigid bodies and joints to the world to simulate them.
 */
@:build(oimo.m.B.bu())
class World {
	public var _rigidBodyList:RigidBody;
	public var _rigidBodyListLast:RigidBody;

	public var _jointList:Joint;
	public var _jointListLast:Joint;

	public var _broadPhase:BroadPhase;
	public var _contactManager:ContactManager;

	public var _numRigidBodies:Int;
	public var _numJoints:Int;
	public var _numShapes:Int;
	public var _numIslands:Int;

	public var _numVelocityIterations:Int;
	public var _numPositionIterations:Int;

	public var _gravity:Vec3;

	var _timeStep:TimeStep;
	var _island:Island;
	var _rigidBodyStack:Vector<RigidBody>;
	var _solversInIslands:Vector<ConstraintSolver>;
	var _numSolversInIslands:Int;

	var _debugDraw:DebugDraw;

	var _rayCastWrapper:RayCastWrapper;
	var _convexCastWrapper:ConvexCastWrapper;
	var _aabbTestWrapper:AabbTestWrapper;

	var _pool:Pool;

	var _shapeIdCount:Int;

	/**
	 * Creates a new physics world, with broad-phase collision detection algorithm `broadPhaseType` and
	 * gravitational acceleration `gravity`.
	 */
	public function new(broadPhaseType:Int = BroadPhaseType._BVH, gravity:Vec3 = null) {
		switch(broadPhaseType) {
		case BroadPhaseType._BRUTE_FORCE:
			_broadPhase = new BruteForceBroadPhase();
		case BroadPhaseType._BVH:
			_broadPhase = new BvhBroadPhase();

		}
		_contactManager = new ContactManager(_broadPhase);

		if (gravity == null) gravity = new Vec3(0, -9.80665, 0);
		_gravity = gravity.clone();

		_rigidBodyList = null;
		_rigidBodyListLast = null;

		_jointList = null;
		_jointListLast = null;

		_numRigidBodies = 0;
		_numShapes = 0;
		_numJoints = 0;
		_numIslands = 0;

		_numVelocityIterations = 10;
		_numPositionIterations = 5;

		_rayCastWrapper = new RayCastWrapper();
		_convexCastWrapper = new ConvexCastWrapper();
		_aabbTestWrapper = new AabbTestWrapper();

		_island = new Island();
		_solversInIslands = new Vector<ConstraintSolver>(Setting.islandInitialConstraintArraySize);
		_rigidBodyStack = new Vector<RigidBody>(Setting.islandInitialRigidBodyArraySize);

		_timeStep = new TimeStep();

		_pool = new Pool();


		_shapeIdCount = 0;
	}

	function _updateContacts():Void {
		Performance.broadPhaseCollisionTime = M.profile({
			// update contacts (broad phase)
			_contactManager._updateContacts();
		});
		Performance.narrowPhaseCollisionTime = M.profile({
			// update manifolds (narrow phase)
			_contactManager._updateManifolds();
		});
	}

	function _solveIslands():Void {
		Performance.dynamicsTime = M.profile({
			// wake up all rigid bodies if sleeping is disabled
			if (Setting.disableSleeping) {
				var b:RigidBody = _rigidBodyList;
				M.list_foreach(b, _next, {
					b._sleeping = false;
					b._sleepTime = 0;
				});
			}

			// expand array size if needed
			if (_rigidBodyStack.length < _numRigidBodies) {
				var newStackSize:Int = _rigidBodyStack.length << 1;
				while (newStackSize < _numRigidBodies) {
					newStackSize <<= 1;
				}
				_rigidBodyStack = new Vector<RigidBody>(newStackSize);
			}

			// build and solve islands
			_numIslands = 0;
			_island._setGravity(_gravity);
			var b:RigidBody = _rigidBodyList;
			_numSolversInIslands = 0;
			M.list_foreach(b, _next, {
				do {
					if (b._addedToIsland || b._sleeping || b._type == RigidBodyType._STATIC) {
						// never be the base of an island
						break;
					}
					if (b._isAlone()) {
						_island._stepSingleRigidBody(_timeStep, b);
						_numIslands++;
						break;
					}

					buildIsland(b);

					_island._step(_timeStep, _numVelocityIterations, _numPositionIterations);
					_island._clear();
					_numIslands++;
				} while (false);
			});

			_contactManager._postSolve();

			// clear island flags
			b = _rigidBodyList;
			M.list_foreach(b, _next, {
				b._addedToIsland = false;
			});


			// clear forces and torques
			b = _rigidBodyList;
			M.list_foreach(b, _next, {
				M.vec3_zero(b._force);
				M.vec3_zero(b._torque);
			});

			while (_numSolversInIslands > 0) {
				_solversInIslands[--_numSolversInIslands]._addedToIsland = false;
				_solversInIslands[_numSolversInIslands] = null;
			}
		});
	}

	function buildIsland(base:RigidBody):Void {
		// begin DFS
		var stackCount:Int = 1;
		_island._addRigidBody(base);
		_rigidBodyStack[0] = base;

		while (stackCount > 0) {
			// pop a rigid body
			var rb:RigidBody = _rigidBodyStack[--stackCount];
			_rigidBodyStack[stackCount] = null;

			// stop searching deeper
			if (rb._type == RigidBodyType._STATIC) {
				continue;
			}

			// searching contacts
			var cl:ContactLink = rb._contactLinkList;
			M.list_foreach(cl, _next, {
				// ignore if not touching
				var cc:ContactConstraint = cl._contact._contactConstraint;
				var ccs:ConstraintSolver = cl._contact._contactConstraint._solver;
				if (cc.isTouching() && !ccs._addedToIsland) {

					// add to constraint array (to clear island flag later)
					if (_solversInIslands.length == _numSolversInIslands) {
						M.array_expand(_solversInIslands, _numSolversInIslands);
					}
					_solversInIslands[_numSolversInIslands++] = ccs;

					// add to island
					_island._addConstraintSolver(ccs, cc._positionCorrectionAlgorithm);

					// push the other rigid body if not added
					var other:RigidBody = cl._other;
					if (!other._addedToIsland) {
						_island._addRigidBody(other);
						_rigidBodyStack[stackCount++] = other;
					}
				}
			});

			// searching joints
			var jl:JointLink = rb._jointLinkList;
			M.list_foreach(jl, _next, {
				var j:Joint = jl._joint;
				var js:ConstraintSolver = j._solver;
				if (!js._addedToIsland) {

					// add to constraint array (to clear island flag later)
					if (_solversInIslands.length == _numSolversInIslands) {
						M.array_expand(_solversInIslands, _numSolversInIslands);
					}
					_solversInIslands[_numSolversInIslands++] = js;

					// add to island
					_island._addConstraintSolver(js, j._positionCorrectionAlgorithm);

					// push the other rigid body if not added
					var other:RigidBody = jl._other;
					if (!other._addedToIsland) {
						_island._addRigidBody(other);
						_rigidBodyStack[stackCount++] = other;
					}
				}
			});
		}
	}

	extern public inline function _addShape(shape:Shape):Void {
		shape._proxy = _broadPhase.createProxy(shape, shape._aabb);
		shape._id = _shapeIdCount++;

		_numShapes++;
	}

	extern public inline function _removeShape(shape:Shape):Void {
		_broadPhase.destroyProxy(shape._proxy);
		shape._proxy = null;
		shape._id = -1;

		// destroy linked contacts
		var cl:ContactLink = shape._rigidBody._contactLinkList;
		M.list_foreach(cl, _next, {
			var c:Contact = cl._contact;
			if (c._s1 == shape || c._s2 == shape) {
				cl._other.wakeUp();
				_contactManager._destroyContact(c);
			}
		});

		_numShapes--;
	}

	function _drawBvh(d:DebugDraw, tree:BvhTree):Void {
		if (d.drawBvh) {
			_drawBvhNode(d, tree._root, 0, d.style.bvhNodeColor);
		}
	}

	function _drawBvhNode(d:DebugDraw, node:BvhNode, level:Int, color:Vec3):Void {
		if (node == null) return;
		if (level >= d.drawBvhMinLevel && level <= d.drawBvhMaxLevel) {
			var min:Vec3 = _pool.vec3();
			var max:Vec3 = _pool.vec3();
			M.vec3_toVec3(min, node._aabbMin);
			M.vec3_toVec3(max, node._aabbMax);
			d.aabb(min, max, color);
			_pool.dispose(min);
			_pool.dispose(max);
		}
		_drawBvhNode(d, node._children[0], level + 1, color);
		_drawBvhNode(d, node._children[1], level + 1, color);
	}

	function _drawRigidBodies(d:DebugDraw):Void {
		var style:DebugDrawStyle = d.style;

		var r:RigidBody = _rigidBodyList;
		M.list_foreach(r, _next, {
			if (d.drawBases) {
				_drawBasis(d, r._transform);
			}
			var shapeColor:Vec3 = null;
			var isDynamic:Bool = r._type == RigidBodyType._DYNAMIC;
			if (!isDynamic) {
				shapeColor = r._type == RigidBodyType._KINEMATIC ? style.kinematicShapeColor : style.staticShapeColor;
			}
			var s:Shape = r._shapeList;
			M.list_foreach(s, _next, {
				if (isDynamic) {
					if ((s._id & 1) == 0) {
						shapeColor =
							if (r._sleeping) style.sleepingShapeColor1
							else if (r._sleepTime > Setting.sleepingTimeThreshold) style.sleepyShapeColor1
							else style.shapeColor1
						;
					} else {
						shapeColor =
							if (r._sleeping) style.sleepingShapeColor2
							else if (r._sleepTime > Setting.sleepingTimeThreshold) style.sleepyShapeColor2
							else style.shapeColor2
						;
					}
				}
				if (d.drawShapes) {
					_drawShape(d, s._geom, s._transform, shapeColor);
				}
				if (d.drawAabbs) {
					_drawAabb(d, s._aabb, style.aabbColor);
				}
			});
		});
	}

	extern inline function _drawBasis(d:DebugDraw, tf:Transform):Void {
		var style:DebugDrawStyle = d.style;
		d.basis(tf, style.basisLength, style.basisColorX, style.basisColorY, style.basisColorZ);
	}

	extern inline function _drawShape(d:DebugDraw, geom:Geometry, tf:Transform, color:Vec3):Void {
		switch (geom._type) {
		case GeometryType._SPHERE:
			_drawSphere(d, cast geom, tf, color);
		case GeometryType._BOX:
			_drawBox(d, cast geom, tf, color);
		case GeometryType._CYLINDER:
			_drawCylinder(d, cast geom, tf, color);
		case GeometryType._CONE:
			_drawCone(d, cast geom, tf, color);
		case GeometryType._CAPSULE:
			_drawCapsule(d, cast geom, tf, color);
		case GeometryType._CONVEX_HULL:
			_drawConvexHull(d, cast geom, tf, color);
		}
	}

	extern inline function _drawSphere(d:DebugDraw, g:SphereGeometry, tf:Transform, color:Vec3):Void {
		d.sphere(tf, g._radius, color);
	}

	extern inline function _drawBox(d:DebugDraw, g:BoxGeometry, tf:Transform, color:Vec3):Void {
		var hx:Vec3 = _pool.vec3();
		M.vec3_toVec3(hx, g._halfExtents);
		d.box(tf, hx, color);
		_pool.dispose(hx);
	}

	extern inline function _drawCylinder(d:DebugDraw, g:CylinderGeometry, tf:Transform, color:Vec3):Void {
		d.cylinder(tf, g._radius, g._halfHeight, color);
	}

	extern inline function _drawCone(d:DebugDraw, g:ConeGeometry, tf:Transform, color:Vec3):Void {
		d.cone(tf, g._radius, g._halfHeight, color);
	}

	extern inline function _drawCapsule(d:DebugDraw, g:CapsuleGeometry, tf:Transform, color:Vec3):Void {
		d.capsule(tf, g._radius, g._halfHeight, color);
	}

	extern inline function _drawConvexHull(d:DebugDraw, g:ConvexHullGeometry, tf:Transform, color:Vec3):Void {
		var n:Int = g._numVertices;
		var v1:Vec3 = _pool.vec3();
		var v2:Vec3 = _pool.vec3();
		var v3:Vec3 = _pool.vec3();
		var v12:Vec3 = _pool.vec3();
		var v13:Vec3 = _pool.vec3();
		var normal:Vec3 = _pool.vec3();
		var m:Mat3 = _pool.mat3();
		var o:Vec3 = _pool.vec3();
		tf.getRotationTo(m);
		tf.getPositionTo(o);

		for (i in 0...n) {
			g._tmpVertices[i].copyFrom(g._vertices[i]).mulMat3Eq(m).addEq(o);
		}

		if (n > 30) {
			// O(n)
			for (i in 0...n) {
				v1.copyFrom(g._tmpVertices[i]);
				v2.copyFrom(g._tmpVertices[(i + 1) % n]);
				d.line(v1, v2, color);
			}
		} else if (_debugDraw.wireframe || n > 10) {
			// O(n^2)
			for (i in 0...n) {
				v1.copyFrom(g._tmpVertices[i]);
				for (j in 0...i) {
					v2.copyFrom(g._tmpVertices[j]);
					d.line(v1, v2, color);
				}
			}
		} else {
			// O(n^3)
			for (i in 0...n) {
				v1.copyFrom(g._tmpVertices[i]);
				for (j in 0...i) {
					v2.copyFrom(g._tmpVertices[j]);
					for (k in 0...j) {
						v3.copyFrom(g._tmpVertices[k]);
						v12.copyFrom(v2).subEq(v1);
						v13.copyFrom(v3).subEq(v1);
						normal.copyFrom(v12).crossEq(v13).normalize();
						d.triangle(v1, v2, v3, normal, normal, normal, color);
						normal.negateEq();
						d.triangle(v1, v3, v2, normal, normal, normal, color);
					}
				}
			}
		}
		_pool.dispose(v1);
		_pool.dispose(v2);
		_pool.dispose(v3);
		_pool.dispose(v12);
		_pool.dispose(v13);
		_pool.dispose(normal);
		_pool.dispose(m);
		_pool.dispose(o);
	}

	extern inline function _drawAabb(d:DebugDraw, aabb:Aabb, color:Vec3):Void {
		var min:Vec3 = _pool.vec3();
		var max:Vec3 = _pool.vec3();
		M.vec3_toVec3(min, aabb._min);
		M.vec3_toVec3(max, aabb._max);
		d.aabb(min, max, color);
		_pool.dispose(min);
		_pool.dispose(max);
	}

	function _drawConstraints(d:DebugDraw):Void {
		var style:DebugDrawStyle = d.style;

		if (d.drawPairs || d.drawContacts) {
			var c:Contact = _contactManager._contactList;
			M.list_foreach(c, _next, {
				if (d.drawPairs) {
					_drawPair(d, c, style.pairColor);
				}
				if (d.drawContacts) {
					var cc:ContactConstraint = c._contactConstraint;
					var ps:Vector<ManifoldPoint> = c._contactConstraint._manifold._points;
					for (i in 0...c._contactConstraint._manifold._numPoints) {
						_drawContactPoint(d, cc, ps[i]);
					}
				}
			});
		}
		if (d.drawJoints) {
			var j:Joint = _jointList;
			M.list_foreach(j, _next, {
				_drawJoint(d, j);
			});
		}
	}

	extern inline function _drawContactPoint(d:DebugDraw, c:ContactConstraint, p:ManifoldPoint) {
		var style:DebugDrawStyle = d.style;
		var tf1:Transform = c._s1._transform;
		var tf2:Transform = c._s2._transform;
		var pos1:Vec3 = _pool.vec3();
		var pos2:Vec3 = _pool.vec3();
		var normal:Vec3 = _pool.vec3();
		var tangent:Vec3 = _pool.vec3();
		var binormal:Vec3 = _pool.vec3();

		M.vec3_toVec3(pos1, p._pos1);
		M.vec3_toVec3(pos2, p._pos2);
		M.vec3_toVec3(normal, c._manifold._normal);
		M.vec3_toVec3(tangent, c._manifold._tangent);
		M.vec3_toVec3(binormal, c._manifold._binormal);

		if (p._disabled) {
			d.point(pos1, style.disabledContactColor);
			d.point(pos2, style.disabledContactColor);
			d.line(pos1, pos2, style.disabledContactColor);
		} else if (p._warmStarted) {
			var color:Vec3;
			switch (p._id & 3) {
			case 0:
				color = style.contactColor;
			case 1:
				color = style.contactColor2;
			case 2:
				color = style.contactColor3;
			case _:
				color = style.contactColor4;
			}
			d.point(pos1, color);
			d.point(pos2, color);
			d.line(pos1, pos2, style.contactColor);
		} else {
			d.point(pos1, style.newContactColor);
			d.point(pos2, style.newContactColor);
			d.line(pos1, pos2, style.newContactColor);
		}

		pos2.copyFrom(pos1).addScaledEq(normal, style.contactNormalLength);
		d.line(pos1, pos2, style.contactNormalColor);

		if (d.drawContactBases) {
			pos2.copyFrom(pos1).addScaledEq(tangent, style.contactTangentLength);
			d.line(pos1, pos2, style.contactTangentColor);
			pos2.copyFrom(pos1).addScaledEq(binormal, style.contactBinormalLength);
			d.line(pos1, pos2, style.contactBinormalColor);
		}

		_pool.dispose(pos1);
		_pool.dispose(pos2);
		_pool.dispose(normal);
		_pool.dispose(tangent);
		_pool.dispose(binormal);
	}

	extern inline function _drawPair(d:DebugDraw, c:Contact, color:Vec3):Void {
		var v1:Vec3 = _pool.vec3();
		var v2:Vec3 = _pool.vec3();
		M.vec3_toVec3(v1, c._s1._transform._position);
		M.vec3_toVec3(v2, c._s2._transform._position);
		d.line(v1, v2, color);
		_pool.dispose(v1);
		_pool.dispose(v2);
	}

	extern inline function _drawJoint(d:DebugDraw, j:Joint):Void {
		var p1:Vec3 = _pool.vec3();
		var p2:Vec3 = _pool.vec3();
		M.vec3_toVec3(p1, j._b1._transform._position);
		M.vec3_toVec3(p2, j._b2._transform._position);

		var anchor1:Vec3 = _pool.vec3();
		var anchor2:Vec3 = _pool.vec3();
		var basisX1:Vec3 = _pool.vec3();
		var basisY1:Vec3 = _pool.vec3();
		var basisZ1:Vec3 = _pool.vec3();
		var basisX2:Vec3 = _pool.vec3();
		var basisY2:Vec3 = _pool.vec3();
		var basisZ2:Vec3 = _pool.vec3();
		M.vec3_toVec3(anchor1, j._anchor1);
		M.vec3_toVec3(anchor2, j._anchor2);
		M.vec3_toVec3(basisX1, j._basisX1);
		M.vec3_toVec3(basisY1, j._basisY1);
		M.vec3_toVec3(basisZ1, j._basisZ1);
		M.vec3_toVec3(basisX2, j._basisX2);
		M.vec3_toVec3(basisY2, j._basisY2);
		M.vec3_toVec3(basisZ2, j._basisZ2);

		d.line(p1, anchor1, d.style.jointLineColor);
		d.line(p2, anchor2, d.style.jointLineColor);

		if (d.drawJointLimits) {
			switch (j._type) {
			case JointType._SPHERICAL:
				// draw nothing here
			case JointType._REVOLUTE:
				_drawRevolute(d, cast j, anchor1, anchor2, basisX1, basisY1, basisZ1, basisX2, basisY2, basisZ2);
			case JointType._CYLINDRICAL:
				_drawCylindrical(d, cast j, anchor1, anchor2, basisX1, basisY1, basisZ1, basisX2, basisY2, basisZ2);
			case JointType._PRISMATIC:
				_drawPrismatic(d, cast j, anchor1, anchor2, basisX1, basisY1, basisZ1, basisX2, basisY2, basisZ2);
			case JointType._UNIVERSAL:
				_drawUniversal(d, cast j, anchor1, anchor2, basisX1, basisY1, basisZ1, basisX2, basisY2, basisZ2);
			case JointType._RAGDOLL:
				_drawRagdoll(d, cast j, anchor1, anchor2, basisX1, basisY1, basisZ1, basisX2, basisY2, basisZ2);
			case JointType._GENERIC:
				_drawGeneric(d, cast j, anchor1, anchor2, basisX1, basisY1, basisZ1, basisX2, basisY2, basisZ2);
			}
		}

		d.line(anchor1, anchor2, d.style.jointErrorColor);

		_pool.dispose(p1);
		_pool.dispose(p2);
		_pool.dispose(anchor1);
		_pool.dispose(anchor2);
		_pool.dispose(basisX1);
		_pool.dispose(basisY1);
		_pool.dispose(basisZ1);
		_pool.dispose(basisX2);
		_pool.dispose(basisY2);
		_pool.dispose(basisZ2);
	}

	extern inline function _drawRevolute(d:DebugDraw, j:RevoluteJoint, anchor1:Vec3, anchor2:Vec3, basisX1:Vec3, basisY1:Vec3, basisZ1:Vec3, basisX2:Vec3, basisY2:Vec3, basisZ2:Vec3):Void {
		var radius:Float = d.style.jointRotationalConstraintRadius;
		var color:Vec3 = d.style.jointLineColor;
		var lm:RotationalLimitMotor = j._lm;

		_drawRotationalLimit(d, anchor1, basisY1, basisZ1, basisY2, radius, lm.lowerLimit, lm.upperLimit, color);
	}

	extern inline function _drawCylindrical(d:DebugDraw, j:CylindricalJoint, anchor1:Vec3, anchor2:Vec3, basisX1:Vec3, basisY1:Vec3, basisZ1:Vec3, basisX2:Vec3, basisY2:Vec3, basisZ2:Vec3):Void {
		var radius:Float = d.style.jointRotationalConstraintRadius;
		var color:Vec3 = d.style.jointLineColor;
		var rlm:RotationalLimitMotor = j._rotLm;
		var tlm:TranslationalLimitMotor = j._translLm;

		_drawRotationalLimit(d, anchor2, basisY1, basisZ1, basisY2, radius, rlm.lowerLimit, rlm.upperLimit, color);
		_drawTranslationalLimit(d, anchor1, basisX1, tlm.lowerLimit, tlm.upperLimit, color);
	}

	extern inline function _drawPrismatic(d:DebugDraw, j:PrismaticJoint, anchor1:Vec3, anchor2:Vec3, basisX1:Vec3, basisY1:Vec3, basisZ1:Vec3, basisX2:Vec3, basisY2:Vec3, basisZ2:Vec3):Void {
		var radius:Float = d.style.jointRotationalConstraintRadius;
		var color:Vec3 = d.style.jointLineColor;
		var lm:TranslationalLimitMotor = j._lm;

		_drawTranslationalLimit(d, anchor1, basisX1, lm.lowerLimit, lm.upperLimit, color);
	}

	extern inline function _drawUniversal(d:DebugDraw, j:UniversalJoint, anchor1:Vec3, anchor2:Vec3, basisX1:Vec3, basisY1:Vec3, basisZ1:Vec3, basisX2:Vec3, basisY2:Vec3, basisZ2:Vec3):Void {
		var radius:Float = d.style.jointRotationalConstraintRadius;
		var color:Vec3 = d.style.jointLineColor;
		var lm1:RotationalLimitMotor = j._lm1;
		var lm2:RotationalLimitMotor = j._lm2;

		_drawRotationalLimit(d, anchor1, basisY1, basisZ1, basisY1, radius, j._angleX - lm1.upperLimit, j._angleX - lm1.lowerLimit, color);
		_drawRotationalLimit(d, anchor2, basisX2, basisY2, basisX2, radius, lm2.lowerLimit - j._angleZ, lm2.upperLimit - j._angleZ, color);
	}

	extern inline function _drawRagdoll(d:DebugDraw, j:RagdollJoint, anchor1:Vec3, anchor2:Vec3, basisX1:Vec3, basisY1:Vec3, basisZ1:Vec3, basisX2:Vec3, basisY2:Vec3, basisZ2:Vec3):Void {
		var radius:Float = d.style.jointRotationalConstraintRadius;
		var color:Vec3 = d.style.jointLineColor;
		var lm:RotationalLimitMotor = j._twistLm;

		_drawRotationalLimit(d, anchor2, basisY2, basisZ2, basisY2, radius, lm.lowerLimit - j._twistAngle, lm.upperLimit - j._twistAngle, color);
		_drawEllipseOnSphere(d, anchor1, basisX1, basisY1, basisZ1, j._maxSwingAngle1, j._maxSwingAngle2, radius, color);

		var to:Vec3 = _pool.vec3().copyFrom(anchor2).addScaledEq(basisX2, radius);
		d.line(anchor2, to, color);
		_pool.dispose(to);
	}

	extern inline function _drawGeneric(d:DebugDraw, j:GenericJoint, anchor1:Vec3, anchor2:Vec3, basisX1:Vec3, basisY1:Vec3, basisZ1:Vec3, basisX2:Vec3, basisY2:Vec3, basisZ2:Vec3):Void {
		var radius:Float = d.style.jointRotationalConstraintRadius;
		var color:Vec3 = d.style.jointLineColor;
		var txlm:TranslationalLimitMotor = j._translLms[0];
		var tylm:TranslationalLimitMotor = j._translLms[1];
		var tzlm:TranslationalLimitMotor = j._translLms[2];
		var rxlm:RotationalLimitMotor = j._rotLms[0];
		var rylm:RotationalLimitMotor = j._rotLms[1];
		var rzlm:RotationalLimitMotor = j._rotLms[2];
		_drawTranslationalLimit3D(d, anchor1, basisX1, basisY1, basisZ1, txlm, tylm, tzlm, color);
		
		var rotYAxis:Vec3 = _pool.vec3();
		M.vec3_toVec3(rotYAxis, j._axisY);
		var rotYBasisX:Vec3 = _pool.vec3().copyFrom(basisX1);
		var rotYBasisY:Vec3 = _pool.vec3().copyFrom(basisX1).crossEq(rotYAxis);
		
		_drawRotationalLimit(d, anchor2, basisY1, basisZ1, basisY1, radius, j._angleX - rxlm.upperLimit, j._angleX - rxlm.lowerLimit, color);
		_drawRotationalLimit(d, anchor2, rotYBasisX, rotYBasisY, rotYBasisX, radius, rylm.lowerLimit - j._angleY, rylm.upperLimit - j._angleY, color);
		_drawRotationalLimit(d, anchor2, basisX2, basisY2, basisX2, radius, rzlm.lowerLimit - j._angleZ, rzlm.upperLimit - j._angleZ, color);
	}

	function _drawRotationalLimit(d:DebugDraw, center:Vec3, ex:Vec3, ey:Vec3, needle:Vec3, radius:Float, min:Float, max:Float, color:Vec3):Void {
		if (min != max) {
			var to:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(needle, radius);
			d.line(center, to, color);
			_pool.dispose(to);
			if (min > max) {
				d.ellipse(center, ex, ey, radius, radius, color);
			} else {
				d.arc(center, ex, ey, radius, radius, min, max, true, color);
			}
		}
	}

	function _drawTranslationalLimit(d:DebugDraw, center:Vec3, ex:Vec3, min:Float, max:Float, color:Vec3):Void {
		if (min < max) {
			var lower:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, min);
			var upper:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, max);
			d.line(lower, upper, color);
			_pool.dispose(lower);
			_pool.dispose(upper);
		}
	}

	function _drawTranslationalLimit3D(d:DebugDraw, center:Vec3, ex:Vec3, ey:Vec3, ez:Vec3, xlm:TranslationalLimitMotor, ylm:TranslationalLimitMotor, zlm:TranslationalLimitMotor, color:Vec3):Void {
		var minx:Float = xlm.lowerLimit;
		var maxx:Float = xlm.upperLimit;
		var miny:Float = ylm.lowerLimit;
		var maxy:Float = ylm.upperLimit;
		var minz:Float = zlm.lowerLimit;
		var maxz:Float = zlm.upperLimit;
		var lower:Vec3 = _pool.vec3();
		var upper:Vec3 = _pool.vec3();
		var xyz:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, minx).addScaledEq(ey, miny).addScaledEq(ez, minz);
		var xyZ:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, minx).addScaledEq(ey, miny).addScaledEq(ez, maxz);
		var xYz:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, minx).addScaledEq(ey, maxy).addScaledEq(ez, minz);
		var xYZ:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, minx).addScaledEq(ey, maxy).addScaledEq(ez, maxz);
		var Xyz:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, maxx).addScaledEq(ey, miny).addScaledEq(ez, minz);
		var XyZ:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, maxx).addScaledEq(ey, miny).addScaledEq(ez, maxz);
		var XYz:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, maxx).addScaledEq(ey, maxy).addScaledEq(ez, minz);
		var XYZ:Vec3 = _pool.vec3().copyFrom(center).addScaledEq(ex, maxx).addScaledEq(ey, maxy).addScaledEq(ez, maxz);
		// x
		d.line(xyz, Xyz, color);
		d.line(xYz, XYz, color);
		d.line(xyZ, XyZ, color);
		d.line(xYZ, XYZ, color);
		// y
		d.line(xyz, xYz, color);
		d.line(Xyz, XYz, color);
		d.line(xyZ, xYZ, color);
		d.line(XyZ, XYZ, color);
		// z
		d.line(xyz, xyZ, color);
		d.line(Xyz, XyZ, color);
		d.line(xYz, xYZ, color);
		d.line(XYz, XYZ, color);
		_pool.dispose(xyz);
		_pool.dispose(xyZ);
		_pool.dispose(xYz);
		_pool.dispose(xYZ);
		_pool.dispose(Xyz);
		_pool.dispose(XyZ);
		_pool.dispose(XYz);
		_pool.dispose(XYZ);
	}

	function _drawEllipseOnSphere(d:DebugDraw, center:Vec3, normal:Vec3, x:Vec3, y:Vec3, radiansX:Float, radiansY:Float, radius:Float, color:Vec3):Void {
		var n:Int = 16;
		var theta:Float = 0;
		var dTheta:Float = MathUtil.TWO_PI / n;

		var rotVec:Vec3 = _pool.vec3();
		var rotQ:Quat = _pool.quat();
		var rotM:Mat3 = _pool.mat3();
		var prevV:Vec3 = _pool.vec3();

		for (i in 0...n + 1) {
			var rx:Float = MathUtil.cos(theta) * radiansX;
			var ry:Float = MathUtil.sin(theta) * radiansY;

			var halfRotAng:Float = MathUtil.sqrt(rx * rx + ry * ry);
			var rotSin:Float = MathUtil.sin(halfRotAng * 0.5);
			var rotCos:Float = MathUtil.cos(halfRotAng * 0.5);
			rotVec.zero().addScaledEq(x, rx).addScaledEq(y, ry);
			rotVec.scaleEq(1 / halfRotAng * rotSin);
			rotQ.init(rotVec.x, rotVec.y, rotVec.z, rotCos);
			rotM.fromQuat(rotQ);

			var v:Vec3 = _pool.vec3().addScaledEq(normal, radius);
			v.mulMat3Eq(rotM).addEq(center);

			if (i >= 1) {
				d.line(prevV, v, color);
			}

			_pool.dispose(prevV);
			prevV = v;
			theta += dTheta;
		}

		_pool.dispose(rotVec);
		_pool.dispose(rotQ);
		_pool.dispose(rotM);
		_pool.dispose(prevV);
	}

	// --- public ---

	/**
	 * Advances the simulation by the time step `timeStep`.
	 */
	public function step(timeStep:Float):Void {
		if (_timeStep.dt > 0) {
			_timeStep.dtRatio = timeStep / _timeStep.dt;
		}
		_timeStep.dt = timeStep;
		_timeStep.invDt = 1 / timeStep;

		Performance.totalTime = M.profile({
			_updateContacts();
			_solveIslands();
		});
	}

	/**
	 * Adds the rigid body `rigidBody` to the simulation world.
	 */
	public function addRigidBody(rigidBody:RigidBody):Void {
		if (rigidBody._world != null) {
			throw M.error("A rigid body cannot belong to multiple worlds.");
		}

		// first, add the rigid body to the world
		M.list_push(_rigidBodyList, _rigidBodyListLast, _prev, _next, rigidBody);
		rigidBody._world = this;

		// then add the shapes to the world
		var s:Shape = rigidBody._shapeList;
		M.list_foreach(s, _next, {
			_addShape(s);
		});

		_numRigidBodies++;
	}

	/**
	 * Removes the rigid body `rigidBody` from the simulation world.
	 */
	public function removeRigidBody(rigidBody:RigidBody):Void {
		if (rigidBody._world != this) {
			throw M.error("The rigid body doesn't belong to the world.");
		}
		// first, remove the rigid body from the world
		M.list_remove(_rigidBodyList, _rigidBodyListLast, _prev, _next, rigidBody);
		rigidBody._world = null;

		// then remove the shapes from the world
		var s:Shape = rigidBody._shapeList;
		M.list_foreach(s, _next, {
			_removeShape(s);
		});

		_numRigidBodies--;
	}

	/**
	 * Adds the joint `joint` to the simulation world.
	 */
	public function addJoint(joint:Joint):Void {
		if (joint._world != null) {
			throw M.error("A joint cannot belong to multiple worlds.");
		}

		M.list_push(_jointList, _jointListLast, _prev, _next, joint);
		joint._world = this;
		joint._attachLinks();
		joint._syncAnchors();

		_numJoints++;
	}

	/**
	 * Removes the joint `joint` from the simulation world.
	 */
	public function removeJoint(joint:Joint):Void {
		if (joint._world != this) {
			throw M.error("The joint doesn't belong to the world.");
		}
		M.list_remove(_jointList, _jointListLast, _prev, _next, joint);
		joint._world = null;
		joint._detachLinks();

		_numJoints--;
	}

	/**
	 * Sets the debug draw interface to `debugDraw`. Call `World.debugDraw` to draw the simulation world.
	 */
	public inline function setDebugDraw(debugDraw:DebugDraw):Void {
		_debugDraw = debugDraw;
	}

	/**
	 * Returns the debug draw interface.
	 */
	public inline function getDebugDraw():DebugDraw {
		return _debugDraw;
	}

	/**
	 * Draws the simulation world for debugging. Call `World.setDebugDraw` to set the debug draw interface.
	 */
	public function debugDraw():Void {
		if (_debugDraw != null) {
			if (_broadPhase._type == BroadPhaseType._BVH) {
				var bvhBroadPhase:BvhBroadPhase = cast _broadPhase;
				_drawBvh(_debugDraw, bvhBroadPhase._tree);
			}
			_drawRigidBodies(_debugDraw);
			_drawConstraints(_debugDraw);
		}
	}

	/**
	 * Performs a ray casting. `callback.process` is called for all shapes the ray
	 * from `begin` to `end` hits.
	 */
	public function rayCast(begin:Vec3, end:Vec3, callback:RayCastCallback):Void {
		_rayCastWrapper.begin.copyFrom(begin);
		_rayCastWrapper.end.copyFrom(end);
		_rayCastWrapper.callback = callback;

		_broadPhase.rayCast(begin, end, _rayCastWrapper);
	}

	/**
	 * Performs a convex casting. `callback.process` is called for all shapes the convex geometry
	 * `convex` hits. The convex geometry translates by `translation` starting from the beginning
	 * transform `begin`.
	 */
	public function convexCast(convex:ConvexGeometry, begin:Transform, translation:Vec3, callback:RayCastCallback):Void {
		_convexCastWrapper.convex = convex;
		_convexCastWrapper.begin.copyFrom(begin);
		_convexCastWrapper.translation.copyFrom(translation);
		_convexCastWrapper.callback = callback;

		_broadPhase.convexCast(convex, begin, translation, _convexCastWrapper);
	}

	/**
	 * Performs an AABB query. `callback.process` is called for all shapes that their
	 * AABB and `aabb` intersect.
	 */
	public function aabbTest(aabb:Aabb, callback:AabbTestCallback):Void {
		_aabbTestWrapper._aabb.copyFrom(aabb);
		_aabbTestWrapper._callback = callback;

		_broadPhase.aabbTest(aabb, _aabbTestWrapper);
	}

	/**
	 * Returns the list of the rigid bodies added to the world.
	 */
	public inline function getRigidBodyList():RigidBody {
		return _rigidBodyList;
	}

	/**
	 * Returns the list of the joints added to the world.
	 */
	public inline function getJointList():Joint {
		return _jointList;
	}

	/**
	 * Returns the broad-phase collision detection algorithm.
	 */
	public inline function getBroadPhase():BroadPhase {
		return _broadPhase;
	}

	/**
	 * Returns the contact manager.
	 */
	public inline function getContactManager():ContactManager {
		return _contactManager;
	}

	/**
	 * Returns the number of the rigid bodies added to the world.
	 */
	public inline function getNumRigidBodies():Int {
		return _numRigidBodies;
	}

	/**
	 * Returns the number of the joints added to the world.
	 */
	public inline function getNumJoints():Int {
		return _numJoints;
	}

	/**
	 * Returns the number of the shapes added to the world.
	 */
	public inline function getNumShapes():Int {
		return _numShapes;
	}

	/**
	 * Returns the number of simulation islands.
	 */
	public inline function getNumIslands():Int {
		return _numIslands;
	}

	/**
	 * Returns the number of velocity iterations of constraint solvers.
	 */
	public inline function getNumVelocityIterations():Int {
		return _numVelocityIterations;
	}

	/**
	 * Sets the number of velocity iterations of constraint solvers to `numVelocityIterations`.
	 */
	public inline function setNumVelocityIterations(numVelocityIterations:Int):Void {
		_numVelocityIterations = numVelocityIterations;
	}

	/**
	 * Returns the number of position iterations of constraint solvers.
	 */
	public inline function getNumPositionIterations():Int {
		return _numPositionIterations;
	}

	/**
	 * Sets the number of position iterations of constraint solvers to `numPositionIterations`.
	 */
	public inline function setNumPositionIterations(numPositionIterations:Int):Void {
		_numPositionIterations = numPositionIterations;
	}

	/**
	 * Returns the gravitational acceleration of the simulation world.
	 */
	public inline function getGravity():Vec3 {
		return _gravity;
	}

	/**
	 * Sets the gravitational acceleration of the simulation world to `gravity`.
	 */
	public inline function setGravity(gravity:Vec3):Void {
		_gravity.copyFrom(gravity);
	}

}

// ray cast wrapper (broadphase -> world)
private class RayCastWrapper extends BroadPhaseProxyCallback {
	public var callback:RayCastCallback;
	public var begin:Vec3;
	public var end:Vec3;

	var rayCastHit:RayCastHit;

	public function new() {
		super();
		rayCastHit = new RayCastHit();

		begin = new Vec3();
		end = new Vec3();
		callback = null;
	}

	override public function process(proxy:Proxy):Void {
		var shape:Shape = cast proxy.userData;

		if (shape._geom.rayCast(begin, end, shape._transform, rayCastHit)) {
			callback.process(shape, rayCastHit);
		}
	}
}

// convex cast wrapper (broadphase -> world)
private class ConvexCastWrapper extends BroadPhaseProxyCallback {
	public var callback:RayCastCallback;
	public var begin:Transform;
	public var translation:Vec3;
	public var convex:ConvexGeometry;

	var rayCastHit:RayCastHit;
	var zero:Vec3;

	public function new() {
		super();
		rayCastHit = new RayCastHit();

		begin = new Transform();
		translation = new Vec3();
		zero = new Vec3();
		callback = null;
		convex = null;
	}

	override public function process(proxy:Proxy):Void {
		var shape:Shape = cast proxy.userData;
		var type:Int = shape._geom._type;
		if (type < GeometryType._CONVEX_MIN || type > GeometryType._CONVEX_MAX) return;

		var geom:ConvexGeometry = cast shape._geom;
		if (GjkEpa.getInstance().convexCast(convex, geom, begin, shape._transform, translation, zero, rayCastHit)) {
			callback.process(shape, rayCastHit);
		}
	}
}

// aabb test wrapper (broadphase -> world)
private class AabbTestWrapper extends BroadPhaseProxyCallback {
	public var _callback:AabbTestCallback;
	public var _aabb:Aabb;

	public function new() {
		super();

		_aabb = new Aabb();
		_callback = null;
	}

	override public function process(proxy:Proxy):Void {
		var shape:Shape = cast proxy.userData;
		var shapeAabb:Aabb = shape._aabb;

		// check if aabbs overlap again as proxies can be fattened by broadphase
		if (M.aabb_overlap(shapeAabb._min, shapeAabb._max, _aabb._min, _aabb._max)) {
			_callback.process(shape);
		}
	}
}
