package oimo.dynamics.constraint.joint;

/**
 * The list of the types of the joints.
 */
@:build(oimo.m.B.bu())
class JointType {
	public static inline var _SPHERICAL:Int     = 0;
	public static inline var _REVOLUTE:Int      = 1;
	public static inline var _CYLINDRICAL:Int   = 2;
	public static inline var _PRISMATIC:Int     = 3;
	public static inline var _UNIVERSAL:Int     = 4;
	public static inline var _RAGDOLL:Int       = 5;
	public static inline var _GENERIC:Int       = 6;

	/**
	 * Represents a spherical joint.
	 *
	 * See `SphericalJoint` for details.
	 */
	public static var SPHERICAL(default, never):Int = _SPHERICAL;

	/**
	 * Represents a revolute joint.
	 *
	 * See `RevoluteJoint` for details.
	 */
	public static var REVOLUTE(default, never):Int = _REVOLUTE;

	/**
	 * Represents a cylindrical joint.
	 *
	 * See `CylindricalJoint` for details.
	 */
	public static var CYLINDRICAL(default, never):Int = _CYLINDRICAL;

	/**
	 * Represents a prismatic joint.
	 *
	 * See `PrismaticJoint` for details.
	 */
	public static var PRISMATIC(default, never):Int = _PRISMATIC;

	/**
	 * Represents a universal joint.
	 *
	 * See `UniversalJoint` for details.
	 */
	public static var UNIVERSAL(default, never):Int = _UNIVERSAL;

	/**
	 * Represents a ragdoll joint.
	 *
	 * See `RagdollJoint` for details.
	 */
	public static var RAGDOLL(default, never):Int = _RAGDOLL;

	/**
	 * Represents a generic joint.
	 *
	 * See `GenericJoint` for details.
	 */
	public static var GENERIC(default, never):Int = _GENERIC;
}
