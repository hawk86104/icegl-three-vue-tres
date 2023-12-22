package oimo.collision.broadphase.bvh;
import oimo.collision.broadphase.*;

/**
 * Internal class.
 *
 * BVH Proxy
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class BvhProxy extends Proxy {
	public var _leaf:BvhNode;
	public var _moved:Bool;

	public function new(userData:Dynamic, id:Int) {
		super(userData, id);
		_leaf = null;
		_moved = false;
	}

}
