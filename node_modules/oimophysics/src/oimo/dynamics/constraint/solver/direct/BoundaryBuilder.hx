package oimo.dynamics.constraint.solver.direct;
import haxe.ds.Vector;
import oimo.common.MathUtil;
import oimo.dynamics.constraint.info.joint.JointSolverInfo;
import oimo.dynamics.constraint.info.joint.JointSolverInfoRow;

/**
 * Internal class.
 */
@:dox(hide)
class BoundaryBuilder {
	public var numBoundaries:Int;
	public var boundaries:Vector<Boundary>;

	var maxRows:Int;
	var bbInfo:BoundaryBuildInfo;

	public function new(maxRows:Int) {
		// TODO: O(2^N) is inefficient?
		this.maxRows = maxRows;
		numBoundaries = 0;
		boundaries = new Vector<Boundary>(1 << maxRows);

		bbInfo = new BoundaryBuildInfo(maxRows);
	}

	function buildBoundariesRecursive(info:JointSolverInfo, i:Int):Void {
		if (i == info.numRows) {
			addBoundary().init(bbInfo);
			return;
		}

		var row:JointSolverInfoRow = info.rows[i];
		var lowerLimitEnabled:Bool = row.minImpulse > MathUtil.NEGATIVE_INFINITY;
		var upperLimitEnabled:Bool = row.maxImpulse < MathUtil.POSITIVE_INFINITY;

		var disabled:Bool = row.minImpulse == 0 && row.maxImpulse == 0;

		if (disabled) {
			// try inactive case
			bbInfo.pushBounded(i, 0);
			buildBoundariesRecursive(info, i + 1);
			bbInfo.popBounded();
			return;
		}

		// try unbounded case
		bbInfo.pushUnbounded(i);
		buildBoundariesRecursive(info, i + 1);
		bbInfo.popUnbounded();

		if (lowerLimitEnabled) {
			// try lower bounded case
			bbInfo.pushBounded(i, -1);
			buildBoundariesRecursive(info, i + 1);
			bbInfo.popBounded();
		}
		if (upperLimitEnabled) {
			// try upper bounded case
			bbInfo.pushBounded(i, 1);
			buildBoundariesRecursive(info, i + 1);
			bbInfo.popBounded();
		}
	}

	extern inline function addBoundary():Boundary {
		if (boundaries[numBoundaries] == null) {
			boundaries[numBoundaries] = new Boundary(maxRows);
		}
		return boundaries[numBoundaries++];
	}

	public inline function buildBoundaries(info:JointSolverInfo):Void {
		numBoundaries = 0;

		bbInfo.clear();
		buildBoundariesRecursive(info, 0);
	}

}
