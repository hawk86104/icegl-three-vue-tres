package oimo.common;
import haxe.ds.Vector;
import haxe.macro.Expr;
import oimo.common.Mat4;
import oimo.common.Vec3;
import oimo.m.M;
import oimo.common.Quat;

/**
 * The object pool system of `Vec3`, `Mat3`, `Mat4`, and `Quat`.
 */
class Pool {
	var stackVec3:Vector<Vec3>;
	var sizeVec3:Int;
	var stackMat3:Vector<Mat3>;
	var sizeMat3:Int;
	var stackMat4:Vector<Mat4>;
	var sizeMat4:Int;
	var stackQuat:Vector<Quat>;
	var sizeQuat:Int;

	/**
	 * Default constructor.
	 */
	public function new() {
		stackVec3 = new Vector<Vec3>(256);
		sizeVec3 = 0;
		stackMat3 = new Vector<Mat3>(256);
		sizeMat3 = 0;
		stackMat4 = new Vector<Mat4>(256);
		sizeMat4 = 0;
		stackQuat = new Vector<Quat>(256);
		sizeQuat = 0;
	}

	/**
	 * Returns a `Vec3` object. If an unused object of `Vec3` is pooled, this does
	 * not create a new instance.
	 */
	public inline function vec3():Vec3 {
		return get(stackVec3, sizeVec3, new Vec3());
	}

	/**
	 * Returns a `Mat3` object. If an unused object of `Mat3` is pooled, this does
	 * not create a new instance.
	 */
	public inline function mat3():Mat3 {
		return get(stackMat3, sizeMat3, new Mat3());
	}

	/**
	 * Returns a `Mat4` object. If an unused object of `Vec3` is pooled, this does
	 * not create a new instance.
	 */
	public inline function mat4():Mat4 {
		return get(stackMat4, sizeMat4, new Mat4());
	}

	/**
	 * Returns a `Quat` object. If an unused object of `Quat` is pooled, this does
	 * not create a new instance.
	 */
	public inline function quat():Quat {
		return get(stackQuat, sizeQuat, new Quat());
	}

	/**
	 * Disposes an object got from `Pool.vec3`, `Pool.mat3`, `Pool.mat4`, or `Pool.quat`.
	 */
	public inline function dispose(?vec3:Vec3, ?mat3:Mat3, ?mat4:Mat4, ?quat:Quat):Void {
		if (vec3 != null) {
			disposeVec3(vec3);
		}
		if (mat3 != null) {
			disposeMat3(mat3);
		}
		if (mat4 != null) {
			disposeMat4(mat4);
		}
		if (quat != null) {
			disposeQuat(quat);
		}
	}

	/**
	 * Disposes an `Vec3` object got from `Pool.vec3`.
	 */
	public inline function disposeVec3(v:Vec3):Void {
		v.zero();
		_dispose(stackVec3, sizeVec3, v);
	}

	/**
	 * Disposes an `Mat3` object got from `Pool.mat3`.
	 */
	public inline function disposeMat3(m:Mat3):Void {
		m.identity();
		_dispose(stackMat3, sizeMat3, m);
	}

	/**
	 * Disposes an `Mat4` object got from `Pool.mat4`.
	 */
	public inline function disposeMat4(m:Mat4):Void {
		m.identity();
		_dispose(stackMat4, sizeMat4, m);
	}

	/**
	 * Disposes an `Quat` object got from `Pool.quat`.
	 */
	public inline function disposeQuat(q:Quat):Void {
		q.identity();
		_dispose(stackQuat, sizeQuat, q);
	}

	macro static function get(stack:Expr, size:Expr, newObj:Expr):Expr {
		return macro
			if ($size == 0) {
				$newObj;
			} else {
				$stack[--$size];
			}
		;
	}

	macro static function _dispose(stack:Expr, size:Expr, obj:Expr):Expr {
		return macro {
			if ($size == $stack.length) {
				M.array_expand($stack, $size);
			}
			$stack[$size++] = $obj;
		};
	}

}
