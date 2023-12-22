package oimo.dynamics.constraint.info.joint;
import haxe.ds.Vector;
import oimo.common.Setting;
import oimo.dynamics.constraint.joint.JointImpulse;
import oimo.dynamics.rigidbody.RigidBody;

/**
 * Internal class.
 */
@:dox(hide)
class JointSolverInfo {
	public var b1:RigidBody;
	public var b2:RigidBody;

	public var numRows:Int;
	public var rows:Vector<JointSolverInfoRow>;

	public function new() {
		b1 = null;
		b2 = null;

		numRows = 0;
		rows = new Vector<JointSolverInfoRow>(Setting.maxJacobianRows);
		for (i in 0...rows.length) {
			rows[i] = new JointSolverInfoRow();
		}
	}

	extern public inline function addRow(impulse:JointImpulse):JointSolverInfoRow {
		var row:JointSolverInfoRow = rows[numRows++];
		row.clear();
		row.impulse = impulse;
		return row;
	}

}
