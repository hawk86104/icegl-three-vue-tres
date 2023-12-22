package oimo.collision.geometry;
import oimo.collision.geometry.RayCastHit;
import oimo.collision.narrowphase.detector.gjkepa.GjkEpa;
import oimo.common.Setting;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Abstract class of the convex collision geometries supported by GJK/EPA collision detection.
 */
@:build(oimo.m.B.bu())
class ConvexGeometry extends Geometry {
	// TODO: divide margin into "inner" margin and "outer" margin
	public var _gjkMargin:Float;
	public var _useGjkRayCast:Bool;

	@:dox(hide)
	public function new(type:Int) {
		super(type);
		_gjkMargin = Setting.defaultGJKMargin;
		_useGjkRayCast = false;
	}

	/**
	 * Returns the GJK mergin around the "core" of the convex geometry.
	 */
	public inline function getGjkMergin():Float {
		return _gjkMargin;
	}

	/**
	 * Sets the GJK mergin around the "core" to `gjkMergin`.
	 */
	public inline function setGjkMergin(gjkMergin:Float):Void {
		if (gjkMergin < 0) gjkMergin = 0;
		_gjkMargin = gjkMergin;
	}

	/**
	 * Computes supporting vertex of the "core" of the geometry in local coordinates.
	 * Note that the direction vector `dir` might not be normalized. `out` is set to
	 * the computed supporting vertex.
	 */
	public function computeLocalSupportingVertex(dir:Vec3, out:Vec3):Void {
	}

	override public function rayCast(begin:Vec3, end:Vec3, transform:Transform, hit:RayCastHit):Bool {
		if (_useGjkRayCast) {
			return GjkEpa.getInstance().rayCast(this, transform, begin, end, hit);
		} else {
			return super.rayCast(begin, end, transform, hit);
		}
	}
}
