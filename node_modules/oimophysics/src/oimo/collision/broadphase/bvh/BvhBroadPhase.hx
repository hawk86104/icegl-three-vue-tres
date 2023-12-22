package oimo.collision.broadphase.bvh;
import oimo.common.Transform;
import haxe.ds.Vector;
import oimo.collision.broadphase.*;
import oimo.collision.geometry.Aabb;
import oimo.collision.geometry.ConvexGeometry;
import oimo.common.Setting;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * The broad-phase collision detection algorithm based on bounding volume hierarchy (BVH).
 * Average time complexity is O(NlogN) or lower.
 */
@:build(oimo.m.B.bu())
class BvhBroadPhase extends BroadPhase {
	public var _tree:BvhTree;

	var movedProxies:Vector<BvhProxy>;
	var numMovedProxies:Int;

	@:dox(hide)
	public function new() {
		super(BroadPhaseType._BVH);
		_incremental = true;
		_tree = new BvhTree();
		movedProxies = new Vector<BvhProxy>(1024);
		numMovedProxies = 0;
	}

	// --- private ---

	extern inline function addToMovedProxy(bvhProxy:BvhProxy):Void {
		// add to the buffer
		if (bvhProxy._moved) return;
		bvhProxy._moved = true;

		// expand the buffer
		if (movedProxies.length == numMovedProxies) {
			M.array_expand(movedProxies, numMovedProxies);
		}

		movedProxies[numMovedProxies++] = bvhProxy;
	}

	extern inline function updateProxy(p:BvhProxy, aabb:Aabb, displacement:Vec3):Void {
		// set tight AABB
		p._setAabb(aabb);

		// fatten the AABB
		var padding:Float = Setting.bvhProxyPadding;
		var paddingVec:IVec3;
		M.vec3_set(paddingVec, padding, padding, padding);
		M.vec3_sub(p._aabbMin, p._aabbMin, paddingVec);
		M.vec3_add(p._aabbMax, p._aabbMax, paddingVec);

		if (displacement != null) {
			// predict movement
			var d:IVec3;
			var zero:IVec3;
			var addToMin:IVec3;
			var addToMax:IVec3;
			M.vec3_zero(zero);
			M.vec3_fromVec3(d, displacement);
			M.vec3_min(addToMin, zero, d);
			M.vec3_max(addToMax, zero, d);
			M.vec3_add(p._aabbMin, p._aabbMin, addToMin);
			M.vec3_add(p._aabbMax, p._aabbMax, addToMax);
		}
	}

	function collide(n1:BvhNode, n2:BvhNode):Void {
		_testCount++;
		var l1:Bool = n1._height == 0;
		var l2:Bool = n2._height == 0;
		if (n1 == n2) {
			if (l1) return;
			collide(n1._children[0], n2);
			collide(n1._children[1], n2);
			return;
		}
		if (!M.aabb_overlap(n1._aabbMin, n1._aabbMax, n2._aabbMin, n2._aabbMax)) {
			return;
		}
		if (l1 && l2) {
			pickAndPushProxyPair(n1._proxy, n2._proxy);
			return;
		}
		if (l2 || n1._height > n2._height) {
			// descend node 1
			collide(n1._children[0], n2);
			collide(n1._children[1], n2);
		} else {
			// descend node 2
			collide(n2._children[0], n1);
			collide(n2._children[1], n1);
		}
	}

	function rayCastRecursive(node:BvhNode, _p1:IVec3, _p2:IVec3, callback:BroadPhaseProxyCallback):Void {
		// TODO: use stack?
		var p1:IVec3;
		var p2:IVec3;
		M.vec3_assign(p1, _p1);
		M.vec3_assign(p2, _p2);

		if (!M.call(aabbSegmentTest(node._aabbMin, node._aabbMax, p1, p2))) {
			return;
		}

		if (node._height == 0) { // leaf
			callback.process(node._proxy);
			return;
		}

		M.call(rayCastRecursive(node._children[0], p1, p2, callback));
		M.call(rayCastRecursive(node._children[1], p1, p2, callback));
	}

	function convexCastRecursive(node:BvhNode, convex:ConvexGeometry, begin:Transform, translation:Vec3, callback:BroadPhaseProxyCallback):Void {
		// TODO: use stack?
		if (!M.call(aabbConvexSweepTest(node._aabbMin, node._aabbMax, convex, begin, translation))) {
			return;
		}

		if (node._height == 0) { // leaf
			callback.process(node._proxy);
			return;
		}

		M.call(convexCastRecursive(node._children[0], convex, begin, translation, callback));
		M.call(convexCastRecursive(node._children[1], convex, begin, translation, callback));
	}

	function aabbTestRecursive(node:BvhNode, aabb:Aabb, callback:BroadPhaseProxyCallback):Void {
		if (!M.aabb_overlap(node._aabbMin, node._aabbMax, aabb._min, aabb._max)) {
			return;
		}

		if (node._height == 0) { // leaf
			callback.process(node._proxy);
			return;
		}

		aabbTestRecursive(node._children[0], aabb, callback);
		aabbTestRecursive(node._children[1], aabb, callback);
	}

	// --- public ---

	override public function createProxy(userData:Dynamic, aabb:Aabb):Proxy {
		var p:BvhProxy = new BvhProxy(userData, _idCount++);
		addProxy(p);

		updateProxy(p, aabb, null);
		_tree._insertProxy(p);
		addToMovedProxy(p);

		return p;
	}

	override public function destroyProxy(proxy:Proxy):Void {
		removeProxy(proxy);

		var bvhProxy:BvhProxy = cast proxy;
		_tree._deleteProxy(bvhProxy);
		bvhProxy.userData = null;
		bvhProxy._next = null;
		bvhProxy._prev = null;

		if (bvhProxy._moved) {
			bvhProxy._moved = false;
		}
	}

	override public function moveProxy(proxy:Proxy, aabb:Aabb, displacement:Vec3):Void {
		var p:BvhProxy = cast proxy;
		if (M.aabb_contains(p._aabbMin, p._aabbMax, aabb._min, aabb._max)) {
			// need not move proxy
			return;
		}

		updateProxy(p, aabb, displacement);
		addToMovedProxy(p);
	}

	override public function collectPairs():Void {
		poolProxyPairs();
		_testCount = 0;
		if (_numProxies < 2) return;

		var topDown:Bool = false;

		if (topDown) {
			while (numMovedProxies > 0) {
				movedProxies[--numMovedProxies] = null;
			}
			_tree._buildTopDown();
			collide(_tree._root, _tree._root);
			return;
		}

		var incrementalCollision:Bool = numMovedProxies / _numProxies < Setting.bvhIncrementalCollisionThreshold;

		// incremental modification
		for (i in 0...numMovedProxies) {
			var p:BvhProxy = movedProxies[i];
			if (p._moved) {
				_tree._deleteProxy(p);
				_tree._insertProxy(p);
				if (incrementalCollision) {
					collide(_tree._root, p._leaf);
				}
				p._moved = false;
			}
			movedProxies[i] = null;
		}
		if (!incrementalCollision) {
			collide(_tree._root, _tree._root);
		}

		numMovedProxies = 0;
	}

	override public function rayCast(begin:Vec3, end:Vec3, callback:BroadPhaseProxyCallback):Void {
		if (_tree._root == null) return; // no AABBs in the broadphase

		var p1:IVec3;
		var p2:IVec3;
		M.vec3_fromVec3(p1, begin);
		M.vec3_fromVec3(p2, end);

		M.call(rayCastRecursive(_tree._root, p1, p2, callback));
	}

	override public function convexCast(convex:ConvexGeometry, begin:Transform, translation:Vec3, callback:BroadPhaseProxyCallback):Void {
		if (_tree._root == null) return; // no AABBs in the broadphase

		M.call(convexCastRecursive(_tree._root, convex, begin, translation, callback));
	}

	override public function aabbTest(aabb:Aabb, callback:BroadPhaseProxyCallback):Void {
		if (_tree._root == null) return; // no AABBs in the broadphase

		aabbTestRecursive(_tree._root, aabb, callback);
	}

	/**
	 * Returns the balance of the bounding volume tree.
	 */
	public inline function getTreeBalance():Int {
		return _tree._getBalance();
	}
}
