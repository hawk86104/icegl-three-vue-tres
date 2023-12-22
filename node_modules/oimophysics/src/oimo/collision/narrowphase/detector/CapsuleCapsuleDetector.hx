package oimo.collision.narrowphase.detector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Capsule vs Capsule detector.
 */
@:build(oimo.m.B.bu())
class CapsuleCapsuleDetector extends Detector {
	/**
	 * Default constructor.
	 */
	public function new() {
		super(false);
	}

	override function detectImpl(result:DetectorResult, geom1:Geometry, geom2:Geometry, tf1:Transform, tf2:Transform, cachedData:CachedDetectorData):Void {
		var c1:CapsuleGeometry = cast geom1;
		var c2:CapsuleGeometry = cast geom2;

		result.incremental = false;

		// Y axes
		var axis1:IVec3;
		var axis2:IVec3;
		M.mat3_getCol(axis1, tf1._rotation, 1);
		M.mat3_getCol(axis2, tf2._rotation, 1);

		var hh1:Float = c1._halfHeight;
		var hh2:Float = c2._halfHeight;
		var r1:Float = c1._radius;
		var r2:Float = c2._radius;

		// line segments (p1, q1), (p2, q2)
		var p1:IVec3;
		var q1:IVec3;
		var p2:IVec3;
		var q2:IVec3;
		M.vec3_addRhsScaled(p1, tf1._position, axis1, -hh1);
		M.vec3_addRhsScaled(q1, tf1._position, axis1, hh1);
		M.vec3_addRhsScaled(p2, tf2._position, axis2, -hh2);
		M.vec3_addRhsScaled(q2, tf2._position, axis2, hh2);

		// p1 - p2
		var p12:IVec3;
		M.vec3_sub(p12, p1, p2);

		// q - p
		var d1:IVec3;
		var d2:IVec3;
		M.vec3_sub(d1, q1, p1);
		M.vec3_sub(d2, q2, p2);

		var p21d1:Float = -M.vec3_dot(p12, d1);
		var p12d2:Float = M.vec3_dot(p12, d2);

		var d11:Float = hh1 * hh1 * 4;
		var d12:Float = M.vec3_dot(d1, d2);
		var d22:Float = hh2 * hh2 * 4;

		// closest points: p1 + t1 * d1, p2 + t2 * d2
		var t1:Float;
		var t2:Float;

		if (d11 == 0 && d22 == 0) {
			// point vs point
			t1 = 0;
			t2 = 0;
		} else if (d11 == 0) {
			// point vs segment
			t1 = 0;

			// t2 = t1 * d12 + p12d2; <- t1 = 0
			t2 = p12d2;
			if (t2 < 0) t2 = 0;
			else if (t2 > d22) t2 = 1;
			else t2 /= d22;
		} else if (d22 == 0) {
			// segment vs point
			t2 = 0;

			// t1 = t2 * d12 + p21d1; <- t2 = 0
			t1 = p21d1;
			if (t1 < 0) t1 = 0;
			else if (t1 > d11) t1 = 1;
			else t1 /= d11;
		} else {
			var det:Float = d11 * d22 - d12 * d12;

			if (det == 0) {
				// d1 is parallel to d2. use 0 for t1
				t1 = 0;
			} else {
				t1 = d12 * p12d2 + d22 * p21d1;
				if (t1 < 0) t1 = 0;
				else if (t1 > det) t1 = 1;
				else t1 /= det;
			}

			t2 = t1 * d12 + p12d2;
			if (t2 < 0) {
				// clamp t2 and recompute t1
				t2 = 0;

				// t1 = t2 * d12 + p21d1; <- t2 = 0
				t1 = p21d1;
				if (t1 < 0) t1 = 0;
				else if (t1 > d11) t1 = 1;
				else t1 /= d11;
			} else if (t2 > d22) {
				// clamp t2 and recompute t1
				t2 = 1;

				// t1 = t2 * d12 + p21d1; <- t2 = 1
				t1 = d12 + p21d1;
				if (t1 < 0) t1 = 0;
				else if (t1 > d11) t1 = 1;
				else t1 /= d11;
			} else {
				t2 /= d22;
			}
		}

		var cp1:IVec3;
		var cp2:IVec3;
		M.vec3_addRhsScaled(cp1, p1, d1, t1);
		M.vec3_addRhsScaled(cp2, p2, d2, t2);

		// perform sphere vs sphere collision

		var d:IVec3;
		M.vec3_sub(d, cp1, cp2);
		var len2:Float = M.vec3_dot(d, d);
		if (len2 >= (r1 + r2) * (r1 + r2)) return;
		var len:Float = MathUtil.sqrt(len2);
		var n:IVec3;
		if (len > 0) {
			M.vec3_scale(n, d, 1 / len);
		} else {
			M.vec3_set(n, 1, 0, 0);
		}
		M.call(setNormal(result, n));
		var pos1:IVec3;
		var pos2:IVec3;
		M.vec3_addRhsScaled(pos1, cp1, n, -r1);
		M.vec3_addRhsScaled(pos2, cp2, n, r2);
		M.call(addPoint(result, pos1, pos2, r1 + r2 - len, 0));
	}
}
