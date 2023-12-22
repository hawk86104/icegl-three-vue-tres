package oimo.collision.narrowphase.detector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Sphere vs Sphere detector.
 */
@:build(oimo.m.B.bu())
class SphereSphereDetector extends Detector {
	/**
	 * Default constructor.
	 */
	public function new() {
		super(false);
	}

	override function detectImpl(result:DetectorResult, geom1:Geometry, geom2:Geometry, tf1:Transform, tf2:Transform, cachedData:CachedDetectorData):Void {
		var s1:SphereGeometry = cast geom1;
		var s2:SphereGeometry = cast geom2;

		result.incremental = false;

		var d:IVec3;
		M.vec3_sub(d, tf1._position, tf2._position);
		var r1:Float = s1._radius;
		var r2:Float = s2._radius;
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
		M.vec3_addRhsScaled(pos1, tf1._position, n, -r1);
		M.vec3_addRhsScaled(pos2, tf2._position, n, r2);
		M.call(addPoint(result, pos1, pos2, r1 + r2 - len, 0));
	}
}
