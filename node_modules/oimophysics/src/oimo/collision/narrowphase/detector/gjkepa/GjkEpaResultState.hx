package oimo.collision.narrowphase.detector.gjkepa;

/**
 * The list of the state of a result of `GjkEpa.computeClosestPoints`.
 */
@:build(oimo.m.B.bu())
class GjkEpaResultState {
	public static inline var _SUCCEEDED:Int                          = 0x000;
	public static inline var _GJK_FAILED_TO_MAKE_TETRAHEDRON:Int     = 0x001;
	public static inline var _GJK_DID_NOT_CONVERGE:Int               = 0x002;
	public static inline var _EPA_FAILED_TO_INIT:Int                 = 0x101;
	public static inline var _EPA_FAILED_TO_ADD_VERTEX:Int           = 0x102;
	public static inline var _EPA_DID_NOT_CONVERGE:Int               = 0x103;

	/**
	 * GJK/EPA computation is successfully finished.
	 */
	public static var SUCCEEDED(default, null):Int = _SUCCEEDED;

	/**
	 * Failed to construct a tetrahedron enclosing the origin in GJK computation.
	 */
	public static var GJK_FAILED_TO_MAKE_TETRAHEDRON(default, null):Int = _GJK_FAILED_TO_MAKE_TETRAHEDRON;

	/**
	 * GJK iterations did not converge in time.
	 */
	public static var GJK_DID_NOT_CONVERGE(default, null):Int = _GJK_DID_NOT_CONVERGE;

	/**
	 * Failed to construct initial polyhedron in EPA construction.
	 */
	public static var EPA_FAILED_TO_INIT(default, null):Int = _EPA_FAILED_TO_INIT;

	/**
	 * Failed to add a new vertex to the polyhedron in EPA computation.
	 */
	public static var EPA_FAILED_TO_ADD_VERTEX(default, null):Int = _EPA_FAILED_TO_ADD_VERTEX;

	/**
	 * EPA iterations did not converge in time.
	 */
	public static var EPA_DID_NOT_CONVERGE(default, null):Int = _EPA_DID_NOT_CONVERGE;
}
