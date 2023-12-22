package oimo.collision.narrowphase;
import oimo.common.Vec3;

/**
 * The result point is a pair of the closest points of collision geometries
 * detected by a collision detector. This holds relative closest points for
 * each collision geometry and the amount of the overlap.
 */
@:build(oimo.m.B.bu())
class DetectorResultPoint {
	/**
	 * The first collision geometry's closest point.
	 */
	public var position1:Vec3;

	/**
	 * The second collision geometry's closest point.
	 */
	public var position2:Vec3;

	/**
	 * The amount of the overlap. This becomes negative if two geometries are
	 * separate.
	 */
	public var depth:Float;

	/**
	 * The identification of the result point.
	 */
	public var id:Int;

	@:dox(hide)
	public function new() {
		position1 = new Vec3();
		position2 = new Vec3();
		depth = 0;
		id = 0;
	}
}
