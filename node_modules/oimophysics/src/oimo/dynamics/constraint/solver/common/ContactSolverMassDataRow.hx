package oimo.dynamics.constraint.solver.common;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Internal class.
 */
@:dox(hide)
@:build(oimo.m.B.bu())
class ContactSolverMassDataRow {
	// normal impulse -> linear/angular velocity change
	public var invMLinN1:IVec3;
	public var invMLinN2:IVec3;
	public var invMAngN1:IVec3;
	public var invMAngN2:IVec3;

	// tangent impulse -> linear/angular velocity change
	public var invMLinT1:IVec3;
	public var invMLinT2:IVec3;
	public var invMAngT1:IVec3;
	public var invMAngT2:IVec3;

	// binormal impulse -> linear/angular velocity change
	public var invMLinB1:IVec3;
	public var invMLinB2:IVec3;
	public var invMAngB1:IVec3;
	public var invMAngB2:IVec3;

	// normal mass
	public var massN:Float;

	// tangent/binormal mass matrix for cone friction
	public var massTB00:Float;
	public var massTB01:Float;
	public var massTB10:Float;
	public var massTB11:Float;

	public function new() {
		M.vec3_zero(invMLinN1);
		M.vec3_zero(invMLinN2);
		M.vec3_zero(invMAngN1);
		M.vec3_zero(invMAngN2);

		M.vec3_zero(invMLinT1);
		M.vec3_zero(invMLinT2);
		M.vec3_zero(invMAngT1);
		M.vec3_zero(invMAngT2);

		M.vec3_zero(invMLinB1);
		M.vec3_zero(invMLinB2);
		M.vec3_zero(invMAngB1);
		M.vec3_zero(invMAngB2);

		massN = 0;

		massTB00 = 0;
		massTB01 = 0;
		massTB10 = 0;
		massTB11 = 0;
	}
}
