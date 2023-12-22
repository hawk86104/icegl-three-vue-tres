package oimo.dynamics.constraint.info.contact;
import haxe.ds.Vector;
import oimo.common.Setting;
import oimo.dynamics.rigidbody.RigidBody;

/**
 * Internal class.
 */
@:dox(hide)
class ContactSolverInfo {
	public var b1:RigidBody;
	public var b2:RigidBody;

	public var numRows:Int;
	public var rows:Vector<ContactSolverInfoRow>;

	public function new() {
		b1 = null;
		b2 = null;

		numRows = 0;
		rows = new Vector<ContactSolverInfoRow>(Setting.maxManifoldPoints);
		for (i in 0...rows.length) {
			rows[i] = new ContactSolverInfoRow();
		}
	}

}
