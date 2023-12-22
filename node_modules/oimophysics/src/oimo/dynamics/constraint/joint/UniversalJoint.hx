package oimo.dynamics.constraint.joint;
import oimo.dynamics.TimeStep;
import oimo.m.IMat3;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Vec3;
import oimo.dynamics.*;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;

/**
 * A universal joint constrains two rigid bodies' constraint axes to be perpendicular
 * to each other. Rigid bodies can rotate along their constraint axes, but cannot along
 * the direction perpendicular to two constraint axes. This joint provides two degrees
 * of freedom. You can enable lower and upper limits, motors, spring and damper effects
 * of the two rotational constraints.
 */
@:build(oimo.m.B.bu())
class UniversalJoint extends Joint {
	public var _sd1:SpringDamper;
	public var _sd2:SpringDamper;
	public var _lm1:RotationalLimitMotor;
	public var _lm2:RotationalLimitMotor;

	public var _axisX:IVec3;
	public var _axisY:IVec3;
	public var _axisZ:IVec3;

	public var _angleX:Float;
	public var _angleY:Float;
	public var _angleZ:Float;

	var xSingular:Bool;
	var ySingular:Bool;
	var zSingular:Bool;

	var linearError:IVec3;

	/**
	 * Creates a new universal joint by configuration `config`.
	 */
	public function new(config:UniversalJointConfig) {
		super(config, JointType.UNIVERSAL);

		M.vec3_fromVec3(_localBasisX1, config.localAxis1);
		M.vec3_fromVec3(_localBasisZ2, config.localAxis2);
		buildLocalBasesFromX1Z2();

		_angleX = 0;
		_angleY = 0;
		_angleZ = 0;

		xSingular = false;
		ySingular = false;
		zSingular = false;

		_sd1 = config.springDamper1.clone();
		_sd2 = config.springDamper2.clone();
		_lm1 = config.limitMotor1.clone();
		_lm2 = config.limitMotor2.clone();
	}

	extern inline function updateConstraintAxes():Void {
		var rot1:IMat3;
		var rot2:IMat3;
		M.mat3_fromCols(rot1, _basisX1, _basisY1, _basisZ1);
		M.mat3_fromCols(rot2, _basisX2, _basisY2, _basisZ2);

		//     local --(rot1)--> body1
		//     local --(rot2)--> body2
		//     body1 --(relRot)--> body2
		// and
		//     body1 -------------(relRot)------------> body2
		//     body1 --(inv(rot1))--> local --(rot2)--> body2
		//
		// so relative rotation matrix is
		//     inv(rot1) * rot2
		// and NOT
		//     rot2 * inv(rot1)
		var relRot:IMat3;
		M.mat3_mulLhsTransposed(relRot, rot1, rot2);

		var angleAxisX:IVec3;
		var angleAxisY:IVec3;
		var angleAxisZ:IVec3;
		M.vec3_assign(angleAxisX, _basisX1);
		M.vec3_assign(angleAxisZ, _basisZ2);
		M.vec3_cross(angleAxisY, angleAxisZ, angleAxisX); // right-handed coordinate system

		// constraint axes are not equal to rotation axes of Euler angles, because rotation axes
		// of Euler angles are not orthogonal. if we want to constrain relative angular velocity
		// w2-w1 along X-axis of Euler angles, w2-w1 should fulfill
		//   w2-w1 = alpha * angleAxisY + beta * angleAxisZ
		// so
		//   (w2-w1) dot (angleAxisY cross angleAxisZ) = 0
		//
		// be careful about the fact that this does NOT mean
		//   (w2-w1) dot angleAxisX = 0
		//
		// note that we can directory use Y-axis of Euler angles to constrain relative velocity
		// along the axis, as `angleAxisY` is parallel to `angleAxisX cross angleAxisZ`.
		M.vec3_cross(_axisX, angleAxisY, angleAxisZ);
		M.vec3_assign(_axisY, angleAxisY);
		M.vec3_cross(_axisZ, angleAxisX, angleAxisY);

		M.vec3_normalize(_axisX, _axisX);
		M.vec3_normalize(_axisY, _axisY);
		M.vec3_normalize(_axisZ, _axisZ);

		xSingular = M.vec3_dot(_axisX, _axisX) == 0;
		ySingular = M.vec3_dot(_axisY, _axisY) == 0;
		zSingular = M.vec3_dot(_axisZ, _axisZ) == 0;
	}

	function getInfo(info:JointSolverInfo, timeStep:TimeStep, isPositionPart:Bool):Void {
		// compute ERP
		var erp:Float = getErp(timeStep, isPositionPart);

		// compute rhs
		var linearRhs:IVec3;
		M.vec3_scale(linearRhs, linearError, erp);
		var linRhsX:Float = M.vec3_get(linearRhs, 0);
		var linRhsY:Float = M.vec3_get(linearRhs, 1);
		var linRhsZ:Float = M.vec3_get(linearRhs, 2);
		var angRhsY:Float = _angleY * erp;

		var crossR1:IMat3;
		var crossR2:IMat3;
		M.vec3_toCrossMatrix(crossR1, _relativeAnchor1);
		M.vec3_toCrossMatrix(crossR2, _relativeAnchor2);
		M.mat3_negate(crossR1, crossR1);
		M.mat3_negate(crossR2, crossR2);

		var row:JointSolverInfoRow;
		var j:JacobianRow;
		var motorMassX:Float = M.call(computeEffectiveInertiaMoment(_axisX));
		var motorMassZ:Float = M.call(computeEffectiveInertiaMoment(_axisZ));

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

		// angular X
		if (!xSingular && (_sd1.frequency <= 0 || !isPositionPart)) {
			row = info.addRow(_impulses[3]);
			setSolverInfoRowAngular(row, _angleX, _lm1, motorMassX, _sd1, timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.ang1, _axisX);
			M.vec3_assign(j.ang2, _axisX);
		}

		// angular Y
		if (!ySingular) {
			row = info.addRow(_impulses[4]);
			row.equalLimit(angRhsY, 0);

			j = row.jacobian;
			M.vec3_assign(j.ang1, _axisY);
			M.vec3_assign(j.ang2, _axisY);
		}

		// angular Z
		if (!zSingular && (_sd2.frequency <= 0 || !isPositionPart)) {
			row = info.addRow(_impulses[5]);
			setSolverInfoRowAngular(row, _angleZ, _lm2, motorMassZ, _sd2, timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.ang1, _axisZ);
			M.vec3_assign(j.ang2, _axisZ);
		}
	}

	extern inline function computeErrors():Void {
		var rot1:IMat3;
		var rot2:IMat3;
		M.mat3_fromCols(rot1, _basisX1, _basisY1, _basisZ1);
		M.mat3_fromCols(rot2, _basisX2, _basisY2, _basisZ2);

		//     local --(rot1)--> body1
		//     local --(rot2)--> body2
		//     body1 --(relRot)--> body2
		// and
		//     body1 -------------(relRot)------------> body2
		//     body1 --(inv(rot1))--> local --(rot2)--> body2
		//
		// so relative rotation matrix is
		//     inv(rot1) * rot2
		// but NOT
		//     rot2 * inv(rot1)
		var relRot:IMat3;
		M.mat3_mulLhsTransposed(relRot, rot1, rot2);

		var angles:IVec3;
		M.mat3_toEulerXyz(angles, relRot);
		_angleX = M.vec3_get(angles, 0);
		_angleY = M.vec3_get(angles, 1);
		_angleZ = M.vec3_get(angles, 2);

		// compute linear error
		M.vec3_sub(linearError, _anchor2, _anchor1);
	}

	// --- internal ---

	override public function _syncAnchors():Void {
		super._syncAnchors();
		updateConstraintAxes();

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
		M.vec3_toVec3(v, _basisZ2);
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
		M.vec3_toVec3(axis, _basisZ2);
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
		M.vec3_toVec3(v, _localBasisZ2);
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
		M.vec3_toVec3(axis, _localBasisZ2);
	}

	/**
	 * Returns the rotational spring and damper settings along the first body's constraint axis.
	 */
	public inline function getSpringDamper1():SpringDamper {
		return _sd1;
	}

	/**
	 * Returns the rotational spring and damper settings along the second body's constraint axis.
	 */
	public inline function getSpringDamper2():SpringDamper {
		return _sd2;
	}

	/**
	 * Returns the rotational limits and motor settings along the first body's constraint axis.
	 */
	public inline function getLimitMotor1():RotationalLimitMotor {
		return _lm1;
	}

	/**
	 * Returns the rotational limits and motor settings along the second body's constraint axis.
	 */
	public inline function getLimitMotor2():RotationalLimitMotor {
		return _lm2;
	}

	/**
	 * Returns the rotation angle along the first body's constraint axis.
	 */
	public inline function getAngle1():Float {
		return _angleX;
	}

	/**
	 * Returns the rotation angle along the second body's constraint axis.
	 */
	public inline function getAngle2():Float {
		return _angleZ;
	}

}
