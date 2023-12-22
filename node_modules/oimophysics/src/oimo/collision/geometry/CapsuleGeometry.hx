package oimo.collision.geometry;
import oimo.collision.raycast.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A capsule collision geometry aligned with the y-axis.
 */
@:build(oimo.m.B.bu())
class CapsuleGeometry extends ConvexGeometry {
	public var _radius:Float;
	public var _halfHeight:Float;

	/**
	 * Creates a capsule collision geometry of radius `radius` and half-height `halfHeight`.
	 */
	public function new(radius:Float, halfHeight:Float) {
		super(GeometryType._CAPSULE);
		_radius = radius;
		_halfHeight = halfHeight;
		_gjkMargin = _radius;
		_updateMass();
	}

	/**
	 * Returns the radius of the capsule.
	 */
	public inline function getRadius():Float {
		return _radius;
	}

	/**
	 * Returns the half-height of the capsule.
	 */
	public inline function getHalfHeight():Float {
		return _halfHeight;
	}

	override public function _updateMass():Void {
		var r2:Float = _radius * _radius;
		var hh2:Float = _halfHeight * _halfHeight;

		var cylinderVolume:Float = MathUtil.TWO_PI * r2 * _halfHeight;
		var sphereVolume:Float = MathUtil.PI * r2 * _radius * 4 / 3;
		_volume = cylinderVolume + sphereVolume;

		var invVolume:Float = _volume == 0 ? 0 : 1 / _volume;

		var inertiaY:Float = invVolume * (
			cylinderVolume * r2 * 0.5 +
			sphereVolume * r2 * 0.4
		);

		var inertiaXZ:Float = invVolume * (
			cylinderVolume * (r2 * 0.25 + hh2 / 3) +
			sphereVolume * (r2 * 0.4 + _halfHeight * _radius * 0.75 + hh2)
		);

		M.mat3_diagonal(_inertiaCoeff, inertiaXZ, inertiaY, inertiaXZ);
	}

	override public function _computeAabb(aabb:Aabb, tf:Transform):Void {
		var radVec:IVec3;
		M.vec3_set(radVec, _radius, _radius, _radius);

		var axis:IVec3;
		M.mat3_getCol(axis, tf._rotation, 1);
		M.vec3_abs(axis, axis);
		M.vec3_scale(axis, axis, _halfHeight);

		M.vec3_add(radVec, radVec, axis);
		M.vec3_sub(aabb._min, tf._position, radVec);
		M.vec3_add(aabb._max, tf._position, radVec);
	}

	override public function computeLocalSupportingVertex(dir:Vec3, out:Vec3):Void {
		if (dir.y > 0) {
			out.init(0, _halfHeight, 0);
		} else {
			out.init(0, -_halfHeight, 0);
		}
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

		var crossY:Float = p1y + dy * tminxz;
		var min:Float;

		if (crossY > -halfH && crossY < halfH) {
			if (tminxz > 0) {
				// hit: side
				min = tminxz;
				hit.normal.init(p1x + dx * min, 0, p1z + dz * min).normalize();
				hit.position.init(p1x + min * dx, crossY, p1z + min * dz);
				hit.fraction = min;
				return true;
			}
			return false;
		}

		var sphereY:Float = crossY < 0 ? -halfH : halfH;
		var spherePos:IVec3;
		var sphereToBegin:IVec3;
		M.vec3_set(spherePos, 0, sphereY, 0);
		M.vec3_sub(sphereToBegin, begin, spherePos);

		// sphere test
		var d:IVec3;
		M.vec3_sub(d, end, begin);

		a = M.vec3_dot(d, d);
		b = M.vec3_dot(sphereToBegin, d);
		c = M.vec3_dot(sphereToBegin, sphereToBegin) - _radius * _radius;

		D = b * b - a * c;
		if (D < 0) return false;

		var t:Float = (-b - MathUtil.sqrt(D)) / a;
		if (t < 0 || t > 1) return false;

		var hitPos:IVec3;
		var hitNormal:IVec3;
		M.vec3_addRhsScaled(hitPos, sphereToBegin, d, t);
		M.vec3_normalize(hitNormal, hitPos);

		// sphere-oriented pos -> local pos
		M.vec3_add(hitPos, hitPos, spherePos);

		M.vec3_toVec3(hit.position, hitPos);
		M.vec3_toVec3(hit.normal, hitNormal);
		hit.fraction = t;

		return true;
	}

}
