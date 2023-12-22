package oimo.dynamics.constraint.joint;
import oimo.common.MathUtil;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.RigidBody;

/**
 * A ragdoll joint config is used for constructions of ragdoll joints.
 */
class RagdollJointConfig extends JointConfig {
	/**
	 * The first body's local twist axis.
	 */
	public var localTwistAxis1:Vec3;

	/**
	 * The second body's local twist axis.
	 */
	public var localTwistAxis2:Vec3;

	/**
	 * The first body's local swing axis.
	 *
	 * The second swing axis is also attached to the first body. It is perpendicular to the first swing
	 * axis, and is automatically computed when the joint is created.
	 */
	public var localSwingAxis1:Vec3;

	/**
	 * The rotational spring and damper along the twist axis of the joint.
	 */
	public var twistSpringDamper:SpringDamper;

	/**
	 * The rotational limit and motor along the twist axis of the joint.
	 */
	public var twistLimitMotor:RotationalLimitMotor;

	/**
	 * The rotational spring and damper along the swing axis of the joint.
	 */
	public var swingSpringDamper:SpringDamper;

	/**
	 * The max angle of rotation along the first swing axis.
	 * This value must be positive.
	 */
	public var maxSwingAngle1:Float;

	/**
	 * The max angle of rotation along the second swing axis.
	 * This value must be positive.
	 */
	public var maxSwingAngle2:Float;

	/**
	 * Default constructor.
	 */
	public function new() {
		super();
		localTwistAxis1 = new Vec3(1, 0, 0);
		localTwistAxis2 = new Vec3(1, 0, 0);
		localSwingAxis1 = new Vec3(0, 1, 0);
		twistSpringDamper = new SpringDamper();
		swingSpringDamper = new SpringDamper();
		twistLimitMotor = new RotationalLimitMotor();
		maxSwingAngle1 = MathUtil.PI;
		maxSwingAngle2 = MathUtil.PI;
	}

	/**
	 * Sets rigid bodies, local anchors from the world anchor `worldAnchor`, local twist axes
	 * from the world twist axis `worldTwistAxis`, local swing axis from the world swing axis
	 * `worldSwingAxis`, and returns `this`.
	 */
	public function init(rigidBody1:RigidBody, rigidBody2:RigidBody, worldAnchor:Vec3, worldTwistAxis:Vec3, worldSwingAxis:Vec3):RagdollJointConfig {
		_init(rigidBody1, rigidBody2, worldAnchor);
		rigidBody1.getLocalVectorTo(worldTwistAxis, localTwistAxis1);
		rigidBody2.getLocalVectorTo(worldTwistAxis, localTwistAxis2);
		rigidBody1.getLocalVectorTo(worldSwingAxis, localSwingAxis1);
		return this;
	}

}
