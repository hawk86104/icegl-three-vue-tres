package oimo.dynamics.constraint.joint;
import oimo.common.Setting;
import oimo.dynamics.TimeStep;
import oimo.m.IMat3;
import oimo.m.IQuat;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.MathUtil;
import oimo.common.Vec3;
import oimo.dynamics.*;
import oimo.common.Transform;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;

/**
 * A ragdoll joint is designed to simulate ragdoll's limbs. It constrains
 * swing and twist angles between two rigid bodies. The two rigid bodies
 * have constraint axes, and the swing angle is defined by the angle of
 * two constraint axes, while the twist angle is defined by the rotation
 * angle along the two axes. In addition to lower and upper limits of the
 * twist angle, You can set an "elliptic cone limit" of the swing angle
 * by specifying two swing axes (though one of them is automatically
 * computed) and corresponding maximum swing angles. You can also enable a
 * motor of the twist part of the constraint, spring and damper effect of
 * the both swing and twist part of the constraint.
 */
@:build(oimo.m.B.bu())
class RagdollJoint extends Joint {
	public var _twistSd:SpringDamper;
	public var _swingSd:SpringDamper;
	public var _twistLm:RotationalLimitMotor;
	public var _maxSwingAngle1:Float;
	public var _maxSwingAngle2:Float;

	var swingAxis:IVec3;
	var twistAxis:IVec3;

	var linearError:IVec3;
	var swingError:Float;
	var dummySwingLm:RotationalLimitMotor;

	public var _swingAngle:Float;
	public var _twistAngle:Float;

	/**
	 * Creates a new ragdoll joint by configuration `config`.
	 */
	public function new(config:RagdollJointConfig) {
		super(config, JointType.RAGDOLL);

		M.vec3_fromVec3(_localBasisX1, config.localTwistAxis1);
		M.vec3_fromVec3(_localBasisY1, config.localSwingAxis1);
		M.vec3_fromVec3(_localBasisX2, config.localTwistAxis2);

		buildLocalBasesFromXY1X2();

		_twistSd = config.twistSpringDamper.clone();
		_twistLm = config.twistLimitMotor.clone();
		_swingSd = config.swingSpringDamper.clone();
		_maxSwingAngle1 = config.maxSwingAngle1;
		_maxSwingAngle2 = config.maxSwingAngle2;

		if (_maxSwingAngle1 < Setting.minRagdollMaxSwingAngle) {
			_maxSwingAngle1 = Setting.minRagdollMaxSwingAngle;
		}
		if (_maxSwingAngle2 < Setting.minRagdollMaxSwingAngle) {
			_maxSwingAngle2 = Setting.minRagdollMaxSwingAngle;
		}

		dummySwingLm = new RotationalLimitMotor();
		dummySwingLm.lowerLimit = -1;
		dummySwingLm.upperLimit = 0;

		_swingAngle = 0;
		_twistAngle = 0;
		swingError = 0;
		M.vec3_zero(swingAxis);
		M.vec3_zero(twistAxis);
	}

	// --- private ---

	function getInfo(info:JointSolverInfo, timeStep:TimeStep, isPositionPart:Bool):Void {
		// compute ERP
		var erp:Float = getErp(timeStep, isPositionPart);

		// compute rhs
		var linearRhs:IVec3;
		M.vec3_scale(linearRhs, linearError, erp);
		var linRhsX:Float = M.vec3_get(linearRhs, 0);
		var linRhsY:Float = M.vec3_get(linearRhs, 1);
		var linRhsZ:Float = M.vec3_get(linearRhs, 2);

		var crossR1:IMat3;
		var crossR2:IMat3;
		M.vec3_toCrossMatrix(crossR1, _relativeAnchor1);
		M.vec3_toCrossMatrix(crossR2, _relativeAnchor2);
		M.mat3_negate(crossR1, crossR1);
		M.mat3_negate(crossR2, crossR2);

		var row:JointSolverInfoRow;
		var j:JacobianRow;
		var swingMass:Float = M.call(computeEffectiveInertiaMoment(swingAxis));
		var twistMass:Float = M.call(computeEffectiveInertiaMoment(_basisX2));

		// linear X
		row = info.addRow(_impulses[0]);
		row.equalLimit(linRhsX, 0);

		j = row.jacobian;
		M.vec3_set(j.lin1, 1, 0, 0);
		M.vec3_set(j.lin2, 1, 0, 0);
		M.mat3_getRow(j.ang1, crossR1, 0);
		M.mat3_getRow(j.ang2, crossR2, 0);

		// linear Y
		row = info.addRow(_impulses[1]);
		row.equalLimit(linRhsY, 0);

		j = row.jacobian;
		M.vec3_set(j.lin1, 0, 1, 0);
		M.vec3_set(j.lin2, 0, 1, 0);
		M.mat3_getRow(j.ang1, crossR1, 1);
		M.mat3_getRow(j.ang2, crossR2, 1);

		// linear Z
		row = info.addRow(_impulses[2]);
		row.equalLimit(linRhsZ, 0);

		j = row.jacobian;
		M.vec3_set(j.lin1, 0, 0, 1);
		M.vec3_set(j.lin2, 0, 0, 1);
		M.mat3_getRow(j.ang1, crossR1, 2);
		M.mat3_getRow(j.ang2, crossR2, 2);

		// swing
		if (swingError > 0 && (_swingSd.frequency <= 0 || !isPositionPart)) {
			row = info.addRow(_impulses[3]);
			setSolverInfoRowAngular(row, swingError, dummySwingLm, swingMass, _swingSd, timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.ang1, swingAxis);
			M.vec3_assign(j.ang2, swingAxis);
		}

		// twist
		if (_twistSd.frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[4]);
			setSolverInfoRowAngular(row, _twistAngle, _twistLm, twistMass, _twistSd, timeStep, isPositionPart);

			j = row.jacobian;

			M.vec3_assign(j.ang1, twistAxis);
			M.vec3_assign(j.ang2, twistAxis);
		}
	}

	extern inline function computeErrors():Void {
		var tf1:Transform = _b1._transform;
		var tf2:Transform = _b2._transform;

		// twist axes
		var axis1:IVec3;
		var axis2:IVec3;
		M.vec3_assign(axis1, _basisX1);
		M.vec3_assign(axis2, _basisX2);

		// build basis matrices
		var basis1Mat:IMat3;
		var basis2Mat:IMat3;
		M.mat3_fromCols(basis1Mat, _basisX1, _basisY1, _basisZ1);
		M.mat3_fromCols(basis2Mat, _basisX2, _basisY2, _basisZ2);

		// compute the swing matrix
		var swingQ:IQuat;
		var swingM:IMat3;
		var swingV:IVec3;
		M.quat_arc(swingQ, axis1, axis2);
		M.mat3_fromQuat(swingM, swingQ);

		// get swing angle
		_swingAngle = MathUtil.safeAcos(M.quat_getReal(swingQ)) * 2;
		M.vec3_assign(swingV, swingQ);

		// swing basisY2 into rb1's coordinates
		var basisY2In1:IVec3;
		M.vec3_mulMat3Transposed(basisY2In1, _basisY2, swingM);

		// compute twist angle
		var yCoord:Float;
		var zCoord:Float;
		yCoord = M.vec3_dot(_basisY1, basisY2In1);
		zCoord = M.vec3_dot(_basisZ1, basisY2In1);
		_twistAngle = MathUtil.atan2(zCoord, yCoord);

		// compute twist axis: middle vector between basis1X and basis2X
		M.vec3_add(twistAxis, _basisX1, _basisX2);
		M.vec3_normalize(twistAxis, twistAxis);

		// scale the swing vector so that its length shows the swing rotation angle
		var invLen:Float = M.vec3_length(swingV);
		if (invLen > 0) invLen = 1 / invLen;
		M.vec3_scale(swingV, swingV, invLen * _swingAngle);

		// take the swing axis to the first body's constraint coordinate system
		M.vec3_mulMat3Transposed(swingV, swingV, basis1Mat);

		// project the swing rotation angles onto XY plane
		var x:Float = M.vec3_get(swingV, 1);
		var y:Float = M.vec3_get(swingV, 2);

		// constraint ellipse: x^2/a^2 + y^2/b^2 <= 1
		var a:Float = _maxSwingAngle1;
		var b:Float = _maxSwingAngle2;
		var invA2:Float = 1 / (a * a);
		var invB2:Float = 1 / (b * b);

		var w:Float = x * x * invA2 + y * y * invB2;
		if (w == 0) {
			M.vec3_set(swingAxis, 0, 0, 0);
			swingError = 0;
		} else {
			var t:Float = MathUtil.sqrt(1 / w);
			var x0:Float = x * t;
			var y0:Float = y * t;
			var nx:Float = x0 * invA2;
			var ny:Float = y0 * invB2;
			invLen = 1 / MathUtil.sqrt(nx * nx + ny * ny);
			nx *= invLen;
			ny *= invLen;
			var depth:Float = (x - x0) * nx + (y - y0) * ny;
			if (depth > 0) {
				swingError = depth;

				// normal vector in constraint ellipse space
				M.vec3_set(swingAxis, 0, nx, ny);
				// take it to the first body's space
				M.vec3_mulMat3(swingAxis, swingAxis, basis1Mat);
				// then swing it
				M.vec3_mulMat3(swingAxis, swingAxis, swingM);
			} else {
				swingError = 0;
			}
		}

		// compute linear error
		M.vec3_sub(linearError, _anchor2, _anchor1);
	}

	// --- internal ---

	override public function _syncAnchors():Void {
		super._syncAnchors();

		// compute positional errors
		computeErrors();
	}

	override public function _getVelocitySolverInfo(timeStep:TimeStep, info:JointSolverInfo):Void {
		super._getVelocitySolverInfo(timeStep, info);
		getInfo(info, timeStep, false);
	}

	override public function _getPositionSolverInfo(info:JointSolverInfo):Void {
		super._getPositionSolverInfo(info);
		getInfo(info, null, true);
	}

	// --- public ---

	/**
	 * Returns the first rigid body's constraint axis in world coordinates.
	 */
	public inline function getAxis1():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _basisX1);
		return v;
	}

	/**
	 * Returns the second rigid body's constraint axis in world coordinates.
	 */
	public inline function getAxis2():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _basisX2);
		return v;
	}

	/**
	 * Sets `axis` to the first rigid body's constraint axis in world coordinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getAxis1To(axis:Vec3):Void {
		M.vec3_toVec3(axis, _basisX1);
	}

	/**
	 * Sets `axis` to the second rigid body's constraint axis in world coordinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getAxis2To(axis:Vec3):Void {
		M.vec3_toVec3(axis, _basisX2);
	}

	/**
	 * Returns the first rigid body's constraint axis relative to the rigid body's transform.
	 */
	public inline function getLocalAxis1():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _localBasisX1);
		return v;
	}

	/**
	 * Returns the second rigid body's constraint axis relative to the rigid body's transform.
	 */
	public inline function getLocalAxis2():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _localBasisX2);
		return v;
	}

	/**
	 * Sets `axis` to the first rigid body's constraint axis relative to the rigid body's transform.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getLocalAxis1To(axis:Vec3):Void {
		M.vec3_toVec3(axis, _localBasisX1);
	}

	/**
	 * Sets `axis` to the second rigid body's constraint axis relative to the rigid body's transform.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getLocalAxis2To(axis:Vec3):Void {
		M.vec3_toVec3(axis, _localBasisX2);
	}

	/**
	 * Returns the rotational spring and damper settings along the twist axis.
	 */
	public inline function getTwistSpringDamper():SpringDamper {
		return _twistSd;
	}

	/**
	 * Returns the rotational limits and motor settings along the twist axis.
	 */
	public inline function getTwistLimitMotor():RotationalLimitMotor {
		return _twistLm;
	}

	/**
	 * Returns the rotational spring and damper settings along the swing axis.
	 */
	public inline function getSwingSpringDamper():SpringDamper {
		return _swingSd;
	}

	/**
	 * Returns the swing axis in world coordinates.
	 */
	public inline function getSwingAxis():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, swingAxis);
		return v;
	}

	/**
	 * Sets `axis` to the swing axis in world coordinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getSwingAxisTo(axis:Vec3):Void {
		M.vec3_toVec3(axis, swingAxis);
	}

	/**
	 * Returns the swing angle in radians.
	 */
	public inline function getSwingAngle():Float {
		return _swingAngle;
	}

	/**
	 * Returns the twist angle in radians.
	 */
	public inline function getTwistAngle():Float {
		return _twistAngle;
	}

}
