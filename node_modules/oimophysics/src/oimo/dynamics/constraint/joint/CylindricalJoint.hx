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
 * A cylindrical joint constrains two rigid bodies to share their constraint
 * axes, and restricts relative translation and rotation onto the constraint
 * axis. This joint provides two degrees of freedom. You can enable lower and
 * upper limits, motors, spring and damper effects of both translation and
 * rotation part of the constraint.
 */
@:build(oimo.m.B.bu())
class CylindricalJoint extends Joint {
	public var _translSd:SpringDamper;
	public var _translLm:TranslationalLimitMotor;
	public var _rotSd:SpringDamper;
	public var _rotLm:RotationalLimitMotor;

	public var _basis:BasisTracker;

	var angle:Float;
	var angularErrorY:Float;
	var angularErrorZ:Float;
	var translation:Float;
	var linearErrorY:Float;
	var linearErrorZ:Float;

	/**
	 * Creates a new cylindrical joint by configuration `config`.
	 */
	public function new(config:CylindricalJointConfig) {
		super(config, JointType._CYLINDRICAL);

		M.vec3_fromVec3(_localBasisX1, config.localAxis1);
		M.vec3_fromVec3(_localBasisX2, config.localAxis2);

		buildLocalBasesFromX();

		angle = 0;
		angularErrorY = 0;
		angularErrorZ = 0;
		translation = 0;
		linearErrorY = 0;
		linearErrorZ = 0;

		_basis = new BasisTracker(this);

		_translSd = config.translationalSpringDamper.clone();
		_translLm = config.translationalLimitMotor.clone();
		_rotSd = config.rotationalSpringDamper.clone();
		_rotLm = config.rotationalLimitMotor.clone();
	}

	// --- private ---

	function getInfo(info:JointSolverInfo, timeStep:TimeStep, isPositionPart:Bool):Void {
		// compute ERP
		var erp:Float = getErp(timeStep, isPositionPart);

		// compute rhs
		var linRhsY:Float = linearErrorY * erp;
		var linRhsZ:Float = linearErrorZ * erp;
		var angRhsY:Float = angularErrorY * erp;
		var angRhsZ:Float = angularErrorZ * erp;

		var row:JointSolverInfoRow;
		var j:JacobianRow;
		var translationalMotorMass:Float = 1 / (_b1._invMass + _b2._invMass);
		var rotationalMotorMass:Float = M.call(computeEffectiveInertiaMoment(_basis.x));

		// linear X
		if (_translSd.frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[0]);
			setSolverInfoRowLinear(row, translation, _translLm, translationalMotorMass, _translSd, timeStep, isPositionPart);

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
		if (_rotSd.frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[3]);
			setSolverInfoRowAngular(row, angle, _rotLm, rotationalMotorMass, _rotSd, timeStep, isPositionPart);

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
	public inline function getTranslationalSpringDamper():SpringDamper {
		return _translSd;
	}

	/**
	 * Returns the rotational spring and damper settings.
	 */
	public inline function getRotationalSpringDamper():SpringDamper {
		return _rotSd;
	}

	/**
	 * Returns the translational limits and motor settings.
	 */
	public inline function getTranslationalLimitMotor():TranslationalLimitMotor {
		return _translLm;
	}

	/**
	 * Returns the rotational limits and motor settings.
	 */
	public inline function getRotationalLimitMotor():RotationalLimitMotor {
		return _rotLm;
	}

	/**
	 * Returns the rotation angle in radians.
	 */
	public inline function getAngle():Float {
		return angle;
	}

	/**
	 * Returns the translation of the joint.
	 */
	public inline function getTranslation():Float {
		return translation;
	}

}
