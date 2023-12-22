package oimo.collision.geometry;
import oimo.collision.raycast.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A cylinder collision geometry aligned with the y-axis.
 */
@:build(oimo.m.B.bu())
class CylinderGeometry extends ConvexGeometry {
	public var _radius:Float;
	public var _halfHeight:Float;

	/**
	 * Creates a cylinder collision geometry of radius `radius` and half-height `halfHeight`.
	 */
	public function new(radius:Float, halfHeight:Float) {
		super(GeometryType._CYLINDER);
		_radius = radius;
		_halfHeight = halfHeight;
		_updateMass();
	}

	/**
	 * Returns the radius of the cylinder.
	 */
	public inline function getRadius():Float {
		return _radius;
	}

	/**
	 * Returns the half-height of the cylinder.
	 */
	public inline function getHalfHeight():Float {
		return _halfHeight;
	}

	override public function _updateMass():Void {
		var r2:Float = _radius * _radius;
		var h2:Float = _halfHeight * _halfHeight * 4;
		_volume = MathUtil.PI * r2 * _halfHeight * 2;
		M.mat3_diagonal(_inertiaCoeff,
			1 / 12 * (3 * r2 + h2),
			1 / 2 * r2,
			1 / 12 * (3 * r2 + h2)
		);
	}

	override public function _computeAabb(aabb:Aabb, tf:Transform):Void {
		var axis:IVec3;
		var axis2:IVec3;
		var eh:IVec3;
		var er:IVec3;
		M.mat3_getCol(axis, tf._rotation, 1);
		M.vec3_abs(axis, axis);
		M.vec3_compWiseMul(axis2, axis, axis);

		var axis2x:Float = M.vec3_get(axis2, 0);
		var axis2y:Float = M.vec3_get(axis2, 1);
		var axis2z:Float = M.vec3_get(axis2, 2);

		M.vec3_set(er, MathUtil.sqrt(1 - axis2x), MathUtil.sqrt(1 - axis2y), MathUtil.sqrt(1 - axis2z));
		M.vec3_scale(er, er, _radius);

		M.vec3_scale(eh, axis, _halfHeight);

		var max:IVec3;
		M.vec3_add(max, er, eh);

		M.vec3_sub(aabb._min, tf._position, max);
		M.vec3_add(aabb._max, tf._position, max);
	}

	override public function computeLocalSupportingVertex(dir:Vec3, out:Vec3):Void {
		var rx:Float = dir.x;
		var rz:Float = dir.z;
		var len:Float = rx * rx + rz * rz;
		var coreRadius:Float = _radius - _gjkMargin;
		if (coreRadius < 0) coreRadius = 0;
		var invLen = len > 0 ? coreRadius / MathUtil.sqrt(len) : 0;
		var coreHeight:Float = _halfHeight - _gjkMargin;
		if (coreHeight < 0) coreHeight = 0;
		out.x = rx * invLen;
		out.y = dir.y > 0 ? coreHeight : -coreHeight;
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
		var tmaxxz:Float = 1;
		var a:Float = dx * dx + dz * dz;
		var b:Float = p1x * dx + p1z * dz;
		var c:Float = (p1x * p1x + p1z * p1z) - _radius * _radius;
		var D:Float = b * b - a * c;
		if (D < 0) return false;
		var t:Float;
		if (a > 0) {
			var sqrtD:Float = MathUtil.sqrt(D);
			tminxz = (-b - sqrtD) / a;
			tmaxxz = (-b + sqrtD) / a;
			if (tminxz >= 1 || tmaxxz <= 0) return false;
		} else {
			if (c >= 0) return false;
			tminxz = 0;
			tmaxxz = 1;
		}

		var min:Float;
		if (tmaxxz <= tminy || tmaxy <= tminxz) return false;
		if (tminxz < tminy) {
			min = tminy;
			if (min == 0) return false; // the ray starts from inside
			hit.normal.init(0, dy > 0 ? -1 : 1, 0);
		} else {
			min = tminxz;
			if (min == 0) return false; // the ray starts from inside
			hit.normal.init(p1x + dx * min, 0, p1z + dz * min).normalize();
		}

		hit.position.init(p1x + min * dx, p1y + min * dy, p1z + min * dz);
		hit.fraction = min;
		return true;
	}

}
