package oimo.collision.narrowphase.detector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.collision.narrowphase.detector.gjkepa.*;
import oimo.common.*;
import oimo.m.*;

/**
 * General convex collision detector using GJK/EPA
 */
@:build(oimo.m.B.bu())
class GjkEpaDetector extends Detector {
	/**
	 * Default constructor.
	 */
	public function new() {
		super(false);
	}

	override function detectImpl(result:DetectorResult, geom1:Geometry, geom2:Geometry, tf1:Transform, tf2:Transform, cachedData:CachedDetectorData):Void {
		var gjkEpa:GjkEpa = GjkEpa.getInstance();
		var g1:ConvexGeometry = cast geom1;
		var g2:ConvexGeometry = cast geom2;
		var status:Int = gjkEpa.computeClosestPoints(g1, g2, tf1, tf2, Setting.enableGJKCaching ? cachedData : null);
		result.incremental = true;

		if (status != GjkEpaResultState.SUCCEEDED) {
			trace("GJK/EPA failed: status=" + status);
			return;
		}

		var margin1:Float = g1._gjkMargin;
		var margin2:Float = g2._gjkMargin;

		if (gjkEpa.distance > margin1 + margin2) { // geometries are separating
			return;
		}
		var pos1:IVec3;
		var pos2:IVec3;
		M.vec3_fromVec3(pos1, gjkEpa.closestPoint1);
		M.vec3_fromVec3(pos2, gjkEpa.closestPoint2);

		var normal:IVec3;
		M.vec3_sub(normal, pos1, pos2);

		if (M.vec3_dot(normal, normal) == 0) {
			return; // core geometries are just touching
		}
		if (gjkEpa.distance < 0) {
			M.vec3_negate(normal, normal);
		}
		M.vec3_normalize(normal, normal);
		M.call(setNormal(result, normal));

		// move the closest points to the surface of the geometries
		M.vec3_addRhsScaled(pos1, pos1, normal, -g1._gjkMargin);
		M.vec3_addRhsScaled(pos2, pos2, normal, g2._gjkMargin);
		M.call(addPoint(result, pos1, pos2, g1._gjkMargin + g2._gjkMargin - gjkEpa.distance, 0));
	}

}
