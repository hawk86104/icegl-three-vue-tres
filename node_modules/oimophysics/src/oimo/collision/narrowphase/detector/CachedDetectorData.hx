package oimo.collision.narrowphase.detector;
import oimo.collision.narrowphase.detector.gjkepa.GjkCache;
import oimo.collision.narrowphase.detector.gjkepa.*;

/**
 * This is used for caching narrow-phase data of a pair of collision geometries.
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class CachedDetectorData {
	public var _gjkCache:GjkCache;

	public function new() {
	}

	public function _clear():Void {
		if (_gjkCache != null) _gjkCache.clear();
	}
}
