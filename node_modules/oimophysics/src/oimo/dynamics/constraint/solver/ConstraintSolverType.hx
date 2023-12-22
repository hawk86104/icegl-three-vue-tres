package oimo.dynamics.constraint.solver;

/**
 * The list of the constraint solvers.
 */
#if !macro
@:build(oimo.m.B.bu())
#end
class ConstraintSolverType {
	public static inline var _ITERATIVE:Int = 0;
	public static inline var _DIRECT:Int = 1;

	/**
	 * Iterative constraint solver. Fast and stable enough for common usages.
	 */
	public static var ITERATIVE(default, never):Int = _ITERATIVE;

	/**
	 * Direct constraint solver. Very stable but not suitable for a situation where fast
	 * computation is required.
	 */
	public static var DIRECT(default, never):Int = _DIRECT;
}
