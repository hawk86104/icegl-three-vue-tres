package oimo.dynamics.constraint.joint;
import oimo.dynamics.TimeStep;
import oimo.m.IMat3;
import oimo.m.IQuat;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.MathUtil;
import oimo.common.Vec3;
import oimo.dynamics.*;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;

/**
 * A prismatic joint (a.k.a. slider joint) constrains two rigid bodies to
 * share their anchor points and constraint axes, and restricts relative
 * translation onto the constraint axis. This joint provides one degree of
 * freedom. You can enable lower and upper limits, a motor, a spring and
 * damper effect of the translational part of the constraint.
 */
@:build(oimo.m.B.bu())
class PrismaticJoint extends Joint {
	public var _sd:SpringDamper;
	public var _lm:TranslationalLimitMotor;

	public var _basis:BasisTracker;

	var translation:Float;
	var linearErrorY:Float;
	var linearErrorZ:Float;
	var angularError:IVec3;

	/**
	 * Creates a new prismatic joint by configuration `config`.
	 */
	public function new(config:PrismaticJointConfig) {
		super(config, JointType.PRISMATIC);

		M.vec3_fromVec3(_localBasisX1, config.localAxis1);
		M.vec3_fromVec3(_localBasisX2, config.localAxis2);

		buildLocalBasesFromX();

		_basis = new BasisTracker(this);

		translation = 0;
		linearErrorY = 0;
		linearErrorZ = 0;
		M.vec3_zero(angularError);

		_sd = config.springDamper.clone();
		_lm = config.limitMotor.clone();
	}

	// --- priate ---


	function getInfo(info:JointSolverInfo, timeStep:TimeStep, isPositionPart:Bool):Void {
		// compute ERP
		var erp:Float = getErp(timeStep, isPositionPart);

		// compute rhs
		var linRhsY:Float = linearErrorY * erp;
		var linRhsZ:Float = linearErrorZ * erp;
		var angRhsX:Float = M.vec3_get(angularError, 0) * erp;
		var angRhsY:Float = M.vec3_get(angularError, 1) * erp;
		var angRhsZ:Float = M.vec3_get(angularError, 2) * erp;

		var row:JointSolverInfoRow;
		var j:JacobianRow;
		var motorMass:Float = 1 / (_b1._invMass + _b2._invMass);

		// linear X
		if (_sd.frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[0]);
			setSolverInfoRowLinear(row, translation, _lm, motorMass, _sd, timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.lin1, _basis.x);
			M.vec3_assign(j.lin2, _basis.x);
			M.vec3_cross(j.ang1, _relativeAnchor1, _basis.x);
			M.vec3_cross(j.ang2, _relativeAnchor2, _basis.x);
		}

		// linear Y
		row = info.addRow(_impulses[1]);
		row.equalLimit(linRhsY, 0);

		j = row.jacobian;
		M.vec3_assign(j.lin1, _basis.y);
		M.vec3_assign(j.lin2, _basis.y);
		M.vec3_cross(j.ang1, _relativeAnchor1, _basis.y);
		M.vec3_cross(j.ang2, _relativeAnchor2, _basis.y);

		// linear Z
		row = info.addRow(_impulses[2]);
		row.equalLimit(linRhsZ, 0);

		j = row.jacobian;
		M.vec3_assign(j.lin1, _basis.z);
		M.vec3_assign(j.lin2, _basis.z);
		M.vec3_cross(j.ang1, _relativeAnchor1, _basis.z);
		M.vec3_cross(j.ang2, _relativeAnchor2, _basis.z);

		// angular X
		row = info.addRow(_impulses[3]);
		row.equalLimit(angRhsX, 0);

		j = row.jacobian;
		M.vec3_set(j.ang1, 1, 0, 0);
		M.vec3_set(j.ang2, 1, 0, 0);

		// angular Y
		row = info.addRow(_impulses[4]);
		row.equalLimit(angRhsY, 0);

		j = row.jacobian;
		M.vec3_set(j.ang1, 0, 1, 0);
		M.vec3_set(j.ang2, 0, 1, 0);

		// angular Z
		row = info.addRow(_impulses[5]);
		row.equalLimit(angRhsZ, 0);

		j = row.jacobian;
		M.vec3_set(j.ang1, 0, 0, 1);
		M.vec3_set(j.ang2, 0, 0, 1);
	}

	extern inline function computeErrors():Void {
		// compute angular error
		var rot1:IMat3;
		var rot2:IMat3;
		M.mat3_fromCols(rot1, _basisX1, _basisY1, _basisZ1);
		M.mat3_fromCols(rot2, _basisX2, _basisY2, _basisZ2);
		var relRot:IMat3;
		M.mat3_mulRhsTransposed(relRot, rot2, rot1);
		var relQ:IQuat;
		M.quat_fromMat3(relQ, relRot);

		var cosHalfTheta:Float = M.quat_getReal(relQ);
		var theta:Float = MathUtil.safeAcos(cosHalfTheta) * 2;
		// [rotation vector] = [rotation axis] * [rotation angle]
		M.vec3_fromQuat(angularError, relQ);
		M.vec3_normalize(angularError, angularError);
		M.vec3_scale(angularError, angularError, theta);

		// compute linear error
		var anchorDiff:IVec3;
		M.vec3_sub(anchorDiff, _anchor2, _anchor1);
		translation = M.vec3_dot(anchorDiff, _basis.x);
		linearErrorY = M.vec3_dot(anchorDiff, _basis.y);
		linearErrorZ = M.vec3_dot(anchorDiff, _basis.z);
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
	 * Returns the translational spring and damper settings.
	 */
	public inline function getSpringDamper():SpringDamper {
		return _sd;
	}

	/**
	 * Returns the translational limits and motor settings.
	 */
	public inline function getLimitMotor():TranslationalLimitMotor {
		return _lm;
	}

	/**
	 * Returns the translation of the joint.
	 */
	public inline function getTranslation():Float {
		return translation;
	}

}
