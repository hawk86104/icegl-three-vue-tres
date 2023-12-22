package oimo.dynamics.constraint.solver.pgs;
import haxe.ds.Vector;
import oimo.dynamics.constraint.contact.ContactConstraint;
import oimo.dynamics.constraint.contact.ContactImpulse;
import oimo.dynamics.constraint.info.contact.ContactSolverInfo;
import oimo.dynamics.constraint.info.contact.ContactSolverInfoRow;
import oimo.m.IMat3;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.MathUtil;
import oimo.common.Setting;
import oimo.dynamics.TimeStep;
import oimo.dynamics.constraint.ConstraintSolver;
import oimo.dynamics.constraint.contact.*;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.contact.*;
import oimo.dynamics.constraint.solver.common.ContactSolverMassDataRow;

/**
 * A contact constraint solver using projected Gauss-Seidel (sequential impulse).
 */
@:build(oimo.m.B.bu())
class PgsContactConstraintSolver extends ConstraintSolver {
	var constraint:ContactConstraint;

	var info:ContactSolverInfo;

	var massData:Vector<ContactSolverMassDataRow>;

	@:dox(hide)
	public function new(constraint:ContactConstraint) {
		super();
		this.constraint = constraint;

		info = new ContactSolverInfo();

		massData = new Vector<ContactSolverMassDataRow>(Setting.maxManifoldPoints);

		for (i in 0...massData.length) {
			massData[i] = new ContactSolverMassDataRow();
		}
	}

	override public function preSolveVelocity(timeStep:TimeStep):Void {
		constraint._getVelocitySolverInfo(timeStep, info);

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
			var row:ContactSolverInfoRow = info.rows[i];
			var md:ContactSolverMassDataRow = massData[i];
			var j:JacobianRow;

			// normal mass
			j = row.jacobianN;
			M.vec3_scale(md.invMLinN1, j.lin1, invM1);
			M.vec3_scale(md.invMLinN2, j.lin2, invM2);
			M.vec3_mulMat3(md.invMAngN1, j.ang1, invI1);
			M.vec3_mulMat3(md.invMAngN2, j.ang2, invI2);

			md.massN = invM1 + invM2 + M.vec3_dot(md.invMAngN1, j.ang1) + M.vec3_dot(md.invMAngN2, j.ang2);
			if (md.massN != 0) md.massN = 1 / md.massN;

			// tangent/binormal mass
			var jt:JacobianRow = row.jacobianT;
			var jb:JacobianRow = row.jacobianB;
			M.vec3_scale(md.invMLinT1, jt.lin1, invM1);
			M.vec3_scale(md.invMLinT2, jt.lin2, invM2);
			M.vec3_scale(md.invMLinB1, jb.lin1, invM1);
			M.vec3_scale(md.invMLinB2, jb.lin2, invM2);
			M.vec3_mulMat3(md.invMAngT1, jt.ang1, invI1);
			M.vec3_mulMat3(md.invMAngT2, jt.ang2, invI2);
			M.vec3_mulMat3(md.invMAngB1, jb.ang1, invI1);
			M.vec3_mulMat3(md.invMAngB2, jb.ang2, invI2);

			// compute effective mass matrix for friction
			var invMassTB00:Float = invM1 + invM2 + M.vec3_dot(md.invMAngT1, jt.ang1) + M.vec3_dot(md.invMAngT2, jt.ang2);
			var invMassTB01:Float =                 M.vec3_dot(md.invMAngT1, jb.ang1) + M.vec3_dot(md.invMAngT2, jb.ang2);
			var invMassTB10:Float = invMassTB01;
			var invMassTB11:Float = invM1 + invM2 + M.vec3_dot(md.invMAngB1, jb.ang1) + M.vec3_dot(md.invMAngB2, jb.ang2);

			var invDet:Float = invMassTB00 * invMassTB11 - invMassTB01 * invMassTB10;
			if (invDet != 0) invDet = 1 / invDet;

			md.massTB00 = invMassTB11 * invDet;
			md.massTB01 = -invMassTB01 * invDet;
			md.massTB10 = -invMassTB10 * invDet;
			md.massTB11 = invMassTB00 * invDet;
		}
	}

	override public function warmStart(timeStep:TimeStep):Void {
		var lv1:IVec3;
		var lv2:IVec3;
		var av1:IVec3;
		var av2:IVec3;
		M.vec3_assign(lv1, _b1._vel);
		M.vec3_assign(lv2, _b2._vel);
		M.vec3_assign(av1, _b1._angVel);
		M.vec3_assign(av2, _b2._angVel);

		for (i in 0...info.numRows) {
			var row:ContactSolverInfoRow = info.rows[i];
			var imp:ContactImpulse = row.impulse;
			var md:ContactSolverMassDataRow = massData[i];
			var jt:JacobianRow = row.jacobianT;
			var jb:JacobianRow = row.jacobianB;

			var impulseN:Float = imp.impulseN;
			var impulseT:Float = M.vec3_dot(imp.impulseL, jt.lin1);
			var impulseB:Float = M.vec3_dot(imp.impulseL, jb.lin1);
			imp.impulseT = impulseT;
			imp.impulseB = impulseB;

			// adjust impulse for variable time step
			imp.impulseN *= timeStep.dtRatio;
			imp.impulseT *= timeStep.dtRatio;
			imp.impulseB *= timeStep.dtRatio;

			M.vec3_addRhsScaled(lv1, lv1, md.invMLinN1, impulseN);
			M.vec3_addRhsScaled(lv1, lv1, md.invMLinT1, impulseT);
			M.vec3_addRhsScaled(lv1, lv1, md.invMLinB1, impulseB);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinN2, -impulseN);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinT2, -impulseT);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinB2, -impulseB);
			M.vec3_addRhsScaled(av1, av1, md.invMAngN1, impulseN);
			M.vec3_addRhsScaled(av1, av1, md.invMAngT1, impulseT);
			M.vec3_addRhsScaled(av1, av1, md.invMAngB1, impulseB);
			M.vec3_addRhsScaled(av2, av2, md.invMAngN2, -impulseN);
			M.vec3_addRhsScaled(av2, av2, md.invMAngT2, -impulseT);
			M.vec3_addRhsScaled(av2, av2, md.invMAngB2, -impulseB);
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

		// solve friction
		for (i in 0...info.numRows) {
			var row:ContactSolverInfoRow = info.rows[i];
			var md:ContactSolverMassDataRow = massData[i];
			var imp:ContactImpulse = row.impulse;
			var j:JacobianRow;

			// measure relative velocity
			var rvt:Float = 0;
			j = row.jacobianT;
			rvt += M.vec3_dot(lv1, j.lin1);
			rvt -= M.vec3_dot(lv2, j.lin2);
			rvt += M.vec3_dot(av1, j.ang1);
			rvt -= M.vec3_dot(av2, j.ang2);

			var rvb:Float = 0;
			j = row.jacobianB;
			rvb += M.vec3_dot(lv1, j.lin1);
			rvb -= M.vec3_dot(lv2, j.lin2);
			rvb += M.vec3_dot(av1, j.ang1);
			rvb -= M.vec3_dot(av2, j.ang2);

			var impulseT:Float = -(rvt * md.massTB00 + rvb * md.massTB01);
			var impulseB:Float = -(rvt * md.massTB10 + rvb * md.massTB11);

			var oldImpulseT:Float = imp.impulseT;
			var oldImpulseB:Float = imp.impulseB;
			imp.impulseT += impulseT;
			imp.impulseB += impulseB;

			// cone friction
			var maxImpulse:Float = row.friction * imp.impulseN;
			if (maxImpulse == 0) {
				imp.impulseT = 0;
				imp.impulseB = 0;
			} else {
				var impulseLengthSq:Float = imp.impulseT * imp.impulseT + imp.impulseB * imp.impulseB;
				if (impulseLengthSq > maxImpulse * maxImpulse) {
					var invL:Float = maxImpulse / MathUtil.sqrt(impulseLengthSq);
					imp.impulseT *= invL;
					imp.impulseB *= invL;
				}
			}

			impulseT = imp.impulseT - oldImpulseT;
			impulseB = imp.impulseB - oldImpulseB;

			// apply delta impulse
			M.vec3_addRhsScaled(lv1, lv1, md.invMLinT1, impulseT);
			M.vec3_addRhsScaled(lv1, lv1, md.invMLinB1, impulseB);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinT2, -impulseT);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinB2, -impulseB);
			M.vec3_addRhsScaled(av1, av1, md.invMAngT1, impulseT);
			M.vec3_addRhsScaled(av1, av1, md.invMAngB1, impulseB);
			M.vec3_addRhsScaled(av2, av2, md.invMAngT2, -impulseT);
			M.vec3_addRhsScaled(av2, av2, md.invMAngB2, -impulseB);
		}

		// solve normal
		for (i in 0...info.numRows) {
			var row:ContactSolverInfoRow = info.rows[i];
			var md:ContactSolverMassDataRow = massData[i];
			var imp:ContactImpulse = row.impulse;
			var j:JacobianRow;

			// measure relative velocity
			var rvn:Float = 0;
			j = row.jacobianN;
			rvn += M.vec3_dot(lv1, j.lin1);
			rvn -= M.vec3_dot(lv2, j.lin2);
			rvn += M.vec3_dot(av1, j.ang1);
			rvn -= M.vec3_dot(av2, j.ang2);

			var impulseN:Float = (row.rhs - rvn) * md.massN;

			// clamp impulse
			var oldImpulseN:Float = imp.impulseN;
			imp.impulseN += impulseN;
			if (imp.impulseN < 0) imp.impulseN = 0;
			impulseN = imp.impulseN - oldImpulseN;

			// apply delta impulse
			M.vec3_addRhsScaled(lv1, lv1, md.invMLinN1, impulseN);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinN2, -impulseN);
			M.vec3_addRhsScaled(av1, av1, md.invMAngN1, impulseN);
			M.vec3_addRhsScaled(av2, av2, md.invMAngN2, -impulseN);
		}

		M.vec3_assign(_b1._vel, lv1);
		M.vec3_assign(_b2._vel, lv2);
		M.vec3_assign(_b1._angVel, av1);
		M.vec3_assign(_b2._angVel, av2);
	}

	extern inline function updatePositionData():Void {
		constraint._syncManifold();
		constraint._getPositionSolverInfo(info);

		var invM1:Float = _b1._invMass;
		var invM2:Float = _b2._invMass;

		var invI1:IMat3;
		var invI2:IMat3;
		M.mat3_assign(invI1, _b1._invInertia);
		M.mat3_assign(invI2, _b2._invInertia);

		// compute mass data
		for (i in 0...info.numRows) {
			var row:ContactSolverInfoRow = info.rows[i];
			var md:ContactSolverMassDataRow = massData[i];
			var j:JacobianRow = row.jacobianN;

			M.vec3_scale(md.invMLinN1, j.lin1, invM1);
			M.vec3_scale(md.invMLinN2, j.lin2, invM2);
			M.vec3_mulMat3(md.invMAngN1, j.ang1, invI1);
			M.vec3_mulMat3(md.invMAngN2, j.ang2, invI2);

			md.massN = invM1 + invM2 + M.vec3_dot(md.invMAngN1, j.ang1) + M.vec3_dot(md.invMAngN2, j.ang2);
			if (md.massN != 0) md.massN = 1 / md.massN;
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

		// solve normal
		for (i in 0...info.numRows) {
			var row:ContactSolverInfoRow = info.rows[i];
			var md:ContactSolverMassDataRow = massData[i];
			var imp:ContactImpulse = row.impulse;
			var j:JacobianRow = row.jacobianN;

			// measure relative velocity
			var rvn:Float = 0;
			rvn += M.vec3_dot(lv1, j.lin1);
			rvn -= M.vec3_dot(lv2, j.lin2);
			rvn += M.vec3_dot(av1, j.ang1);
			rvn -= M.vec3_dot(av2, j.ang2);

			var impulseP:Float = (row.rhs - rvn) * md.massN * Setting.positionSplitImpulseBaumgarte;

			// clamp impulse
			var oldImpulseP:Float = imp.impulseP;
			imp.impulseP += impulseP;
			if (imp.impulseP < 0) imp.impulseP = 0;
			impulseP = imp.impulseP - oldImpulseP;

			// apply delta impulse
			M.vec3_addRhsScaled(lv1, lv1, md.invMLinN1, impulseP);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinN2, -impulseP);
			M.vec3_addRhsScaled(av1, av1, md.invMAngN1, impulseP);
			M.vec3_addRhsScaled(av2, av2, md.invMAngN2, -impulseP);
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
			var row:ContactSolverInfoRow = info.rows[i];
			var md:ContactSolverMassDataRow = massData[i];
			var imp:ContactImpulse = row.impulse;
			var j:JacobianRow = row.jacobianN;

			// estimate translation along the normal
			var rvn:Float = 0;
			rvn += M.vec3_dot(lv1, j.lin1);
			rvn -= M.vec3_dot(lv2, j.lin2);
			rvn += M.vec3_dot(av1, j.ang1);
			rvn -= M.vec3_dot(av2, j.ang2);

			var impulseP:Float = (row.rhs - rvn) * md.massN * Setting.positionNgsBaumgarte;

			// clamp impulse
			var oldImpulseP:Float = imp.impulseP;
			imp.impulseP += impulseP;
			if (imp.impulseP < 0) imp.impulseP = 0;
			impulseP = imp.impulseP - oldImpulseP;

			// apply delta impulse
			M.vec3_addRhsScaled(lv1, lv1, md.invMLinN1, impulseP);
			M.vec3_addRhsScaled(lv2, lv2, md.invMLinN2, -impulseP);
			M.vec3_addRhsScaled(av1, av1, md.invMAngN1, impulseP);
			M.vec3_addRhsScaled(av2, av2, md.invMAngN2, -impulseP);
		}

		M.call(_b1._applyTranslation(lv1));
		M.call(_b2._applyTranslation(lv2));
		M.call(_b1._applyRotation(av1));
		M.call(_b2._applyRotation(av2));
	}

	override public function postSolve():Void {
		// contact impulses
		var lin1:IVec3;
		// lin2 == lin1
		var ang1:IVec3;
		var ang2:IVec3;
		M.vec3_zero(lin1);
		M.vec3_zero(ang1);
		M.vec3_zero(ang2);

		for (i in 0...info.numRows) {
			var row:ContactSolverInfoRow = info.rows[i];
			var imp:ContactImpulse = row.impulse;
			var jn:JacobianRow = row.jacobianN;
			var jt:JacobianRow = row.jacobianT;
			var jb:JacobianRow = row.jacobianB;
			var impN:Float = imp.impulseN;
			var impT:Float = imp.impulseT;
			var impB:Float = imp.impulseB;
			var impulseL:IVec3;

			// store lateral impulse
			M.vec3_zero(impulseL);
			M.vec3_addRhsScaled(impulseL, impulseL, jt.lin1, impT);
			M.vec3_addRhsScaled(impulseL, impulseL, jb.lin1, impB);
			M.vec3_assign(imp.impulseL, impulseL);

			// accumulate contact impulses
			M.vec3_addRhsScaled(lin1, lin1, jn.lin1, impN);
			M.vec3_addRhsScaled(ang1, ang1, jn.ang1, impN);
			M.vec3_addRhsScaled(ang2, ang2, jn.ang2, impN);
			M.vec3_addRhsScaled(lin1, lin1, jt.lin1, impT);
			M.vec3_addRhsScaled(ang1, ang1, jt.ang1, impT);
			M.vec3_addRhsScaled(ang2, ang2, jt.ang2, impT);
			M.vec3_addRhsScaled(lin1, lin1, jb.lin1, impB);
			M.vec3_addRhsScaled(ang1, ang1, jb.ang1, impB);
			M.vec3_addRhsScaled(ang2, ang2, jb.ang2, impB);
		}

		M.vec3_add(_b1._linearContactImpulse, _b1._linearContactImpulse, lin1);
		M.vec3_add(_b1._angularContactImpulse, _b1._angularContactImpulse, ang1);
		M.vec3_sub(_b2._linearContactImpulse, _b2._linearContactImpulse, lin1);
		M.vec3_sub(_b2._angularContactImpulse, _b2._angularContactImpulse, ang2);

		constraint._syncManifold();
	}

}
