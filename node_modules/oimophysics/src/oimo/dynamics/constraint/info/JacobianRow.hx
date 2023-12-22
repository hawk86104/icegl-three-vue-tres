package oimo.dynamics.constraint.info;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * The row of a Jacobian matrix.
 */
@:dox(hide)
@:build(oimo.m.B.bu())
class JacobianRow {
	public var lin1:IVec3;
	public var lin2:IVec3;
	public var ang1:IVec3;
	public var ang2:IVec3;

	static inline var BIT_LINEAR_SET:Int = 1;
	static inline var BIT_ANGULAR_SET:Int = 2;
	var flag:Int; // sparsity flag

	public function new() {
		M.vec3_zero(lin1);
		M.vec3_zero(lin2);
		M.vec3_zero(ang1);
		M.vec3_zero(ang2);
		flag = 0;
	}

	extern public inline function clear():Void {
		M.vec3_zero(lin1);
		M.vec3_zero(lin2);
		M.vec3_zero(ang1);
		M.vec3_zero(ang2);
	}

	public function updateSparsity():Void {
		flag = 0;
		if (!M.vec3_isZero(lin1) || !M.vec3_isZero(lin2)) {
			flag |= BIT_LINEAR_SET;
		}
		if (!M.vec3_isZero(ang1) || !M.vec3_isZero(ang2)) {
			flag |= BIT_ANGULAR_SET;
		}
	}

	extern public inline function isLinearSet():Bool {
		return flag & BIT_LINEAR_SET != 0;
	}

	extern public inline function isAngularSet():Bool {
		return flag & BIT_ANGULAR_SET != 0;
	}

}
