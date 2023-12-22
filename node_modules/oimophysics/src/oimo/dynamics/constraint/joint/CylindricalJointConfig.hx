package oimo.dynamics.constraint.joint;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.RigidBody;

/**
 * A cylindrical joint config is used for constructions of cylindrical joints.
 */
class CylindricalJointConfig extends JointConfig {
	/**
	 * The first body's local constraint axis.
	 */
	public var localAxis1:Vec3;

	/**
	 * The second body's local constraint axis.
	 */
	public var localAxis2:Vec3;

	/**
	 * The translational limit and motor along the constraint axis of the joint.
	 */
	public var translationalLimitMotor:TranslationalLimitMotor;

	/**
	 * The translational spring and damper along constraint the axis of the joint.
	 */
	public var translationalSpringDamper:SpringDamper;

	/**
	 * The rotational limit and motor along the constraint axis of the joint.
	 */
	public var rotationalLimitMotor:RotationalLimitMotor;

	/**
	 * The rotational spring and damper along the constraint axis of the joint.
	 */
	public var rotationalSpringDamper:SpringDamper;

	/**
	 * Default constructor.
	 */
	public function new() {
		super();
		localAxis1 = new Vec3(1, 0, 0);
		localAxis2 = new Vec3(1, 0, 0);
		translationalLimitMotor = new TranslationalLimitMotor();
		translationalSpringDamper = new SpringDamper();
		rotationalLimitMotor = new RotationalLimitMotor();
		rotationalSpringDamper = new SpringDamper();
	}

	/**
	 * Sets rigid bodies, local anchors from the world anchor `worldAnchor`, local axes
	 * from the world axis `worldAxis`, and returns `this`.
	 */
	public function init(rigidBody1:RigidBody, rigidBody2:RigidBody, worldAnchor:Vec3, worldAxis:Vec3):CylindricalJointConfig {
		_init(rigidBody1, rigidBody2, worldAnchor);
		rigidBody1.getLocalVectorTo(worldAxis, localAxis1);
		rigidBody2.getLocalVectorTo(worldAxis, localAxis2);
		return this;
	}

}
