package oimo.collision.broadphase;
import oimo.collision.geometry.Aabb;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A proxy is an object that can be added to a broad-phase collision detection algorithm.
 * Users of the collision part of the library can move an axis-aligned bounding box of
 * a proxy through `BroadPhase` class.
 */
@:build(oimo.m.B.bu())
class Proxy {
	public var _prev:Proxy;
	public var _next:Proxy;

	// fattened aabb
	public var _aabbMin:IVec3;
	public var _aabbMax:IVec3;

	public var _id:Int;

	/**
	 * Extra field that users can use for their own purposes. **Do not modify this property if
	 * you use the physics part of the library**, as the physics part of the library uses this property
	 * for connecting proxies and shapes of rigid bodies.
	 */
	public var userData:Any;

	@:dox(hide)
	public function new(userData:Any, id:Int) {
		this.userData = userData;
		_id = id;
		_prev = null;
		_next = null;
		M.vec3_zero(_aabbMin);
		M.vec3_zero(_aabbMax);
	}

	// --- internal ---

	extern public inline function _setAabb(aabb:Aabb):Void {
		M.vec3_assign(_aabbMin, aabb._min);
		M.vec3_assign(_aabbMax, aabb._max);
	}

	// --- public ---

	/**
	 * Returns the unique id of the proxy.
	 */
	public function getId():Int {
		return _id;
	}

	/**
	 * Returns the fat AABB of the proxy.
	 */
	public function getFatAabb():Aabb {
		var aabb:Aabb = new Aabb();
		M.vec3_assign(aabb._min, _aabbMin);
		M.vec3_assign(aabb._max, _aabbMax);
		return aabb;
	}

	/**
	 * Sets `aabb` to the fat AABB of the proxy.
	 *
	 * This does not create a new instance of `Aabb`.
	 */
	public function getFatAabbTo(aabb:Aabb):Void {
		M.vec3_assign(aabb._min, _aabbMin);
		M.vec3_assign(aabb._max, _aabbMax);
	}
}
