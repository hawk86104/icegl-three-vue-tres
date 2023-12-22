package oimo.collision.broadphase.bvh;

/**
 * Internal class.
 *
 * Strategies of leaf insertion.
 */
@:dox(hide)
class BvhInsertionStrategy {
	public static inline var SIMPLE:Int = 0;
	public static inline var MINIMIZE_SURFACE_AREA:Int = 1;
}
