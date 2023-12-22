package oimo.dynamics.constraint.solver.pgs;
import haxe.ds.Vector;
import oimo.common.Setting;
import oimo.dynamics.TimeStep;
import oimo.dynamics.constraint.*;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.joint.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.constraint.solver.common.JointSolverMassDataRow;
import oimo.m.IMat3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A joint constraint solver using projected Gauss-Seidel (sequential impulse).
 */
@:build(oimo.m.B.bu())
class PgsJointConstraintSolver extends ConstraintSolver {
	var joint:Joint;
	var info:JointSolverInfo;
	var massData:Vector<JointSolverMassDataRow>;

	@:dox(hide)
	public function new(joint:Joint) {
		super();
		this.joint = joint;

		info = new JointSolverInfo();

		massData = new Vector<JointSolverMassDataRow>(Setting.maxJacobianRows);
		for (i in 0...massData.length) {
			massData[i] = new JointSolverMassDataRow();
		}
	}

	override public function preSolveVelocity(timeStep:TimeStep):Void {
		joint._syncAnchors();
		joint._getVelocitySolverInfo(timeStep, info);

		_b1 = info.b1;
		_b2 = info.b2;

		var invM1:Float = _b1._invMass;
		var invM2:Float = _b2._invMass;

		var invI1:IMat3;
		var invI2:IMat3;
		M.mat3_assign(invI1, _b1._invInertia);
		M.mat3_assign(invI2, _b2._invInertia);

		// compute mass data
		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var md:JointSolverMassDataRow = massData[i];
			var j:JacobianRow = row.jacobian;

			j.updateSparsity();

			if (j.isLinearSet()) {
				M.vec3_scale(md.invMLin1, j.lin1, invM1);
				M.vec3_scale(md.invMLin2, j.lin2, invM2);
			} else {
				M.vec3_zero(md.invMLin1);
				M.vec3_zero(md.invMLin2);
			}

			if (j.isAngularSet()) {
				M.vec3_mulMat3(md.invMAng1, j.ang1, invI1);
				M.vec3_mulMat3(md.invMAng2, j.ang2, invI2);
			} else {
				M.vec3_zero(md.invMAng1);
				M.vec3_zero(md.invMAng2);
			}

			md.massWithoutCfm =
				M.vec3_dot(md.invMLin1, j.lin1) +
				M.vec3_dot(md.invMLin2, j.lin2) +
				M.vec3_dot(md.invMAng1, j.ang1) +
				M.vec3_dot(md.invMAng2, j.ang2)
			;
			md.mass = md.massWithoutCfm + row.cfm;

			if (md.massWithoutCfm != 0) md.massWithoutCfm = 1 / md.massWithoutCfm;
			if (md.mass != 0) md.mass = 1 / md.mass;
		}
	}

	override public function warmStart(timeStep:TimeStep):Void {

		var factor:Float = joint._getWarmStartingFactor();

		// adjust impulse for variable time step
		factor *= timeStep.dtRatio;

		// warm start disabled
		if (factor <= 0) {
			for (i in 0...info.numRows) {
				var row:JointSolverInfoRow = info.rows[i];
				row.impulse.clear();
			}
			return;
		}

		var lv1:IVec3;
		var lv2:IVec3;
		var av1:IVec3;
		var av2:IVec3;
		M.vec3_assign(lv1, _b1._vel);
		M.vec3_assign(lv2, _b2._vel);
		M.vec3_assign(av1, _b1._angVel);
		M.vec3_assign(av2, _b2._angVel);

		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var md:JointSolverMassDataRow = massData[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			imp.impulse *= factor;
			imp.impulseM *= factor;

			var impulse:Float = imp.impulse + imp.impulseM;

			// apply initial impulse
			M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, impulse);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -impulse);
			M.vec3_addRhsScaled(av1, av1, md.invMAng1, impulse);
			M.vec3_addRhsScaled(av2, av2, md.invMAng2, -impulse);
		}

		M.vec3_assign(_b1._vel, lv1);
		M.vec3_assign(_b2._vel, lv2);
		M.vec3_assign(_b1._angVel, av1);
		M.vec3_assign(_b2._angVel, av2);
	}

	override public function solveVelocity():Void {
		var lv1:IVec3;
		var lv2:IVec3;
		var av1:IVec3;
		var av2:IVec3;
		M.vec3_assign(lv1, _b1._vel);
		M.vec3_assign(lv2, _b2._vel);
		M.vec3_assign(av1, _b1._angVel);
		M.vec3_assign(av2, _b2._angVel);

		// solve motor
		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var md:JointSolverMassDataRow = massData[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			if (row.motorMaxImpulse == 0) continue;

			// measure relative velocity
			var rv:Float = 0;
			rv += M.vec3_dot(lv1, j.lin1);
			rv -= M.vec3_dot(lv2, j.lin2);
			rv += M.vec3_dot(av1, j.ang1);
			rv -= M.vec3_dot(av2, j.ang2);

			var impulseM:Float = (-row.motorSpeed - rv) * md.massWithoutCfm;

			// clamp impulse
			var oldImpulseM:Float = imp.impulseM;
			imp.impulseM += impulseM;
			if (imp.impulseM < -row.motorMaxImpulse) {
				imp.impulseM = -row.motorMaxImpulse;
			} else if (imp.impulseM > row.motorMaxImpulse) {
				imp.impulseM = row.motorMaxImpulse;
			}
			impulseM = imp.impulseM - oldImpulseM;

			// apply delta impulse
			if (j.isLinearSet()) {
				M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, impulseM);
				M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -impulseM);
			}
			if (j.isAngularSet()) {
				M.vec3_addRhsScaled(av1, av1, md.invMAng1, impulseM);
				M.vec3_addRhsScaled(av2, av2, md.invMAng2, -impulseM);
			}
		}

		// solve normal
		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var md:JointSolverMassDataRow = massData[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			// measure relative velocity
			var rv:Float = 0;
			rv += M.vec3_dot(lv1, j.lin1);
			rv -= M.vec3_dot(lv2, j.lin2);
			rv += M.vec3_dot(av1, j.ang1);
			rv -= M.vec3_dot(av2, j.ang2);

			var impulse:Float = (row.rhs - rv - imp.impulse * row.cfm) * md.mass;

			// clamp impulse
			var oldImpulse:Float = imp.impulse;
			imp.impulse += impulse;
			if (imp.impulse < row.minImpulse) {
				imp.impulse = row.minImpulse;
			} else if (imp.impulse > row.maxImpulse) {
				imp.impulse = row.maxImpulse;
			}
			impulse = imp.impulse - oldImpulse;

			// apply delta impulse
			if (j.isLinearSet()) {
				M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, impulse);
				M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -impulse);
			}
			if (j.isAngularSet()) {
				M.vec3_addRhsScaled(av1, av1, md.invMAng1, impulse);
				M.vec3_addRhsScaled(av2, av2, md.invMAng2, -impulse);
			}
		}

		M.vec3_assign(_b1._vel, lv1);
		M.vec3_assign(_b2._vel, lv2);
		M.vec3_assign(_b1._angVel, av1);
		M.vec3_assign(_b2._angVel, av2);
	}

	override public function postSolveVelocity(timeStep:TimeStep):Void {
		// compute total linear and angular impulse
		var lin:IVec3;
		var ang:IVec3;
		M.vec3_zero(lin);
		M.vec3_zero(ang);

		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;
			if (j.isLinearSet()) {
				// assume that this row is linear
				M.vec3_addRhsScaled(lin, lin, j.lin1, imp.impulse);
			} else if (j.isAngularSet()) {
				// assume that this row is angular
				M.vec3_addRhsScaled(ang, ang, j.ang1, imp.impulse);
			}
		}

		M.vec3_scale(joint._appliedForce, lin, timeStep.invDt);
		M.vec3_scale(joint._appliedTorque, ang, timeStep.invDt);
	}

	extern inline function updatePositionData():Void {
		joint._syncAnchors();
		joint._getPositionSolverInfo(info);

		_b1 = info.b1;
		_b2 = info.b2;

		var invM1:Float = _b1._invMass;
		var invM2:Float = _b2._invMass;

		var invI1:IMat3;
		var invI2:IMat3;
		M.mat3_assign(invI1, _b1._invInertia);
		M.mat3_assign(invI2, _b2._invInertia);

		// compute mass data
		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var md:JointSolverMassDataRow = massData[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			M.vec3_scale(md.invMLin1, j.lin1, invM1);
			M.vec3_scale(md.invMLin2, j.lin2, invM2);
			M.vec3_mulMat3(md.invMAng1, j.ang1, invI1);
			M.vec3_mulMat3(md.invMAng2, j.ang2, invI2);

			md.mass =
				M.vec3_dot(md.invMLin1, j.lin1) +
				M.vec3_dot(md.invMLin2, j.lin2) +
				M.vec3_dot(md.invMAng1, j.ang1) +
				M.vec3_dot(md.invMAng2, j.ang2)
			;

			if (md.mass != 0) md.mass = 1 / md.mass;
		}
	}

	override public function preSolvePosition(timeStep:TimeStep):Void {
		updatePositionData();

		// clear position impulses
		for (i in 0...info.numRows) {
			info.rows[i].impulse.impulseP = 0;
		}
	}

	override public function solvePositionSplitImpulse():Void {
		var lv1:IVec3;
		var lv2:IVec3;
		var av1:IVec3;
		var av2:IVec3;
		M.vec3_assign(lv1, _b1._pseudoVel);
		M.vec3_assign(lv2, _b2._pseudoVel);
		M.vec3_assign(av1, _b1._angPseudoVel);
		M.vec3_assign(av2, _b2._angPseudoVel);

		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var md:JointSolverMassDataRow = massData[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			// measure relative velocity
			var rv:Float = 0;
			rv += M.vec3_dot(lv1, j.lin1);
			rv -= M.vec3_dot(lv2, j.lin2);
			rv += M.vec3_dot(av1, j.ang1);
			rv -= M.vec3_dot(av2, j.ang2);

			var impulseP:Float = (row.rhs * Setting.positionSplitImpulseBaumgarte - rv) * md.mass;

			// clamp impulse
			var oldImpulseP:Float = imp.impulseP;
			imp.impulseP += impulseP;
			if (imp.impulseP < row.minImpulse) {
				imp.impulseP = row.minImpulse;
			} else if (imp.impulseP > row.maxImpulse) {
				imp.impulseP = row.maxImpulse;
			}

			impulseP = imp.impulseP - oldImpulseP;

			// apply delta impulse
			M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, impulseP);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -impulseP);
			M.vec3_addRhsScaled(av1, av1, md.invMAng1, impulseP);
			M.vec3_addRhsScaled(av2, av2, md.invMAng2, -impulseP);
		}

		M.vec3_assign(_b1._pseudoVel, lv1);
		M.vec3_assign(_b2._pseudoVel, lv2);
		M.vec3_assign(_b1._angPseudoVel, av1);
		M.vec3_assign(_b2._angPseudoVel, av2);
	}

	override public function solvePositionNgs(timeStep:TimeStep):Void {
		updatePositionData();

		var lv1:IVec3;
		var lv2:IVec3;
		var av1:IVec3;
		var av2:IVec3;
		M.vec3_zero(lv1);
		M.vec3_zero(lv2);
		M.vec3_zero(av1);
		M.vec3_zero(av2);

		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var md:JointSolverMassDataRow = massData[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			// measure relative velocity
			var rv:Float = 0;
			rv += M.vec3_dot(lv1, j.lin1);
			rv -= M.vec3_dot(lv2, j.lin2);
			rv += M.vec3_dot(av1, j.ang1);
			rv -= M.vec3_dot(av2, j.ang2);

			var impulseP:Float = (row.rhs * Setting.positionNgsBaumgarte - rv) * md.mass;

			// clamp impulse
			var oldImpulseP:Float = imp.impulseP;
			imp.impulseP += impulseP;
			if (imp.impulseP < row.minImpulse) {
				imp.impulseP = row.minImpulse;
			} else if (imp.impulseP > row.maxImpulse) {
				imp.impulseP = row.maxImpulse;
			}

			impulseP = imp.impulseP - oldImpulseP;

			// apply delta impulse
			M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, impulseP);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -impulseP);
			M.vec3_addRhsScaled(av1, av1, md.invMAng1, impulseP);
			M.vec3_addRhsScaled(av2, av2, md.invMAng2, -impulseP);
		}

		M.call(_b1._applyTranslation(lv1));
		M.call(_b2._applyTranslation(lv2));
		M.call(_b1._applyRotation(av1));
		M.call(_b2._applyRotation(av2));
	}

	override public function postSolve():Void {
		joint._syncAnchors();
		joint._checkDestruction();
	}

}
