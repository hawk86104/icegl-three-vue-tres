package oimo.dynamics.constraint.joint;
import oimo.common.Setting;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.*;

/**
 * A joint configuration is used for constructions of various joints.
 * An instance of any kind of the joint configurations can safely be reused.
 */
class JointConfig {
	/**
	 * The first rigid body attached to the joint.
	 */
	public var rigidBody1:RigidBody;

	/**
	 * The second rigid body attached to the joint.
	 */
	public var rigidBody2:RigidBody;

	/**
	 * The local position of the first rigid body's anchor point.
	 */
	public var localAnchor1:Vec3;

	/**
	 * The local position of the second rigid body's anchor point.
	 */
	public var localAnchor2:Vec3;

	/**
	 * Whether to allow the connected rigid bodies to collide each other.
	 */
	public var allowCollision:Bool;

	/**
	 * The type of the constraint solver for the joint.
	 *
	 * See `ConstraintSolverType` for details.
	 */
	public var solverType:Int;

	/**
	 * The type of the position correction algorithm for the joint.
	 *
	 * See `PositionCorrectionAlgorithm` for details.
	 */
	public var positionCorrectionAlgorithm:Int;

	/**
	 * The joint will be destroyed when magnitude of the constraint force exceeds the value.
	 *
	 * Set `0` for unbreakable joints.
	 */
	public var breakForce:Float;

	/**
	 * The joint will be destroyed when magnitude of the constraint torque exceeds the value.
	 *
	 * Set `0` for unbreakable joints.
	 */
	public var breakTorque:Float;

	@:dox(hide)
	public function new() {
		rigidBody1 = null;
		rigidBody2 = null;
		localAnchor1 = new Vec3();
		localAnchor2 = new Vec3();
		allowCollision = false;
		solverType = Setting.defaultJointConstraintSolverType;
		positionCorrectionAlgorithm = Setting.defaultJointPositionCorrectionAlgorithm;
		breakForce = 0;
		breakTorque = 0;
	}

	// --- private ---

	function _init(rb1:RigidBody, rb2:RigidBody, worldAnchor:Vec3):Void {
		rigidBody1 = rb1;
		rigidBody2 = rb2;
		rigidBody1.getLocalPointTo(worldAnchor, localAnchor1);
		rigidBody2.getLocalPointTo(worldAnchor, localAnchor2);
	}

}
