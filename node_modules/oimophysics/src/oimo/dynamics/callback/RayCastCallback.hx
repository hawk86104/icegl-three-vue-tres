package oimo.dynamics.callback;
import oimo.collision.geometry.RayCastHit;
import oimo.dynamics.rigidbody.Shape;

/**
 * A callback class for ray casts in a world.
 */
@:interface
class RayCastCallback {

	/**
	 * Default constructor.
	 */
	public function new() {
	}

	/**
	 * This is called every time the world detects a shape `shape` that
	 * the ray intersects with the hit data `hit`.
	 */
	public function process(shape:Shape, hit:RayCastHit):Void {
	}

}
