package oimo.collision.narrowphase.detector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Sphere vs Capsule detector.
 */
@:build(oimo.m.B.bu())
class SphereCapsuleDetector extends Detector {
	/**
	 * If `swapped` is `true`, the collision detector expects `CapsuleGeometry` and `SphereGeometry` for the
	 * first and second argument of `SphereCapsuleDetector.detect`. If `swapped` is `false`, the collision detector expects
	 * `SphereGeometry` and `CapsuleGeometry` instead.
	 */
	public function new(swapped:Bool) {
		super(swapped);
	}

	override function detectImpl(result:DetectorResult, geom1:Geometry, geom2:Geometry, tf1:Transform, tf2:Transform, cachedData:CachedDetectorData):Void {
		var s1:SphereGeometry = cast geom1;
		var c2:CapsuleGeometry = cast geom2;

		result.incremental = false;

		var hh2:Float = c2._halfHeight;
		var r1:Float = s1._radius;
		var r2:Float = c2._radius;

		// capsule axis
		var axis2:IVec3;
		M.mat3_getCol(axis2, tf2._rotation, 1);

		// closest point 1
		var cp1:IVec3;
		M.vec3_assign(cp1, tf1._position);

		// find closest point on segment 2

		// line segment (p2, q2)
		var p2:IVec3;
		var q2:IVec3;
		M.vec3_addRhsScaled(p2, tf2._position, axis2, -hh2);
		M.vec3_addRhsScaled(q2, tf2._position, axis2, hh2);

		var p12:IVec3;
		M.vec3_sub(p12, cp1, p2);

		// q - p
		var d2:IVec3;
		M.vec3_sub(d2, q2, p2);

		var d22:Float = hh2 * hh2 * 4;

		var t:Float = M.vec3_dot(p12, d2);
		if (t < 0) t = 0;
		else if (t > d22) t = 1;
		else t /= d22;

		var cp2:IVec3;
		M.vec3_addRhsScaled(cp2, p2, d2, t);

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
