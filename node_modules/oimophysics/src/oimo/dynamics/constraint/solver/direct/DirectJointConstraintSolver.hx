package oimo.dynamics.constraint.solver.direct;
import haxe.ds.Vector;
import oimo.common.Setting;
import oimo.dynamics.TimeStep;
import oimo.dynamics.constraint.ConstraintSolver;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;
import oimo.dynamics.constraint.joint.Joint;
import oimo.dynamics.constraint.joint.JointImpulse;
import oimo.dynamics.constraint.solver.common.JointSolverMassDataRow;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * The direct solver of a mixed linear complementality problem (MLCP) for
 * joint constraints.
 */
@:build(oimo.m.B.bu())
class DirectJointConstraintSolver extends ConstraintSolver {
	var info:JointSolverInfo;
	var massData:Vector<JointSolverMassDataRow>;

	var relVels:Vector<Float>;
	var impulses:Vector<Float>;
	var dImpulses:Vector<Float>;
	var dTotalImpulses:Vector<Float>;

	var joint:Joint;

	var massMatrix:MassMatrix;

	var boundaryBuilder:BoundaryBuilder;

	var velBoundarySelector:BoundarySelector;
	var posBoundarySelector:BoundarySelector;

	@:dox(hide)
	public function new(joint:Joint) {
		super();
		this.joint = joint;
		info = new JointSolverInfo();

		var maxRows:Int = Setting.maxJacobianRows;

		massMatrix = new MassMatrix(maxRows);
		boundaryBuilder = new BoundaryBuilder(maxRows);
		massData = new Vector<JointSolverMassDataRow>(maxRows);
		for (i in 0...massData.length) {
			massData[i] = new JointSolverMassDataRow();
		}

		var numMaxBoundaries:Int = boundaryBuilder.boundaries.length;
		velBoundarySelector = new BoundarySelector(numMaxBoundaries);
		posBoundarySelector = new BoundarySelector(numMaxBoundaries);

		relVels = new Vector<Float>(maxRows);
		impulses = new Vector<Float>(maxRows);
		dImpulses = new Vector<Float>(maxRows);
		dTotalImpulses = new Vector<Float>(maxRows);

		for (i in 0...maxRows) {
			relVels[i] = 0;
			impulses[i] = 0;
			dImpulses[i] = 0;
			dTotalImpulses[i] = 0;
		}
	}

	extern inline function applyImpulses(impulses:Vector<Float>):Void {
		var linearSet:Bool = false;
		var angularSet:Bool = false;
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
			var j:JacobianRow = row.jacobian;
			var md:JointSolverMassDataRow = massData[i];
			var imp:Float = impulses[i];
			if (j.isLinearSet()) {
				M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, imp);
				M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -imp);
				linearSet = true;
			}
			if (j.isAngularSet()) {
				M.vec3_addRhsScaled(av1, av1, md.invMAng1, imp);
				M.vec3_addRhsScaled(av2, av2, md.invMAng2, -imp);
				angularSet = true;
			}
		}
		if (linearSet) {
			M.vec3_assign(_b1._vel, lv1);
			M.vec3_assign(_b2._vel, lv2);
		}
		if (angularSet) {
			M.vec3_assign(_b1._angVel, av1);
			M.vec3_assign(_b2._angVel, av2);
		}
	}

	extern inline function applySplitImpulses(impulses:Vector<Float>):Void {
		var linearSet:Bool = false;
		var angularSet:Bool = false;
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
			var j:JacobianRow = row.jacobian;
			var md:JointSolverMassDataRow = massData[i];
			var imp:Float = impulses[i];
			if (j.isLinearSet()) {
				M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, imp);
				M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -imp);
				linearSet = true;
			}
			if (j.isAngularSet()) {
				M.vec3_addRhsScaled(av1, av1, md.invMAng1, imp);
				M.vec3_addRhsScaled(av2, av2, md.invMAng2, -imp);
				angularSet = true;
			}
		}
		if (linearSet) {
			M.vec3_assign(_b1._pseudoVel, lv1);
			M.vec3_assign(_b2._pseudoVel, lv2);
		}
		if (angularSet) {
			M.vec3_assign(_b1._angPseudoVel, av1);
			M.vec3_assign(_b2._angPseudoVel, av2);
		}
	}

	extern inline function applyPositionImpulses(impulses:Vector<Float>):Void {
		var linearSet:Bool = false;
		var angularSet:Bool = false;
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
			var j:JacobianRow = row.jacobian;
			var md:JointSolverMassDataRow = massData[i];
			var imp:Float = impulses[i];
			if (j.isLinearSet()) {
				M.vec3_addRhsScaled(lv1, lv1, md.invMLin1, imp);
				M.vec3_addRhsScaled(lv2, lv2, md.invMLin2, -imp);
				linearSet = true;
			}
			if (j.isAngularSet()) {
				M.vec3_addRhsScaled(av1, av1, md.invMAng1, imp);
				M.vec3_addRhsScaled(av2, av2, md.invMAng2, -imp);
				angularSet = true;
			}
		}
		if (linearSet) {
			M.call(_b1._applyTranslation(lv1));
			M.call(_b2._applyTranslation(lv2));
		}
		if (angularSet) {
			M.call(_b1._applyRotation(av1));
			M.call(_b2._applyRotation(av2));
		}
	}

	override public function preSolveVelocity(timeStep:TimeStep):Void {
		joint._syncAnchors();
		joint._getVelocitySolverInfo(timeStep, info);

		_b1 = info.b1;
		_b2 = info.b2;

		// compute inverse mass matrix
		massMatrix.computeInvMass(info, massData);

		// build boundaries
		boundaryBuilder.buildBoundaries(info);

		// update the size of the boundary selector
		velBoundarySelector.setSize(boundaryBuilder.numBoundaries);
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

		for (i in 0...info.numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var imp:JointImpulse = row.impulse;

			// update limit impulse
			var impulse:Float = imp.impulse * factor;
			if (impulse < row.minImpulse) impulse = row.minImpulse;
			else if (impulse > row.maxImpulse) impulse = row.maxImpulse;
			imp.impulse = impulse;

			if (row.motorMaxImpulse > 0) {
				var impulseM:Float = imp.impulseM * factor;
				var max:Float = row.motorMaxImpulse;
				if (impulseM < -max) impulseM = -max;
				else if (impulseM > max) impulseM = max;
				imp.impulseM = impulseM;
			} else {
				imp.impulseM = 0;
			}

			dImpulses[i] = imp.impulse + imp.impulseM;
		}
		// apply initial impulse
		applyImpulses(dImpulses);
	}

	override public function solveVelocity():Void {
		var numRows:Int = info.numRows;
		var lv1:IVec3;
		var lv2:IVec3;
		var av1:IVec3;
		var av2:IVec3;
		M.vec3_assign(lv1, _b1._vel);
		M.vec3_assign(lv2, _b2._vel);
		M.vec3_assign(av1, _b1._angVel);
		M.vec3_assign(av2, _b2._angVel);

		for (i in 0...numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			// compute relative velocity
			var relVel:Float = 0;
			relVel += M.vec3_dot(lv1, j.lin1);
			relVel -= M.vec3_dot(lv2, j.lin2);
			relVel += M.vec3_dot(av1, j.ang1);
			relVel -= M.vec3_dot(av2, j.ang2);
			relVels[i] = relVel;

			// get impulse
			impulses[i] = imp.impulse;

			// clear total impulse
			dTotalImpulses[i] = 0;
		}

		// solve motors first
		var invMass:Vector<Vector<Float>> = massMatrix._invMassWithoutCfm;
		for (i in 0...numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var imp:JointImpulse = row.impulse;
			var md:JointSolverMassDataRow = massData[i];
			if (row.motorMaxImpulse > 0) {
				// relative velocity : body1 - body2
				// motor speed       : body2 - body1
				//  =>
				// target relative velocity : -[motor speed]
				var oldImpulseM:Float = imp.impulseM;
				var impulseM:Float = oldImpulseM + md.massWithoutCfm * (-row.motorSpeed - relVels[i]);

				// clamp motor impulse
				var maxImpulseM:Float = row.motorMaxImpulse;
				if (impulseM < -maxImpulseM) impulseM = -maxImpulseM;
				else if (impulseM > maxImpulseM) impulseM = maxImpulseM;
				imp.impulseM = impulseM;

				// compute delta motor impulse
				var dImpulseM:Float = impulseM - oldImpulseM;
				dTotalImpulses[i] = dImpulseM;

				// update relative velocity (apply the delta impulse virtually)
				for (j in 0...numRows) {
					relVels[j] += dImpulseM * invMass[i][j];
				}
			}
		}

		// try all the boundaries
		var solved:Bool = false;
		for (i in 0...boundaryBuilder.numBoundaries) {
			// select a boundary
			var idx:Int = velBoundarySelector.getIndex(i);
			var b:Boundary = boundaryBuilder.boundaries[idx];

			// try the case
			if (b.computeImpulses(info, massMatrix, relVels, impulses, dImpulses, 1, false)) {
				// the solution found
				for (j in 0...numRows) {
					var row:JointSolverInfoRow = info.rows[j];
					var imp:JointImpulse = row.impulse;
					var dimp:Float = dImpulses[j];

					// accumulate the delta impulses
					imp.impulse += dimp;
					dTotalImpulses[j] += dimp;
				}

				// apply motor + limit impulses
				applyImpulses(dTotalImpulses);

				// make the priority of the boundary higher for the next iteration
				velBoundarySelector.select(idx);
				solved = true;
				break;
			}
		}

		if (!solved) {
			trace("could not find solution. (velocity)");
			return;
		}
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

		// compute inverse mass matrix
		massMatrix.computeInvMass(info, massData);

		// build boundaries
		boundaryBuilder.buildBoundaries(info);

		// update the size of the boundary selector
		posBoundarySelector.setSize(boundaryBuilder.numBoundaries);
	}

	override public function preSolvePosition(timeStep:TimeStep):Void {
		updatePositionData();

		// clear position impulses
		for (i in 0...info.numRows) {
			info.rows[i].impulse.impulseP = 0;
		}
	}

	override public function solvePositionSplitImpulse():Void {
		var numRows:Int = info.numRows;
		var lv1:IVec3;
		var lv2:IVec3;
		var av1:IVec3;
		var av2:IVec3;
		M.vec3_assign(lv1, _b1._pseudoVel);
		M.vec3_assign(lv2, _b2._pseudoVel);
		M.vec3_assign(av1, _b1._angPseudoVel);
		M.vec3_assign(av2, _b2._angPseudoVel);

		for (i in 0...numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			// compute relative velocity
			var relVel:Float = 0;
			relVel += M.vec3_dot(lv1, j.lin1);
			relVel -= M.vec3_dot(lv2, j.lin2);
			relVel += M.vec3_dot(av1, j.ang1);
			relVel -= M.vec3_dot(av2, j.ang2);
			relVels[i] = relVel;

			//trace('pre relVels[$i] = ${relVels[i]}');

			// get impulse
			impulses[i] = imp.impulseP;
		}

		// try all the boundaries
		var solved:Bool = false;
		for (i in 0...boundaryBuilder.numBoundaries) {
			// select a boundary
			var idx:Int = posBoundarySelector.getIndex(i);
			var b:Boundary = boundaryBuilder.boundaries[idx];

			// try the case
			if (b.computeImpulses(info, massMatrix, relVels, impulses, dImpulses, Setting.positionSplitImpulseBaumgarte, false)) {
				// the solution found
				for (j in 0...numRows) {
					var row:JointSolverInfoRow = info.rows[j];
					var imp:JointImpulse = row.impulse;
					var dimp:Float = dImpulses[j];

					// accumulate the delta impulses
					imp.impulseP += dimp;
				}

				// apply delta impulses
				applySplitImpulses(dImpulses);

				// make the priority of the boundary higher for the next iteration
				posBoundarySelector.select(idx);
				solved = true;
				break;
			}
		}

		if (!solved) {
			trace("could not find solution. (split impulse)");
			return;
		}
	}

	override public function solvePositionNgs(timeStep:TimeStep):Void {
		updatePositionData();

		var numRows:Int = info.numRows;

		for (i in 0...numRows) {
			var row:JointSolverInfoRow = info.rows[i];
			var imp:JointImpulse = row.impulse;
			var j:JacobianRow = row.jacobian;

			// set relative velocity zero for NGS
			relVels[i] = 0;

			// get impulse
			impulses[i] = imp.impulseP;
		}

		// try all the boundaries
		var solved:Bool = false;
		for (i in 0...boundaryBuilder.numBoundaries) {
			// select a boundary
			var idx:Int = posBoundarySelector.getIndex(i);
			var b:Boundary = boundaryBuilder.boundaries[idx];

			// try the case
			if (b.computeImpulses(info, massMatrix, relVels, impulses, dImpulses, Setting.positionNgsBaumgarte, false)) {
				// the solution found
				for (j in 0...numRows) {
					var row:JointSolverInfoRow = info.rows[j];
					var imp:JointImpulse = row.impulse;
					var dimp:Float = dImpulses[j];

					// accumulate the delta impulses
					imp.impulseP += dimp;
				}

				// apply delta impulses
				applyPositionImpulses(dImpulses);

				// make the priority of the boundary higher for the next iteration
				posBoundarySelector.select(idx);
				solved = true;
				break;
			}
		}

		if (!solved) {
			trace("could not find solution. (NGS)");
			return;
		}
	}

	override public function postSolve():Void {
		joint._syncAnchors();
		joint._checkDestruction();
	}

}
