package oimo.common;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.MathUtil;
// using M; // mixing it in causes errors :(

/**
 * 3D vector class.
 */
#if !macro
@:build(oimo.m.B.bu())
#end
class Vec3 {
	/**
	 * The number of instance creation.
	 */
	public static var numCreations:Int = 0;

	/**
	 * The x-value of the vector.
	 */
	public var x:Float;

	/**
	 * The y-value of the vector.
	 */
	public var y:Float;

	/**
	 * The z-value of the vector.
	 */
	public var z:Float;

	/**
	 * Creates a new vector. The vector is zero vector by default.
	 */
	public inline function new(x:Float = 0, y:Float = 0, z:Float = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		numCreations++;
	}

	/**
	 * Sets all values at once and returns `this`.
	 */
	public function init(x:Float, y:Float, z:Float):Vec3 {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	/**
	 * Sets this vector to zero vector and returns `this`.
	 */
	public function zero():Vec3 {
		return initi(0, 0, 0);
	}

	extern inline function initi(x:Float, y:Float, z:Float):Vec3 {
		var tx:Float = x;
		var ty:Float = y;
		var tz:Float = z;
		this.x = tx;
		this.y = ty;
		this.z = tz;
		return this;
	}

	/**
	 * Returns `this` + `v`.
	 */
	public inline function add(v:Vec3):Vec3 {
		return new Vec3(x + v.x, y + v.y, z + v.z);
	}

	/**
	 * Returns (`this.x` + `vx`, `this.y` + `vy`, `this.z` + `vz`).
	 */
	public inline function add3(vx:Float, vy:Float, vz:Float):Vec3 {
		return new Vec3(x + vx, y + vy, z + vz);
	}

	/**
	 * Returns `this` + `v` * `s`.
	 */
	public inline function addScaled(v:Vec3, s:Float):Vec3 {
		return new Vec3(x + v.x * s, y + v.y * s, z + v.z * s);
	}

	/**
	 * Returns `this` - `v`.
	 */
	public inline function sub(v:Vec3):Vec3 {
		return new Vec3(x - v.x, y - v.y, z - v.z);
	}

	/**
	 * Returns (`this.x` - `vx`, `this.y` - `vy`, `this.z` - `vz`).
	 */
	public inline function sub3(vx:Float, vy:Float, vz:Float):Vec3 {
		return new Vec3(x - vx, y - vy, z - vz);
	}

	/**
	 * Returns `this` * `s`.
	 */
	public inline function scale(s:Float):Vec3 {
		return new Vec3(x * s, y * s, z * s);
	}

	/**
	 * Returns (`this.x` * `sx`, `this.y` * `sy`, `this.z` * `sz`).
	 */
	public inline function scale3(sx:Float, sy:Float, sz:Float):Vec3 {
		return new Vec3(x * sx, y * sy, z * sz);
	}

	/**
	 * Returns the dot product of `this` and `v`.
	 */
	public inline function dot(v:Vec3):Float {
		return x * v.x + y * v.y + z * v.z;
	}

	/**
	 * Returns the cross product of `this` and `v`.
	 */
	public inline function cross(v:Vec3):Vec3 {
		return new Vec3(
			y * v.z - z * v.y,
			z * v.x - x * v.z,
			x * v.y - y * v.x
		);
	}

	/**
	 * Sets this vector to `this` + `v` and returns `this`.
	 */
	public inline function addEq(v:Vec3):Vec3 {
		return initi(x + v.x, y + v.y, z + v.z);
	}

	/**
	 * Sets this vector to (`this.x` + `vx`, `this.y` + `vy`, `this.z` + `vz`) and returns `this`.
	 */
	public inline function add3Eq(vx:Float, vy:Float, vz:Float):Vec3 {
		return initi(x + vx, y + vy, z + vz);
	}

	/**
	 * Sets this vector to `this` + `v` * `s` and returns `this`.
	 */
	public inline function addScaledEq(v:Vec3, s:Float):Vec3 {
		return initi(x + v.x * s, y + v.y * s, z + v.z * s);
	}

	/**
	 * Sets this vector to `this` - `v` and returns `this`.
	 */
	public inline function subEq(v:Vec3):Vec3 {
		return initi(x - v.x, y - v.y, z - v.z);
	}

	/**
	 * Sets this vector to (`this.x` - `vx`, `this.y` - `vy`, `this.z` - `vz`) and returns `this`.
	 */
	public inline function sub3Eq(vx:Float, vy:Float, vz:Float):Vec3 {
		return initi(x - vx, y - vy, z - vz);
	}

	/**
	 * Sets this vector to `this` * `s` and returns `this`.
	 */
	public inline function scaleEq(s:Float):Vec3 {
		return initi(x * s, y * s, z * s);
	}

	/**
	 * Sets this vector to (`this.x` * `sx`, `this.y` * `sy`, `this.z` * `sz`) and returns `this`.
	 */
	public inline function scale3Eq(sx:Float, sy:Float, sz:Float):Vec3 {
		return initi(x * sx, y * sy, z * sz);
	}

	/**
	 * Sets this vector to the cross product of `this` and `s`, and returns `this`.
	 */
	public inline function crossEq(v:Vec3):Vec3 {
		return initi(
			y * v.z - z * v.y,
			z * v.x - x * v.z,
			x * v.y - y * v.x
		);
	}

	/**
	 * Returns the transformed vector by `m`.
	 */
	public inline function mulMat3(m:Mat3):Vec3 {
		return new Vec3(
			x * m.e00 + y * m.e01 + z * m.e02,
			x * m.e10 + y * m.e11 + z * m.e12,
			x * m.e20 + y * m.e21 + z * m.e22
		);
	}

	/**
	 * Returns the transformed vector by `m`.
	 */
	public inline function mulMat4(m:Mat4):Vec3 {
		return new Vec3(
			x * m.e00 + y * m.e01 + z * m.e02 + m.e03,
			x * m.e10 + y * m.e11 + z * m.e12 + m.e13,
			x * m.e20 + y * m.e21 + z * m.e22 + m.e23
		);
	}

	/**
	 * Returns the transformed vector by `tf`.
	 */
	public inline function mulTransform(tf:Transform):Vec3 {
		var v:IVec3;
		M.vec3_fromVec3(v, this);
		M.vec3_mulMat3(v, v, tf._rotation);
		M.vec3_add(v, v, tf._position);
		var res:Vec3 = new Vec3();
		M.vec3_toVec3(res, v);
		return res;
	}

	/**
	 * Sets this vector to the transformed vector by `m` and returns `this`.
	 */
	public inline function mulMat3Eq(m:Mat3):Vec3 {
		return initi(
			x * m.e00 + y * m.e01 + z * m.e02,
			x * m.e10 + y * m.e11 + z * m.e12,
			x * m.e20 + y * m.e21 + z * m.e22
		);
	}

	/**
	 * Sets this vector to the transformed vector by `m` and returns `this`.
	 */
	public inline function mulMat4Eq(m:Mat4):Vec3 {
		return initi(
			x * m.e00 + y * m.e01 + z * m.e02 + m.e03,
			x * m.e10 + y * m.e11 + z * m.e12 + m.e13,
			x * m.e20 + y * m.e21 + z * m.e22 + m.e23
		);
	}

	/**
	 * Sets this vector to the transformed vector by `tf` and returns `this`.
	 */
	public inline function mulTransformEq(tf:Transform):Vec3 {
		var v:IVec3;
		M.vec3_fromVec3(v, this);
		M.vec3_mulMat3(v, v, tf._rotation);
		M.vec3_add(v, v, tf._position);
		M.vec3_toVec3(this, v);
		return this;
	}

	/**
	 * Returns the length of the vector.
	 */
	public inline function length():Float {
		return MathUtil.sqrt(x * x + y * y + z * z);
	}

	/**
	 * Returns the squared length of the vector.
	 */
	public inline function lengthSq():Float {
		return x * x + y * y + z * z;
	}

	/**
	 * Returns the normalized vector.
	 *
	 * If the length is zero, zero vector is returned.
	 */
	public inline function normalized():Vec3 {
		var invLen:Float = length();
		if (invLen > 0) invLen = 1 / invLen;
		return new Vec3(x * invLen, y * invLen, z * invLen);
	}

	/**
	 * Normalize this vector and returns `this`.
	 *
	 * If the length is zero, this vector is set to zero vector.
	 */
	public inline function normalize():Vec3 {
		var invLen:Float = length();
		if (invLen > 0) invLen = 1 / invLen;
		return initi(x * invLen, y * invLen, z * invLen);
	}

	/**
	 * Returns the nagated vector.
	 */
	public inline function negate():Vec3 {
		return new Vec3(-x, -y, -z);
	}

	/**
	 * Negate the vector and returns `this`.
	 */
	public inline function negateEq():Vec3 {
		return initi(-x, -y, -z);
	}

	/**
	 * Copies values from `v` and returns `this`.
	 */
	public inline function copyFrom(v:Vec3):Vec3 {
		x = v.x;
		y = v.y;
		z = v.z;
		return this;
	}

	/**
	 * Returns a clone of the vector.
	 */
	public inline function clone():Vec3 {
		return new Vec3(x, y, z);
	}

	/**
	 * Returns the string representation of the vector.
	 */
	public function toString():String {
		return
			"Vec3[" + M.toFixed8(x) + ", " + M.toFixed8(y) + ", " + M.toFixed8(z) + "]"
		;
	}

}
