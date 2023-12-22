package oimo.dynamics.constraint.joint;
import oimo.common.Mat3;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.dynamics.rigidbody.RigidBody;
import oimo.m.IMat3;
import oimo.m.M;

/**
 * A generic joint config is used for constructions of generic joints.
 */
@:build(oimo.m.B.bu())
class GenericJointConfig extends JointConfig {
	/**
	 * The first body's local constraint basis.
	 */
	public var localBasis1:Mat3;

	/**
	 * The second body's local constraint basis.
	 */
	public var localBasis2:Mat3;

	/**
	 * The translational limits and motors along the first body's the constraint basis.
	 */
	public var translationalLimitMotors:Array<TranslationalLimitMotor>;

	/**
	 * The translational springs and dampers along the first body's constraint basis.
	 */
	public var translationalSpringDampers:Array<SpringDamper>;

	/**
	 * The rotational limits and motors along the rotation axes of the relative x-y-z Euler angles.
	 */
	public var rotationalLimitMotors:Array<RotationalLimitMotor>;

	/**
	 * The rotational springs and dampers along the rotation axes of the relative x-y-z Euler angles.
	 */
	public var rotationalSpringDampers:Array<SpringDamper>;

	/**
	 * Default constructor.
	 */
	public function new() {
		super();
		localBasis1 = new Mat3();
		localBasis2 = new Mat3();
		translationalLimitMotors = [for (i in 0...3) new TranslationalLimitMotor().setLimits(0, 0)];
		rotationalLimitMotors = [for (i in 0...3) new RotationalLimitMotor().setLimits(0, 0)];
		translationalSpringDampers = [new SpringDamper(), new SpringDamper(), new SpringDamper()];
		rotationalSpringDampers = [new SpringDamper(), new SpringDamper(), new SpringDamper()];
	}

	/**
	 * Sets rigid bodies, local anchors from the world anchor `worldAnchor`, local bases
	 * from the world bases `worldBasis1` and `worldBasis2`, and returns `this`.
	 */
	public function init(rigidBody1:RigidBody, rigidBody2:RigidBody, worldAnchor:Vec3, worldBasis1:Mat3, worldBasis2:Mat3):GenericJointConfig {
		_init(rigidBody1, rigidBody2, worldAnchor);
		var tf1:Transform = rigidBody1._transform;
		var tf2:Transform = rigidBody2._transform;
		var wb1:IMat3;
		var wb2:IMat3;
		var lb1:IMat3;
		var lb2:IMat3;
		M.mat3_fromMat3(wb1, worldBasis1);
		M.mat3_fromMat3(wb2, worldBasis2);
		M.mat3_mulLhsTransposed(lb1, tf1._rotation, wb1);
		M.mat3_mulLhsTransposed(lb2, tf2._rotation, wb2);
		M.mat3_toMat3(localBasis1, lb1);
		M.mat3_toMat3(localBasis2, lb2);
		return this;
	}

}
