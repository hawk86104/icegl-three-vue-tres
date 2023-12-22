package oimo.collision.broadphase.bruteforce;
import oimo.common.Transform;
import oimo.collision.broadphase.BroadPhase;
import oimo.collision.broadphase.Proxy;
import oimo.collision.geometry.ConvexGeometry;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Vec3;
import oimo.collision.broadphase.*;
import oimo.collision.geometry.Aabb;

/**
 * Brute force implementation of broad-phase collision detection. Time complexity is O(n^2).
 */
@:build(oimo.m.B.bu())
class BruteForceBroadPhase extends BroadPhase {

	@:dox(hide)
	public function new() {
		super(BroadPhaseType._BRUTE_FORCE);
		_incremental = false;
	}

	// --- private ---

	extern inline function overlap(p1:Proxy, p2:Proxy):Bool {
		return M.aabb_overlap(p1._aabbMin, p1._aabbMax, p2._aabbMin, p2._aabbMax);
	}

	// --- public ---

	override public function createProxy(userData:Dynamic, aabb:Aabb):Proxy {
		var proxy:Proxy = new Proxy(userData, _idCount++);
		addProxy(proxy);

		proxy._setAabb(aabb);
		return proxy;
	}

	override public function destroyProxy(proxy:Proxy):Void {
		removeProxy(proxy);

		proxy.userData = null;
	}

	override public function moveProxy(proxy:Proxy, aabb:Aabb, dislacement:Vec3):Void {
		proxy._setAabb(aabb);
	}

	override public function collectPairs():Void {
		poolProxyPairs();
		_testCount = 0;
		var p1:Proxy = _proxyList;
		M.list_foreach(p1, _next, {
			var p2:Proxy = p1._next;
			M.list_foreach(p2, _next, {
				_testCount++;
				if (overlap(p1, p2)) {
					pickAndPushProxyPair(p1, p2);
				}
			});
		});
	}

	override public function rayCast(begin:Vec3, end:Vec3, callback:BroadPhaseProxyCallback):Void {
		var p1:IVec3;
		var p2:IVec3;
		var dir:IVec3;
		M.vec3_fromVec3(p1, begin);
		M.vec3_fromVec3(p2, end);
		M.vec3_sub(dir, p2, p1);

		var min:IVec3;
		var max:IVec3;
		M.vec3_min(min, p1, p2);
		M.vec3_max(max, p1, p2);

		var p:Proxy = _proxyList;
		M.list_foreach(p, _next, {
			if (M.call(aabbSegmentTest(p._aabbMin, p._aabbMax, p1, p2))) {
				callback.process(p);
			}
		});
	}

	override public function convexCast(convex:ConvexGeometry, begin:Transform, translation:Vec3, callback:BroadPhaseProxyCallback):Void {
		var p:Proxy = _proxyList;
		M.list_foreach(p, _next, {
			if (M.call(aabbConvexSweepTest(p._aabbMin, p._aabbMax, convex, begin, translation))) {
				callback.process(p);
			}
		});
	}

	override public function aabbTest(aabb:Aabb, callback:BroadPhaseProxyCallback):Void {
		var p:Proxy = _proxyList;
		M.list_foreach(p, _next, {
			if (M.aabb_overlap(aabb._min, aabb._max, p._aabbMin, p._aabbMax)) {
				callback.process(p);
			}
		});
	}

}
