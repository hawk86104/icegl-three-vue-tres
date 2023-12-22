package oimo.dynamics.constraint.joint;
import haxe.ds.Vector;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.constraint.*;
import oimo.dynamics.constraint.info.joint.*;
import oimo.dynamics.constraint.solver.*;
import oimo.dynamics.constraint.solver.direct.*;
import oimo.dynamics.constraint.solver.pgs.*;
import oimo.dynamics.rigidbody.*;
import oimo.m.IMat3;
import oimo.m.IQuat;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * The base class of joints. Joints are used to connect two rigid bodies
 * in various ways. See `JointType` for all types of joints.
 */
@:build(oimo.m.B.bu())
class Joint {
	public var _b1:RigidBody;
	public var _b2:RigidBody;

	public var _link1:JointLink;
	public var _link2:JointLink;
	public var _positionCorrectionAlgorithm:Int;

	public var _allowCollision:Bool;

	public var _prev:Joint;
	public var _next:Joint;
	public var _world:World;

	public var _localAnchor1:IVec3;
	public var _localAnchor2:IVec3;
	public var _relativeAnchor1:IVec3;
	public var _relativeAnchor2:IVec3;
	public var _anchor1:IVec3;
	public var _anchor2:IVec3;

	public var _localBasisX1:IVec3;
	public var _localBasisY1:IVec3;
	public var _localBasisZ1:IVec3;
	public var _localBasisX2:IVec3;
	public var _localBasisY2:IVec3;
	public var _localBasisZ2:IVec3;

	public var _basisX1:IVec3;
	public var _basisY1:IVec3;
	public var _basisZ1:IVec3;
	public var _basisX2:IVec3;
	public var _basisY2:IVec3;
	public var _basisZ2:IVec3;

	public var _impulses:Vector<JointImpulse>;

	// computed in constraint solver
	public var _appliedForce:IVec3;
	public var _appliedTorque:IVec3;

	public var _breakForce:Float;
	public var _breakTorque:Float;

	public var _type:Int;

	public var _solver:ConstraintSolver;

	/**
	 * Extra field that users can use for their own purposes.
	 */
	public var userData:Any;

	@:dox(hide)
	public function new(config:JointConfig, type:Int) {
		_link1 = new JointLink(this);
		_link2 = new JointLink(this);
		_positionCorrectionAlgorithm = Setting.defaultJointPositionCorrectionAlgorithm;
		_type = type;
		_world = null;
		_b1 = config.rigidBody1;
		_b2 = config.rigidBody2;
		_allowCollision = config.allowCollision;
		_breakForce = config.breakForce;
		_breakTorque = config.breakTorque;

		switch (config.solverType) {
		case ConstraintSolverType._DIRECT:
			_solver = new DirectJointConstraintSolver(this);
		case ConstraintSolverType._ITERATIVE:
			_solver = new PgsJointConstraintSolver(this);
		}

		M.vec3_fromVec3(_localAnchor1, config.localAnchor1);
		M.vec3_fromVec3(_localAnchor2, config.localAnchor2);

		M.vec3_zero(_relativeAnchor1);
		M.vec3_zero(_relativeAnchor2);
		M.vec3_zero(_anchor1);
		M.vec3_zero(_anchor2);

		M.vec3_zero(_localBasisX1);
		M.vec3_zero(_localBasisY1);
		M.vec3_zero(_localBasisZ1);
		M.vec3_zero(_localBasisX2);
		M.vec3_zero(_localBasisY2);
		M.vec3_zero(_localBasisZ2);

		_impulses = new Vector<JointImpulse>(Setting.maxJacobianRows);
		for (i in 0...Setting.maxJacobianRows) {
			_impulses[i] = new JointImpulse();
		}
	}

	// --- private ---

	function buildLocalBasesFromX():Void {
		// validate X
		if (M.vec3_dot(_localBasisX1, _localBasisX1) == 0) {
			M.vec3_set(_localBasisX1, 1, 0, 0);
		} else {
			M.vec3_normalize(_localBasisX1, _localBasisX1);
		}
		if (M.vec3_dot(_localBasisX2, _localBasisX2) == 0) {
			M.vec3_set(_localBasisX2, 1, 0, 0);
		} else {
			M.vec3_normalize(_localBasisX2, _localBasisX2);
		}

		var slerpQ:IQuat;
		var slerpM:IMat3;
		M.quat_arc(slerpQ, _localBasisX1, _localBasisX2);
		M.mat3_fromQuat(slerpM, slerpQ);

		M.vec3_perp(_localBasisY1, _localBasisX1);
		M.vec3_cross(_localBasisZ1, _localBasisX1, _localBasisY1);

		M.vec3_mulMat3(_localBasisX2, _localBasisX1, slerpM);
		M.vec3_mulMat3(_localBasisY2, _localBasisY1, slerpM);
		M.vec3_mulMat3(_localBasisZ2, _localBasisZ1, slerpM);
	}

	function buildLocalBasesFromXY():Void {
		// validate X
		if (M.vec3_dot(_localBasisX1, _localBasisX1) == 0) {
			M.vec3_set(_localBasisX1, 1, 0, 0);
		} else {
			M.vec3_normalize(_localBasisX1, _localBasisX1);
		}

		if (M.vec3_dot(_localBasisX2, _localBasisX2) == 0) {
			M.vec3_set(_localBasisX2, 1, 0, 0);
		} else {
			M.vec3_normalize(_localBasisX2, _localBasisX2);
		}

		// build Z and recompute Y
		M.vec3_cross(_localBasisZ1, _localBasisX1, _localBasisY1);
		M.vec3_cross(_localBasisZ2, _localBasisX2, _localBasisY2);

		if (M.vec3_dot(_localBasisZ1, _localBasisZ1) == 0) {
			// invalid Y, set Y perpendicular to X
			M.vec3_perp(_localBasisY1, _localBasisX1);
			// Z = cross(X, Y)
			M.vec3_cross(_localBasisZ1, _localBasisX1, _localBasisY1);
		} else {
			// normalize Z
			M.vec3_normalize(_localBasisZ1, _localBasisZ1);
			// Y = cross(Z, X)
			M.vec3_cross(_localBasisY1, _localBasisZ1, _localBasisX1);
		}

		if (M.vec3_dot(_localBasisZ2, _localBasisZ2) == 0) {
			// invalid Y, set Y perpendicular to X
			M.vec3_perp(_localBasisY2, _localBasisX2);
			// Z = cross(X, Y)
			M.vec3_cross(_localBasisZ2, _localBasisX2, _localBasisY2);
		} else {
			// normalize Z
			M.vec3_normalize(_localBasisZ2, _localBasisZ2);
			// Y = cross(Z, X)
			M.vec3_cross(_localBasisY2, _localBasisZ2, _localBasisX2);
		}
	}

	function buildLocalBasesFromX1Z2():Void {
		// validate X1 and Z2
		if (M.vec3_dot(_localBasisX1, _localBasisX1) == 0) {
			M.vec3_set(_localBasisX1, 1, 0, 0);
		} else {
			M.vec3_normalize(_localBasisX1, _localBasisX1);
		}

		if (M.vec3_dot(_localBasisZ2, _localBasisZ2) == 0) {
			M.vec3_set(_localBasisZ2, 0, 0, 1);
		} else {
			M.vec3_normalize(_localBasisZ2, _localBasisZ2);
		}

		var tf1:Transform = _b1._transform;
		var tf2:Transform = _b2._transform;

		// compute world bases
		var worldX1:IVec3;
		var worldZ1:IVec3;
		var worldY:IVec3;
		var worldX2:IVec3;
		var worldZ2:IVec3;
		M.vec3_mulMat3(worldX1, _localBasisX1, tf1._rotation);
		M.vec3_mulMat3(worldZ2, _localBasisZ2, tf2._rotation);
		M.vec3_cross(worldY, worldZ2, worldX1);

		if (M.vec3_dot(worldY, worldY) == 0) {
			M.vec3_perp(worldY, worldX1);
		}

		M.vec3_cross(worldZ1, worldX1, worldY);
		M.vec3_cross(worldX2, worldY, worldZ2);

		// return to local
		M.vec3_mulMat3Transposed(_localBasisX1, worldX1, tf1._rotation);
		M.vec3_mulMat3Transposed(_localBasisY1, worldY, tf1._rotation);
		M.vec3_mulMat3Transposed(_localBasisZ1, worldZ1, tf1._rotation);
		M.vec3_mulMat3Transposed(_localBasisX2, worldX2, tf2._rotation);
		M.vec3_mulMat3Transposed(_localBasisY2, worldY, tf2._rotation);
		M.vec3_mulMat3Transposed(_localBasisZ2, worldZ2, tf2._rotation);
	}

	function buildLocalBasesFromXY1X2():Void {
		// validate X1
		if (M.vec3_dot(_localBasisX1, _localBasisX1) == 0) {
			M.vec3_set(_localBasisX1, 1, 0, 0);
		} else {
			M.vec3_normalize(_localBasisX1, _localBasisX1);
		}

		// build Z1 and recompute Y1
		M.vec3_cross(_localBasisZ1, _localBasisX1, _localBasisY1);

		if (M.vec3_dot(_localBasisZ1, _localBasisZ1) == 0) {
			// invalid Y1, set Y1 perpendicular to X1
			M.vec3_perp(_localBasisY1, _localBasisX1);
			// Z1 = cross(X1, Y1)
			M.vec3_cross(_localBasisZ1, _localBasisX1, _localBasisY1);
		} else {
			// normalize Z1
			M.vec3_normalize(_localBasisZ1, _localBasisZ1);
			// Y1 = cross(Z1, X1)
			M.vec3_cross(_localBasisY1, _localBasisZ1, _localBasisX1);
		}

		// rotate (X1, Y1, Z1) to (X2, Y2, Z2) by arc(X1, X2)
		var slerpQ:IQuat;
		var slerpM:IMat3;
		M.quat_arc(slerpQ, _localBasisX1, _localBasisX2);
		M.mat3_fromQuat(slerpM, slerpQ);

		M.vec3_mulMat3(_localBasisX2, _localBasisX1, slerpM);
		M.vec3_mulMat3(_localBasisY2, _localBasisY1, slerpM);
		M.vec3_mulMat3(_localBasisZ2, _localBasisZ1, slerpM);
	}

	function setSolverInfoRowLinear(row:JointSolverInfoRow, diff:Float, lm:TranslationalLimitMotor, mass:Float, sd:SpringDamper, timeStep:TimeStep, isPositionPart:Bool):Void {
		var cfmFactor:Float;
		var erp:Float;
		var slop:Float = Setting.linearSlop;

		if (isPositionPart) {
			cfmFactor = 0;
			erp = 1;
		} else {
			if (sd.frequency > 0) {
				// the constraint is softened
				slop = 0;
				JointMacro.computeSoftConstraintParameters(sd.frequency, sd.dampingRatio, timeStep.dt, sd.useSymplecticEuler, cfmFactor, erp);
			} else {
				// the constraint is rigid
				cfmFactor = 0;
				erp = getErp(timeStep, false);
			}

			// set motor parameters if enabled
			if (lm.motorForce > 0) {
				row.motor(lm.motorSpeed, lm.motorForce * timeStep.dt);
			} else {
				row.motor(0, 0);
			}
		}

		var lower:Float = lm.lowerLimit;
		var upper:Float = lm.upperLimit;

		var minImp:Float;
		var maxImp:Float;
		var error:Float;
		if (lower > upper) {
			// inactive
			minImp = 0;
			maxImp = 0;
			error = 0;
		} else if (lower == upper) {
			// locked
			minImp = MathUtil.NEGATIVE_INFINITY;
			maxImp = MathUtil.POSITIVE_INFINITY;
			error = diff - lower;
		} else if (diff < lower) {
			// at lower limit
			minImp = MathUtil.NEGATIVE_INFINITY;
			maxImp = 0;
			error = diff - lower + slop;
			if (error > 0) {
				error = 0;
			}
		} else if (diff > upper) {
			// at upper limit
			minImp = 0;
			maxImp = MathUtil.POSITIVE_INFINITY;
			error = diff - upper - slop;
			if (error < 0) {
				error = 0;
			}
		} else {
			// inactive
			minImp = 0;
			maxImp = 0;
			error = 0;
		}

		// inverse motor mass
		var invMass:Float = mass == 0 ? 0 : 1 / mass;

		row.minImpulse = minImp;
		row.maxImpulse = maxImp;
		row.cfm = cfmFactor * invMass;
		row.rhs = error * erp;
	}

	function setSolverInfoRowAngular(row:JointSolverInfoRow, diff:Float, lm:RotationalLimitMotor, mass:Float, sd:SpringDamper, timeStep:TimeStep, isPositionPart:Bool):Void {
		var cfmFactor:Float;
		var erp:Float;
		var slop:Float = Setting.angularSlop;

		if (isPositionPart) {
			cfmFactor = 0;
			erp = 1;
		} else {
			if (sd.frequency > 0) {
				// the constraint is softened
				slop = 0;
				JointMacro.computeSoftConstraintParameters(sd.frequency, sd.dampingRatio, timeStep.dt, sd.useSymplecticEuler, cfmFactor, erp);
			} else {
				// the constraint is rigid
				cfmFactor = 0;
				erp = getErp(timeStep, false);
			}

			// set motor parameters if enabled
			if (lm.motorTorque > 0) {
				row.motor(lm.motorSpeed, lm.motorTorque * timeStep.dt);
			} else {
				row.motor(0, 0);
			}
		}

		var lower:Float = lm.lowerLimit;
		var upper:Float = lm.upperLimit;

		// adjust theta (in [-pi, pi] => in [mid - pi, mid + pi])
		var mid:Float = (lower + upper) * 0.5;
		diff -= mid;
		diff = ((diff + MathUtil.PI) % MathUtil.TWO_PI + MathUtil.TWO_PI) % MathUtil.TWO_PI - MathUtil.PI;
		diff += mid;

		var minImp:Float;
		var maxImp:Float;
		var error:Float;
		if (lower > upper) {
			// inactive
			minImp = 0;
			maxImp = 0;
			error = 0;
		} else if (lower == upper) {
			// locked
			minImp = MathUtil.NEGATIVE_INFINITY;
			maxImp = MathUtil.POSITIVE_INFINITY;
			error = diff - lower;
		} else if (diff < lower) {
			// at lower limit
			minImp = MathUtil.NEGATIVE_INFINITY;
			maxImp = 0;
			error = diff - lower + slop;
			if (error > 0) {
				error = 0;
			}
		} else if (diff > upper) {
			// at upper limit
			minImp = 0;
			maxImp = MathUtil.POSITIVE_INFINITY;
			error = diff - upper - slop;
			if (error < 0) {
				error = 0;
			}
		} else {
			// inactive
			minImp = 0;
			maxImp = 0;
			error = 0;
		}

		// inverse motor mass
		var invMass:Float = mass == 0 ? 0 : 1 / mass;

		row.minImpulse = minImp;
		row.maxImpulse = maxImp;
		row.cfm = cfmFactor * invMass;
		row.rhs = error * erp;
	}

	function getErp(timeStep:TimeStep, isPositionPart:Bool):Float {
		if (isPositionPart) {
			return 1;
		} else {
			if (_positionCorrectionAlgorithm == PositionCorrectionAlgorithm.BAUMGARTE) {
				return timeStep.invDt * Setting.velocityBaumgarte;
			} else {
				return 0;
			}
		}
	}

	function computeEffectiveInertiaMoment(axis:IVec3):Float {
		var ia1:IVec3;
		var ia2:IVec3;
		M.vec3_mulMat3(ia1, axis, _b1._invInertia);
		M.vec3_mulMat3(ia2, axis, _b2._invInertia);
		var invI1:Float = M.vec3_dot(ia1, axis);
		var invI2:Float = M.vec3_dot(ia2, axis);
		if (invI1 > 0) {
			var rsq:Float = M.vec3_dot(_relativeAnchor1, _relativeAnchor1);
			var dot:Float = M.vec3_dot(axis, _relativeAnchor1);
			var projsq:Float = rsq - dot * dot;
			if (projsq > 0) {
				if (_b1._invMass > 0) {
					invI1 = 1 / (1 / invI1 + _b1._mass * projsq);
				} else {
					invI1 = 0;
				}
			}
		}
		if (invI2 > 0) {
			var rsq:Float = M.vec3_dot(_relativeAnchor2, _relativeAnchor2);
			var dot:Float = M.vec3_dot(axis, _relativeAnchor2);
			var projsq:Float = rsq - dot * dot;
			if (projsq > 0) {
				if (_b2._invMass > 0) {
					invI2 = 1 / (1 / invI2 + _b2._mass * projsq);
				} else {
					invI2 = 0;
				}
			}
		}
		return invI1 + invI2 == 0 ? 0 : 1 / (invI1 + invI2);
	}

	function computeEffectiveInertiaMoment2(axis1:IVec3, axis2:IVec3):Float {
		var ia1:IVec3;
		var ia2:IVec3;
		M.vec3_mulMat3(ia1, axis1, _b1._invInertia);
		M.vec3_mulMat3(ia2, axis2, _b2._invInertia);
		var invI1:Float = M.vec3_dot(ia1, axis1);
		var invI2:Float = M.vec3_dot(ia2, axis2);
		if (invI1 > 0) {
			var rsq:Float = M.vec3_dot(_relativeAnchor1, _relativeAnchor1);
			var dot:Float = M.vec3_dot(axis1, _relativeAnchor1);
			var projsq:Float = rsq * rsq - dot * dot;
			if (projsq > 0) {
				if (_b1._invMass > 0) {
					invI1 = 1 / (1 / invI1 + _b1._mass * projsq);
				} else {
					invI1 = 0;
				}
			}
		}
		if (invI2 > 0) {
			var rsq:Float = M.vec3_dot(_relativeAnchor2, _relativeAnchor2);
			var dot:Float = M.vec3_dot(axis2, _relativeAnchor2);
			var projsq:Float = rsq * rsq - dot * dot;
			if (projsq > 0) {
				if (_b2._invMass > 0) {
					invI2 = 1 / (1 / invI2 + _b2._mass * projsq);
				} else {
					invI2 = 0;
				}
			}
		}
		return invI1 + invI2 == 0 ? 0 : 1 / (invI1 + invI2);
	}

	// --- internal ---

	extern public inline function _getWarmStartingFactor():Float {
		switch (_positionCorrectionAlgorithm) {
		case PositionCorrectionAlgorithm.BAUMGARTE:
			return Setting.jointWarmStartingFactorForBaungarte;
		case _:
			return Setting.jointWarmStartingFactor;
		}
	}

	// !! don't forget to call this from constraint solver !!
	public function _syncAnchors():Void {
		var tf1:Transform;
		var tf2:Transform;
		tf1 = _b1._transform;
		tf2 = _b2._transform;

		// anchors
		M.vec3_mulMat3(_relativeAnchor1, _localAnchor1, tf1._rotation);
		M.vec3_mulMat3(_relativeAnchor2, _localAnchor2, tf2._rotation);
		M.vec3_add(_anchor1, _relativeAnchor1, tf1._position);
		M.vec3_add(_anchor2, _relativeAnchor2, tf2._position);

		// bases
		M.vec3_mulMat3(_basisX1, _localBasisX1, tf1._rotation);
		M.vec3_mulMat3(_basisY1, _localBasisY1, tf1._rotation);
		M.vec3_mulMat3(_basisZ1, _localBasisZ1, tf1._rotation);
		M.vec3_mulMat3(_basisX2, _localBasisX2, tf2._rotation);
		M.vec3_mulMat3(_basisY2, _localBasisY2, tf2._rotation);
		M.vec3_mulMat3(_basisZ2, _localBasisZ2, tf2._rotation);
	}

	public function _getVelocitySolverInfo(timeStep:TimeStep, info:JointSolverInfo):Void {
		info.b1 = _b1;
		info.b2 = _b2;
		info.numRows = 0;
	}

	public function _getPositionSolverInfo(info:JointSolverInfo):Void {
		info.b1 = _b1;
		info.b2 = _b2;
		info.numRows = 0;
	}

	public function _checkDestruction():Void {
		var forceSq:Float = M.vec3_dot(_appliedForce, _appliedForce);
		var torqueSq:Float = M.vec3_dot(_appliedTorque, _appliedTorque);

		if (_breakForce > 0 && forceSq > _breakForce * _breakForce) {
			_world.removeJoint(this);
			return;
		}
		if (_breakTorque > 0 && torqueSq > _breakTorque * _breakTorque) {
			_world.removeJoint(this);
			return;
		}
	}

	extern public inline function _attachLinks():Void {
		_link1._other = _b2;
		_link2._other = _b1;
		M.list_push(_b1._jointLinkList, _b1._jointLinkListLast, _prev, _next, _link1);
		M.list_push(_b2._jointLinkList, _b2._jointLinkListLast, _prev, _next, _link2);
		_b1._numJointLinks++;
		_b2._numJointLinks++;
		_b1.wakeUp();
		_b2.wakeUp();
	}

	extern public inline function _detachLinks():Void {
		M.list_remove(_b1._jointLinkList, _b1._jointLinkListLast, _prev, _next, _link1);
		M.list_remove(_b2._jointLinkList, _b2._jointLinkListLast, _prev, _next, _link2);
		_link1._other = null;
		_link2._other = null;
		_b1._numJointLinks--;
		_b2._numJointLinks--;
		_b1.wakeUp();
		_b2.wakeUp();
	}

	// --- public ---

	/**
	 * Returns the first rigid body.
	 */
	public inline function getRigidBody1():RigidBody {
		return _b1;
	}

	/**
	 * Returns the second rigid body.
	 */
	public inline function getRigidBody2():RigidBody {
		return _b2;
	}

	/**
	 * Returns the type of the joint.
	 *
	 * See `JointType` for details.
	 */
	public inline function getType():Int {
		return _type;
	}

	/**
	 * Returns the first rigid body's anchor point in world coordinates.
	 */
	public inline function getAnchor1():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _anchor1);
		return v;
	}

	/**
	 * Returns the second rigid body's anchor point in world coordinates.
	 */
	public inline function getAnchor2():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _anchor2);
		return v;
	}

	/**
	 * Sets `anchor` to the first rigid body's anchor point in world coordinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getAnchor1To(anchor:Vec3):Void {
		M.vec3_toVec3(anchor, _anchor1);
	}

	/**
	 * Sets `anchor` to the second rigid body's anchor point in world coordinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getAnchor2To(anchor:Vec3):Void {
		M.vec3_toVec3(anchor, _anchor2);
	}

	/**
	 * Returns the first rigid body's local anchor point in world coordinates.
	 */
	public inline function getLocalAnchor1():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _localAnchor1);
		return v;
	}

	/**
	 * Returns the second rigid body's local anchor point in world coordinates.
	 */
	public inline function getLocalAnchor2():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _localAnchor2);
		return v;
	}

	/**
	 * Sets `localAnchor` to the first rigid body's anchor point in local coordinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getLocalAnchor1To(localAnchor:Vec3):Void {
		M.vec3_toVec3(localAnchor, _localAnchor1);
	}

	/**
	 * Sets `localAnchor` to the second rigid body's anchor point in local coordinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getLocalAnchor2To(localAnchor:Vec3):Void {
		M.vec3_toVec3(localAnchor, _localAnchor2);
	}

	/**
	 * Returns the basis of the joint for the first rigid body in world coordinates.
	 */
	public inline function getBasis1():Mat3 {
		var m:Mat3 = new Mat3();
		var b:IMat3;
		M.mat3_fromCols(b, _basisX1, _basisY1, _basisZ1);
		M.mat3_toMat3(m, b);
		return m;
	}

	/**
	 * Returns the basis of the joint for the second rigid body in world coordinates.
	 */
	public inline function getBasis2():Mat3 {
		var m:Mat3 = new Mat3();
		var b:IMat3;
		M.mat3_fromCols(b, _basisX2, _basisY2, _basisZ2);
		M.mat3_toMat3(m, b);
		return m;
	}

	/**
	 * Sets `basis` to the basis of the joint for the first rigid body in world coordinates.
	 *
	 * This does not create a new instance of `Mat3`.
	 */
	public inline function getBasis1To(basis:Mat3):Void {
		var b:IMat3;
		M.mat3_fromCols(b, _basisX1, _basisY1, _basisZ1);
		M.mat3_toMat3(basis, b);
	}

	/**
	 * Sets `basis` to the basis of the joint for the second rigid body in world coordinates.
	 *
	 * This does not create a new instance of `Mat3`.
	 */
	public inline function getBasis2To(basis:Mat3):Void {
		var b:IMat3;
		M.mat3_fromCols(b, _basisX2, _basisY2, _basisZ2);
		M.mat3_toMat3(basis, b);
	}

	/**
	 * Returns whether to allow the connected rigid bodies to collide each other.
	 */
	public inline function getAllowCollision():Bool {
		return _allowCollision;
	}

	/**
	 * Sets whether to allow the connected rigid bodies to collide each other.
	 */
	public inline function setAllowCollision(allowCollision:Bool):Void {
		_allowCollision = allowCollision;
	}

	/**
	 * Returns the magnitude of the constraint force at which the joint will be destroyed.
	 *
	 * Returns `0` if the joint is unbreakable.
	 */
	public inline function getBreakForce():Float {
		return _breakForce;
	}

	/**
	 * Sets the magnitude of the constraint force at which the joint will be destroyed.
	 *
	 * Set `0` for unbreakable joints.
	 */
	public inline function setBreakForce(breakForce:Float):Void {
		_breakForce = breakForce;
	}

	/**
	 * Returns the magnitude of the constraint torque at which the joint will be destroyed.
	 *
	 * Returns `0` if the joint is unbreakable.
	 */
	public inline function getBreakTorque():Float {
		return _breakTorque;
	}

	/**
	 * Sets the magnitude of the constraint force at which the joint will be destroyed.
	 *
	 * Set `0` for unbreakable joints.
	 */
	public inline function setBreakTorque(breakTorque:Float):Void {
		_breakTorque = breakTorque;
	}

	/**
	 * Returns the type of the position correction algorithm for the joint.
	 *
	 * See `PositionCorrectionAlgorithm` for details.
	 */
	public inline function getPositionCorrectionAlgorithm():Int {
		return _positionCorrectionAlgorithm;
	}

	/**
	 * Sets the type of the position correction algorithm to `positionCorrectionAlgorithm` for the joint.
	 *
	 * See `PositionCorrectionAlgorithm` for details.
	 */
	public inline function setPositionCorrectionAlgorithm(positionCorrectionAlgorithm:Int):Void {
		switch (positionCorrectionAlgorithm) {
		case
			PositionCorrectionAlgorithm._BAUMGARTE,
			PositionCorrectionAlgorithm._SPLIT_IMPULSE,
			PositionCorrectionAlgorithm._NGS
		:
		case _:
			throw M.error("invalid position correction algorithm id: " + positionCorrectionAlgorithm);
		}
		_positionCorrectionAlgorithm = positionCorrectionAlgorithm;
	}

	/**
	 * Returns the force applied to the first rigid body at the last time step.
	 */
	public inline function getAppliedForce():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _appliedForce);
		return v;
	}

	/**
	 * Sets `appliedForce` to the force applied to the first rigid body at the last time step.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getAppliedForceTo(appliedForce:Vec3):Void {
		M.vec3_toVec3(appliedForce, _appliedForce);
	}

	/**
	 * Returns the torque applied to the first rigid body at the last time step.
	 */
	public inline function getAppliedTorque():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _appliedTorque);
		return v;
	}

	/**
	 * Sets `appliedTorque` to the torque applied to the first rigid body at the last time step.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getAppliedTorqueTo(appliedTorque:Vec3):Void {
		M.vec3_toVec3(appliedTorque, _appliedTorque);
	}

	/**
	 * Returns the previous joint in the world.
	 *
	 * If the previous one does not exist, `null` will be returned.
	 */
	public inline function getPrev():Joint {
		return _prev;
	}

	/**
	 * Returns the next joint in the world.
	 *
	 * If the next one does not exist, `null` will be returned.
	 */
	public inline function getNext():Joint {
		return _next;
	}
}
