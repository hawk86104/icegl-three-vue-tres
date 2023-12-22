package oimo.dynamics.rigidbody;
import oimo.common.Mat3;

/**
 * This class holds mass and moment of inertia for a rigid body.
 */
class MassData {
	/**
	 * Mass. `0` for a non-dynamic rigid body.
	 */
	public var mass:Float;

	/**
	 * Inertia tensor in local space. Zero matrix for a non-dynamic rigid body.
	 */
	public var localInertia:Mat3;

	/**
	 * Default constructor.
	 */
	public function new() {
		mass = 0;
		localInertia = new Mat3();
	}

}
