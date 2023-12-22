package oimo.collision.geometry;
import haxe.ds.Vector;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Transform;
import oimo.common.Vec3;

/**
 * A convex hull collision geometry. A convex hull of the vertices is the smallest convex
 * polyhedron which contains all vertices.
 */
@:build(oimo.m.B.bu())
class ConvexHullGeometry extends ConvexGeometry {
	public var _vertices:Vector<Vec3>;
	public var _tmpVertices:Vector<Vec3>; // for internal use
	public var _numVertices:Int;

	/**
	 * Creates a convex hull collision geometry of the vertices `vertices`.
	 */
	public function new(vertices:Array<Vec3>) {
		super(GeometryType._CONVEX_HULL);
		_numVertices = vertices.length;
		_vertices = new Vector<Vec3>(_numVertices);
		_tmpVertices = new Vector<Vec3>(_numVertices);
		for (i in 0..._numVertices) {
			_vertices[i] = vertices[i];
			_tmpVertices[i] = new Vec3();
		}
		_useGjkRayCast = true;
		_updateMass();
	}

	/**
	 * Returns the vertices of the convex hull.
	 */
	public inline function getVertices():Vector<Vec3> {
		return _vertices;
	}

	override public function _updateMass():Void {
		_volume = 1;
		M.mat3_diagonal(_inertiaCoeff, 1, 1, 1);

		var minx:Float = _vertices[0].x;
		var miny:Float = _vertices[0].y;
		var minz:Float = _vertices[0].z;
		var maxx:Float = _vertices[0].x;
		var maxy:Float = _vertices[0].y;
		var maxz:Float = _vertices[0].z;

		for (i in 1..._numVertices) {
			var vx:Float = _vertices[i].x;
			var vy:Float = _vertices[i].y;
			var vz:Float = _vertices[i].z;
			if (vx < minx) minx = vx;
			else if (vx > maxx) maxx = vx;
			if (vy < miny) miny = vy;
			else if (vy > maxy) maxy = vy;
			if (vz < minz) minz = vz;
			else if (vz > maxz) maxz = vz;
		}

		var sizex:Float = maxx - minx;
		var sizey:Float = maxy - miny;
		var sizez:Float = maxz - minz;
		_volume = sizex * sizey * sizez;
		var diffCog:Float = (
			(minx + maxx) * (minx + maxx) +
			(miny + maxy) * (miny + maxy) +
			(minz + maxz) * (minz + maxz)
		) * 0.25;

		// (size / 2) ^ 2
		sizex = sizex * sizex * 0.25;
		sizey = sizey * sizey * 0.25;
		sizez = sizez * sizez * 0.25;


		M.mat3_diagonal(_inertiaCoeff,
			1 / 3 * (sizey + sizez) + diffCog,
			1 / 3 * (sizez + sizex) + diffCog,
			1 / 3 * (sizex + sizey) + diffCog
		);
	}

	override public function _computeAabb(aabb:Aabb, tf:Transform):Void {
		var min:IVec3;
		var max:IVec3;
		var margin:IVec3;

		M.vec3_set(margin, _gjkMargin, _gjkMargin, _gjkMargin);

		var localV:IVec3;
		M.vec3_fromVec3(localV, _vertices[0]);
		var worldV:IVec3;
		M.vec3_mulMat3(worldV, localV, tf._rotation);
		M.vec3_add(worldV, worldV, tf._position);

		M.vec3_assign(min, worldV);
		M.vec3_assign(max, worldV);

		for (i in 1..._numVertices) {
			M.vec3_fromVec3(localV, _vertices[i]);
			M.vec3_mulMat3(worldV, localV, tf._rotation);
			M.vec3_add(worldV, worldV, tf._position);
			M.vec3_min(min, min, worldV);
			M.vec3_max(max, max, worldV);
		}

		M.vec3_sub(aabb._min, min, margin);
		M.vec3_add(aabb._max, max, margin);
	}

	override public function computeLocalSupportingVertex(dir:Vec3, out:Vec3):Void {
		var maxDot:Float = _vertices[0].dot(dir);
		var maxIndex:Int = 0;
		for (i in 1..._numVertices) {
			var dot:Float = _vertices[i].dot(dir);
			if (dot > maxDot) {
				maxDot = dot;
				maxIndex = i;
			}
		}
		out.copyFrom(_vertices[maxIndex]);
	}

}
