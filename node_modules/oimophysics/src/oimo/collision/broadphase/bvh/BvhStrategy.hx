package oimo.collision.broadphase.bvh;
import haxe.ds.Vector;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.collision.broadphase.bvh.*;

/**
 * Internal class.
 *
 * BVH strategy for BVH tree
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class BvhStrategy {
	public var _insertionStrategy:Int;
	public var _balancingEnabled:Bool;

	public function new() {
		_insertionStrategy = BvhInsertionStrategy.SIMPLE;
		_balancingEnabled = false;
	}

	// --- internal ---

	/**
	 * Returns the next step of leaf insertion.
	 * `0` or `1` to descend to corresponding child of current node.
	 * `-1` to stop descending and make common parent with current node.
	 */
	public function _decideInsertion(currentNode:BvhNode, leaf:BvhNode):Int {
		switch(_insertionStrategy) {
		case BvhInsertionStrategy.SIMPLE:
			return decideInsertionSimple(currentNode, leaf);
		case BvhInsertionStrategy.MINIMIZE_SURFACE_AREA:
			return decideInsertionMinimumSurfaceArea(currentNode, leaf);
		default:
			trace("invalid BVH insertion strategy: " + _insertionStrategy);
			return -1;
		}
	}

	/**
	 * Sorts `leaves` and returns the split index `k` of the half-open interval [`from`, `until`).
	 * Leaves are separated into [`from`, `k`) and [`k`, `until`).
	 */
	public function _splitLeaves(leaves:Vector<BvhNode>, from:Int, until:Int):Int {
		return splitLeavesMean(leaves, from, until);
	}

	// --- private ---

	extern inline function decideInsertionSimple(currentNode:BvhNode, leaf:BvhNode):Int {
		var center:IVec3;
		M.vec3_add(center, leaf._aabbMin, leaf._aabbMax);

		var c1:BvhNode = currentNode._children[0];
		var c2:BvhNode = currentNode._children[1];
		var diff1:IVec3;
		var diff2:IVec3;
		M.vec3_add(diff1, c1._aabbMin, c1._aabbMax);
		M.vec3_add(diff2, c2._aabbMin, c2._aabbMax);
		M.vec3_sub(diff1, diff1, center);
		M.vec3_sub(diff2, diff2, center);
		var dist1:Float = M.vec3_dot(diff1, diff1);
		var dist2:Float = M.vec3_dot(diff2, diff2);

		return dist1 < dist2 ? 0 : 1;
	}

	extern inline function decideInsertionMinimumSurfaceArea(currentNode:BvhNode, leaf:BvhNode):Int {
		var c1:BvhNode = currentNode._children[0];
		var c2:BvhNode = currentNode._children[1];

		var oldArea:Float = M.aabb_surfaceArea(currentNode._aabbMin, currentNode._aabbMax);

		var combinedMin:IVec3;
		var combinedMax:IVec3;
		M.aabb_combine(combinedMin, combinedMax, currentNode._aabbMin, currentNode._aabbMax, leaf._aabbMin, leaf._aabbMax);

		var newArea:Float = M.aabb_surfaceArea(combinedMin, combinedMax);

		// cost of creating new pair with the node
		var creatingCost:Float = newArea * 2;
		var incrementalCost:Float = (newArea - oldArea) * 2;

		var descendingCost1:Float = incrementalCost;
		M.aabb_combine(combinedMin, combinedMax, c1._aabbMin, c1._aabbMax, leaf._aabbMin, leaf._aabbMax);
		if (c1._height == 0) {
			// leaf cost = area(combined aabb)
			descendingCost1 += M.aabb_surfaceArea(combinedMin, combinedMax);
		} else {
			// node cost = area(combined aabb) - area(old aabb)
			descendingCost1 += M.aabb_surfaceArea(combinedMin, combinedMax) - M.aabb_surfaceArea(c1._aabbMin, c1._aabbMax);
		}

		var descendingCost2:Float = incrementalCost;
		M.aabb_combine(combinedMin, combinedMax, c2._aabbMin, c2._aabbMax, leaf._aabbMin, leaf._aabbMax);
		if (c2._height == 0) {
			// leaf cost = area(combined aabb)
			descendingCost2 += M.aabb_surfaceArea(combinedMin, combinedMax);
		} else {
			// node cost = area(combined aabb) - area(old aabb)
			descendingCost2 += M.aabb_surfaceArea(combinedMin, combinedMax) - M.aabb_surfaceArea(c2._aabbMin, c2._aabbMax);
		}

		M.compare3min(creatingCost, descendingCost1, descendingCost2, {
			return -1;
		},{
			return 0;
		},{
			return 1;
		});
	}

	extern inline function splitLeavesMean(leaves:Vector<BvhNode>, from:Int, until:Int):Int {
		var invN:Float = 1.0 / (until - from);

		// mean := sum(min + max) / n
		var centerMean:IVec3;
		M.vec3_zero(centerMean);
		for (i in from...until) {
			var leaf:BvhNode = leaves[i];
			M.vec3_add(leaf._tmp, leaf._aabbMax, leaf._aabbMin);
			M.vec3_add(centerMean, centerMean, leaf._tmp);
		}
		M.vec3_scale(centerMean, centerMean, invN);

		var variance:IVec3;
		M.vec3_zero(variance);
		for (i in from...until) {
			var leaf:BvhNode = leaves[i];
			var diff:IVec3;
			M.vec3_sub(diff, leaf._tmp, centerMean);
			M.vec3_compWiseMul(diff, diff, diff);
			M.vec3_add(variance, variance, diff);
		}

		// sort and split
		var varX:Float = M.vec3_get(variance, 0);
		var varY:Float = M.vec3_get(variance, 1);
		var varZ:Float = M.vec3_get(variance, 2);
		var l:Int = from;
		var r:Int = until - 1;
		M.compare3max(varX, varY, varZ, {
			var mean:Float = M.vec3_get(centerMean, 0);
			while (true) {
				while (true) {
					var leaf:BvhNode = leaves[l];
					if (M.vec3_get(leaf._tmp, 0) <= mean) break;
					l++;
				}
				while (true) {
					var leaf:BvhNode = leaves[r];
					if (M.vec3_get(leaf._tmp, 0) >= mean) break;
					r--;
				}
				if (l >= r) break;
				var tmp:BvhNode = leaves[l];
				leaves[l] = leaves[r];
				leaves[r] = tmp;
				l++;
				r--;
			}
		}, {
			var mean:Float = M.vec3_get(centerMean, 1);
			while (true) {
				while (true) {
					var leaf:BvhNode = leaves[l];
					if (M.vec3_get(leaf._tmp, 1) <= mean) break;
					l++;
				}
				while (true) {
					var leaf:BvhNode = leaves[r];
					if (M.vec3_get(leaf._tmp, 1) >= mean) break;
					r--;
				}
				if (l >= r) break;
				var tmp:BvhNode = leaves[l];
				leaves[l] = leaves[r];
				leaves[r] = tmp;
				l++;
				r--;
			}
		}, {
			var mean:Float = M.vec3_get(centerMean, 2);
			while (true) {
				while (true) {
					var leaf:BvhNode = leaves[l];
					if (M.vec3_get(leaf._tmp, 2) <= mean) break;
					l++;
				}
				while (true) {
					var leaf:BvhNode = leaves[r];
					if (M.vec3_get(leaf._tmp, 2) >= mean) break;
					r--;
				}
				if (l >= r) break;
				var tmp:BvhNode = leaves[l];
				leaves[l] = leaves[r];
				leaves[r] = tmp;
				l++;
				r--;
			}
		});
		return l;
	}

}
