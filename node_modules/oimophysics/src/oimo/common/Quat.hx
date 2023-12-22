package oimo.common;
import oimo.common.Vec3;
import oimo.m.M;
import oimo.common.MathUtil;
// using M; // mixing it in causes errors :(

/**
 * Quaternion class.
 */
class Quat {
	/**
	 * The number of instance creation.
	 */
	public static var numCreations:Int = 0;

	/**
	 * The x-value of the imaginary part of the quaternion.
	 */
	public var x:Float;

	/**
	 * The y-value of the imaginary part of the quaternion.
	 */
	public var y:Float;

	/**
	 * The z-value of the imaginary part of the quaternion.
	 */
	public var z:Float;

	/**
	 * The real part of the quaternion.
	 */
	public var w:Float;

	/**
	 * Creates a new quaternion. The quaternion is identity by default.
	 */
	public inline function new(x:Float = 0, y:Float = 0, z:Float = 0, w:Float = 1) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		numCreations++;
	}

	extern inline function initi(x:Float, y:Float, z:Float, w:Float):Quat {
		var tx:Float = x;
		var ty:Float = y;
		var tz:Float = z;
		var tw:Float = w;
		this.x = tx;
		this.y = ty;
		this.z = tz;
		this.w = tw;
		return this;
	}

	/**
	 * Sets the quaternion to identity quaternion and returns `this`.
	 */
	public inline function identity():Quat {
		return initi(0, 0, 0, 1);
	}

	/**
	 * Sets all values at once and returns `this`.
	 */
	public inline function init(x:Float, y:Float, z:Float, w:Float):Quat {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		return this;
	}

	/**
	 * Returns `this` + `v`.
	 */
	public inline function add(q:Quat):Quat {
		return new Quat(x + q.x, y + q.y, z + q.z, w + q.w);
	}

	/**
	 * Returns `this` - `v`.
	 */
	public inline function sub(q:Quat):Quat {
		return new Quat(x - q.x, y - q.y, z - q.z, w - q.w);
	}

	/**
	 * Returns `this` * `s`.
	 */
	public inline function scale(s:Float):Quat {
		return new Quat(x * s, y * s, z * s, w * s);
	}

	/**
	 * Sets this quaternion to `this` + `v` and returns `this`.
	 */
	public inline function addEq(q:Quat):Quat {
		return initi(x + q.x, y + q.y, z + q.z, w + q.w);
	}

	/**
	 * Sets this quaternion to `this` - `v` and returns `this`.
	 */
	public inline function subEq(q:Quat):Quat {
		return initi(x - q.x, y - q.y, z - q.z, w - q.w);
	}

	/**
	 * Sets this quaternion to `this` * `s` and returns `this`.
	 */
	public inline function scaleEq(s:Float):Quat {
		return initi(x * s, y * s, z * s, w * s);
	}

	/**
	 * Returns the length of the quaternion.
	 */
	public inline function length():Float {
		return MathUtil.sqrt(x * x + y * y + z * z + w * w);
	}

	/**
	 * Returns the squared length of the quaternion.
	 */
	public inline function lengthSq():Float {
		return x * x + y * y + z * z + w * w;
	}

	/**
	 * Returns the dot product of `this` and `q`.
	 */
	public inline function dot(q:Quat):Float {
		return x * q.x + y * q.y + z * q.z + w * q.w;
	}

	/**
	 * Returns the normalized quaternion.
	 *
	 * If the length is zero, zero quaterinon is returned.
	 */
	public inline function normalized():Quat {
		var invLen:Float = length();
		if (invLen > 0) invLen = 1 / invLen;
		return new Quat(x * invLen, y * invLen, z * invLen, w * invLen);
	}

	/**
	 * Sets this quaternion to the normalized quaternion and returns `this`.
	 *
	 * If the length is zero, this quaternion is set to zero quaternion.
	 */
	public inline function normalize():Quat {
		var invLen:Float = length();
		if (invLen > 0) invLen = 1 / invLen;
		return initi(x * invLen, y * invLen, z * invLen, w * invLen);
	}

	/**
	 * Sets this quaternion to the quaternion representing the shortest arc
	 * rotation from `v1` to `v2`, and return `this`.
	 */
	public function setArc(v1:Vec3, v2:Vec3):Quat {
		var x1:Float = v1.x;
		var y1:Float = v1.y;
		var z1:Float = v1.z;
		var x2:Float = v2.x;
		var y2:Float = v2.y;
		var z2:Float = v2.z;
		var d:Float = x1 * x2 + y1 * y2 + z1 * z2;

		w = MathUtil.sqrt((1 + d) * 0.5);

		if (w == 0) { // PI rotation, set a vector perpendicular to v1
			x2 = x1 * x1;
			y2 = y1 * y1;
			z2 = z1 * z1;
			M.compare3min(x2, y2, z2, {
				// |x1| is the smallest, use x-axis
				d = 1 / MathUtil.sqrt(y2 + z2);
				x = 0;
				y = z1 * d;
				z = -y1 * d;
			}, {
				// |y1| is the smallest, use y-axis
				d = 1 / MathUtil.sqrt(z2 + x2);
				y = 0;
				z = x1 * d;
				x = -z1 * d;
			}, {
				// |z1| is the smallest, use z-axis
				d = 1 / MathUtil.sqrt(x2 + y2);
				z = 0;
				x = y1 * d;
				y = -x1 * d;
			});
			return this;
		}

		// cos(theta/2) = sqrt((1 + cos(theta)) / 2)
		// sin(theta/2) / sin(theta) = sin(theta/2) / (2 * sin(theta/2) * cos(theta/2))
		//                           = 1 / (2 * cos(theta/2))
		d = 0.5 / w;

		// x^2 + y^2 + z^2 = sin(theta/2)
		var cx:Float = y1 * z2 - z1 * y2;
		var cy:Float = z1 * x2 - x1 * z2;
		var cz:Float = x1 * y2 - y1 * x2;
		x = cx * d;
		y = cy * d;
		z = cz * d;
		return this;
	}

	/**
	 * Returns the spherical linear interpolation between two quaternions `this` and `q` with interpolation paraeter `t`.
	 * Both quaternions `this` and `q` must be normalized.
	 */
	public function slerp(q:Quat, t:Float):Quat {
		var qx:Float;
		var qy:Float;
		var qz:Float;
		var qw:Float;
		var d:Float = dot(q);
		if (d < 0) {
			d = -d;
			qx = -q.x;
			qy = -q.y;
			qz = -q.z;
			qw = -q.w;
		} else {
			qx = q.x;
			qy = q.y;
			qz = q.z;
			qw = q.w;
		}
		if (d > 1 - 1e-6) {
			// two quaternions are too close, returns lerp instead
			return new Quat(x + (qx - x) * t, y + (qy - y) * t, z + (qz - z) * t, w + (qw - w) * t).normalize();
		}
		// target angle
		var theta:Float = t * MathUtil.acos(d);

		// make q orthogonal to this
		qx -= x * d;
		qy -= y * d;
		qz -= z * d;
		qw -= w * d;
		var invLen:Float = 1 / MathUtil.sqrt(qx * qx + qy * qy + qz * qz + qw * qw);
		qx *= invLen;
		qy *= invLen;
		qz *= invLen;
		qw *= invLen;

		// mix them
		var sin:Float = MathUtil.sin(theta);
		var cos:Float = MathUtil.cos(theta);
		return new Quat(x * cos + qx * sin, y * cos + qy * sin, z * cos + qz * sin, w * cos + qw * sin);
	}

	/**
	 * Copies values from `q` and returns `this`.
	 */
	public inline function copyFrom(q:Quat):Quat {
		x = q.x;
		y = q.y;
		z = q.z;
		w = q.w;
		return this;
	}

	/**
	 * Returns a clone of the quaternion.
	 */
	public inline function clone():Quat {
		return new Quat(x, y, z, w);
	}

	/**
	 * Sets this quaternion to the representation of the matrix `m`, and returns `this`.
	 *
	 * The matrix `m` must be a rotation matrix, that is, must be orthogonalized and have determinant 1.
	 */
	public inline function fromMat3(m:Mat3):Quat {
		var e00:Float = m.e00;
		var e11:Float = m.e11;
		var e22:Float = m.e22;
		var t:Float = e00 + e11 + e22;
		var s:Float;
		if (t > 0) {
			s = MathUtil.sqrt(t + 1);
			w = 0.5 * s;
			s = 0.5 / s;
			x = (m.e21 - m.e12) * s;
			y = (m.e02 - m.e20) * s;
			z = (m.e10 - m.e01) * s;
		} else {
			M.compare3max(e00, e11, e22, {
				// e00 is the largest
				s = MathUtil.sqrt(e00 - e11 - e22 + 1);
				x = 0.5 * s;
				s = 0.5 / s;
				y = (m.e01 + m.e10) * s;
				z = (m.e02 + m.e20) * s;
				w = (m.e21 - m.e12) * s;
			}, {
				// e11 is the largest
				s = MathUtil.sqrt(e11 - e22 - e00 + 1);
				y = 0.5 * s;
				s = 0.5 / s;
				x = (m.e01 + m.e10) * s;
				z = (m.e12 + m.e21) * s;
				w = (m.e02 - m.e20) * s;
			}, {
				// e22 is the largest
				s = MathUtil.sqrt(e22 - e00 - e11 + 1);
				z = 0.5 * s;
				s = 0.5 / s;
				x = (m.e02 + m.e20) * s;
				y = (m.e12 + m.e21) * s;
				w = (m.e10 - m.e01) * s;
			});
		}
		return this;
	}

	/**
	 * Returns a rotation matrix which represents this quaternion.
	 */
	public inline function toMat3():Mat3 {
		return new Mat3().fromQuat(this);
	}

	/**
	 * Returns the string representation of the quaternion.
	 */
	public inline function toString():String {
		return
			"Quat[" + M.toFixed8(x) + " i,\n" +
			"    " + M.toFixed8(y) + " j,\n" +
			"    " + M.toFixed8(z) + " k,\n" +
			"    " + M.toFixed8(w) + "]"
		;
	}

}
