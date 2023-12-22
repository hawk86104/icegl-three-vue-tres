package oimo.collision.geometry;
import oimo.collision.raycast.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A sphere collision geometry.
 */
@:build(oimo.m.B.bu())
class SphereGeometry extends ConvexGeometry {
	public var _radius:Float;

	/**
	 * Creates a sphere collision geometry of radius `radius`.
	 */
	public function new(radius:Float) {
		super(GeometryType._SPHERE);
		_radius = radius;
		_gjkMargin = _radius;
		_updateMass();
	}

	/**
	 * Returns the radius of the sphere.
	 */
	public inline function getRadius():Float {
		return _radius;
	}

	override public function _updateMass():Void {
		_volume = 4 / 3 * MathUtil.PI * _radius * _radius * _radius;
		M.mat3_diagonal(_inertiaCoeff,
			2 / 5 * _radius * _radius,
			2 / 5 * _radius * _radius,
			2 / 5 * _radius * _radius
		);
	}

	override public function _computeAabb(aabb:Aabb, tf:Transform):Void {
		var radVec:IVec3;
		M.vec3_set(radVec, _radius, _radius, _radius);
		M.vec3_sub(aabb._min, tf._position, radVec);
		M.vec3_add(aabb._max, tf._position, radVec);
	}

	override public function computeLocalSupportingVertex(dir:Vec3, out:Vec3):Void {
		out.zero();
	}

	override public function _rayCastLocal(begin:IVec3, end:IVec3, hit:RayCastHit):Bool {
		var d:IVec3;
		M.vec3_sub(d, end, begin);

		var a:Float = M.vec3_dot(d, d);
		var b:Float = M.vec3_dot(begin, d);
		var c:Float = M.vec3_dot(begin, begin) - _radius * _radius;

		var D:Float = b * b - a * c;
		if (D < 0) return false;

		var t:Float = (-b - MathUtil.sqrt(D)) / a;
		if (t < 0 || t > 1) return false;

		var hitPos:IVec3;
		var hitNormal:IVec3;
		M.vec3_addRhsScaled(hitPos, begin, d, t);
		M.vec3_normalize(hitNormal, hitPos);

		M.vec3_toVec3(hit.position, hitPos);
		M.vec3_toVec3(hit.normal, hitNormal);
		hit.fraction = t;
		return true;
	}

}
