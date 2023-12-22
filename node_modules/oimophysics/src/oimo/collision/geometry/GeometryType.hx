package oimo.collision.geometry;

/**
 * The list of collision geometry types.
 */
@:build(oimo.m.B.bu())
class GeometryType {
	public static inline var _SPHERE:Int      = 0;
	public static inline var _BOX:Int         = 1;
	public static inline var _CYLINDER:Int    = 2;
	public static inline var _CONE:Int        = 3;
	public static inline var _CAPSULE:Int     = 4;
	public static inline var _CONVEX_HULL:Int = 5;

	public static inline var _CONVEX_MIN:Int = 0;
	public static inline var _CONVEX_MAX:Int = 5;

	/**
	 * Represents a sphere collision geometry.
	 *
	 * See `SphereGeometry`.
	 */
	public static var SPHERE(default, never):Int = _SPHERE;

	/**
	 * Represents a box collision geometry.
	 *
	 * See `BoxGeometry`.
	 */
	public static var BOX(default, never):Int = _BOX;

	/**
	 * Represents a cylinder collision geometry.
	 *
	 * See `CylinderGeometry`.
	 */
	public static var CYLINDER(default, never):Int = _CYLINDER;

	/**
	 * Represents a cone collision geometry.
	 *
	 * See `ConeGeometry`.
	 */
	public static var CONE(default, never):Int = _CONE;

	/**
	 * Represents a capsule collision geometry.
	 *
	 * See `CapsuleGeometry`.
	 */
	public static var CAPSULE(default, never):Int = _CAPSULE;

	/**
	 * Represents a convex hull collision geometry.
	 *
	 * See `ConvexHullGeometry`.
	 */
	public static var CONVEX_HULL(default, never):Int = _CONVEX_HULL;
}
