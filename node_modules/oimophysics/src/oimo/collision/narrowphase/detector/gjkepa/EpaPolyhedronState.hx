package oimo.collision.narrowphase.detector.gjkepa;

/**
 * Internal class.
 */
@:dox(hide)
class EpaPolyhedronState {
	public static inline var OK:Int = 0;
	public static inline var INVALID_TRIANGLE:Int = 1;
	public static inline var NO_ADJACENT_PAIR_INDEX:Int = 2;
	public static inline var NO_ADJACENT_TRIANGLE:Int = 3;
	public static inline var EDGE_LOOP_BROKEN:Int = 4;
	public static inline var NO_OUTER_TRIANGLE:Int = 5;
	public static inline var TRIANGLE_INVISIBLE:Int = 6;
}
