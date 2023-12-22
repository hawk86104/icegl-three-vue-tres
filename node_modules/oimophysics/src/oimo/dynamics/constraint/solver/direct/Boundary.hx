package oimo.dynamics.constraint.solver.direct;
import haxe.ds.Vector;
import oimo.common.Setting;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;

/**
 * Internal class
 */
@:dox(hide)
class Boundary {
	// number of impulses which are at lower or upper limits
	public var numBounded:Int;
	// indices of impulses which are at lower or upper limits
	public var iBounded:Vector<Int>;
	// -1: at lower, 1: at upper
	public var signs:Vector<Int>;

	// number of impulses which are not at limits
	public var numUnbounded:Int;
	// indices of impulses which are not at lower or upper limits
	public var iUnbounded:Vector<Int>;

	// used for impulse computation:
	//     impulse = massMatrix * b
	var b:Vector<Float>;

	// the id of mass matrix
	var matrixId:Int;

	public function new(maxRows:Int):Void {
		iBounded = new Vector<Int>(maxRows);
		iUnbounded = new Vector<Int>(maxRows);
		signs = new Vector<Int>(maxRows);
		b = new Vector<Float>(maxRows);
		numBounded = 0;
		numUnbounded = 0;
		matrixId = 0;
	}

	public function init(buildInfo:BoundaryBuildInfo):Void {
		// copy bounded part
		numBounded = buildInfo.numBounded;
		for (i in 0...numBounded) {
			iBounded[i] = buildInfo.iBounded[i];
			signs[i] = buildInfo.signs[i];
		}

		// copy unbounded part and compute matrix id
		numUnbounded = buildInfo.numUnbounded;
		matrixId = 0;
		for (i in 0...numUnbounded) {
			var idx:Int = buildInfo.iUnbounded[i];
			iUnbounded[i] = idx;
			matrixId |= 1 << idx;
		}
	}

	public function computeImpulses(info:JointSolverInfo, mass:MassMatrix, relVels:Vector<Float>, impulses:Vector<Float>, dImpulses:Vector<Float>, impulseFactor:Float, noCheck:Bool):Bool {
		// b = rhs - relV - cfm * totalImpulse
		for (i in 0...numUnbounded) {
			var idx:Int = iUnbounded[i];
			var row:JointSolverInfoRow = info.rows[idx];
			var relVel:Float = relVels[idx];
			b[idx] = row.rhs * impulseFactor - relVel - row.cfm * impulses[idx];
		}

		// bounded part
		var invMassWithoutCfm:Vector<Vector<Float>> = mass._invMassWithoutCfm;
		for (i in 0...numBounded) {
			var idx:Int = iBounded[i];
			var sign:Int = signs[i];
			var row:JointSolverInfoRow = info.rows[idx];
			var oldImpulse:Float = impulses[idx];
			var impulse:Float = sign < 0 ? row.minImpulse : sign > 0 ? row.maxImpulse : 0;
			var dImpulse:Float = impulse - oldImpulse;
			dImpulses[idx] = dImpulse;

			// update relative velocity for unbounded part
			if (dImpulse != 0) {
				for (j in 0...numUnbounded) {
					var idx2:Int = iUnbounded[j];

					// delta of idx2'th relative velocity
					var dRelVel:Float = invMassWithoutCfm[idx][idx2] * dImpulse;

					b[idx2] -= dRelVel;
				}
			}
		}

		var massMatrix:Vector<Vector<Float>> = mass.getSubmatrix(iUnbounded, numUnbounded);
		var ok:Bool = true;

		// unbounded part
		for (i in 0...numUnbounded) {
			var idx:Int = iUnbounded[i];
			var row:JointSolverInfoRow = info.rows[idx];
			var oldImpulse:Float = impulses[idx];

			var impulse:Float = oldImpulse;

			// compute unbounded impulse (massMatrix * b)
			for (j in 0...numUnbounded) {
				var idx2:Int = iUnbounded[j];
				impulse += b[idx2] * massMatrix[i][j];
			}

			if (impulse < row.minImpulse - Setting.directMlcpSolverEps || impulse > row.maxImpulse + Setting.directMlcpSolverEps) {
				// we assumed that `impulse` holds `minImpulse <= impulse <= maxImpulse`, but actually
				// not. This boundary for the MLCP is not the answer of it.
				ok = false;
				break;
			}

			dImpulses[idx] = impulse - oldImpulse;
		}

		if (noCheck) return true;

		if (!ok) return false;

		// check if the impulses fulfill complementarity constraints
		for (i in 0...numBounded) {
			var idx:Int = iBounded[i];
			var row:JointSolverInfoRow = info.rows[idx];
			var sign:Int = signs[i];
			var error:Float = 0;

			var newImpulse:Float = impulses[idx] + dImpulses[idx];
			var relVel:Float = relVels[idx];

			// `relVel` is the relative velocity BEFORE we apply the delta impulses,
			// so we should update `relVel` so that it shows the relative velocity
			// AFTER we applied the delta impulse.
			for (j in 0...info.numRows) {
				relVel += invMassWithoutCfm[idx][j] * dImpulses[j];
			}

			error = row.rhs * impulseFactor - relVel - row.cfm * newImpulse;
			// complementarity constraint: check if we added too large impulses
			//     sign < 0 => error <= 0
			//     sign > 0 => error >= 0
			if (sign < 0 && error > Setting.directMlcpSolverEps || sign > 0 && error < -Setting.directMlcpSolverEps) {
				ok = false; // the result is not feasible
				break;
			}
		}

		return ok;
	}

	/*
	public function dump():Void {
		trace("\nboundary info --------------------------------------");
		trace("bounded indices:");
		for (i in 0...numBounded) {
			var idx:Int = iBounded[i];
			trace("  " + idx + ", sign: " + signs[i]);
		}
		trace("unbounded indices:");
		for (i in 0...numUnbounded) {
			var idx:Int = iUnbounded[i];
			trace("  " + idx);
		}
		trace("mass matrix index: " + matrixId);
		trace("boundary info end ----------------------------------\n");
	}
	*/

}
