package oimo.collision.broadphase.bvh;
import haxe.ds.Vector;
import oimo.m.M;

/**
 * Internal class.
 *
 * BVH Tree
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class BvhTree {
	public var _root:BvhNode;
	public var _numLeaves:Int;
	public var _strategy:BvhStrategy;

	var _nodePool:BvhNode;

	var leafList:BvhNode;
	var leafListLast:BvhNode;

	var tmp:Vector<BvhNode>;

	public function new() {
		_root = null;
		_numLeaves = 0;
		_strategy = new BvhStrategy();
		_nodePool = null;
		leafList = null;
		leafListLast = null;
		tmp = new Vector<BvhNode>(1024);
	}

	// --- internal ---

	public function _print(root:BvhNode, indent:String = ""):Void {
		if (root == null) return;
		if (root._height == 0) {
			trace(indent + root._proxy._id);
		} else {
			_print(root._children[0], indent + "  ");
			trace(indent + "#" + root._height + ", " + M.toFixed4(root._perimeter()));
			_print(root._children[1], indent + "  ");
		}
	}

	/**
	 * Inserts the proxy.
	 * This creates a leaf connected to the proxy and inserts it to the tree and `leafList`.
	 */
	extern public inline function _insertProxy(proxy:BvhProxy):Void {
		var leaf:BvhNode = pick();
		leaf._proxy = proxy;
		proxy._leaf = leaf;

		M.vec3_assign(leaf._aabbMin, proxy._aabbMin);
		M.vec3_assign(leaf._aabbMax, proxy._aabbMax);

		_numLeaves++;
		M.list_push(leafList, leafListLast, _prevLeaf, _nextLeaf, leaf);

		insertLeaf(leaf);
	}

	/**
	 * Deletes the proxy.
	 * This also deletes the leaf connected to the proxy from the tree and `leafList`.
	 */
	extern public inline function _deleteProxy(proxy:BvhProxy):Void {
		var leaf:BvhNode = proxy._leaf;

		_numLeaves--;
		M.list_remove(leafList, leafListLast, _prevLeaf, _nextLeaf, leaf);

		deleteLeaf(leaf);

		proxy._leaf = null;
		pool(leaf);
	}

	/**
	 * Clears whole the tree.
	 * All leaves are disposed and deleted from `leafList`.
	 */
	extern public inline function _clear():Void {
		if (_root == null) return;
		deleteRecursive(_root);
		_root = null;
		_numLeaves = 0;
	}

	extern public inline function _optimize(count:Int):Void {
		if (_root == null) return;
		for (i in 0...count) {
			var leaf:BvhNode = _root;
			while (leaf._height > 0) {
				var h1:Int = leaf._children[0]._height;
				var h2:Int = leaf._children[1]._height;
				// TODO: better strategy
				leaf = leaf._children[Math.random() > (h1 / (h1 + h2)) ? 1 : 0];
			}
			deleteLeaf(leaf);
			insertLeaf(leaf);
		}
	}

	extern public inline function _buildTopDown():Void {
		if (_root == null) return;
		decompose();

		while (tmp.length < _numLeaves) {
			M.array_expand(tmp, tmp.length);
		}

		// collect leaves
		var idx:Int = 0;
		var leaf:BvhNode = leafList;
		M.list_foreach(leaf, _nextLeaf, {
			tmp[idx] = leaf;
			idx++;
		});

		_root = buildTopDownRecursive(tmp, 0, _numLeaves);
	}

	public function _getBalance():Int {
		return getBalanceRecursive(_root);
	}

	// --- private ---

	/**
	 * Makes the tree empty, but leaf nodes are not disposed and are reusable.
	 * The tree must be reconstructed using `leafList` after the call of this method.
	 */
	extern inline function decompose():Void {
		if (_root == null) return;
		decomposeRecursive(_root);
		_root = null;
	}

	function deleteRecursive(root:BvhNode):Void {
		if (root._height == 0) {
			M.list_remove(leafList, leafListLast, _prevLeaf, _nextLeaf, root);
			root._proxy._leaf = null;
			pool(root);
			return;
		}
		deleteRecursive(root._children[0]);
		deleteRecursive(root._children[1]);
		pool(root);
	}

	function decomposeRecursive(root:BvhNode):Void {
		if (root._height == 0) {
			root._childIndex = 0;
			root._parent = null;
			return;
		}
		decomposeRecursive(root._children[0]);
		decomposeRecursive(root._children[1]);
		pool(root);
	}

	function buildTopDownRecursive(leaves:Vector<BvhNode>, from:Int, until:Int):BvhNode {
		var num:Int = until - from;
		M.assert(num > 0);
		if (num == 1) {
			var leaf:BvhNode = leaves[from];
			var proxy:BvhProxy = leaf._proxy;
			M.vec3_assign(leaf._aabbMin, proxy._aabbMin);
			M.vec3_assign(leaf._aabbMax, proxy._aabbMax);
			return leaf;
		}
		// sort and split
		var splitAt:Int = _strategy._splitLeaves(leaves, from, until);
		var child1:BvhNode = buildTopDownRecursive(leaves, from, splitAt);
		var child2:BvhNode = buildTopDownRecursive(leaves, splitAt, until);
		var parent:BvhNode = pick();
		parent._setChild(0, child1);
		parent._setChild(1, child2);
		parent._computeAabb();
		parent._computeHeight();
		return parent;
	}

	function getBalanceRecursive(root:BvhNode):Int {
		if (root == null || root._height == 0) return 0;
		var balance:Int = root._children[0]._height - root._children[1]._height;
		if (balance < 0) balance = -balance;
		return balance + getBalanceRecursive(root._children[0]) + getBalanceRecursive(root._children[1]);
	}

	extern inline function insertLeaf(leaf:BvhNode):Void {
		assertBeLeaf(leaf);
		if (_root == null) { // the tree is empty
			_root = leaf;
			return;
		}
		// search for the position to insert
		var sibling:BvhNode = _root;

		while (sibling._height > 0) {
			var nextStep:Int = _strategy._decideInsertion(sibling, leaf);

			if (nextStep == -1) {
				// insert to current position
				break;
			} else {
				sibling = sibling._children[nextStep];
			}
		}

		var parent:BvhNode = sibling._parent;

		// new common parent with the sibling
		var node:BvhNode = pick();

		if (parent == null) {
			// replace the root node
			_root = node;
		} else {
			// connect to the old parent
			parent._setChild(sibling._childIndex, node);
		}
		node._setChild(sibling._childIndex, sibling);
		node._setChild(sibling._childIndex ^ 1, leaf);

		// fix data
		while (node != null) {
			if (_strategy._balancingEnabled) {
				node = balance(node);
			}
			node._computeHeight();
			node._computeAabb();
			node = node._parent;
		}
	}

	extern inline function deleteLeaf(leaf:BvhNode):Void {
		assertBeLeaf(leaf);
		if (_root == leaf) { // the tree has only the leaf
			_root = null;
			return;
		}
		var parent:BvhNode = leaf._parent;
		var sibling:BvhNode = parent._children[leaf._childIndex ^ 1];
		var grandParent:BvhNode = parent._parent;
		if (grandParent == null) {
			sibling._parent = null;
			sibling._childIndex = 0;
			_root = sibling;
			pool(parent);
			return;
		}
		sibling._parent = grandParent;
		grandParent._setChild(parent._childIndex, sibling);
		pool(parent);

		// fix data
		var node:BvhNode = grandParent;
		while (node != null) {
			if (_strategy._balancingEnabled) {
				node = balance(node);
			}
			node._computeHeight();
			node._computeAabb();
			node = node._parent;
		}
	}

	/**
	 * Balances and returns the node at the same position of `node`.
	 */
	extern inline function balance(node:BvhNode):BvhNode {
		var nh:Int = node._height;
		if (nh < 2) {
			return node;
		}
		var p:BvhNode = node._parent;
		var l:BvhNode = node._children[0];
		var r:BvhNode = node._children[1];
		var lh:Int = l._height;
		var rh:Int = r._height;
		var balance:Int = lh - rh;
		var nodeIndex:Int = node._childIndex;

		//          [ N ]
		//         /     \
		//    [ L ]       [ R ]
		//     / \         / \
		// [L-L] [L-R] [R-L] [R-R]

		// is the tree balanced?
		if (balance > 1) {
			var ll:BvhNode = l._children[0];
			var lr:BvhNode = l._children[1];
			var llh:Int = ll._height;
			var lrh:Int = lr._height;

			// is L-L higher than L-R?
			if (llh > lrh) {
				// set N to L-R
				l._setChild(1, node);

				//          [ L ]
				//         /     \
				//    [L-L]       [ N ]
				//     / \         / \
				// [...] [...] [ L ] [ R ]

				// set L-R
				node._setChild(0, lr);

				//          [ L ]
				//         /     \
				//    [L-L]       [ N ]
				//     / \         / \
				// [...] [...] [L-R] [ R ]

				// fix bounds and heights
				l._computeAabb();
				l._computeHeight();
				node._computeAabb();
				node._computeHeight();
			} else {
				// set N to L-L
				l._setChild(0, node);

				//          [ L ]
				//         /     \
				//    [ N ]       [L-R]
				//     / \         / \
				// [ L ] [ R ] [...] [...]

				// set L-L
				node._setChild(0, ll);

				//          [ L ]
				//         /     \
				//    [ N ]       [L-R]
				//     / \         / \
				// [L-L] [ R ] [...] [...]

				// fix bounds and heights
				l._computeAabb();
				l._computeHeight();
				node._computeAabb();
				node._computeHeight();
			}
			// set new parent of L
			if (p != null) {
				p._setChild(nodeIndex, l);
			} else {
				_root = l;
				l._parent = null;
			}
			return l;
		}
		if (balance < -1) {
			var rl:BvhNode = r._children[0];
			var rr:BvhNode = r._children[1];
			var rlh:Int = rl._height;
			var rrh:Int = rr._height;

			// is R-L higher than R-R?
			if (rlh > rrh) {
				// set N to R-R
				r._setChild(1, node);

				//          [ R ]
				//         /     \
				//    [R-L]       [ N ]
				//     / \         / \
				// [...] [...] [ L ] [ R ]

				// set R-R
				node._setChild(1, rr);

				//          [ R ]
				//         /     \
				//    [R-L]       [ N ]
				//     / \         / \
				// [...] [...] [ L ] [R-R]

				// fix bounds and heights
				r._computeAabb();
				r._computeHeight();
				node._computeAabb();
				node._computeHeight();
			} else {
				// set N to R-L
				r._setChild(0, node);

				//          [ R ]
				//         /     \
				//    [ N ]       [R-R]
				//     / \         / \
				// [ L ] [ R ] [...] [...]

				// set R-L
				node._setChild(1, rl);

				//          [ R ]
				//         /     \
				//    [ N ]       [R-R]
				//     / \         / \
				// [ L ] [R-L] [...] [...]

				// fix bounds and heights
				r._computeAabb();
				r._computeHeight();
				node._computeAabb();
				node._computeHeight();
			}
			// set new parent of R
			if (p != null) {
				p._setChild(nodeIndex, r);
			} else {
				_root = r;
				r._parent = null;
			}
			return r;
		}
		return node;
	}

	extern inline function assertBeLeaf(leaf:BvhNode):Void {
		M.assert(leaf._proxy != null && leaf._proxy._leaf == leaf && leaf._children[0] == null && leaf._children[1] == null && leaf._height == 0);
	}

	extern inline function pool(node:BvhNode):Void {
		M.assert(node._proxy == null || node._proxy._leaf == null);
		node._removeReferences();
		M.singleList_pool(_nodePool, _next, node);
	}

	extern inline function pick():BvhNode {
		return M.singleList_pick(_nodePool, _next, new BvhNode());
	}

}
