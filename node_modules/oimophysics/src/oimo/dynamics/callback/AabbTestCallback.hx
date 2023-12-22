package oimo.dynamics.callback;
import oimo.dynamics.rigidbody.Shape;

/**
 * A callback interface for aabb tests in a world.
 */
@:interface
class AabbTestCallback {

	/**
	 * Default constructor.
	 */
	public function new() {
	}

	/**
	 * This is called every time the world detects a shape `shape` that
	 * the query aabb intersects.
	 */
	public function process(shape:Shape):Void {
	}

}
