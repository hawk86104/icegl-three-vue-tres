package oimo.collision.narrowphase.detector.gjkepa;
import haxe.ds.Vector;
import oimo.common.Vec3;

/**
 * Internal class.
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class GjkCache {
	public var prevClosestDir:Vec3;

	public function new() {
		prevClosestDir = new Vec3();
	}

	public function clear():Void {
		prevClosestDir.zero();
	}

}
