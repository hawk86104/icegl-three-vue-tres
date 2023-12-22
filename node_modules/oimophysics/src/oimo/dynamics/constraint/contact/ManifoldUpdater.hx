package oimo.dynamics.constraint.contact;
import haxe.ds.Vector;
import oimo.collision.narrowphase.*;
import oimo.common.Setting;
import oimo.common.Transform;
import oimo.dynamics.rigidbody.*;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Internal class
 */
@:dox(hide)
@:build(oimo.m.B.bu())
class ManifoldUpdater {
	var _manifold:Manifold;

	var numOldPoints:Int;
	var oldPoints:Vector<ManifoldPoint>;

	public function new(manifold:Manifold) {
		_manifold = manifold;

		numOldPoints = 0;
		oldPoints = new Vector<ManifoldPoint>(Setting.maxManifoldPoints);
		for (i in 0...Setting.maxManifoldPoints) {
			oldPoints[i] = new ManifoldPoint();
		}
	}

	// --- private ---

	function removeOutdatedPoints():Void {
		var num:Int = _manifold._numPoints;
		var index:Int = num;
		while (--index >= 0) {
			var p:ManifoldPoint = _manifold._points[index];

			var diff:IVec3;
			M.vec3_sub(diff, p._pos1, p._pos2);
			var dotN:Float = M.vec3_dot(_manifold._normal, diff);

			if (dotN > Setting.contactPersistenceThreshold) {
				removeManifoldPoint(index);
				continue;
			}

			// compute projection of diff
			M.vec3_addRhsScaled(diff, diff, _manifold._normal, -dotN);
			if (M.vec3_dot(diff, diff) > Setting.contactPersistenceThreshold * Setting.contactPersistenceThreshold) {
				// the amount of horizontal sliding exceeds threshold
				removeManifoldPoint(index);
				continue;
			}
		}
	}

	function removeManifoldPoint(index:Int):Void {
		var lastIndex:Int = --_manifold._numPoints;
		if (index != lastIndex) {
			var tmp:ManifoldPoint = _manifold._points[index];
			_manifold._points[index] = _manifold._points[lastIndex];
			_manifold._points[lastIndex] = tmp;
		}
		_manifold._points[lastIndex]._clear();
	}

	function addManifoldPoint(point:DetectorResultPoint, tf1:Transform, tf2:Transform):Void {
		// check if the number of points will exceed the limit
		var num:Int = _manifold._numPoints;
		if (num == Setting.maxManifoldPoints) {
			var targetIndex:Int = computeTargetIndex(point, tf1, tf2);
			_manifold._points[targetIndex]._initialize(point, tf1, tf2);
			return;
		}

		// just add the point
		_manifold._points[num]._initialize(point, tf1, tf2);
		_manifold._numPoints++;
	}

	function computeTargetIndex(newPoint:DetectorResultPoint, tf1:Transform, tf2:Transform):Int {
		var p1:ManifoldPoint = _manifold._points[0];
		var p2:ManifoldPoint = _manifold._points[1];
		var p3:ManifoldPoint = _manifold._points[2];
		var p4:ManifoldPoint = _manifold._points[3];
		var maxDepth:Float = p1._depth;
		var maxDepthIndex:Int = 0;
		if (p2._depth > maxDepth) {
			maxDepth = p2._depth;
			maxDepthIndex = 1;
		}
		if (p3._depth > maxDepth) {
			maxDepth = p3._depth;
			maxDepthIndex = 2;
		}
		if (p4._depth > maxDepth) {
			maxDepth = p4._depth;
			maxDepthIndex = 3;
		}

		var rp1:IVec3;
		M.vec3_fromVec3(rp1, newPoint.position1);
		M.vec3_sub(rp1, rp1, tf1._position);

		var a1:Float = M.call(quadAreaFast(p2._relPos1, p3._relPos1, p4._relPos1, rp1));
		var a2:Float = M.call(quadAreaFast(p1._relPos1, p3._relPos1, p4._relPos1, rp1));
		var a3:Float = M.call(quadAreaFast(p1._relPos1, p2._relPos1, p4._relPos1, rp1));
		var a4:Float = M.call(quadAreaFast(p1._relPos1, p2._relPos1, p3._relPos1, rp1));
		var max:Float = a1;
		var target:Int = 0;
		if (a2 > max && maxDepthIndex != 1 || maxDepthIndex == 0) {
			max = a2;
			target = 1;
		}
		if (a3 > max && maxDepthIndex != 2) {
			max = a3;
			target = 2;
		}
		if (a4 > max && maxDepthIndex != 3) {
			max = a4;
			target = 3;
		}
		return target;
	}

	extern inline function quadAreaFast(p1:IVec3, p2:IVec3, p3:IVec3, p4:IVec3):Float {
		// possible diagonals (12-34, 13-24, 14-23)
		var v12:IVec3;
		var v34:IVec3;
		var v13:IVec3;
		var v24:IVec3;
		var v14:IVec3;
		var v23:IVec3;
		M.vec3_sub(v12, p2, p1);
		M.vec3_sub(v34, p4, p3);
		M.vec3_sub(v13, p3, p1);
		M.vec3_sub(v24, p4, p2);
		M.vec3_sub(v14, p4, p1);
		M.vec3_sub(v23, p3, p2);
		var cross1:IVec3;
		var cross2:IVec3;
		var cross3:IVec3;
		M.vec3_cross(cross1, v12, v34);
		M.vec3_cross(cross2, v13, v24);
		M.vec3_cross(cross3, v14, v23);
		var a1:Float = M.vec3_dot(cross1, cross1);
		var a2:Float = M.vec3_dot(cross2, cross2);
		var a3:Float = M.vec3_dot(cross3, cross3);
		if (a1 > a2) {
			if (a1 > a3) {
				return a1;
			} else {
				return a3;
			}
		} else {
			if (a2 > a3) {
				return a2;
			} else {
				return a3;
			}
		}
	}

	function computeRelativePositions(tf1:Transform, tf2:Transform):Void {
		var num:Int = _manifold._numPoints;
		for (i in 0...num) {
			var p:ManifoldPoint = _manifold._points[i];
			M.vec3_mulMat3(p._relPos1, p._localPos1, tf1._rotation);
			M.vec3_mulMat3(p._relPos2, p._localPos2, tf2._rotation);
			p._warmStarted = true; // set warm starting flag
		}
	}

	function findNearestContactPointIndex(target:DetectorResultPoint, tf1:Transform, tf2:Transform):Int {
		var nearestSq:Float = Setting.contactPersistenceThreshold * Setting.contactPersistenceThreshold;
		var idx:Int = -1;
		for (i in 0..._manifold._numPoints) {
			var d:Float = distSq(_manifold._points[i], target, tf1, tf2);
			//trace("d is " + d);
			if (d < nearestSq) {
				nearestSq = d;
				idx = i;
			}
		}
		//trace("idx is " + idx);
		return idx;
	}

	extern inline function distSq(mp:ManifoldPoint, result:DetectorResultPoint, tf1:Transform, tf2:Transform):Float {
		var rp1:IVec3;
		var rp2:IVec3;
		M.vec3_fromVec3(rp1, result.position1);
		M.vec3_fromVec3(rp2, result.position2);
		M.vec3_sub(rp1, rp1, tf1._position);
		M.vec3_sub(rp2, rp2, tf2._position);

		var diff1:IVec3;
		var diff2:IVec3;
		M.vec3_sub(diff1, mp._relPos1, rp1);
		M.vec3_sub(diff2, mp._relPos2, rp2);

		var sq1:Float = M.vec3_dot(diff1, diff1);
		var sq2:Float = M.vec3_dot(diff2, diff2);
		//trace("sq1: " + sq1 + ", sq2: " + sq2);
		return sq1 < sq2 ? sq1 : sq2;
	}

	extern inline function saveOldData():Void {
		numOldPoints = _manifold._numPoints;
		for (i in 0...numOldPoints) {
			oldPoints[i]._copyFrom(_manifold._points[i]);
		}
	}

	extern inline function updateContactPointById(cp:ManifoldPoint):Void {
		for (i in 0...numOldPoints) {
			var ocp:ManifoldPoint = oldPoints[i];
			if (cp._id == ocp._id) {
				cp._impulse.copyFrom(ocp._impulse);
				cp._warmStarted = true;
				break;
			}
		}
	}

	// --- internal ---

	public function totalUpdate(result:DetectorResult, tf1:Transform, tf2:Transform):Void {
		saveOldData();

		var num:Int = result.numPoints;
		_manifold._numPoints = num;
		for (i in 0...num) {
			var p:ManifoldPoint = _manifold._points[i];
			var ref:DetectorResultPoint = result.points[i];
			p._initialize(ref, tf1, tf2);
			updateContactPointById(p);
		}
	}

	public function incrementalUpdate(result:DetectorResult, tf1:Transform, tf2:Transform):Void {
		// update old data
		_manifold._updateDepthsAndPositions(tf1, tf2);

		// set warm started flag
		for (i in 0..._manifold._numPoints) {
			_manifold._points[i]._warmStarted = true;
		}

		M.assert(result.numPoints == 1);
		var newPoint:DetectorResultPoint = result.points[0];

		// add or update point
		var index:Int = findNearestContactPointIndex(newPoint, tf1, tf2);
		if (index == -1) {
			addManifoldPoint(newPoint, tf1, tf2);
		} else {
			var cp:ManifoldPoint = _manifold._points[index];
			cp._updateDepthAndPositions(newPoint, tf1, tf2);
		}

		// remove some points
		removeOutdatedPoints();
	}
}
