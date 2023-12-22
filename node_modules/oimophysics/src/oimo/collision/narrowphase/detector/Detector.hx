package oimo.collision.narrowphase.detector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.common.Transform;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Interface of a collision detector for narrow-phase collision detection.
 */
@:build(oimo.m.B.bu())
class Detector {
	var swapped:Bool;

	@:dox(hide)
	public function new(swapped:Bool) {
		this.swapped = swapped;
	}

	// --- private ---

	function setNormal(result:DetectorResult, n:IVec3):Void {
		M.vec3_toVec3(result.normal, n);
		if (swapped) {
			result.normal.negateEq();
		}
	}

	function addPoint(result:DetectorResult, pos1:IVec3, pos2:IVec3, depth:Float, id:Int):Void {
		var p:DetectorResultPoint = result.points[result.numPoints++];
		p.depth = depth;
		p.id = id;
		if (swapped) {
			M.vec3_toVec3(p.position1, pos2);
			M.vec3_toVec3(p.position2, pos1);
		} else {
			M.vec3_toVec3(p.position1, pos1);
			M.vec3_toVec3(p.position2, pos2);
		}
	}

	function detectImpl(result:DetectorResult, geom1:Geometry, geom2:Geometry, tf1:Transform, tf2:Transform, cachedData:CachedDetectorData):Void {
		// override this
	}

	// --- public ---

	/**
	 * Computes the contact manifold of two collision geometries `geom1` and `geom2` with the transforms
	 * `transform1` and `transform2`, and stores it to `result`. `cachedData` is used to improve performance
	 * of collision detection in some detectors.
	 */
	public function detect(result:DetectorResult, geom1:Geometry, geom2:Geometry, transform1:Transform, transform2:Transform, cachedData:CachedDetectorData):Void {
		result.clear();
		if (swapped) {
			detectImpl(result, geom2, geom1, transform2, transform1, cachedData);
		} else {
			detectImpl(result, geom1, geom2, transform1, transform2, cachedData);
		}
	}
}
