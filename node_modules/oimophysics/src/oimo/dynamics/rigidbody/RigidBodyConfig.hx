package oimo.dynamics.rigidbody;
import oimo.common.Mat3;
import oimo.common.Vec3;

/**
 * A rigid body configuration is used for constructions of rigid bodies. An instance of this
 * class can safely be reused, as a rigid body will not have any references to a field of
 * this class.
 */
class RigidBodyConfig {
	/**
	 * The world position of the rigid body's center of gravity.
	 */
	public var position:Vec3;

	/**
	 * The rotation matrix of the rigid body.
	 */
	public var rotation:Mat3;

	/**
	 * The initial value of the rigid body's linear velocity.
	 */
	public var linearVelocity:Vec3;

	/**
	 * The initial value of the rigid body's angular velocity.
	 */
	public var angularVelocity:Vec3;

	/**
	 * The rigid body's motion type. See `RigidBodyType` for details.
	 */
	public var type:Int;

	/**
	 * Whether to automatically sleep the rigid body when it stops moving
	 * for a certain period of time, namely `Setting.sleepingTimeThreshold`.
	 */
	public var autoSleep:Bool;

	/**
	 * The damping coefficient of the linear velocity. Set positive values to
	 * gradually reduce the linear velocity.
	 */
	public var linearDamping:Float;

	/**
	 * The damping coefficient of the angular velocity. Set positive values to
	 * gradually reduce the angular velocity.
	 */
	public var angularDamping:Float;

	/**
	 * Default constructor.
	 */
	public function new() {
		position = new Vec3();
		rotation = new Mat3();
		linearVelocity = new Vec3();
		angularVelocity = new Vec3();
		type = RigidBodyType._DYNAMIC;
		autoSleep = true;
		linearDamping = 0;
		angularDamping = 0;
	}
}
