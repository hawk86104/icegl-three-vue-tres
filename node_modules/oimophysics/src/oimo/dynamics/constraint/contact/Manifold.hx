package oimo.dynamics.constraint.contact;
import haxe.ds.Vector;
import oimo.common.MathUtil;
import oimo.common.Setting;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A contact manifold holds collision data of a pair of shapes.
 */
@:build(oimo.m.B.bu())
class Manifold {
	public var _normal:IVec3;
	public var _tangent:IVec3;
	public var _binormal:IVec3;
	public var _numPoints:Int;
	public var _points:Vector<ManifoldPoint>;

	@:dox(hide)
	public function new() {
		M.vec3_zero(_normal);
		M.vec3_zero(_tangent);
		M.vec3_zero(_binormal);
		_numPoints = 0;
		_points = new Vector<ManifoldPoint>(Setting.maxManifoldPoints);
		for (i in 0...Setting.maxManifoldPoints) {
			_points[i] = new ManifoldPoint();
		}
	}

	// --- internal ---

	public function _clear():Void {
		for (i in 0..._numPoints) {
			_points[i]._clear();
		}
		_numPoints = 0;
	}

	public function _buildBasis(normal:Vec3):Void {
		M.vec3_fromVec3(_normal, normal);
		var nx:Float = normal.x;
		var ny:Float = normal.y;
		var nz:Float = normal.z;
		var nx2:Float = nx * nx;
		var ny2:Float = ny * ny;
		var nz2:Float = nz * nz;
		var tx:Float;
		var ty:Float;
		var tz:Float;
		var bx:Float;
		var by:Float;
		var bz:Float;
		M.compare3min(nx2, ny2, nz2, {
			var invL:Float = 1 / MathUtil.sqrt(ny2 + nz2);
			tx = 0;
			ty = -nz * invL;
			tz = ny * invL;
			bx = ny * tz - nz * ty;
			by = -nx * tz;
			bz = nx * ty;
		}, {
			var invL:Float = 1 / MathUtil.sqrt(nx2 + nz2);
			tx = nz * invL;
			ty = 0;
			tz = -nx * invL;
			bx = ny * tz;
			by = nz * tx - nx * tz;
			bz = -ny * tx;
		}, {
			var invL:Float = 1 / MathUtil.sqrt(nx2 + ny2);
			tx = -ny * invL;
			ty = nx * invL;
			tz = 0;
			bx = -nz * ty;
			by = nz * tx;
			bz = nx * ty - ny * tx;
		});
		M.vec3_set(_tangent, tx, ty, tz);
		M.vec3_set(_binormal, bx, by, bz);
	}

	public function _updateDepthsAndPositions(tf1:Transform, tf2:Transform):Void {
		for (i in 0..._numPoints) {
			var p:ManifoldPoint = _points[i];
			M.vec3_mulMat3(p._relPos1, p._localPos1, tf1._rotation);
			M.vec3_mulMat3(p._relPos2, p._localPos2, tf2._rotation);
			M.vec3_add(p._pos1, p._relPos1, tf1._position);
			M.vec3_add(p._pos2, p._relPos2, tf2._position);

			var diff:IVec3;
			M.vec3_sub(diff, p._pos1, p._pos2);
			var dotN:Float = M.vec3_dot(diff, _normal);
			p._depth = -dotN;
		}
	}

	// --- public ---

	/**
	 * Returns the normal vector of the contact manifold. The normal vector has unit
	 * length and is perpendicular to the contact plane.
	 */
	public inline function getNormal():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _normal);
		return v;
	}

	/**
	 * Sets `normal` to the normal vector of the contact manifold. The normal vector has
	 * unit length and is perpendicular to the contact plane.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getNormalTo(normal:Vec3):Void {
		M.vec3_toVec3(normal, _normal);
	}

	/**
	 * Returns the tangent vector of the contact manifold. The tangent vector has unit
	 * length and is perpendicular to the normal vector.
	 */
	public inline function getTangent():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _tangent);
		return v;
	}

	/**
	 * Sets `tangent` to the tangent vector of the contact manifold. The tangent vector has
	 * unit length and is perpendicular to the normal vector.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getTangentTo(tangent:Vec3):Void {
		M.vec3_toVec3(tangent, _tangent);
	}

	/**
	 * Returns the binormal vector of the contact manifold. The binormal vector has unit
	 * length and is perpendicular to both the normal and the tangent vector.
	 */
	public inline function getBinormal():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _binormal);
		return v;
	}

	/**
	 * Sets `binormal` to the binormal vector of the contact manifold. The binormal vector has
	 * unit length and is perpendicular to both the normal and the tangent vector.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getBinormalTo(binormal:Vec3):Void {
		M.vec3_toVec3(binormal, _binormal);
	}

	/**
	 * Returns the manifold point vector of the contact manifold. Note that **only the first
	 * `Manifold.getNumPoints` elements of the vector are in use**, and the manifold points may
	 * be disabled (see `ManifoldPoint.isEnabled`).
	 */
	public inline function getPoints():Vector<ManifoldPoint> {
		return _points;
	}

	/**
	 * Returns the number of existing manifold points.
	 */
	public inline function getNumPoints():Int {
		return _numPoints;
	}

}
