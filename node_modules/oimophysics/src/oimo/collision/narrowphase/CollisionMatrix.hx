package oimo.collision.narrowphase;
import haxe.ds.Vector;
import oimo.collision.narrowphase.detector.CapsuleCapsuleDetector;
import oimo.collision.narrowphase.detector.Detector;
import oimo.collision.narrowphase.detector.GjkEpaDetector;
import oimo.collision.narrowphase.detector.SphereBoxDetector;
import oimo.collision.narrowphase.detector.SphereCapsuleDetector;
import oimo.collision.narrowphase.detector.SphereSphereDetector;
import oimo.collision.geometry.GeometryType;
import oimo.collision.narrowphase.detector.*;

/**
 * CollisionMatrix provides corresponding collision detector for a pair of
 * two geometries of given types.
 */
class CollisionMatrix {
	var detectors:Vector<Vector<Detector>>;

	@:dox(hide)
	public function new() {
		detectors = new Vector<Vector<Detector>>(8);
		for (i in 0...6) {
			detectors[i] = new Vector<Detector>(8);
		}

		var gjkEpaDetector:GjkEpaDetector = new GjkEpaDetector();

		var sp:Int = GeometryType._SPHERE;
		var bo:Int = GeometryType._BOX;
		var cy:Int = GeometryType._CYLINDER;
		var co:Int = GeometryType._CONE;
		var ca:Int = GeometryType._CAPSULE;
		var ch:Int = GeometryType._CONVEX_HULL;

		detectors[sp][sp] = new SphereSphereDetector();
		detectors[sp][bo] = new SphereBoxDetector(false);
		detectors[sp][cy] = gjkEpaDetector;
		detectors[sp][co] = gjkEpaDetector;
		detectors[sp][ca] = new SphereCapsuleDetector(false);
		detectors[sp][ch] = gjkEpaDetector;

		detectors[bo][sp] = new SphereBoxDetector(true);
		detectors[bo][bo] = new BoxBoxDetector();
		detectors[bo][cy] = gjkEpaDetector;
		detectors[bo][co] = gjkEpaDetector;
		detectors[bo][ca] = gjkEpaDetector;
		detectors[bo][ch] = gjkEpaDetector;

		detectors[cy][sp] = gjkEpaDetector;
		detectors[cy][bo] = gjkEpaDetector;
		detectors[cy][cy] = gjkEpaDetector;
		detectors[cy][co] = gjkEpaDetector;
		detectors[cy][ca] = gjkEpaDetector;
		detectors[cy][ch] = gjkEpaDetector;

		detectors[co][sp] = gjkEpaDetector;
		detectors[co][bo] = gjkEpaDetector;
		detectors[co][cy] = gjkEpaDetector;
		detectors[co][co] = gjkEpaDetector;
		detectors[co][ca] = gjkEpaDetector;
		detectors[co][ch] = gjkEpaDetector;

		detectors[ca][sp] = new SphereCapsuleDetector(true);
		detectors[ca][bo] = gjkEpaDetector;
		detectors[ca][cy] = gjkEpaDetector;
		detectors[ca][co] = gjkEpaDetector;
		detectors[ca][ca] = new CapsuleCapsuleDetector();
		detectors[ca][ch] = gjkEpaDetector;

		detectors[ch][sp] = gjkEpaDetector;
		detectors[ch][bo] = gjkEpaDetector;
		detectors[ch][cy] = gjkEpaDetector;
		detectors[ch][co] = gjkEpaDetector;
		detectors[ch][ca] = gjkEpaDetector;
		detectors[ch][ch] = gjkEpaDetector;
	}

	// --- public ---

	/**
	 * Returns an appropriate collision detector of two geometries of types `geomType1` and `geomType2`.
	 *
	 * This method is **not symmetric**, so `getDetector(a, b)` may not be equal to `getDetector(b, a)`.
	 */
	public inline function getDetector(geomType1:Int, geomType2:Int):Detector {
		return detectors[geomType1][geomType2];
	}
}
