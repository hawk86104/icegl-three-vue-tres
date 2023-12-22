package oimo.dynamics.constraint.joint;
import haxe.ds.Vector;
import oimo.common.Mat3;
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
 * A generic joint (a.k.a. 6-DoF joint) constrains two rigid bodies in
 * highly flexible way, so that every translational and rotational axis
 * can be locked, unlocked, springy, or powered by a motor like other
 * joints. Note that rotation angles are measured as x-y-z Euler angles,
 * not as z-x-z Euler angles.
 */
@:build(oimo.m.B.bu())
class GenericJoint extends Joint {
	public var _translSds:Vector<SpringDamper>;
	public var _rotSds:Vector<SpringDamper>;
	public var _translLms:Vector<TranslationalLimitMotor>;
	public var _rotLms:Vector<RotationalLimitMotor>;

	public var _axisX:IVec3;
	public var _axisY:IVec3;
	public var _axisZ:IVec3;

	public var _angleX:Float;
	public var _angleY:Float;
	public var _angleZ:Float;

	var xSingular:Bool;
	var ySingular:Bool;
	var zSingular:Bool;

	var translationX:Float;
	var translationY:Float;
	var translationZ:Float;

	/**
	 * Creates a new generic joint by configuration `config`.
	 */
	public function new(config:GenericJointConfig) {
		super(config, JointType.GENERIC);

		if (config.localBasis1.determinant() < 0 || config.localBasis2.determinant() < 0) trace("[warning] joint basis must be right handed");
		var lb1:IMat3;
		var lb2:IMat3;
		M.mat3_fromMat3(lb1, config.localBasis1);
		M.mat3_fromMat3(lb2, config.localBasis2);
		M.mat3_getCol(_localBasisX1, lb1, 0);
		M.mat3_getCol(_localBasisY1, lb1, 1);
		M.mat3_getCol(_localBasisZ1, lb1, 2);
		M.mat3_getCol(_localBasisX2, lb2, 0);
		M.mat3_getCol(_localBasisY2, lb2, 1);
		M.mat3_getCol(_localBasisZ2, lb2, 2);

		_angleX = 0;
		_angleY = 0;
		_angleZ = 0;

		translationX = 0;
		translationY = 0;
		translationZ = 0;

		xSingular = false;
		ySingular = false;
		zSingular = false;

		_translLms = new Vector(3);
		_translSds = new Vector(3);
		_rotLms = new Vector(3);
		_rotSds = new Vector(3);
		_translLms[0] = config.translationalLimitMotors[0].clone();
		_translLms[1] = config.translationalLimitMotors[1].clone();
		_translLms[2] = config.translationalLimitMotors[2].clone();
		_translSds[0] = config.translationalSpringDampers[0].clone();
		_translSds[1] = config.translationalSpringDampers[1].clone();
		_translSds[2] = config.translationalSpringDampers[2].clone();
		_rotLms[0] = config.rotationalLimitMotors[0].clone();
		_rotLms[1] = config.rotationalLimitMotors[1].clone();
		_rotLms[2] = config.rotationalLimitMotors[2].clone();
		_rotSds[0] = config.rotationalSpringDampers[0].clone();
		_rotSds[1] = config.rotationalSpringDampers[1].clone();
		_rotSds[2] = config.rotationalSpringDampers[2].clone();
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
		var row:JointSolverInfoRow;
		var j:JacobianRow;
		var translMotorMass:Float = 1 / (_b1._invMass + _b2._invMass);
		var motorMassX:Float = M.call(computeEffectiveInertiaMoment(_axisX));
		var motorMassY:Float = M.call(computeEffectiveInertiaMoment(_axisY));
		var motorMassZ:Float = M.call(computeEffectiveInertiaMoment(_axisZ));

		// linear X
		if (_translSds[0].frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[0]);
			setSolverInfoRowLinear(row, translationX, _translLms[0], translMotorMass, _translSds[0], timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.lin1, _basisX1);
			M.vec3_assign(j.lin2, _basisX1);
			M.vec3_cross(j.ang1, _relativeAnchor1, _basisX1);
			M.vec3_cross(j.ang2, _relativeAnchor2, _basisX1);
		}

		// linear Y
		if (_translSds[1].frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[1]);
			setSolverInfoRowLinear(row, translationY, _translLms[1], translMotorMass, _translSds[1], timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.lin1, _basisY1);
			M.vec3_assign(j.lin2, _basisY1);
			M.vec3_cross(j.ang1, _relativeAnchor1, _basisY1);
			M.vec3_cross(j.ang2, _relativeAnchor2, _basisY1);
		}

		// linear Z
		if (_translSds[2].frequency <= 0 || !isPositionPart) {
			row = info.addRow(_impulses[2]);
			setSolverInfoRowLinear(row, translationZ, _translLms[2], translMotorMass, _translSds[2], timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.lin1, _basisZ1);
			M.vec3_assign(j.lin2, _basisZ1);
			M.vec3_cross(j.ang1, _relativeAnchor1, _basisZ1);
			M.vec3_cross(j.ang2, _relativeAnchor2, _basisZ1);
		}

		// angular X
		if (!xSingular && (_rotSds[0].frequency <= 0 || !isPositionPart)) {
			row = info.addRow(_impulses[3]);
			setSolverInfoRowAngular(row, _angleX, _rotLms[0], motorMassX, _rotSds[0], timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.ang1, _axisX);
			M.vec3_assign(j.ang2, _axisX);
		}

		// angular Y
		if (!ySingular && (_rotSds[1].frequency <= 0 || !isPositionPart)) {
			row = info.addRow(_impulses[4]);
			setSolverInfoRowAngular(row, _angleY, _rotLms[1], motorMassY, _rotSds[1], timeStep, isPositionPart);

			j = row.jacobian;
			M.vec3_assign(j.ang1, _axisY);
			M.vec3_assign(j.ang2, _axisY);
		}

		// angular Z
		if (!zSingular && (_rotSds[2].frequency <= 0 || !isPositionPart)) {
			row = info.addRow(_impulses[5]);
			setSolverInfoRowAngular(row, _angleZ, _rotLms[2], motorMassZ, _rotSds[2], timeStep, isPositionPart);

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

		// compute translations
		var anchorDiff:IVec3;
		M.vec3_sub(anchorDiff, _anchor2, _anchor1);
		translationX = M.vec3_dot(anchorDiff, _basisX1);
		translationY = M.vec3_dot(anchorDiff, _basisY1);
		translationZ = M.vec3_dot(anchorDiff, _basisZ1);
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
	 * Returns the first (x) rotation axis of the relative Euler angles.
	 */
	public inline function getAxisX():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _basisX1);
		return v;
	}

	/**
	 * Returns the second (y) rotation axis of the relative Euler angles.
	 */
	public inline function getAxisY():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _axisY);
		return v;
	}

	/**
	 * Returns the third (z) rotation axis of the relative Euler angles.
	 */
	public inline function getAxisZ():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _basisZ2);
		return v;
	}

	/**
	 * Returns the translational spring and damper settings along the first body's constraint basis.
	 */
	public inline function getTranslationalSpringDampers():Array<SpringDamper> {
		return _translSds.toArray();
	}

	/**
	 * Returns the rotational spring and damper settings along the rotation axes of the relative x-y-z Euler angles.
	 */
	public inline function getRotationalSpringDampers():Array<SpringDamper> {
		return _rotSds.toArray();
	}

	/**
	 * Returns the translational limits and motor settings along the first body's constraint basis.
	 */
	public inline function getTranslationalLimitMotors():Array<TranslationalLimitMotor> {
		return _translLms.toArray();
	}

	/**
	 * Returns the rotational limits and motor settings along the rotation axes of the relative x-y-z Euler angles.
	 */
	public inline function getRotationalLimitMotors():Array<RotationalLimitMotor> {
		return _rotLms.toArray();
	}

	/**
	 * Returns the relative x-y-z Euler angles.
	 */
	public inline function getAngles():Vec3 {
		return new Vec3(_angleX, _angleY, _angleZ);
	}

	/**
	 * Returns the translations along the first rigid body's constraint basis.
	 */
	public inline function getTranslations():Vec3 {
		return new Vec3(translationX, translationY, translationZ);
	}

}
