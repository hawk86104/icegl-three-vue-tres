package oimo.collision.narrowphase.detector.gjkepa;
import oimo.common.Vec3;

/**
 * Internal class.
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class EpaVertex {
	public var _next:EpaVertex; // for object pooling

	public var v:Vec3;
	public var w1:Vec3;
	public var w2:Vec3;

	public var _tmpEdgeLoopNext:EpaVertex;
	public var _tmpEdgeLoopOuterTriangle:EpaTriangle;

	public var randId:Int = Std.int(Math.random() * 100000);

	public function new() {
		v = new Vec3();
		w1 = new Vec3();
		w2 = new Vec3();
	}

	public function init(v:Vec3, w1:Vec3, w2:Vec3):EpaVertex {
		this.v.copyFrom(v);
		this.w1.copyFrom(w1);
		this.w2.copyFrom(w2);
		_next = null;
		_tmpEdgeLoopNext = null;
		_tmpEdgeLoopOuterTriangle = null;
		return this;
	}

	public function removeReferences():Void {
		_next = null;
		_tmpEdgeLoopNext = null;
		_tmpEdgeLoopOuterTriangle = null;
	}

}
