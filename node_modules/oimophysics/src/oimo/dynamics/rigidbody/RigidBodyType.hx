package oimo.dynamics.rigidbody;

/**
 * The list of a rigid body's motion types.
 */
@:build(oimo.m.B.bu())
class RigidBodyType {
	public static inline var _DYNAMIC = 0;
	public static inline var _STATIC = 1;
	public static inline var _KINEMATIC = 2;

	/**
	 * Represents a dynamic rigid body. A dynamic rigid body has finite mass (and usually inertia
	 * tensor). The rigid body is affected by gravity, or by constraints the rigid body is involved.
	 */
	public static var DYNAMIC(default, never) = _DYNAMIC;

	/**
	 * Represents a static rigid body. A static rigid body has zero velocities and infinite mass
	 * and inertia tensor. The rigid body is not affected by any force or impulse, such as gravity,
	 * constraints, or external forces or impulses added by an user.
	 */
	public static var STATIC(default, never) = _STATIC;

	/**
	 * Represents a kinematic rigid body. A kinematic rigid body is similar to a static one, except
	 * that it can have non-zero linear and angular velocities. This is useful for overlapping rigid
	 * bodies to pre-computed motions.
	 */
	public static var KINEMATIC(default, never) = _KINEMATIC;
}
