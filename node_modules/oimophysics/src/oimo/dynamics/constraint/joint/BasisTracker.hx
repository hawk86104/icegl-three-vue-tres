package oimo.dynamics.constraint.joint;
import oimo.m.IMat3;
import oimo.m.IQuat;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Internal class
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class BasisTracker {
	var joint:Joint;

	public var x:IVec3;
	public var y:IVec3;
	public var z:IVec3;

	public function new(joint:Joint) {
		this.joint = joint;
		M.vec3_zero(x);
		M.vec3_zero(y);
		M.vec3_zero(z);
	}

	extern public inline function trackByX():Void {
		trackByAxis(0);
	}

	extern public inline function trackByY():Void {
		trackByAxis(1);
	}

	extern public inline function trackByZ():Void {
		trackByAxis(2);
	}

	extern inline function trackByAxis(axis:Int):Void {
		var invM1:Float = joint._b1._invMass;
		var invM2:Float = joint._b2._invMass;
		var q:IQuat;
		var idQ:IQuat;
		var slerpQ:IQuat;
		var slerpM:IMat3;

		var newX:IVec3;
		var newY:IVec3;
		var newZ:IVec3;

		var prevX:IVec3;
		var prevY:IVec3;

		if (axis == 0) {
			// compute X'
			M.quat_arc(q, joint._basisX1, joint._basisX2);
			M.quat_id(idQ);
			M.quat_slerp(slerpQ, idQ, q, invM1 / (invM1 + invM2));
			M.mat3_fromQuat(slerpM, slerpQ);
			M.vec3_mulMat3(newX, joint._basisX1, slerpM);

			// set X, Y
			M.vec3_assign(prevX, x);
			M.vec3_assign(prevY, y);
		} else if (axis == 1) {
			// compute X'
			M.quat_arc(q, joint._basisY1, joint._basisY2);
			M.quat_id(idQ);
			M.quat_slerp(slerpQ, idQ, q, invM1 / (invM1 + invM2));
			M.mat3_fromQuat(slerpM, slerpQ);
			M.vec3_mulMat3(newX, joint._basisY1, slerpM);

			// set X, Y
			M.vec3_assign(prevX, y);
			M.vec3_assign(prevY, z);
		} else {
			// compute X'
			M.quat_arc(q, joint._basisZ1, joint._basisZ2);
			M.quat_id(idQ);
			M.quat_slerp(slerpQ, idQ, q, invM1 / (invM1 + invM2));
			M.mat3_fromQuat(slerpM, slerpQ);
			M.vec3_mulMat3(newX, joint._basisZ1, slerpM);

			// set X, Y
			M.vec3_assign(prevX, z);
			M.vec3_assign(prevY, x);
		}

		// we compute Y' and Z' from X, Y, and X' (new basis: <X', Y', Z'>, previous basis: <X, Y, Z>)
		// in following algorithm:
		//   slerp = X -> X'
		//   Y'' = slerp(Y)
		//   Z'' = X' cross Y''
		//   if |Z''| > eps then
		//     Z' = normalize(Z'')
		//   else
		//     Z' = perp(X')         # give up rotating previous basis
		//   Y' = Z' cross X'

		// slerp = X -> X'
		M.quat_arc(slerpQ, prevX, newX);
		M.mat3_fromQuat(slerpM, slerpQ);

		// Y'' = slerp(Y)
		M.vec3_mulMat3(newY, prevY, slerpM);

		// Z'' = X cross Y''
		M.vec3_cross(newZ, newX, newY);

		if (M.vec3_dot(newZ, newZ) > 1e-6) {
			// Z' = normalize(Z'')
			M.vec3_normalize(newZ, newZ);
		} else {
			// failed to rotate previous basis, build a new right-handed orthonormal system
			M.vec3_perp(newZ, newX);
		}

		// Y' = Z' cross X'
		M.vec3_cross(newY, newZ, newX);

		if (axis == 0) {
			M.vec3_assign(x, newX);
			M.vec3_assign(y, newY);
			M.vec3_assign(z, newZ);
		} else if (axis == 1) {
			M.vec3_assign(x, newZ);
			M.vec3_assign(y, newX);
			M.vec3_assign(z, newY);
		} else {
			M.vec3_assign(x, newY);
			M.vec3_assign(y, newZ);
			M.vec3_assign(z, newX);
		}

	}

}
