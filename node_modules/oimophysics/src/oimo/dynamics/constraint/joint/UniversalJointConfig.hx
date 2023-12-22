package oimo.dynamics.constraint.joint;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.RigidBody;

/**
 * A universal joint config is used for constructions of universal joints.
 */
class UniversalJointConfig extends JointConfig {
	/**
	 * The first body's local constraint axis.
	 */
	public var localAxis1:Vec3;

	/**
	 * The second body's local constraint axis.
	 */
	public var localAxis2:Vec3;

	/**
	 * The rotational spring and damper along the first body's constraint axis.
	 */
	public var springDamper1:SpringDamper;

	/**
	 * The rotational spring and damper along the second body's constraint axis.
	 */
	public var springDamper2:SpringDamper;

	/**
	 * The rotational limit and motor along the first body's constraint axis.
	 */
	public var limitMotor1:RotationalLimitMotor;

	/**
	 * The rotational limit and motor along the second body's constraint axis.
	 */
	public var limitMotor2:RotationalLimitMotor;

	/**
	 * Default constructor.
	 */
	public function new() {
		super();
		localAxis1 = new Vec3(1, 0, 0);
		localAxis2 = new Vec3(1, 0, 0);
		springDamper1 = new SpringDamper();
		springDamper2 = new SpringDamper();
		limitMotor1 = new RotationalLimitMotor();
		limitMotor2 = new RotationalLimitMotor();
	}

	/**
	 * Sets rigid bodies, local anchors from the world anchor `worldAnchor`, local axes
	 * from the world axes `worldAxis1` and `worldAxis2`, and returns `this`.
	 */
	public function init(rigidBody1:RigidBody, rigidBody2:RigidBody, worldAnchor:Vec3, worldAxis1:Vec3, worldAxis2:Vec3):UniversalJointConfig {
		_init(rigidBody1, rigidBody2, worldAnchor);
		rigidBody1.getLocalVectorTo(worldAxis1, localAxis1);
		rigidBody2.getLocalVectorTo(worldAxis2, localAxis2);
		return this;
	}

}
