package oimo.dynamics.constraint.joint;
import oimo.dynamics.TimeStep;
import oimo.m.IMat3;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.MathUtil;
import oimo.common.Vec3;
import oimo.dynamics.*;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;

/**
 * A revolute joint (a.k.a. hinge joint) constrains two rigid bodies to share
 * their anchor points and constraint axes, and restricts relative rotation onto
 * the constraint axis. This joint provides one degree of freedom. You can enable
 * lower and upper limits, a motor, a spring and damper effect of the rotational
 * part of the constraint.
 */
@:build(oimo.m.B.bu())
class RevoluteJoint extends Joint {
	public var _sd:SpringDamper;
	public var _lm:RotationalLimitMotor;

	public var _basis:BasisTracker;

	var angle:Float;
	var angularErrorY:Float;
	var angularErrorZ:Float;
	var linearError:IVec3;

	/**
	 * Creates a new revolute joint by configuration `config`.
	 */
	public function new(config:RevoluteJointConfig) {
		super(config, JointType._REVOLUTE);

		M.vec3_fromVec3(_localBasisX1, config.localAxis1);
		M.vec3_fromVec3(_localBasisX2, config.localAxis2);

		buildLocalBasesFromX();

		angle = 0;
		angularErrorY = 0;
		angularErrorZ = 0;

		_basis = new BasisTracker(this);

		_sd = config.springDamper.clone();
		_lm = config.limitMotor.clone();
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
		var angRhsY:Float = angularErrorY * erp;
		var angRhsZ:Float = angularErrorZ * erp;

		var crossR1:IMat3;
		var crossR2:IMat3;
		M.vec3_toCrossMatrix(crossR1, _relativeAnchor1);
		M.vec3_toCrossMatrix(crossR2, _relativeAnchor2);
		M.mat3_negate(crossR1, crossR1);
		M.mat3_negate(crossR2, crossR2);

		var row:JointSolverInfoRow;
		var j:JacobianRow;
		var motorMass:Float = M.call(computeEffectiveInertiaMoment(_basis.x));

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
		if (_sd.frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[3]);
			setSolverInfoRowAngular(row, angle, _lm, motorMass, _sd, timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.ang1, _basis.x);
			M.vec3_assign(j.ang2, _basis.x);
		}

		// angular Y
		row = info.addRow(_impulses[4]);
		row.equalLimit(angRhsY, 0);

		j = row.jacobian;
		M.vec3_assign(j.ang1, _basis.y);
		M.vec3_assign(j.ang2, _basis.y);

		// angular Z
		row = info.addRow(_impulses[5]);
		row.equalLimit(angRhsZ, 0);

		j = row.jacobian;
		M.vec3_assign(j.ang1, _basis.z);
		M.vec3_assign(j.ang2, _basis.z);
	}

	extern inline function computeErrors():Void {
		var cos:Float;

		// compute angular error along Y and Z
		var angError:IVec3;
		M.vec3_cross(angError, _basisX1, _basisX2);
		cos = M.vec3_dot(_basisX1, _basisX2);
		var theta:Float = MathUtil.safeAcos(cos);
		M.vec3_normalize(angError, angError);
		M.vec3_scale(angError, angError, theta);
		angularErrorY = M.vec3_dot(angError, _basis.y);
		angularErrorZ = M.vec3_dot(angError, _basis.z);

		// measure the rotation angle along X
		var perpCross:IVec3;
		M.vec3_cross(perpCross, _basisY1, _basisY2);
		cos = M.vec3_dot(_basisY1, _basisY2);
		angle = MathUtil.safeAcos(cos);
		if (M.vec3_dot(perpCross, _basis.x) < 0) {
			angle = -angle;
		}

		// compute linear error
		M.vec3_sub(linearError, _anchor2, _anchor1);
	}

	// --- internal ---

	override public function _syncAnchors():Void {
		super._syncAnchors();
		_basis.trackByX();

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
	 * Returns the rotational spring and damper settings.
	 */
	public inline function getSpringDamper():SpringDamper {
		return _sd;
	}

	/**
	 * Returns the rotational limits and motor settings.
	 */
	public inline function getLimitMotor():RotationalLimitMotor {
		return _lm;
	}

	/**
	 * Returns the rotation angle in radians.
	 */
	public inline function getAngle():Float {
		return angle;
	}

}
