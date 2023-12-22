package oimo.dynamics.constraint.joint;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.RigidBody;

/**
 * A spherical joint config is used for constructions of spherical joints.
 */
class SphericalJointConfig extends JointConfig {
	/**
	 * The spring and damper setting of the joint.
	 */
	public var springDamper:SpringDamper;

	/**
	 * Default constructor.
	 */
	public function new() {
		super();
		springDamper = new SpringDamper();
	}

	/**
	 * Sets rigid bodies, local anchors from the world anchor `worldAnchor`, and returns `this`.
	 */
	public function init(rigidBody1:RigidBody, rigidBody2:RigidBody, worldAnchor:Vec3):SphericalJointConfig {
		_init(rigidBody1, rigidBody2, worldAnchor);
		return this;
	}

}
