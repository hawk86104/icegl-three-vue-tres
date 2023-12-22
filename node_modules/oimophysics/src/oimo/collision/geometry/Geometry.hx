package oimo.collision.geometry;
import oimo.m.IMat3;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.collision.raycast.*;

/**
 * Abstract collision geometry.
 */
@:build(oimo.m.B.bu())
class Geometry {
	public var _type:Int;
	public var _volume:Float;
	public var _inertiaCoeff:IMat3; // I / mass

	@:dox(hide)
	function new(type:Int) {
		_type = type;
		_volume = 0;
	}

	// --- internal ---

	public function _updateMass():Void {
	}

	public function _computeAabb(aabb:Aabb, tf:Transform):Void {
	}

	public function _rayCastLocal(begin:IVec3, end:IVec3, hit:RayCastHit):Bool {
		return false;
	}

	// --- public ---

	/**
	 * Returns the type of the collision geometry.
	 *
	 * See `GeometryType` for details.
	 */
	public inline function getType():Int {
		return _type;
	}

	/**
	 * Returns the volume of the collision geometry.
	 */
	public inline function getVolume():Float {
		return _volume;
	}

	/**
	 * Performs ray casting. Returns `true` and sets the result information to `hit` if
	 * the line segment from `begin` to `end` and the geometry transformed by `transform`
	 * intersect. Returns `false` if the line segment and the geometry do not intersect.
	 */
	public function rayCast(begin:Vec3, end:Vec3, transform:Transform, hit:RayCastHit):Bool {
		var beginLocal:IVec3;
		var endLocal:IVec3;
		M.vec3_fromVec3(beginLocal, begin);
		M.vec3_fromVec3(endLocal, end);
		M.vec3_sub(beginLocal, beginLocal, transform._position);
		M.vec3_sub(endLocal, endLocal, transform._position);
		M.vec3_mulMat3Transposed(beginLocal, beginLocal, transform._rotation);
		M.vec3_mulMat3Transposed(endLocal, endLocal, transform._rotation);
		if (M.call(_rayCastLocal(beginLocal, endLocal, hit))) {
			var localPos:IVec3;
			var localNormal:IVec3;
			M.vec3_fromVec3(localPos, hit.position);
			M.vec3_fromVec3(localNormal, hit.normal);
			// local -> global
			M.vec3_mulMat3(localPos, localPos, transform._rotation);
			M.vec3_mulMat3(localNormal, localNormal, transform._rotation);
			M.vec3_add(localPos, localPos, transform._position);
			// assign global result
			M.vec3_toVec3(hit.position, localPos);
			M.vec3_toVec3(hit.normal, localNormal);
			return true;
		}
		return false;
	}

}
