package oimo.dynamics.constraint.joint;
import oimo.dynamics.TimeStep;
import oimo.m.IMat3;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.dynamics.*;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;
import oimo.dynamics.constraint.joint.base.*;

/**
 * A spherical joint (a.k.a. ball and socket joint) constrains two rigid bodies to share
 * their anchor points. This joint provides three degrees of freedom. You can enable a
 * spring and damper effect of the constraint.
 */
@:build(oimo.m.B.bu())
class SphericalJoint extends Joint {
	public var _sd:SpringDamper;

	/**
	 * Creates a new spherical joint by configuration `config`.
	 */
	public function new(config:SphericalJointConfig) {
		super(config, JointType._SPHERICAL);

		_sd = config.springDamper.clone();
	}

	// --- private ---

	function getInfo(info:JointSolverInfo, timeStep:TimeStep, isPositionPart:Bool):Void {
		if (_sd.frequency > 0 && isPositionPart) return;

		// compute positional error
		var error:IVec3;
		M.vec3_sub(error, _anchor2, _anchor1);

		// compute CFM and ERP
		var cfm:Float;
		var erp:Float;
		if (_sd.frequency > 0) {
			JointMacro.computeSoftConstraintParameters(_sd.frequency, _sd.dampingRatio, timeStep.dt, _sd.useSymplecticEuler, cfm, erp);
			cfm *= _b1._invMass + _b2._invMass;
		} else {
			cfm = 0;
			erp = getErp(timeStep, isPositionPart);
		}

		// compute rhs
		var linearRhs:IVec3;
		M.vec3_scale(linearRhs, error, erp);
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

		// linear X
		row = info.addRow(_impulses[0]);
		row.equalLimit(linRhsX, cfm);

		j = row.jacobian;
		M.vec3_set(j.lin1, 1, 0, 0);
		M.vec3_set(j.lin2, 1, 0, 0);
		M.mat3_getRow(j.ang1, crossR1, 0);
		M.mat3_getRow(j.ang2, crossR2, 0);

		// linear Y
		row = info.addRow(_impulses[1]);
		row.equalLimit(linRhsY, cfm);

		j = row.jacobian;
		M.vec3_set(j.lin1, 0, 1, 0);
		M.vec3_set(j.lin2, 0, 1, 0);
		M.mat3_getRow(j.ang1, crossR1, 1);
		M.mat3_getRow(j.ang2, crossR2, 1);

		// linear Z
		row = info.addRow(_impulses[2]);
		row.equalLimit(linRhsZ, cfm);

		j = row.jacobian;
		M.vec3_set(j.lin1, 0, 0, 1);
		M.vec3_set(j.lin2, 0, 0, 1);
		M.mat3_getRow(j.ang1, crossR1, 2);
		M.mat3_getRow(j.ang2, crossR2, 2);
	}

	// --- internal ---

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
	 * Returns the spring and damper settings.
	 */
	public inline function getSpringDamper():SpringDamper {
		return _sd;
	}
}
