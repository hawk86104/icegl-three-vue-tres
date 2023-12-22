package oimo.dynamics.callback;
import oimo.collision.geometry.RayCastHit;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.Shape;

/**
 * A ray cast callback implementation that keeps only the closest hit data.
 * This is reusable, but make sure to clear the old result by calling
 * `RayCastClosest.clear` if used once or more before.
 */
class RayCastClosest extends RayCastCallback {
	/**
	 * The shape the ray hit.
	 */
	public var shape:Shape;

	/**
	 * The position the ray hit at.
	 */
	public var position:Vec3;

	/**
	 * The normal vector of the surface the ray hit.
	 */
	public var normal:Vec3;

	/**
	 * The ratio of the position the ray hit from the start point to the end point.
	 */
	public var fraction:Float;

	/**
	 * Whether the ray hit any shape in the world.
	 */
	public var hit:Bool;

	/**
	 * Default constructor.
	 */
	public function new() {
		super();
		position = new Vec3();
		normal = new Vec3();
		clear();
	}

	/**
	 * Clears the result data.
	 */
	public inline function clear():Void {
		shape = null;
		fraction = 1;
		position.zero();
		normal.zero();
		hit = false;
	}

	override public function process(shape:Shape, hit:RayCastHit):Void {
		if (hit.fraction < fraction) {
			this.shape = shape;
			this.hit = true;
			fraction = hit.fraction;
			position.copyFrom(hit.position);
			normal.copyFrom(hit.normal);
		}
	}

}
