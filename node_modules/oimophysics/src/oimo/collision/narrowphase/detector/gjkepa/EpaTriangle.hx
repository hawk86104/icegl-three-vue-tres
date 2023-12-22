package oimo.collision.narrowphase.detector.gjkepa;
import haxe.ds.Vector;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.MathUtil;
import oimo.common.Vec3;

/**
 * Internal class.
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class EpaTriangle {
	public var _next:EpaTriangle;
	public var _prev:EpaTriangle;

	public var _vertices:Vector<EpaVertex>;
	public var _adjacentTriangles:Vector<EpaTriangle>;
	public var _adjacentPairIndex:Vector<Int>;
	public var _normal:Vec3;
	public var _distanceSq:Float;

	public var _nextIndex:Vector<Int>; // (0, 1, 2) -> (1, 2, 0)

	public var _tmpDfsId:Int;
	public var _tmpDfsVisible:Bool;

	var tmp:Vec3;

	public static var count:Int = 0;
	public var id:Int = ++count;

	public function new() {
		_next = null;
		_prev = null;
		_normal = new Vec3();
		_distanceSq = 0;
		_tmpDfsId = 0;
		_tmpDfsVisible = false;

		_vertices = new Vector<EpaVertex>(3);
		_adjacentTriangles = new Vector<EpaTriangle>(3);
		_adjacentPairIndex = new Vector<Int>(3);
		tmp = new Vec3();
		_nextIndex = new Vector<Int>(3);
		_nextIndex[0] = 1;
		_nextIndex[1] = 2;
		_nextIndex[2] = 0;
	}

	extern public inline function checkVisible(id:Int, from:Vec3):Bool {
		// if (id == _tmpDfsId) return _tmpDfsVisible;
		tmp.copyFrom(from).subEq(_vertices[0].v);
		_tmpDfsVisible = tmp.dot(_normal) > 0;
		return _tmpDfsVisible;
	}

	public function init(vertex1:EpaVertex, vertex2:EpaVertex, vertex3:EpaVertex, center:Vec3, autoCheck:Bool = false):Bool {
		var v1:IVec3;
		var v2:IVec3;
		var v3:IVec3;
		var vc:IVec3;
		M.vec3_fromVec3(v1, vertex1.v);
		M.vec3_fromVec3(v2, vertex2.v);
		M.vec3_fromVec3(v3, vertex3.v);
		M.vec3_fromVec3(vc, center);
		var v12:IVec3; // 1 to 2
		var v13:IVec3; // 1 to 3
		var vc1:IVec3; // c to 1
		M.vec3_sub(v12, v2, v1);
		M.vec3_sub(v13, v3, v1);
		M.vec3_sub(vc1, v1, vc);
		var inor:IVec3;
		M.vec3_cross(inor, v12, v13);
		var inverted:Bool = false;
		var d:Float = M.vec3_dot(vc1, inor);
		if (d < 0) {
			if (autoCheck) {
				GjkEpaLog.log("found the triangle inverted, but it does not matter.");
				// vertices must be CCW
				var tmp = vertex2;
				vertex2 = vertex3;
				vertex3 = tmp;
				M.vec3_scale(inor, inor, -1);
			} else {
				GjkEpaLog.log("the triangle is inverted!");
				inverted = true;
				//return false;
			}
		}
		_vertices[0] = vertex1;
		_vertices[1] = vertex2;
		_vertices[2] = vertex3;
		M.vec3_toVec3(_normal, inor);
		SimplexUtil.projectOrigin3(vertex1.v, vertex2.v, vertex3.v, tmp);
		_distanceSq = tmp.lengthSq();

		_adjacentTriangles[0] = null;
		_adjacentTriangles[1] = null;
		_adjacentTriangles[2] = null;
		_adjacentPairIndex[0] = -1;
		_adjacentPairIndex[1] = -1;
		_adjacentPairIndex[2] = -1;
		return !inverted;
	}

	public function setAdjacentTriangle(triangle:EpaTriangle):Bool {
		var count:Int = 0;
		for (i in 0...3) {
			for (j in 0...3) {
				var i2:Int = _nextIndex[i];
				var j2:Int = _nextIndex[j];
				if (_vertices[i] == triangle._vertices[j2] && _vertices[i2] == triangle._vertices[j]) {
					_adjacentTriangles[i] = triangle;
					_adjacentPairIndex[i] = j;
					triangle._adjacentTriangles[j] = this;
					triangle._adjacentPairIndex[j] = i;
					count++;
				}
			}
		}
		if (count != 1) {
			GjkEpaLog.log(_vertices[0].randId + " " + _vertices[1].randId + " " + _vertices[2].randId);
			GjkEpaLog.log(triangle._vertices[0].randId + " " + triangle._vertices[1].randId + " " + triangle._vertices[2].randId);
			return false; // invalid polyhedron
		}
		return true;
	}

	public inline function removeAdjacentTriangles():Void {
		for (i in 0...3) {
			var triangle:EpaTriangle = _adjacentTriangles[i];
			if (triangle != null) {
				var pairIndex:Int = _adjacentPairIndex[i];
				triangle._adjacentTriangles[pairIndex] = null;
				triangle._adjacentPairIndex[pairIndex] = -1;
				_adjacentTriangles[i] = null;
				_adjacentPairIndex[i] = -1;
			}
		}
	}

	public function removeReferences():Void {
		_next = null;
		_prev = null;
		_tmpDfsId = 0;
		_tmpDfsVisible = false;
		_distanceSq = 0;
		_vertices[0] = null;
		_vertices[1] = null;
		_vertices[2] = null;
		_adjacentTriangles[0] = null;
		_adjacentTriangles[1] = null;
		_adjacentTriangles[2] = null;
		_adjacentPairIndex[0] = 0;
		_adjacentPairIndex[1] = 0;
		_adjacentPairIndex[2] = 0;
	}

	public function dump():Void {
		GjkEpaLog.log(
'Face data:
  id:$id
  v1:${_vertices[0].v}
  v2:${_vertices[1].v}
  v3:${_vertices[2].v}
  n:$_normal
  distSq:$_distanceSq
'
		);
	}

}
