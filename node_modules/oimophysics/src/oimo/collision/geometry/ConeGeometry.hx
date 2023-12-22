package oimo.collision.geometry;
import oimo.collision.raycast.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A cone collision geometry aligned with the y-axis.
 */
@:build(oimo.m.B.bu())
class ConeGeometry extends ConvexGeometry {
	public var _radius:Float;
	public var _halfHeight:Float;

	var sinTheta:Float;
	var cosTheta:Float;

	/**
	 * Creates a cone collision geometry of radius `radius` and half-height `halfHeight`.
	 */
	public function new(radius:Float, halfHeight:Float) {
		super(GeometryType._CONE);
		_radius = radius;
		_halfHeight = halfHeight;
		sinTheta = radius / MathUtil.sqrt(radius * radius + 4 * halfHeight * halfHeight);
		cosTheta = 2 * halfHeight / MathUtil.sqrt(radius * radius + 4 * halfHeight * halfHeight);
		_updateMass();
	}

	/**
	 * Returns the radius of the cone.
	 */
	public inline function getRadius():Float {
		return _radius;
	}

	/**
	 * Returns the half-height of the cone.
	 */
	public inline function getHalfHeight():Float {
		return _halfHeight;
	}

	override public function _updateMass():Void {
		var r2:Float = _radius * _radius;
		var h2:Float = _halfHeight * _halfHeight * 4;
		_volume = MathUtil.PI * r2 * _halfHeight * 2 / 3;
		M.mat3_diagonal(_inertiaCoeff,
			1 / 20 * (3 * r2 + 2 * h2),
			3 / 10 * r2,
			1 / 20 * (3 * r2 + 2 * h2)
		);
	}

	override public function _computeAabb(aabb:Aabb, tf:Transform):Void {
		var axis:IVec3;
		var axis2:IVec3;
		var eh:IVec3;
		var er:IVec3;
		M.mat3_getCol(axis, tf._rotation, 1);
		M.vec3_compWiseMul(axis2, axis, axis);

		var axis2x:Float = M.vec3_get(axis2, 0);
		var axis2y:Float = M.vec3_get(axis2, 1);
		var axis2z:Float = M.vec3_get(axis2, 2);

		M.vec3_set(er, MathUtil.sqrt(1 - axis2x), MathUtil.sqrt(1 - axis2y), MathUtil.sqrt(1 - axis2z));
		M.vec3_scale(er, er, _radius);

		M.vec3_scale(eh, axis, _halfHeight);

		var rmin:IVec3; // -(signed projected axis) - (projected radius)
		var rmax:IVec3; // -(signed projected axis) + (projected radius)
		M.vec3_negate(rmin, eh);
		M.vec3_sub(rmin, rmin, er);
		M.vec3_negate(rmax, eh);
		M.vec3_add(rmax, rmax, er);

		var max:IVec3;
		var min:IVec3;
		M.vec3_max(max, rmin, rmax);
		M.vec3_max(max, max, eh);
		M.vec3_min(min, rmin, rmax);
		M.vec3_min(min, min, eh);

		M.vec3_add(aabb._min, tf._position, min);
		M.vec3_add(aabb._max, tf._position, max);
	}

	override public function computeLocalSupportingVertex(dir:Vec3, out:Vec3):Void {
		var dx:Float = dir.x;
		var dy:Float = dir.y;
		var dz:Float = dir.z;
		if (dy > 0 && dy * dy > sinTheta * sinTheta * (dx * dx + dy * dy + dz * dz)) {
			out.init(0, _halfHeight - _gjkMargin / sinTheta, 0);
			if (out.y < 0) out.y = 0;
			return;
		}
		var rx:Float = dir.x;
		var rz:Float = dir.z;
		var len:Float = rx * rx + rz * rz;
		var height:Float = 2 * _halfHeight;
		var coreRadius:Float = (height - _gjkMargin) / height * _radius - _gjkMargin / cosTheta;
		if (coreRadius < 0) coreRadius = 0;
		var invLen = len > 0 ? coreRadius / MathUtil.sqrt(len) : 0;
		var coreHalfHeight:Float = _halfHeight - _gjkMargin;
		if (coreHalfHeight < 0) coreHalfHeight = 0;
		out.x = rx * invLen;
		out.y = -coreHalfHeight;
		out.z = rz * invLen;
	}

	override public function _rayCastLocal(begin:IVec3, end:IVec3, hit:RayCastHit):Bool {
		var p1x:Float = M.vec3_get(begin, 0);
		var p1y:Float = M.vec3_get(begin, 1);
		var p1z:Float = M.vec3_get(begin, 2);
		var p2x:Float = M.vec3_get(end, 0);
		var p2y:Float = M.vec3_get(end, 1);
		var p2z:Float = M.vec3_get(end, 2);
		var halfH:Float = _halfHeight;
		var dx:Float = p2x - p1x;
		var dy:Float = p2y - p1y;
		var dz:Float = p2z - p1z;

		// Y
		var tminy:Float = 0;
		var tmaxy:Float = 1;
		if (dy > -1e-6 && dy < 1e-6) {
			if (p1y <= -halfH || p1y >= halfH) {
				return false;
			}
		} else {
			var invDy:Float = 1 / dy;
			var t1:Float = (-halfH - p1y) * invDy;
			var t2:Float = (halfH - p1y) * invDy;
			if (t1 > t2) {
				var tmp:Float = t1;
				t1 = t2;
				t2 = tmp;
			}
			if (t1 > 0) tminy = t1;
			if (t2 < 1) tmaxy = t2;
		}
		if (tminy >= 1 || tmaxy <= 0) return false;

		// XZ
		var tminxz:Float = 0;
		var tmaxxz:Float = 0;

		p1y -= halfH; // translate so that the new origin be (0, -halfH, 0)

		var cos2:Float = cosTheta * cosTheta;
		var a:Float = cos2 * (dx * dx + dy * dy + dz * dz) - dy * dy;
		var b:Float = cos2 * (p1x * dx + p1y * dy + p1z * dz) - p1y * dy;
		var c:Float = cos2 * (p1x * p1x + p1y * p1y + p1z * p1z) - p1y * p1y;
		var D:Float = b * b - a * c;
		if (a != 0) {
			if (D < 0) return false;
			var sqrtD:Float = MathUtil.sqrt(D);
			if (a < 0) {
				// ((-inf, t1) union (t2, +inf)) join (0, 1)
				if (dy > 0) {
					// (0, t1)
					tminxz = 0;
					tmaxxz = (-b + sqrtD) / a;
					if (tmaxxz <= 0) return false;
				} else {
					// (t2, 1)
					tminxz = (-b - sqrtD) / a;
					tmaxxz = 1;
					if (tminxz >= 1) return false;
				}
			} else {
				// (t1, t2) join (0, 1)
				tminxz = (-b - sqrtD) / a;
				tmaxxz = (-b + sqrtD) / a;
				if (tminxz >= 1 || tmaxxz <= 0) return false;
			}
		} else {
			var t:Float = -c / (2 * b);
			if (b > 0) {
				// (0, t)
				tminxz = 0;
				tmaxxz = t;
				if (t <= 0) return false;
			} else {
				// (t, 1)
				tminxz = t;
				tmaxxz = 1;
				if (t >= 1) return false;
			}
		}

		p1y += halfH; // revert translation

		var min:Float;
		if (tmaxxz <= tminy || tmaxy <= tminxz) return false;
		if (tminxz < tminy) {
			min = tminy;
			if (min == 0) return false; // the ray starts from inside
			hit.normal.init(0, dy > 0 ? -1 : 1, 0);
		} else {
			min = tminxz;
			if (min == 0) return false; // the ray starts from inside
			hit.normal.init(p1x + dx * min, 0, p1z + dz * min).normalize().scaleEq(cosTheta);
			hit.normal.y += sinTheta;
		}

		hit.position.init(p1x + min * dx, p1y + min * dy, p1z + min * dz);
		hit.fraction = min;
		return true;
	}

}
