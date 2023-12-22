package oimo.dynamics.constraint.joint;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.RigidBody;

/**
 * A revolute joint config is used for constructions of revolute joints.
 */
class RevoluteJointConfig extends JointConfig {
	/**
	 * The first body's local constraint axis.
	 */
	public var localAxis1:Vec3;

	/**
	 * The second body's local constraint axis.
	 */
	public var localAxis2:Vec3;

	/**
	 * The rotational spring and damper settings.
	 */
	public var springDamper:SpringDamper;

	/**
	 * The rotational limits and motor settings.
	 */
	public var limitMotor:RotationalLimitMotor;

	/**
	 * Default constructor.
	 */
	public function new() {
		super();
		localAxis1 = new Vec3(1, 0, 0);
		localAxis2 = new Vec3(1, 0, 0);
		springDamper = new SpringDamper();
		limitMotor = new RotationalLimitMotor();
	}

	/**
	 * Sets rigid bodies, local anchors from the world anchor `worldAnchor`, local axes
	 * from the world axis `worldAxis`, and returns `this`.
	 */
	public function init(rigidBody1:RigidBody, rigidBody2:RigidBody, worldAnchor:Vec3, worldAxis:Vec3):RevoluteJointConfig {
		_init(rigidBody1, rigidBody2, worldAnchor);
		rigidBody1.getLocalVectorTo(worldAxis, localAxis1);
		rigidBody2.getLocalVectorTo(worldAxis, localAxis2);
		return this;
	}

}
