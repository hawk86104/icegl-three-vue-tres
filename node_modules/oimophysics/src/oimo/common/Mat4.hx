package oimo.common;
import oimo.m.M;

/**
 * 4x4 Matrix class.
 *
 * Note that columns and rows are 0-indexed.
 */
class Mat4 {
	/**
	 * The number of instance creation.
	 */
	public static var numCreations:Int = 0;

	/**
	 * The element at row 0 column 0.
	 */
	public var e00:Float;

	/**
	 * The element at row 0 column 1.
	 */
	public var e01:Float;

	/**
	 * The element at row 0 column 2.
	 */
	public var e02:Float;

	/**
	 * The element at row 0 column 3.
	 */
	public var e03:Float;

	/**
	 * The element at row 1 column 0.
	 */
	public var e10:Float;

	/**
	 * The element at row 1 column 1.
	 */
	public var e11:Float;

	/**
	 * The element at row 1 column 2.
	 */
	public var e12:Float;

	/**
	 * The element at row 1 column 3.
	 */
	public var e13:Float;

	/**
	 * The element at row 2 column 0.
	 */
	public var e20:Float;

	/**
	 * The element at row 2 column 1.
	 */
	public var e21:Float;

	/**
	 * The element at row 2 column 2.
	 */
	public var e22:Float;

	/**
	 * The element at row 2 column 3.
	 */
	public var e23:Float;

	/**
	 * The element at row 3 column 0.
	 */
	public var e30:Float;

	/**
	 * The element at row 3 column 1.
	 */
	public var e31:Float;

	/**
	 * The element at row 3 column 2.
	 */
	public var e32:Float;

	/**
	 * The element at row 3 column 3.
	 */
	public var e33:Float;

	/**
	 * Creates a new matrix. The matrix is identity by default.
	 */
	public inline function new(
		e00:Float = 1, e01:Float = 0, e02:Float = 0, e03:Float = 0,
		e10:Float = 0, e11:Float = 1, e12:Float = 0, e13:Float = 0,
		e20:Float = 0, e21:Float = 0, e22:Float = 1, e23:Float = 0,
		e30:Float = 0, e31:Float = 0, e32:Float = 0, e33:Float = 1
	) {
		this.e00 = e00;
		this.e01 = e01;
		this.e02 = e02;
		this.e03 = e03;
		this.e10 = e10;
		this.e11 = e11;
		this.e12 = e12;
		this.e13 = e13;
		this.e20 = e20;
		this.e21 = e21;
		this.e22 = e22;
		this.e23 = e23;
		this.e30 = e30;
		this.e31 = e31;
		this.e32 = e32;
		this.e33 = e33;
		numCreations++;
	}

	extern inline function _init(
		e00:Float, e01:Float, e02:Float, e03:Float,
		e10:Float, e11:Float, e12:Float, e13:Float,
		e20:Float, e21:Float, e22:Float, e23:Float,
		e30:Float, e31:Float, e32:Float, e33:Float
	):Mat4 {
		var t00:Float = e00;
		var t01:Float = e01;
		var t02:Float = e02;
		var t03:Float = e03;
		var t10:Float = e10;
		var t11:Float = e11;
		var t12:Float = e12;
		var t13:Float = e13;
		var t20:Float = e20;
		var t21:Float = e21;
		var t22:Float = e22;
		var t23:Float = e23;
		var t30:Float = e30;
		var t31:Float = e31;
		var t32:Float = e32;
		var t33:Float = e33;
		this.e00 = t00;
		this.e01 = t01;
		this.e02 = t02;
		this.e03 = t03;
		this.e10 = t10;
		this.e11 = t11;
		this.e12 = t12;
		this.e13 = t13;
		this.e20 = t20;
		this.e21 = t21;
		this.e22 = t22;
		this.e23 = t23;
		this.e30 = t30;
		this.e31 = t31;
		this.e32 = t32;
		this.e33 = t33;
		return this;
	}

	// --- public ---

	/**
	 * Sets all elements at once and returns `this`.
	 */
	public inline function init(
		e00:Float, e01:Float, e02:Float, e03:Float,
		e10:Float, e11:Float, e12:Float, e13:Float,
		e20:Float, e21:Float, e22:Float, e23:Float,
		e30:Float, e31:Float, e32:Float, e33:Float
	):Mat4 {
		this.e00 = e00;
		this.e01 = e01;
		this.e02 = e02;
		this.e03 = e03;
		this.e10 = e10;
		this.e11 = e11;
		this.e12 = e12;
		this.e13 = e13;
		this.e20 = e20;
		this.e21 = e21;
		this.e22 = e22;
		this.e23 = e23;
		this.e30 = e30;
		this.e31 = e31;
		this.e32 = e32;
		this.e33 = e33;
		return this;
	}

	/**
	 * Sets this matrix to identity matrix and returns `this`.
	 */
	public inline function identity():Mat4 {
		_init(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		);
		return this;
	}

	/**
	 * Returns `this` + `m`
	 */
	public inline function add(m:Mat4):Mat4 {
		return new Mat4(
			e00 + m.e00, e01 + m.e01, e02 + m.e02, e03 + m.e03,
			e10 + m.e10, e11 + m.e11, e12 + m.e12, e13 + m.e13,
			e20 + m.e20, e21 + m.e21, e22 + m.e22, e23 + m.e23,
			e30 + m.e30, e31 + m.e31, e32 + m.e32, e33 + m.e33
		);
	}

	/**
	 * Returns `this` - `m`
	 */
	public inline function sub(m:Mat4):Mat4 {
		return new Mat4(
			e00 - m.e00, e01 - m.e01, e02 - m.e02, e03 - m.e03,
			e10 - m.e10, e11 - m.e11, e12 - m.e12, e13 - m.e13,
			e20 - m.e20, e21 - m.e21, e22 - m.e22, e23 - m.e23,
			e30 - m.e30, e31 - m.e31, e32 - m.e32, e33 - m.e33
		);
	}

	/**
	 * Returns `this` * `s`
	 */
	public inline function scale(s:Float):Mat4 {
		return new Mat4(
			e00 * s, e01 * s, e02 * s, e03 * s,
			e10 * s, e11 * s, e12 * s, e13 * s,
			e20 * s, e21 * s, e22 * s, e23 * s,
			e30 * s, e31 * s, e32 * s, e33 * s
		);
	}

	/**
	 * Returns `this` * `m`
	 */
	public inline function mul(m:Mat4):Mat4 {
		return new Mat4(
			e00 * m.e00 + e01 * m.e10 + e02 * m.e20 + e03 * m.e30,
			e00 * m.e01 + e01 * m.e11 + e02 * m.e21 + e03 * m.e31,
			e00 * m.e02 + e01 * m.e12 + e02 * m.e22 + e03 * m.e32,
			e00 * m.e03 + e01 * m.e13 + e02 * m.e23 + e03 * m.e33,
			e10 * m.e00 + e11 * m.e10 + e12 * m.e20 + e13 * m.e30,
			e10 * m.e01 + e11 * m.e11 + e12 * m.e21 + e13 * m.e31,
			e10 * m.e02 + e11 * m.e12 + e12 * m.e22 + e13 * m.e32,
			e10 * m.e03 + e11 * m.e13 + e12 * m.e23 + e13 * m.e33,
			e20 * m.e00 + e21 * m.e10 + e22 * m.e20 + e23 * m.e30,
			e20 * m.e01 + e21 * m.e11 + e22 * m.e21 + e23 * m.e31,
			e20 * m.e02 + e21 * m.e12 + e22 * m.e22 + e23 * m.e32,
			e20 * m.e03 + e21 * m.e13 + e22 * m.e23 + e23 * m.e33,
			e30 * m.e00 + e31 * m.e10 + e32 * m.e20 + e33 * m.e30,
			e30 * m.e01 + e31 * m.e11 + e32 * m.e21 + e33 * m.e31,
			e30 * m.e02 + e31 * m.e12 + e32 * m.e22 + e33 * m.e32,
			e30 * m.e03 + e31 * m.e13 + e32 * m.e23 + e33 * m.e33
		);
	}

	/**
	 * Sets this matrix to `this` + `m` and returns `this`.
	 */
	public inline function addEq(m:Mat4):Mat4 {
		return _init(
			e00 + m.e00, e01 + m.e01, e02 + m.e02, e03 + m.e03,
			e10 + m.e10, e11 + m.e11, e12 + m.e12, e13 + m.e13,
			e20 + m.e20, e21 + m.e21, e22 + m.e22, e23 + m.e23,
			e30 + m.e30, e31 + m.e31, e32 + m.e32, e33 + m.e33
		);
	}

	/**
	 * Sets this matrix to `this` - `m` and returns `this`.
	 */
	public inline function subEq(m:Mat4):Mat4 {
		return _init(
			e00 - m.e00, e01 - m.e01, e02 - m.e02, e03 - m.e03,
			e10 - m.e10, e11 - m.e11, e12 - m.e12, e13 - m.e13,
			e20 - m.e20, e21 - m.e21, e22 - m.e22, e23 - m.e23,
			e30 - m.e30, e31 - m.e31, e32 - m.e32, e33 - m.e33
		);
	}

	/**
	 * Sets this matrix to `this` * `s` and returns `this`.
	 */
	public inline function scaleEq(s:Float):Mat4 {
		return _init(
			e00 * s, e01 * s, e02 * s, e03 * s,
			e10 * s, e11 * s, e12 * s, e13 * s,
			e20 * s, e21 * s, e22 * s, e23 * s,
			e30 * s, e31 * s, e32 * s, e33 * s
		);
	}

	/**
	 * Sets this matrix to `this` * `m` and returns `this`.
	 */
	public inline function mulEq(m:Mat4):Mat4 {
		return _init(
			e00 * m.e00 + e01 * m.e10 + e02 * m.e20 + e03 * m.e30,
			e00 * m.e01 + e01 * m.e11 + e02 * m.e21 + e03 * m.e31,
			e00 * m.e02 + e01 * m.e12 + e02 * m.e22 + e03 * m.e32,
			e00 * m.e03 + e01 * m.e13 + e02 * m.e23 + e03 * m.e33,
			e10 * m.e00 + e11 * m.e10 + e12 * m.e20 + e13 * m.e30,
			e10 * m.e01 + e11 * m.e11 + e12 * m.e21 + e13 * m.e31,
			e10 * m.e02 + e11 * m.e12 + e12 * m.e22 + e13 * m.e32,
			e10 * m.e03 + e11 * m.e13 + e12 * m.e23 + e13 * m.e33,
			e20 * m.e00 + e21 * m.e10 + e22 * m.e20 + e23 * m.e30,
			e20 * m.e01 + e21 * m.e11 + e22 * m.e21 + e23 * m.e31,
			e20 * m.e02 + e21 * m.e12 + e22 * m.e22 + e23 * m.e32,
			e20 * m.e03 + e21 * m.e13 + e22 * m.e23 + e23 * m.e33,
			e30 * m.e00 + e31 * m.e10 + e32 * m.e20 + e33 * m.e30,
			e30 * m.e01 + e31 * m.e11 + e32 * m.e21 + e33 * m.e31,
			e30 * m.e02 + e31 * m.e12 + e32 * m.e22 + e33 * m.e32,
			e30 * m.e03 + e31 * m.e13 + e32 * m.e23 + e33 * m.e33
		);
	}

	/**
	 * Returns *scaling matrix* * `this`.
	 *
	 * Where *scaling matrix* is a matrix which scales `sx` times, `sy` times and
	 * `sz` times along the x-axis, y-axis and z-axis respectively.
	 */
	public inline function prependScale(sx:Float, sy:Float, sz:Float):Mat4 {
		return new Mat4(
			e00 * sx, e01 * sx, e02 * sx, e03 * sx,
			e10 * sy, e11 * sy, e12 * sy, e13 * sy,
			e20 * sz, e21 * sz, e22 * sz, e23 * sz,
			e30, e31, e32, e33
		);
	}

	/**
	 * Returns `this` * *scaling matrix*.
	 *
	 * Where *scaling matrix* is a matrix which scales `sx` times, `sy` times and
	 * `sz` times along the x-axis, y-axis and z-axis respectively.
	 */
	public inline function appendScale(sx:Float, sy:Float, sz:Float):Mat4 {
		return new Mat4(
			e00 * sx, e01 * sy, e02 * sz, e03,
			e10 * sx, e11 * sy, e12 * sz, e13,
			e20 * sx, e21 * sy, e22 * sz, e23,
			e30 * sx, e31 * sy, e32 * sz, e33
		);
	}

	/**
	 * Returns *rotation matrix* * `this`.
	 *
	 * Where *rotation matrix* is a matrix which rotates `rad` in radians around the **normalized**
	 * vector (`axisX`, `axisY`, `axisZ`).
	 */
	public inline function prependRotation(rad:Float, axisX:Float, axisY:Float, axisZ:Float):Mat4 {
		var s:Float = MathUtil.sin(rad);
		var c:Float = MathUtil.cos(rad);
		var c1:Float = 1 - c;
		var r00:Float = axisX * axisX * c1 + c;
		var r01:Float = axisX * axisY * c1 - axisZ * s;
		var r02:Float = axisX * axisZ * c1 + axisY * s;
		var r10:Float = axisY * axisX * c1 + axisZ * s;
		var r11:Float = axisY * axisY * c1 + c;
		var r12:Float = axisY * axisZ * c1 - axisX * s;
		var r20:Float = axisZ * axisX * c1 - axisY * s;
		var r21:Float = axisZ * axisY * c1 + axisX * s;
		var r22:Float = axisZ * axisZ * c1 + c;
		return new Mat4(
			r00 * e00 + r01 * e10 + r02 * e20,
			r00 * e01 + r01 * e11 + r02 * e21,
			r00 * e02 + r01 * e12 + r02 * e22,
			r00 * e03 + r01 * e13 + r02 * e23,
			r10 * e00 + r11 * e10 + r12 * e20,
			r10 * e01 + r11 * e11 + r12 * e21,
			r10 * e02 + r11 * e12 + r12 * e22,
			r10 * e03 + r11 * e13 + r12 * e23,
			r20 * e00 + r21 * e10 + r22 * e20,
			r20 * e01 + r21 * e11 + r22 * e21,
			r20 * e02 + r21 * e12 + r22 * e22,
			r20 * e03 + r21 * e13 + r22 * e23,
			e30, e31, e32, e33
		);
	}

	/**
	 * Returns `this` * *rotation matrix*.
	 *
	 * Where *rotation matrix* is a matrix which rotates `rad` in radians around the **normalized**
	 * vector (`axisX`, `axisY`, `axisZ`).
	 */
	public inline function appendRotation(rad:Float, axisX:Float, axisY:Float, axisZ:Float):Mat4 {
		var s:Float = MathUtil.sin(rad);
		var c:Float = MathUtil.cos(rad);
		var c1:Float = 1 - c;
		var r00:Float = axisX * axisX * c1 + c;
		var r01:Float = axisX * axisY * c1 - axisZ * s;
		var r02:Float = axisX * axisZ * c1 + axisY * s;
		var r10:Float = axisY * axisX * c1 + axisZ * s;
		var r11:Float = axisY * axisY * c1 + c;
		var r12:Float = axisY * axisZ * c1 - axisX * s;
		var r20:Float = axisZ * axisX * c1 - axisY * s;
		var r21:Float = axisZ * axisY * c1 + axisX * s;
		var r22:Float = axisZ * axisZ * c1 + c;
		return new Mat4(
			e00 * r00 + e01 * r10 + e02 * r20,
			e00 * r01 + e01 * r11 + e02 * r21,
			e00 * r02 + e01 * r12 + e02 * r22,
			e03,
			e10 * r00 + e11 * r10 + e12 * r20,
			e10 * r01 + e11 * r11 + e12 * r21,
			e10 * r02 + e11 * r12 + e12 * r22,
			e13,
			e20 * r00 + e21 * r10 + e22 * r20,
			e20 * r01 + e21 * r11 + e22 * r21,
			e20 * r02 + e21 * r12 + e22 * r22,
			e23,
			e30 * r00 + e31 * r10 + e32 * r20,
			e30 * r01 + e31 * r11 + e32 * r21,
			e30 * r02 + e31 * r12 + e32 * r22,
			e33
		);
	}

	/**
	 * Returns *translation matrix* * `this`.
	 *
	 * Where *translation matrix* is a matrix which translates `sx`, `sy` and `sz` along
	 * the x-axis, y-axis and z-axis respectively.
	 */
	public inline function prependTranslation(tx:Float, ty:Float, tz:Float):Mat4 {
		return new Mat4(
			e00 + tx * e30, e01 + tx * e31, e02 + tx * e32, e03 + tx * e33,
			e10 + ty * e30, e11 + ty * e31, e12 + ty * e32, e13 + ty * e33,
			e20 + tz * e30, e21 + tz * e31, e22 + tz * e32, e23 + tz * e33,
			e30, e31, e32, e33
		);
	}

	/**
	 * Returns `this` * *translation matrix*.
	 *
	 * Where *translation matrix* is a matrix which translates `sx`, `sy` and `sz` along
	 * the x-axis, y-axis and z-axis respectively.
	 */
	public inline function appendTranslation(tx:Float, ty:Float, tz:Float):Mat4 {
		return new Mat4(
			e00, e01, e02, e00 * tx + e01 * ty + e02 * tz + e03,
			e10, e11, e12, e10 * tx + e11 * ty + e12 * tz + e13,
			e20, e21, e22, e20 * tx + e21 * ty + e22 * tz + e23,
			e30, e31, e32, e30 * tx + e31 * ty + e32 * tz + e33
		);
	}

	/**
	 * Sets this matrix to *scaling matrix* * `this`, and returns `this`.
	 *
	 * Where *scaling matrix* is a matrix which scales `sx` times, `sy` times and
	 * `sz` times along the x-axis, y-axis and z-axis respectively.
	 */
	public inline function prependScaleEq(sx:Float, sy:Float, sz:Float):Mat4 {
		return _init(
			e00 * sx, e01 * sx, e02 * sx, e03 * sx,
			e10 * sy, e11 * sy, e12 * sy, e13 * sy,
			e20 * sz, e21 * sz, e22 * sz, e23 * sz,
			e30, e31, e32, e33
		);
	}

	/**
	 * Sets this matrix to `this` * *scaling matrix*, and returns `this`.
	 *
	 * Where *scaling matrix* is a matrix which scales `sx` times, `sy` times and
	 * `sz` times along the x-axis, y-axis and z-axis respectively.
	 */
	public inline function appendScaleEq(sx:Float, sy:Float, sz:Float):Mat4 {
		return _init(
			e00 * sx, e01 * sy, e02 * sz, e03,
			e10 * sx, e11 * sy, e12 * sz, e13,
			e20 * sx, e21 * sy, e22 * sz, e23,
			e30 * sx, e31 * sy, e32 * sz, e33
		);
	}

	/**
	 * Sets this matrix to *rotation matrix* * `this`, and returns `this`.
	 *
	 * Where *rotation matrix* is a matrix which rotates `rad` in radians around the **normalized**
	 * vector (`axisX`, `axisY`, `axisZ`).
	 */
	public inline function prependRotationEq(rad:Float, axisX:Float, axisY:Float, axisZ:Float):Mat4 {
		var s:Float = MathUtil.sin(rad);
		var c:Float = MathUtil.cos(rad);
		var c1:Float = 1 - c;
		var r00:Float = axisX * axisX * c1 + c;
		var r01:Float = axisX * axisY * c1 - axisZ * s;
		var r02:Float = axisX * axisZ * c1 + axisY * s;
		var r10:Float = axisY * axisX * c1 + axisZ * s;
		var r11:Float = axisY * axisY * c1 + c;
		var r12:Float = axisY * axisZ * c1 - axisX * s;
		var r20:Float = axisZ * axisX * c1 - axisY * s;
		var r21:Float = axisZ * axisY * c1 + axisX * s;
		var r22:Float = axisZ * axisZ * c1 + c;
		return _init(
			r00 * e00 + r01 * e10 + r02 * e20, r00 * e01 + r01 * e11 + r02 * e21, r00 * e02 + r01 * e12 + r02 * e22, r00 * e03 + r01 * e13 + r02 * e23,
			r10 * e00 + r11 * e10 + r12 * e20, r10 * e01 + r11 * e11 + r12 * e21, r10 * e02 + r11 * e12 + r12 * e22, r10 * e03 + r11 * e13 + r12 * e23,
			r20 * e00 + r21 * e10 + r22 * e20, r20 * e01 + r21 * e11 + r22 * e21, r20 * e02 + r21 * e12 + r22 * e22, r20 * e03 + r21 * e13 + r22 * e23,
			e30, e31, e32, e33
		);
	}

	/**
	 * Sets this matrix to `this` * *rotation matrix*, and returns `this`.
	 *
	 * Where *rotation matrix* is a matrix which rotates `rad` in radians around the **normalized**
	 * vector (`axisX`, `axisY`, `axisZ`).
	 */
	public inline function appendRotationEq(rad:Float, axisX:Float, axisY:Float, axisZ:Float):Mat4 {
		var s:Float = MathUtil.sin(rad);
		var c:Float = MathUtil.cos(rad);
		var c1:Float = 1 - c;
		var r00:Float = axisX * axisX * c1 + c;
		var r01:Float = axisX * axisY * c1 - axisZ * s;
		var r02:Float = axisX * axisZ * c1 + axisY * s;
		var r10:Float = axisY * axisX * c1 + axisZ * s;
		var r11:Float = axisY * axisY * c1 + c;
		var r12:Float = axisY * axisZ * c1 - axisX * s;
		var r20:Float = axisZ * axisX * c1 - axisY * s;
		var r21:Float = axisZ * axisY * c1 + axisX * s;
		var r22:Float = axisZ * axisZ * c1 + c;
		return _init(
			e00 * r00 + e01 * r10 + e02 * r20, e00 * r01 + e01 * r11 + e02 * r21, e00 * r02 + e01 * r12 + e02 * r22, e03,
			e10 * r00 + e11 * r10 + e12 * r20, e10 * r01 + e11 * r11 + e12 * r21, e10 * r02 + e11 * r12 + e12 * r22, e13,
			e20 * r00 + e21 * r10 + e22 * r20, e20 * r01 + e21 * r11 + e22 * r21, e20 * r02 + e21 * r12 + e22 * r22, e23,
			e30 * r00 + e31 * r10 + e32 * r20, e30 * r01 + e31 * r11 + e32 * r21, e30 * r02 + e31 * r12 + e32 * r22, e33
		);
	}

	/**
	 * Sets this matrix to *translation matrix* * `this`, and returns `this`.
	 *
	 * Where *translation matrix* is a matrix which translates `sx`, `sy` and `sz` along
	 * the x-axis, y-axis and z-axis respectively.
	 */
	public inline function prependTranslationEq(tx:Float, ty:Float, tz:Float):Mat4 {
		return _init(
			e00 + tx * e30, e01 + tx * e31, e02 + tx * e32, e03 + tx * e33,
			e10 + ty * e30, e11 + ty * e31, e12 + ty * e32, e13 + ty * e33,
			e20 + tz * e30, e21 + tz * e31, e22 + tz * e32, e23 + tz * e33,
			e30, e31, e32, e33
		);
	}

	/**
	 * Sets this matrix to `this` * *translation matrix*, and returns `this`.
	 *
	 * Where *translation matrix* is a matrix which translates `sx`, `sy` and `sz` along
	 * the x-axis, y-axis and z-axis respectively.
	 */
	public inline function appendTranslationEq(tx:Float, ty:Float, tz:Float):Mat4 {
		return _init(
			e00, e01, e02, e00 * tx + e01 * ty + e02 * tz + e03,
			e10, e11, e12, e10 * tx + e11 * ty + e12 * tz + e13,
			e20, e21, e22, e20 * tx + e21 * ty + e22 * tz + e23,
			e30, e31, e32, e30 * tx + e31 * ty + e32 * tz + e33
		);
	}

	/**
	 * Returns the transposed matrix.
	 */
	public inline function transpose():Mat4 {
		return new Mat4(
			e00, e10, e20, e30,
			e01, e11, e21, e31,
			e02, e12, e22, e32,
			e03, e13, e23, e33
		);
	}

	/**
	 * Sets this matrix to the transposed matrix and returns `this`.
	 */
	public inline function transposeEq():Mat4 {
		return _init(
			e00, e10, e20, e30,
			e01, e11, e21, e31,
			e02, e12, e22, e32,
			e03, e13, e23, e33
		);
	}

	/**
	 * Returns the determinant.
	 */
	public inline function determinant():Float {
		var d23_01:Float = e20 * e31 - e21 * e30;
		var d23_02:Float = e20 * e32 - e22 * e30;
		var d23_03:Float = e20 * e33 - e23 * e30;
		var d23_12:Float = e21 * e32 - e22 * e31;
		var d23_13:Float = e21 * e33 - e23 * e31;
		var d23_23:Float = e22 * e33 - e23 * e32;
		return
			e00 * (e11 * d23_23 - e12 * d23_13 + e13 * d23_12) -
			e01 * (e10 * d23_23 - e12 * d23_03 + e13 * d23_02) +
			e02 * (e10 * d23_13 - e11 * d23_03 + e13 * d23_01) -
			e03 * (e10 * d23_12 - e11 * d23_02 + e12 * d23_01)
		;
	}

	/**
	 * Returns the trace.
	 */
	public inline function trace():Float {
		return e00 + e11 + e22 + e33;
	}

	/**
	 * Returns the inverse matrix.
	 *
	 * If the determinant is zero, zero matrix is returned.
	 */
	public inline function inverse():Mat4 {
		var d01_01:Float = e00 * e11 - e01 * e10;
		var d01_02:Float = e00 * e12 - e02 * e10;
		var d01_03:Float = e00 * e13 - e03 * e10;
		var d01_12:Float = e01 * e12 - e02 * e11;
		var d01_13:Float = e01 * e13 - e03 * e11;
		var d01_23:Float = e02 * e13 - e03 * e12;
		var d23_01:Float = e20 * e31 - e21 * e30;
		var d23_02:Float = e20 * e32 - e22 * e30;
		var d23_03:Float = e20 * e33 - e23 * e30;
		var d23_12:Float = e21 * e32 - e22 * e31;
		var d23_13:Float = e21 * e33 - e23 * e31;
		var d23_23:Float = e22 * e33 - e23 * e32;
		var d00:Float = e11 * d23_23 - e12 * d23_13 + e13 * d23_12;
		var d01:Float = e10 * d23_23 - e12 * d23_03 + e13 * d23_02;
		var d02:Float = e10 * d23_13 - e11 * d23_03 + e13 * d23_01;
		var d03:Float = e10 * d23_12 - e11 * d23_02 + e12 * d23_01;
		var d10:Float = e01 * d23_23 - e02 * d23_13 + e03 * d23_12;
		var d11:Float = e00 * d23_23 - e02 * d23_03 + e03 * d23_02;
		var d12:Float = e00 * d23_13 - e01 * d23_03 + e03 * d23_01;
		var d13:Float = e00 * d23_12 - e01 * d23_02 + e02 * d23_01;
		var d20:Float = e31 * d01_23 - e32 * d01_13 + e33 * d01_12;
		var d21:Float = e30 * d01_23 - e32 * d01_03 + e33 * d01_02;
		var d22:Float = e30 * d01_13 - e31 * d01_03 + e33 * d01_01;
		var d23:Float = e30 * d01_12 - e31 * d01_02 + e32 * d01_01;
		var d30:Float = e21 * d01_23 - e22 * d01_13 + e23 * d01_12;
		var d31:Float = e20 * d01_23 - e22 * d01_03 + e23 * d01_02;
		var d32:Float = e20 * d01_13 - e21 * d01_03 + e23 * d01_01;
		var d33:Float = e20 * d01_12 - e21 * d01_02 + e22 * d01_01;
		var invDet:Float = e00 * d00 - e01 * d01 + e02 * d02 - e03 * d03;
		if (invDet != 0) invDet = 1 / invDet;
		return new Mat4(
			d00 * invDet, -d10 * invDet, d20 * invDet, -d30 * invDet,
			-d01 * invDet, d11 * invDet, -d21 * invDet, d31 * invDet,
			d02 * invDet, -d12 * invDet, d22 * invDet, -d32 * invDet,
			-d03 * invDet, d13 * invDet, -d23 * invDet, d33 * invDet
		);
	}

	/**
	 * Sets this matrix to the inverse matrix and returns `this`.
	 *
	 * If the determinant is zero, this matrix is set to zero matrix.
	 */
	public inline function inverseEq():Mat4 {
		var d01_01:Float = e00 * e11 - e01 * e10;
		var d01_02:Float = e00 * e12 - e02 * e10;
		var d01_03:Float = e00 * e13 - e03 * e10;
		var d01_12:Float = e01 * e12 - e02 * e11;
		var d01_13:Float = e01 * e13 - e03 * e11;
		var d01_23:Float = e02 * e13 - e03 * e12;
		var d23_01:Float = e20 * e31 - e21 * e30;
		var d23_02:Float = e20 * e32 - e22 * e30;
		var d23_03:Float = e20 * e33 - e23 * e30;
		var d23_12:Float = e21 * e32 - e22 * e31;
		var d23_13:Float = e21 * e33 - e23 * e31;
		var d23_23:Float = e22 * e33 - e23 * e32;
		var d00:Float = e11 * d23_23 - e12 * d23_13 + e13 * d23_12;
		var d01:Float = e10 * d23_23 - e12 * d23_03 + e13 * d23_02;
		var d02:Float = e10 * d23_13 - e11 * d23_03 + e13 * d23_01;
		var d03:Float = e10 * d23_12 - e11 * d23_02 + e12 * d23_01;
		var d10:Float = e01 * d23_23 - e02 * d23_13 + e03 * d23_12;
		var d11:Float = e00 * d23_23 - e02 * d23_03 + e03 * d23_02;
		var d12:Float = e00 * d23_13 - e01 * d23_03 + e03 * d23_01;
		var d13:Float = e00 * d23_12 - e01 * d23_02 + e02 * d23_01;
		var d20:Float = e31 * d01_23 - e32 * d01_13 + e33 * d01_12;
		var d21:Float = e30 * d01_23 - e32 * d01_03 + e33 * d01_02;
		var d22:Float = e30 * d01_13 - e31 * d01_03 + e33 * d01_01;
		var d23:Float = e30 * d01_12 - e31 * d01_02 + e32 * d01_01;
		var d30:Float = e21 * d01_23 - e22 * d01_13 + e23 * d01_12;
		var d31:Float = e20 * d01_23 - e22 * d01_03 + e23 * d01_02;
		var d32:Float = e20 * d01_13 - e21 * d01_03 + e23 * d01_01;
		var d33:Float = e20 * d01_12 - e21 * d01_02 + e22 * d01_01;
		var invDet:Float = e00 * d00 - e01 * d01 + e02 * d02 - e03 * d03;
		if (invDet != 0) invDet = 1 / invDet;
		return _init(
			d00 * invDet, -d10 * invDet, d20 * invDet, -d30 * invDet,
			-d01 * invDet, d11 * invDet, -d21 * invDet, d31 * invDet,
			d02 * invDet, -d12 * invDet, d22 * invDet, -d32 * invDet,
			-d03 * invDet, d13 * invDet, -d23 * invDet, d33 * invDet
		);
	}

	/**
	 * Sets this matrix to *view matrix* and returns `this`.
	 *
	 * Where *view matrix* is a matrix which represents the viewing transformation with
	 * eyes at (`eyeX`, `eyeY`, `eyeZ`), fixation point at (`atX`, `atY`, `atZ`), and
	 * up vector (`upX`, `upY`, `upZ`).
	 */
	public inline function lookAt(eyeX:Float, eyeY:Float, eyeZ:Float, atX:Float, atY:Float, atZ:Float, upX:Float, upY:Float, upZ:Float):Mat4 {
		var zx:Float = eyeX - atX;
		var zy:Float = eyeY - atY;
		var zz:Float = eyeZ - atZ;
		var tmp:Float = 1 / MathUtil.sqrt(zx * zx + zy * zy + zz * zz);
		zx *= tmp;
		zy *= tmp;
		zz *= tmp;
		var xx:Float = upY * zz - upZ * zy;
		var xy:Float = upZ * zx - upX * zz;
		var xz:Float = upX * zy - upY * zx;
		tmp = 1 / MathUtil.sqrt(xx * xx + xy * xy + xz * xz);
		xx *= tmp;
		xy *= tmp;
		xz *= tmp;
		var yx:Float = zy * xz - zz * xy;
		var yy:Float = zz * xx - zx * xz;
		var yz:Float = zx * xy - zy * xx;
		e00 = xx;
		e01 = xy;
		e02 = xz;
		e03 = -(xx * eyeX + xy * eyeY + xz * eyeZ);
		e10 = yx;
		e11 = yy;
		e12 = yz;
		e13 = -(yx * eyeX + yy * eyeY + yz * eyeZ);
		e20 = zx;
		e21 = zy;
		e22 = zz;
		e23 = -(zx * eyeX + zy * eyeY + zz * eyeZ);
		e30 = 0;
		e31 = 0;
		e32 = 0;
		e33 = 1;
		return this;
	}

	/**
	 * Sets this matrix to *perspecive projection matrix* and returns `this`.
	 *
	 * Where *perspecive projection matrix* is a matrix which represents the perspective
	 * projection transformation with field of view in the y direction `fovY` in radians,
	 * aspect ratio `aspect`, and z-value of near and far clipping plane `near`, `far`.
	 */
	public inline function perspective(fovY:Float, aspect:Float, near:Float, far:Float):Mat4 {
		var h:Float = 1 / MathUtil.tan(fovY * 0.5);
		var fnf:Float = far / (near - far);
		e00 = h / aspect;
		e01 = 0;
		e02 = 0;
		e03 = 0;
		e10 = 0;
		e11 = h;
		e12 = 0;
		e13 = 0;
		e20 = 0;
		e21 = 0;
		e22 = fnf;
		e23 = near * fnf;
		e30 = 0;
		e31 = 0;
		e32 = -1;
		e33 = 0;
		return this;
	}

	/**
	 * Sets this matrix to *orthogonal projection matrix* and returns `this`.
	 *
	 * Where *orthogonal projection matrix* is a matrix which represents the orthogonal
	 * projection transformation with screen width and height `width`, `height`, and
	 * z-value of near and far clipping plane `near`, `far`.
	 */
	public inline function ortho(width:Float, height:Float, near:Float, far:Float):Mat4 {
		var nf:Float = 1 / (near - far);
		e00 = 2 / width;
		e01 = 0;
		e02 = 0;
		e03 = 0;
		e10 = 0;
		e11 = 2 / height;
		e12 = 0;
		e13 = 0;
		e20 = 0;
		e21 = 0;
		e22 = nf;
		e23 = near * nf;
		e30 = 0;
		e31 = 0;
		e32 = 0;
		e33 = 1;
		return this;
	}

	/**
	 * Returns an array of the elements of this matrix.
	 *
	 * If `columnMajor` is true, the array is arranged in column-major order.
	 * Otherwise, the array is arranged in row-major order.
	 */
	public inline function toArray(columnMajor:Bool = false):Array<Float> {
		if (columnMajor) {
			return [
				e00, e10, e20, e30,
				e01, e11, e21, e31,
				e02, e12, e22, e32,
				e03, e13, e23, e33
			];
		} else {
			return [
				e00, e01, e02, e03,
				e10, e11, e12, e13,
				e20, e21, e22, e23,
				e30, e31, e32, e33
			];
		}
	}

	/**
	 * Copies values from `m` and returns `this`.
	 */
	public inline function copyFrom(m:Mat4):Mat4 {
		e00 = m.e00;
		e01 = m.e01;
		e02 = m.e02;
		e03 = m.e03;
		e10 = m.e10;
		e11 = m.e11;
		e12 = m.e12;
		e13 = m.e13;
		e20 = m.e20;
		e21 = m.e21;
		e22 = m.e22;
		e23 = m.e23;
		e30 = m.e30;
		e31 = m.e31;
		e32 = m.e32;
		e33 = m.e33;
		return this;
	}

	/**
	 * Sets this matrix to the extension of `m` and returns `this`.
	 *
	 * `this.e33` is set to `1` and other components don't exist in `m` are set to `0`.
	 */
	public inline function fromMat3(m:Mat3):Mat4 {
		return _init(
			m.e00, m.e01, m.e02, 0,
			m.e10, m.e11, m.e12, 0,
			m.e20, m.e21, m.e22, 0,
			0, 0, 0, 1
		);
	}

	/**
	 * Sets this matrix to the representation of `transform` and returns `this`.
	 */
	public inline function fromTransform(transform:Transform):Mat4 {
		M.transform_toMat4(this, transform._position, transform._rotation);
		return this;
	}

	/**
	 * Returns a clone of the matrix.
	 */
	public inline function clone():Mat4 {
		return new Mat4(
			e00, e01, e02, e03,
			e10, e11, e12, e13,
			e20, e21, e22, e23,
			e30, e31, e32, e33
		);
	}

	/**
	 * Returns the string representation of the matrix.
	 */
	public function toString():String {
		return
			"Mat4[" + M.toFixed8(e00) + ", " + M.toFixed8(e01) + ", " + M.toFixed8(e02) + ", " + M.toFixed8(e03) + ",\n" +
			"    " + M.toFixed8(e10) + ", " + M.toFixed8(e11) + ", " + M.toFixed8(e12) + ", " + M.toFixed8(e13) + ",\n" +
			"    " + M.toFixed8(e20) + ", " + M.toFixed8(e21) + ", " + M.toFixed8(e22) + ", " + M.toFixed8(e23) + ",\n" +
			"    " + M.toFixed8(e30) + ", " + M.toFixed8(e31) + ", " + M.toFixed8(e32) + ", " + M.toFixed8(e33) + "]"
		;
	}

}
