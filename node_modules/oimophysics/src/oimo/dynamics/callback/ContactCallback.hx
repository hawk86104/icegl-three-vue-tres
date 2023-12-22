package oimo.dynamics.callback;
import oimo.dynamics.Contact;

/**
 * A callback class for contact events. Contact events between two shapes
 * will occur in following order:
 *
 * 1. `beginContact`
 * 1. `preSolve` (before velocity update)
 * 1. `postSolve` (after velocity update)
 * 1. (repeats 2. and 3. every frame while the shapes are touching)
 * 1. `endContact`
 */
@:interface
class ContactCallback {

	/**
	 * Default constructor.
	 */
	public function new() {
	}

	/**
	 * This is called when two shapes start touching each other. `c` is the contact of
	 * the two shapes.
	 */
	public function beginContact(c:Contact):Void {
	}

	/**
	 * This is called every frame **before** velocity solver iterations while two shapes
	 * are touching. `c` is the contact for the two shapes.
	 */
	public function preSolve(c:Contact):Void {
	}

	/**
	 * This is called every frame **after** velocity solver iterations while two shapes
	 * are touching. `c` is the contact for the two shapes.
	 */
	public function postSolve(c:Contact):Void {
	}

	/**
	 * This is called when two shapes end touching each other. `c` is the contact of
	 * the two shapes.
	 */
	public function endContact(c:Contact):Void {
	}
}
