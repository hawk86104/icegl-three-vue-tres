package oimo.collision.geometry;
import oimo.collision.raycast.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A box collision geometry.
 */
@:build(oimo.m.B.bu())
class BoxGeometry extends ConvexGeometry {
	public var _halfExtents:IVec3;
	public var _halfAxisX:IVec3;
	public var _halfAxisY:IVec3;
	public var _halfAxisZ:IVec3;

	/**
	 * Creates a box collision geometry of half-extents `halfExtents`.
	 */
	public function new(halfExtents:Vec3) {
		super(GeometryType._BOX);
		M.vec3_fromVec3(_halfExtents, halfExtents);
		M.vec3_set(_halfAxisX, halfExtents.x, 0, 0);
		M.vec3_set(_halfAxisY, 0, halfExtents.y, 0);
		M.vec3_set(_halfAxisZ, 0, 0, halfExtents.z);
		_updateMass();

		var minHalfExtents:Float =
			if (halfExtents.x < halfExtents.y) {
				if (halfExtents.z < halfExtents.x) {
					halfExtents.z;
				} else {
					halfExtents.x;
				}
			} else {
				if (halfExtents.z < halfExtents.y) {
					halfExtents.z;
				} else {
					halfExtents.y;
				}
			}
		;

		if (_gjkMargin > minHalfExtents * 0.2) _gjkMargin = minHalfExtents * 0.2;
	}

	/**
	 * Returns the half-extents of the box.
	 */
	public inline function getHalfExtents():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _halfExtents);
		return v;
	}

	/**
	 * Sets `halfExtents` to the half-extents of the box.
	 */
	public inline function getHalfExtentsTo(halfExtents:Vec3):Void {
		M.vec3_toVec3(halfExtents, _halfExtents);
	}

	override public function _updateMass():Void {
		_volume = 8 * M.vec3_mulHorizontal(_halfExtents);
		var sq:IVec3;
		M.vec3_compWiseMul(sq, _halfExtents, _halfExtents);
		M.mat3_diagonal(_inertiaCoeff,
			1 / 3 * (M.vec3_get(sq, 1) + M.vec3_get(sq, 2)),
			1 / 3 * (M.vec3_get(sq, 2) + M.vec3_get(sq, 0)),
			1 / 3 * (M.vec3_get(sq, 0) + M.vec3_get(sq, 1))
		);
	}

	override public function _computeAabb(aabb:Aabb, tf:Transform):Void {
		var tfx:IVec3;
		var tfy:IVec3;
		var tfz:IVec3;
		M.vec3_mulMat3(tfx, _halfAxisX, tf._rotation);
		M.vec3_mulMat3(tfy, _halfAxisY, tf._rotation);
		M.vec3_mulMat3(tfz, _halfAxisZ, tf._rotation);
		M.vec3_abs(tfx, tfx);
		M.vec3_abs(tfy, tfy);
		M.vec3_abs(tfz, tfz);
		var tfs:IVec3;
		M.vec3_add(tfs, tfx, tfy);
		M.vec3_add(tfs, tfs, tfz);

		M.vec3_sub(aabb._min, tf._position, tfs);
		M.vec3_add(aabb._max, tf._position, tfs);
	}

	override public function computeLocalSupportingVertex(dir:Vec3, out:Vec3):Void {
		var gjkMargins:IVec3;
		var coreExtents:IVec3;
		M.vec3_set(gjkMargins, _gjkMargin, _gjkMargin, _gjkMargin);
		M.vec3_min(gjkMargins, gjkMargins, _halfExtents); // avoid making core extents negative
		M.vec3_sub(coreExtents, _halfExtents, gjkMargins);
		out.x = dir.x > 0 ? M.vec3_get(coreExtents, 0) : -M.vec3_get(coreExtents, 0);
		out.y = dir.y > 0 ? M.vec3_get(coreExtents, 1) : -M.vec3_get(coreExtents, 1);
		out.z = dir.z > 0 ? M.vec3_get(coreExtents, 2) : -M.vec3_get(coreExtents, 2);
	}

	override public function _rayCastLocal(begin:IVec3, end:IVec3, hit:RayCastHit):Bool {
		var p1x:Float = M.vec3_get(begin, 0);
		var p1y:Float = M.vec3_get(begin, 1);
		var p1z:Float = M.vec3_get(begin, 2);
		var p2x:Float = M.vec3_get(end, 0);
		var p2y:Float = M.vec3_get(end, 1);
		var p2z:Float = M.vec3_get(end, 2);
		var halfW:Float = M.vec3_get(_halfExtents, 0);
		var halfH:Float = M.vec3_get(_halfExtents, 1);
		var halfD:Float = M.vec3_get(_halfExtents, 2);
		var dx:Float = p2x - p1x;
		var dy:Float = p2y - p1y;
		var dz:Float = p2z - p1z;
		var tminx:Float = 0;
		var tminy:Float = 0;
		var tminz:Float = 0;
		var tmaxx:Float = 1;
		var tmaxy:Float = 1;
		var tmaxz:Float = 1;
		if (dx > -1e-6 && dx < 1e-6) {
			if (p1x <= -halfW || p1x >= halfW) {
				return false;
			}
		} else {
			var invDx:Float = 1 / dx;
			var t1:Float = (-halfW - p1x) * invDx;
			var t2:Float = (halfW - p1x) * invDx;
			if (t1 > t2) {
				var tmp:Float = t1;
				t1 = t2;
				t2 = tmp;
			}
			if (t1 > 0) tminx = t1;
			if (t2 < 1) tmaxx = t2;
		}

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

		if (dz > -1e-6 && dz < 1e-6) {
			if (p1z <= -halfD || p1z >= halfD) {
				return false;
			}
		} else {
			var invDz:Float = 1 / dz;
			var t1:Float = (-halfD - p1z) * invDz;
			var t2:Float = (halfD - p1z) * invDz;
			if (t1 > t2) {
				var tmp:Float = t1;
				t1 = t2;
				t2 = tmp;
			}
			if (t1 > 0) tminz = t1;
			if (t2 < 1) tmaxz = t2;
		}

		if (tminx >= 1 || tminy >= 1 || tminz >= 1 || tmaxx <= 0 || tmaxy <= 0 || tmaxz <= 0) return false;
		var min:Float = tminx;
		var max:Float = tmaxx;
		var hitDirection:Int = 0;
		if (tminy > min) {
			min = tminy;
			hitDirection = 1;
		}
		if (tminz > min) {
			min = tminz;
			hitDirection = 2;
		}
		if (tmaxy < max) {
			max = tmaxy;
		}
		if (tmaxz < max) {
			max = tmaxz;
		}
		if (min > max) return false;
		if (min == 0) return false; // the ray starts from inside
		switch (hitDirection) {
		case 0:
			hit.normal.init(dx > 0 ? -1 : 1, 0, 0);
		case 1:
			hit.normal.init(0, dy > 0 ? -1 : 1, 0);
		case 2:
			hit.normal.init(0, 0, dz > 0 ? -1 : 1);
		}
		hit.position.init(p1x + min * dx, p1y + min * dy, p1z + min * dz);
		hit.fraction = min;
		return true;
	}

}
