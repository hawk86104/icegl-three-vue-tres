package oimo.dynamics.constraint.info.contact;
import oimo.dynamics.constraint.contact.ContactImpulse;
import oimo.dynamics.constraint.info.JacobianRow;

/**
 * Internal class.
 */
@:dox(hide)
class ContactSolverInfoRow {
	/** Used for both velocity and position solver. */
	public var jacobianN:JacobianRow;

	/** Used for velocity solver. */
	public var jacobianT:JacobianRow;

	/** Used for velocity solver. */
	public var jacobianB:JacobianRow;

	/** Used for both velocity and position solver. */
	public var rhs:Float;

	/** Used for velocity solver. */
	public var cfm:Float;

	/** Used for velocity solver. */
	public var friction:Float;

	/** Used for both velocity and position solver. */
	public var impulse:ContactImpulse;

	public function new() {
		jacobianN = new JacobianRow();
		jacobianT = new JacobianRow();
		jacobianB = new JacobianRow();
		rhs = 0;
		cfm = 0;
		friction = 0;
		impulse = null;
	}

	extern public inline function clear():Void {
		jacobianN.clear();
		jacobianT.clear();
		jacobianB.clear();
		rhs = 0;
		cfm = 0;
		friction = 0;
		impulse = null;
	}

}
