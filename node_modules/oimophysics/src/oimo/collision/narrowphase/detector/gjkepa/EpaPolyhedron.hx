package oimo.collision.narrowphase.detector.gjkepa;
import haxe.ds.Vector;
import oimo.common.MathUtil;
import oimo.common.Setting;
import oimo.common.Vec3;
import oimo.m.M;

/**
 * Internal class.
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class EpaPolyhedron {
	public var _vertices:Vector<EpaVertex>;
	public var _numVertices:Int;

	public var _triangleList:EpaTriangle;
	public var _triangleListLast:EpaTriangle;
	public var _numTriangles:Int;

	public var _trianglePool:EpaTriangle;
	public var _vertexPool:EpaVertex;

	public var _center:Vec3;
	public var _status:Int;

	public function new() {
		_vertices = new Vector<EpaVertex>(Setting.maxEPAVertices);
		_center = new Vec3();
		_numVertices = 0;
		_triangleList = null;
		_triangleListLast = null;
		_numTriangles = 0;
		_trianglePool = null;
		_vertexPool = null;
	}

	// --- private ---

	extern inline function pickTriangle():EpaTriangle {
		return M.singleList_pick(_trianglePool, _next, new EpaTriangle());
	}

	extern inline function poolTriangle(t:EpaTriangle):Void {
		t.removeReferences();
		M.singleList_pool(_trianglePool, _next, t);
	}

	extern inline function setAdjacentTriangle(t1:EpaTriangle, t2:EpaTriangle):Void {
		if (!t1.setAdjacentTriangle(t2)) {
			_status = EpaPolyhedronState.INVALID_TRIANGLE;
		}
	}

	extern inline function initTriangle(t:EpaTriangle, vertex1:EpaVertex, vertex2:EpaVertex, vertex3:EpaVertex, center:Vec3, autoCheck:Bool = false):Void {
		if (!t.init(vertex1, vertex2, vertex3, center, autoCheck)) {
			_status = EpaPolyhedronState.INVALID_TRIANGLE;
		}
	}

	function dumpHoleEdge(first:EpaVertex):Void {
		GjkEpaLog.run({
			var v:EpaVertex = first;
			var vs = "";
			var fs = "";
			var cnt = 0;
			do {
				cnt += 2;
				vs += "v " + v.v.x + " " + v.v.y + " " + v.v.z + "\n";
				vs += "v " + v.v.x + " " + v.v.y + " " + v.v.z + "\n";
				fs += "f " + (cnt - 1) + " " + cnt + " " + (cnt + 1) + "\n";
				v = v._tmpEdgeLoopNext;
			} while (v != first);
			vs += "v " + v.v.x + " " + v.v.y + " " + v.v.z + "\n";
			trace("edge loop data:\n" + vs + "\n" + fs);
		});
	}

	function validate():Bool {
		var t:EpaTriangle;
		t = _triangleList;
		M.list_foreach(t, _next, {
			for (i in 0...3) {
				t._vertices[i]._tmpEdgeLoopOuterTriangle = null;
				t._vertices[i]._tmpEdgeLoopNext = null;
				if (t._adjacentPairIndex[i] == -1) {
					_status = EpaPolyhedronState.NO_ADJACENT_PAIR_INDEX;
					return false;
					//throw M.error("!?"));
				}
				if (t._adjacentTriangles[i] == null) {
					_status = EpaPolyhedronState.NO_ADJACENT_TRIANGLE;
					return false;
					//throw M.error("!?"));
				}
			}
		});
		return true;
	}

	function findEdgeLoop(id:Int, base:EpaTriangle, from:Vec3):Void {
		if (base._tmpDfsId == id) return;
		base._tmpDfsId = id;
		GjkEpaLog.log("DFS: " + base.id);
		if (!base.checkVisible(id, from)) {
			_status = EpaPolyhedronState.TRIANGLE_INVISIBLE;
			GjkEpaLog.log("tri " + base.id + " is invisible!");
			return;
		}

		// find edges of the hole
		for (i in 0...3) {
			var t:EpaTriangle = base._adjacentTriangles[i];
			if (t == null) continue;
			if (t.checkVisible(id, from)) {
				GjkEpaLog.log("tri " + t.id + " is visible.");
				findEdgeLoop(id, t, from);
			} else {
				// triangle `base` can be seen from `from`, but triangle `t` cannot.
				GjkEpaLog.log("tri " + t.id + " is invisible.");
				GjkEpaLog.log("added edge: " + base.id + " " + t.id);
				var i2:Int = base._nextIndex[i];
				var v1:EpaVertex = base._vertices[i];
				var v2:EpaVertex = base._vertices[i2];
				v1._tmpEdgeLoopNext = v2;
				v1._tmpEdgeLoopOuterTriangle = t;
			}
		}

		// expand the hole
		base.removeAdjacentTriangles();
		removeTriangle(base);
	}

	extern inline function addTriangle(t:EpaTriangle):Void {
		_numTriangles++;
		GjkEpaLog.log("triangle added " + _numTriangles + ", id: " + t.id);
		GjkEpaLog.run(t.dump());
		M.list_push(_triangleList, _triangleListLast, _prev, _next, t);
	}

	extern inline function removeTriangle(t:EpaTriangle):Void {
		_numTriangles--;
		GjkEpaLog.log("triangle removed " + _numTriangles + ", id: " + t.id);
		M.list_remove(_triangleList, _triangleListLast, _prev, _next, t);
		poolTriangle(t);
	}

	// --- internal ---

	extern public inline function _pickVertex():EpaVertex {
		return M.singleList_pick(_vertexPool, _next, new EpaVertex());
	}

	extern public inline function _poolVertex(v:EpaVertex):Void {
		v.removeReferences();
		M.singleList_pool(_vertexPool, _next, v);
	}

	extern public inline function _clear():Void {
		while (_numTriangles > 0) {
			removeTriangle(_triangleList);
		}
		M.assert(_triangleList == null);
		M.assert(_triangleListLast == null);
		while (_numVertices > 0) {
			_poolVertex(_vertices[--_numVertices]);
		}
	}

	public function _init(v1:EpaVertex, v2:EpaVertex, v3:EpaVertex, v4:EpaVertex):Bool {
		_status = EpaPolyhedronState.OK;
		_numVertices = 4;
		_vertices[0] = v1;
		_vertices[1] = v2;
		_vertices[2] = v3;
		_vertices[3] = v4;
		_center.copyFrom(v1.v).addEq(v2.v).addEq(v3.v).addEq(v4.v).scaleEq(0.25);
		var t1:EpaTriangle;
		var t2:EpaTriangle;
		var t3:EpaTriangle;
		var t4:EpaTriangle;
		t1 = pickTriangle();
		t2 = pickTriangle();
		t3 = pickTriangle();
		t4 = pickTriangle();
		initTriangle(t1, v1, v2, v3, _center, true);
		initTriangle(t2, v1, v2, v4, _center, true);
		initTriangle(t3, v1, v3, v4, _center, true);
		initTriangle(t4, v2, v3, v4, _center, true);
		setAdjacentTriangle(t1, t2);
		setAdjacentTriangle(t1, t3);
		setAdjacentTriangle(t1, t4);
		setAdjacentTriangle(t2, t3);
		setAdjacentTriangle(t2, t4);
		setAdjacentTriangle(t3, t4);
		addTriangle(t1);
		addTriangle(t2);
		addTriangle(t3);
		addTriangle(t4);
		return _status == EpaPolyhedronState.OK;
	}

	extern public inline function _getBestTriangle():EpaTriangle {
		var f:EpaTriangle = _triangleList;
		var mind:Float = MathUtil.POSITIVE_INFINITY;
		var minf:EpaTriangle = null;
		M.list_foreach(f, _next, {
			if (f._distanceSq < mind) {
				mind = f._distanceSq;
				minf = f;
			}
		});
		return minf;
	}

	public function _addVertex(vertex:EpaVertex, base:EpaTriangle):Bool {
		_vertices[_numVertices++] = vertex;
		GjkEpaLog.log("vertex added " + _numVertices + " " + vertex.v);
		GjkEpaLog.log("begin polyhedron modifying...");

		var v1:EpaVertex = base._vertices[0];

		GjkEpaLog.log("trying to find a edge loop... v=" + vertex.v);
		// make a hole on the polyhedron finding its edge loop
		findEdgeLoop(_numVertices, base, vertex.v);
		if (_status != EpaPolyhedronState.OK) return false;

		GjkEpaLog.run({
			dumpHoleEdge(v1);
		});

		// ... and "patch" the hole
		var v:EpaVertex = v1;
		var firstV:EpaVertex = v1;
		var prevT:EpaTriangle = null;
		var firstT:EpaTriangle = null;
		do {
			if (v._tmpEdgeLoopNext == null) {
				GjkEpaLog.log("edge loop is broken:");
				_dumpAsObjModel();
				_status = EpaPolyhedronState.EDGE_LOOP_BROKEN;
				return false;
			}
			if (v._tmpEdgeLoopOuterTriangle == null) {
				_status = EpaPolyhedronState.NO_OUTER_TRIANGLE;
				return false;
			}

			var t:EpaTriangle = pickTriangle();
			if (firstT == null) firstT = t;
			GjkEpaLog.log("patching...");

			initTriangle(t, v, v._tmpEdgeLoopNext, vertex, _center);
			if (_status != EpaPolyhedronState.OK) return false;
			addTriangle(t);

			setAdjacentTriangle(t, v._tmpEdgeLoopOuterTriangle);
			if (prevT != null) setAdjacentTriangle(t, prevT);

			prevT = t;

			v = v._tmpEdgeLoopNext;
		} while (v != firstV);
		setAdjacentTriangle(prevT, firstT);

		return _status == EpaPolyhedronState.OK && validate();
	}

	public function _dumpAsObjModel():Void {
		GjkEpaLog.run({
			trace("dumping .obj model of the polyhedron...");
			var f:EpaTriangle = _triangleList;
			var vs:String = "";
			var fs:String = "";
			var c:Int = 0;
			M.list_foreach(f, _next, {
				vs += "v " + f._vertices[0].v.x + " " + f._vertices[0].v.y + " " + f._vertices[0].v.z + "\n";
				vs += "v " + f._vertices[1].v.x + " " + f._vertices[1].v.y + " " + f._vertices[1].v.z + "\n";
				vs += "v " + f._vertices[2].v.x + " " + f._vertices[2].v.y + " " + f._vertices[2].v.z + "\n";
				fs += "f " + ++c + " " + ++c + " " + ++c + "\n";
			});
			trace("\n\n#EPAPolyhedron\n" + vs + "\n" + fs + "\n\n");
		});
	}
}
