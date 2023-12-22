package oimo.collision.narrowphase;
import haxe.ds.Vector;
import oimo.common.Setting;
import oimo.common.Vec3;

/**
 * The result of narrow-phase collision detection. This is used for generating contact
 * points of a contact constraint at once or incrementally.
 */
@:build(oimo.m.B.bu())
class DetectorResult {
	/**
	 * The number of the result points.
	 */
	public var numPoints:Int;

	/**
	 * The result points. Note that **only the first `DetectorResult.numPoints` points are
	 * computed by the collision detector**.
	 */
	public var points:Vector<DetectorResultPoint>;

	/**
	 * The normal vector of the contact plane.
	 */
	public var normal:Vec3;

	/**
	 * Whether the result points are to be used for incremental menifold update.
	 */
	public var incremental:Bool; // for GJK/EPA detector

	/**
	 * Default constructor.
	 */
	public function new() {
		numPoints = 0;
		normal = new Vec3();
		points = new Vector<DetectorResultPoint>(Setting.maxManifoldPoints);
		incremental = false;

		for (i in 0...Setting.maxManifoldPoints) {
			points[i] = new DetectorResultPoint();
		}
	}

	// --- public ---

	/**
	 * Returns the maximum depth of the result points. Returns `0.0` if no result
	 * points are available.
	 */
	public function getMaxDepth():Float {
		var max:Float = 0;
		for (i in 0...numPoints) {
			if (points[i].depth > max) {
				max = points[i].depth;
			}
		}
		return max;
	}

	/**
	 * Cleans up the result data.
	 */
	public inline function clear():Void {
		numPoints = 0;
		for (p in points) {
			p.position1.zero();
			p.position2.zero();
			p.depth = 0;
			p.id = 0;
		}
		normal.zero();
	}
}
