package oimo.collision.broadphase;

/**
 * Types of broad-phase algorithms.
 */
@:build(oimo.m.B.bu())
class BroadPhaseType {
	public static inline var _BRUTE_FORCE:Int = 1;
	public static inline var _BVH:Int = 2;

	/**
	 * The brute force algorithm searches all the possible pairs of the proxies every time.
	 * This is **very slow** and so users should not choose this algorithm without exceptional reasons.
	 */
	public static var BRUTE_FORCE(default, never):Int = _BRUTE_FORCE;

	/**
	 * The BVH algorithm uses bounding volume hierarchy for detecting overlapping pairs of proxies efficiently.
	 */
	public static var BVH(default, never):Int = _BVH;
}
