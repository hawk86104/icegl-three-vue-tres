package oimo.dynamics.constraint;

/**
 * The list of the algorithms for position corretion.
 */
#if !macro
@:build(oimo.m.B.bu())
#end
class PositionCorrectionAlgorithm {
	public static inline var _BAUMGARTE:Int = 0;
	public static inline var _SPLIT_IMPULSE:Int = 1;
	public static inline var _NGS:Int = 2;

	/**
	 * Baumgarte stabilizaiton. Fastest but introduces extra energy.
	 */
	public static var BAUMGARTE(default, never):Int = _BAUMGARTE;

	/**
	 * Use split impulse and pseudo velocity. Fast enough and does not introduce extra
	 * energy, but somewhat unstable, especially for joints.
	 */
	public static var SPLIT_IMPULSE(default, never):Int = _SPLIT_IMPULSE;

	/**
	 * Nonlinear Gauss-Seidel method. Slow but stable.
	 */
	public static var NGS(default, never):Int = _NGS;
}
