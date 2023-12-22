package oimo.dynamics.constraint.solver.common;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Internal class.
 */
@:dox(hide)
@:build(oimo.m.B.bu())
class JointSolverMassDataRow {
	// impulse -> linear/angular velocity change
	public var invMLin1:IVec3;
	public var invMLin2:IVec3;
	public var invMAng1:IVec3;
	public var invMAng2:IVec3;

	// mass
	public var mass:Float;
	public var massWithoutCfm:Float;

	public function new() {
		M.vec3_zero(invMLin1);
		M.vec3_zero(invMLin2);
		M.vec3_zero(invMAng1);
		M.vec3_zero(invMAng2);

		mass = 0;
		massWithoutCfm = 0;
	}
}
