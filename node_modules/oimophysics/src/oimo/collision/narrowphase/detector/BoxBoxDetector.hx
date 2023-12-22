package oimo.collision.narrowphase.detector;

import haxe.ds.Vector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.common.MathUtil;
import oimo.common.Setting;
import oimo.common.Transform;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Box vs Box detector.
 */
@:build(oimo.m.B.bu())
class BoxBoxDetector extends Detector {
	static inline var EDGE_BIAS_MULT:Float = 1.0;

	var clipper:FaceClipper;

	/**
	 * Default constructor.
	 */
	public function new() {
		super(false);
		clipper = new FaceClipper();
	}

	override function detectImpl(result:DetectorResult, geom1:Geometry, geom2:Geometry, tf1:Transform, tf2:Transform, cachedData:CachedDetectorData):Void {
		var b1:BoxGeometry = cast geom1;
		var b2:BoxGeometry = cast geom2;

		result.incremental = false;

		// basis of box1 := {x1, y1, z1}
		// basis of box2 := {x2, y2, z2}
		// half-extents of box1 := {w1, h1, d1}
		// half-extents of box2 := {w2, h2, d2}
		//
		// candidates of the separating axis:
		//     x1,
		//     y1,
		//     z1,
		//     x2,
		//     y2,
		//     z2,
		//     cross(x1, x2),
		//     cross(x1, y2),
		//     cross(x1, z2),
		//     cross(y1, x2),
		//     cross(y1, y2),
		//     cross(y1, z2),
		//     cross(z1, x2),
		//     cross(z1, y2),
		//     cross(z1, z2).
		//
		// projected length of box1:
		//   project to       | length
		//   -------------------------------
		//   x1               | w1
		//   y1               | h1
		//   z1               | d1
		//   a = cross(x1, _) | h1|y1.a| + d1|z1.a|
		//   a = cross(y1, _) | w1|x1.a| + d1|z1.a|
		//   a = cross(z1, _) | w1|x1.a| + h1|y1.a|
		//   a = _            | w1|x1.a| + h1|y1.a| + d1|z1.a|
		//
		// projected length of box2:
		//   project to       | length
		//   -------------------------------
		//   x2               | w2
		//   y2               | h2
		//   z2               | d2
		//   a = cross(x2, _) | h2|y2.a| + d2|z2.a|
		//   a = cross(y2, _) | w2|x2.a| + d2|z2.a|
		//   a = cross(z2, _) | w2|x2.a| + h2|y2.a|
		//   a = _            | w2|x2.a| + h2|y2.a| + d2|z2.a|

		var c1:IVec3;
		var c2:IVec3;
		var c12:IVec3; // from center1 to center2
		M.vec3_assign(c1, tf1._position);
		M.vec3_assign(c2, tf2._position);
		M.vec3_sub(c12, c2, c1);

		// bases
		var x1:IVec3;
		var y1:IVec3;
		var z1:IVec3;
		var x2:IVec3;
		var y2:IVec3;
		var z2:IVec3;
		M.mat3_getCol(x1, tf1._rotation, 0);
		M.mat3_getCol(y1, tf1._rotation, 1);
		M.mat3_getCol(z1, tf1._rotation, 2);
		M.mat3_getCol(x2, tf2._rotation, 0);
		M.mat3_getCol(y2, tf2._rotation, 1);
		M.mat3_getCol(z2, tf2._rotation, 2);

		// half extents
		var w1:Float;
		var h1:Float;
		var d1:Float;
		var w2:Float;
		var h2:Float;
		var d2:Float;
		w1 = M.vec3_get(b1._halfExtents, 0);
		h1 = M.vec3_get(b1._halfExtents, 1);
		d1 = M.vec3_get(b1._halfExtents, 2);
		w2 = M.vec3_get(b2._halfExtents, 0);
		h2 = M.vec3_get(b2._halfExtents, 1);
		d2 = M.vec3_get(b2._halfExtents, 2);

		// scaled bases by half extents
		var sx1:IVec3;
		var sy1:IVec3;
		var sz1:IVec3;
		var sx2:IVec3;
		var sy2:IVec3;
		var sz2:IVec3;
		M.vec3_scale(sx1, x1, w1);
		M.vec3_scale(sy1, y1, h1);
		M.vec3_scale(sz1, z1, d1);
		M.vec3_scale(sx2, x2, w2);
		M.vec3_scale(sy2, y2, h2);
		M.vec3_scale(sz2, z2, d2);

		// --------------------- SAT check start ---------------------

		var proj1:Float;
		var proj2:Float;
		var projSum:Float;
		var projC12:Float;
		var projC12Abs:Float;

		var mDepth:Float = MathUtil.POSITIVE_INFINITY;
		var mId:Int = -1;
		var mSign:Int = 0;
		var mAxis:IVec3;
		M.vec3_zero(mAxis);

		// --------------------- 6 faces ---------------------

		// try axis = x1
		proj1 = w1;
		proj2 = M.call(project(x1, sx2, sy2, sz2));
		projC12 = M.vec3_dot(x1, c12);
		BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, x1, 0, 1.0);

		// try axis = y1
		proj1 = h1;
		proj2 = M.call(project(y1, sx2, sy2, sz2));
		projC12 = M.vec3_dot(y1, c12);
		BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, y1, 1, 1.0);

		// try axis = z1
		proj1 = d1;
		proj2 = M.call(project(z1, sx2, sy2, sz2));
		projC12 = M.vec3_dot(z1, c12);
		BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, z1, 2, 1.0);

		// apply bias to avoid jitting
		if (mDepth > Setting.linearSlop) {
			mDepth -= Setting.linearSlop;
		} else {
			mDepth = 0;
		}

		// try axis = x2
		proj1 = M.call(project(x2, sx1, sy1, sz1));
		proj2 = w2;
		projC12 = M.vec3_dot(x2, c12);
		BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, x2, 3, 1.0);

		// try axis = y2
		proj1 = M.call(project(y2, sx1, sy1, sz1));
		proj2 = h2;
		projC12 = M.vec3_dot(y2, c12);
		BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, y2, 4, 1.0);

		// try axis = z2
		proj1 = M.call(project(z2, sx1, sy1, sz1));
		proj2 = d2;
		projC12 = M.vec3_dot(z2, c12);
		BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, z2, 5, 1.0);

		// --------------------- 9 edges ---------------------

		// apply bias again to avoid jitting
		if (mDepth > Setting.linearSlop) {
			mDepth -= Setting.linearSlop;
		} else {
			mDepth = 0;
		}

		var edgeAxis:IVec3;

		// try cross(x1, x2)
		M.vec3_cross(edgeAxis, x1, x2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sy1, sz1));
			proj2 = M.call(project2(edgeAxis, sy2, sz2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 6, EDGE_BIAS_MULT);
		}

		// try cross(x1, y2)
		M.vec3_cross(edgeAxis, x1, y2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sy1, sz1));
			proj2 = M.call(project2(edgeAxis, sx2, sz2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 7, EDGE_BIAS_MULT);
		}

		// try cross(x1, z2)
		M.vec3_cross(edgeAxis, x1, z2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sy1, sz1));
			proj2 = M.call(project2(edgeAxis, sx2, sy2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 8, EDGE_BIAS_MULT);
		}

		// try cross(y1, x2)
		M.vec3_cross(edgeAxis, y1, x2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sx1, sz1));
			proj2 = M.call(project2(edgeAxis, sy2, sz2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 9, EDGE_BIAS_MULT);
		}

		// try cross(y1, y2)
		M.vec3_cross(edgeAxis, y1, y2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sx1, sz1));
			proj2 = M.call(project2(edgeAxis, sx2, sz2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 10, EDGE_BIAS_MULT);
		}

		// try cross(y1, z2)
		M.vec3_cross(edgeAxis, y1, z2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sx1, sz1));
			proj2 = M.call(project2(edgeAxis, sx2, sy2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 11, EDGE_BIAS_MULT);
		}

		// try cross(z1, x2)
		M.vec3_cross(edgeAxis, z1, x2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sx1, sy1));
			proj2 = M.call(project2(edgeAxis, sy2, sz2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 12, EDGE_BIAS_MULT);
		}

		// try cross(z1, y2)
		M.vec3_cross(edgeAxis, z1, y2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sx1, sy1));
			proj2 = M.call(project2(edgeAxis, sx2, sz2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 13, EDGE_BIAS_MULT);
		}

		// try cross(z1, z2)
		M.vec3_cross(edgeAxis, z1, z2);
		if (!M.vec3_isZero(edgeAxis)) {
			M.vec3_normalize(edgeAxis, edgeAxis);
			proj1 = M.call(project2(edgeAxis, sx1, sy1));
			proj2 = M.call(project2(edgeAxis, sx2, sy2));
			projC12 = M.vec3_dot(edgeAxis, c12);
			BoxBoxDetectorMacro.satCheck(mDepth, mId, mSign, mAxis, proj1, proj2, projC12, edgeAxis, 14, EDGE_BIAS_MULT);
		}

		// --------------------- edge-edge collision check ---------------------

		if (mId >= 6) {
			// flip axis so that it directs from box1 to box2
			M.vec3_scale(mAxis, mAxis, mSign);

			// direction of edges: 0 = x, 1 = y, 2 = z
			var id1:Int = Std.int((mId - 6) / 3);
			var id2:Int = (mId - 6) - id1 * 3;

			// points on the edges
			var p1:IVec3;
			var p2:IVec3;

			// directions
			var d1:IVec3;
			var d2:IVec3;

			switch (id1) {
				case 0: // use y and z
					M.vec3_assign(d1, x1);
					BoxBoxDetectorMacro.supportingVertexRect(p1, sy1, sz1, mAxis);
				case 1: // use x and z
					M.vec3_assign(d1, y1);
					BoxBoxDetectorMacro.supportingVertexRect(p1, sx1, sz1, mAxis);
				case _: // use x and y
					M.vec3_assign(d1, z1);
					BoxBoxDetectorMacro.supportingVertexRect(p1, sx1, sy1, mAxis);
			}
			M.vec3_add(p1, c1, p1);

			switch (id2) {
				case 0: // use y and z
					M.vec3_assign(d2, x2);
					BoxBoxDetectorMacro.supportingVertexRect(p2, sy2, sz2, mAxis);
				case 1: // use x and z
					M.vec3_assign(d2, y2);
					BoxBoxDetectorMacro.supportingVertexRect(p2, sx2, sz2, mAxis);
				case _: // use x and y
					M.vec3_assign(d2, z2);
					BoxBoxDetectorMacro.supportingVertexRect(p2, sx2, sy2, mAxis);
			}
			M.vec3_sub(p2, c2, p2);

			// compute params
			var r:IVec3;
			M.vec3_sub(r, p1, p2);

			var dot12:Float = M.vec3_dot(d1, d2);
			var dot1r:Float = M.vec3_dot(d1, r);
			var dot2r:Float = M.vec3_dot(d2, r);

			var invDet:Float = 1 / (1 - dot12 * dot12);
			var t1:Float = (dot12 * dot2r - dot1r) * invDet;
			var t2:Float = (dot2r - dot12 * dot1r) * invDet;

			// compute closest points and normal
			var cp1:IVec3;
			var cp2:IVec3;
			M.vec3_addRhsScaled(cp1, p1, d1, t1);
			M.vec3_addRhsScaled(cp2, p2, d2, t2);

			var normal:IVec3;
			M.vec3_negate(normal, mAxis);

			// add contact point
			M.call(setNormal(result, normal));
			M.call(addPoint(result, cp1, cp2, mDepth, 4));
			return;
		}

		// --------------------- face-face collision check ---------------------

		var tmp:IVec3;
		var swapped:Bool;

		if (mId >= 3) { // swap box1 and box2
			mSign = -mSign;
			M.vec3_negate(c12, c12);
			BoxBoxDetectorMacro.swap(b1, b2);
			BoxBoxDetectorMacro.swap(w1, w2);
			BoxBoxDetectorMacro.swap(h1, h2);
			BoxBoxDetectorMacro.swap(d1, d2);
			BoxBoxDetectorMacro.swapV(tmp, c1, c2);
			BoxBoxDetectorMacro.swapV(tmp, x1, x2);
			BoxBoxDetectorMacro.swapV(tmp, y1, y2);
			BoxBoxDetectorMacro.swapV(tmp, z1, z2);
			BoxBoxDetectorMacro.swapV(tmp, sx1, sx2);
			BoxBoxDetectorMacro.swapV(tmp, sy1, sy2);
			BoxBoxDetectorMacro.swapV(tmp, sz1, sz2);

			mId -= 3;
			swapped = true;
		} else {
			swapped = false;
		}

		// --------------------- find reference face ---------------------

		var refCenter:IVec3;
		var refNormal:IVec3;
		var refX:IVec3;
		var refY:IVec3;
		var refW:Float;
		var refH:Float;

		switch (mId) {
			case 0: // x+ or x-
				M.vec3_assign(refCenter, sx1);
				M.vec3_assign(refNormal, x1);
				M.vec3_assign(refX, y1);
				M.vec3_assign(refY, z1);
				refW = h1;
				refH = d1;
			case 1: // y+ or y-
				M.vec3_assign(refCenter, sy1);
				M.vec3_assign(refNormal, y1);
				M.vec3_assign(refX, z1);
				M.vec3_assign(refY, x1);
				refW = d1;
				refH = w1;
			case _: // z+ or z-
				M.vec3_assign(refCenter, sz1);
				M.vec3_assign(refNormal, z1);
				M.vec3_assign(refX, x1);
				M.vec3_assign(refY, y1);
				refW = w1;
				refH = h1;
		}

		if (mSign < 0) { // x- or y- or z-
			M.vec3_negate(refCenter, refCenter);
			M.vec3_negate(refNormal, refNormal);
			BoxBoxDetectorMacro.swapV(tmp, refX, refY);
			BoxBoxDetectorMacro.swap(refW, refH);
		}

		// translate reference center
		M.vec3_add(refCenter, refCenter, c1);

		// --------------------- find incident face ---------------------

		var minIncDot:Float = 1;
		var incId:Int = 0;

		var incDot:Float;
		incDot = M.vec3_dot(refNormal, x2);
		if (incDot < minIncDot) { // x+
			minIncDot = incDot;
			incId = 0;
		}
		if (-incDot < minIncDot) { // x-
			minIncDot = -incDot;
			incId = 1;
		}
		incDot = M.vec3_dot(refNormal, y2);
		if (incDot < minIncDot) { // y+
			minIncDot = incDot;
			incId = 2;
		}
		if (-incDot < minIncDot) { // y-
			minIncDot = -incDot;
			incId = 3;
		}
		incDot = M.vec3_dot(refNormal, z2);
		if (incDot < minIncDot) { // y+
			minIncDot = incDot;
			incId = 4;
		}
		if (-incDot < minIncDot) { // y-
			minIncDot = -incDot;
			incId = 5;
		}

		var incV1:IVec3;
		var incV2:IVec3;
		var incV3:IVec3;
		var incV4:IVec3;

		switch (incId) {
			case 0:
				BoxBoxDetectorMacro.getBoxFace(incV1, incV2, incV3, incV4, sx2, sy2, sz2, "x+");
			case 1:
				BoxBoxDetectorMacro.getBoxFace(incV1, incV2, incV3, incV4, sx2, sy2, sz2, "x-");
			case 2:
				BoxBoxDetectorMacro.getBoxFace(incV1, incV2, incV3, incV4, sx2, sy2, sz2, "y+");
			case 3:
				BoxBoxDetectorMacro.getBoxFace(incV1, incV2, incV3, incV4, sx2, sy2, sz2, "y-");
			case 4:
				BoxBoxDetectorMacro.getBoxFace(incV1, incV2, incV3, incV4, sx2, sy2, sz2, "z+");
			case _:
				BoxBoxDetectorMacro.getBoxFace(incV1, incV2, incV3, incV4, sx2, sy2, sz2, "z-");
		}

		M.vec3_add(incV1, incV1, c12);
		M.vec3_add(incV2, incV2, c12);
		M.vec3_add(incV3, incV3, c12);
		M.vec3_add(incV4, incV4, c12);

		// --------------------- clip incident face ---------------------

		clipper.init(refW, refH);
		clipper.addIncidentVertex(M.vec3_dot(incV1, refX), M.vec3_dot(incV1, refY), M.vec3_get(incV1, 0), M.vec3_get(incV1, 1), M.vec3_get(incV1, 2));
		clipper.addIncidentVertex(M.vec3_dot(incV2, refX), M.vec3_dot(incV2, refY), M.vec3_get(incV2, 0), M.vec3_get(incV2, 1), M.vec3_get(incV2, 2));
		clipper.addIncidentVertex(M.vec3_dot(incV3, refX), M.vec3_dot(incV3, refY), M.vec3_get(incV3, 0), M.vec3_get(incV3, 1), M.vec3_get(incV3, 2));
		clipper.addIncidentVertex(M.vec3_dot(incV4, refX), M.vec3_dot(incV4, refY), M.vec3_get(incV4, 0), M.vec3_get(incV4, 1), M.vec3_get(incV4, 2));
		clipper.clip();

		// --------------------- reduce vertices ---------------------

		clipper.reduce();

		// --------------------- add contact points ---------------------

		// set normal
		var normal:IVec3;
		if (swapped) {
			M.vec3_assign(normal, refNormal);
		} else {
			M.vec3_negate(normal, refNormal);
		}
		M.call(setNormal(result, normal));

		// add contact points
		for (i in 0...clipper.numVertices) {
			var v:IncidentVertex = clipper.vertices[i];

			var clippedVertex:IVec3;
			M.vec3_set(clippedVertex, v.wx, v.wy, v.wz);
			M.vec3_add(clippedVertex, clippedVertex, c1);

			var clippedVertexToRefCenter:IVec3;
			M.vec3_sub(clippedVertexToRefCenter, refCenter, clippedVertex);
			var depth:Float = M.vec3_dot(clippedVertexToRefCenter, refNormal);

			var clippedVertexOnRefFace:IVec3;
			M.vec3_addRhsScaled(clippedVertexOnRefFace, clippedVertex, refNormal, depth);

			if (depth > -Setting.contactPersistenceThreshold) {
				if (swapped) {
					M.call(addPoint(result, clippedVertex, clippedVertexOnRefFace, depth, i));
				} else {
					M.call(addPoint(result, clippedVertexOnRefFace, clippedVertex, depth, i));
				}
			}
		}
	}

	/**
	 * Returns half of the projected length of the box with scaled bases
	 * (`sx`, `sy`, `sz`) onto the normalized axis `axis`.
	 */
	extern inline function project(axis:IVec3, sx:IVec3, sy:IVec3, sz:IVec3):Float {
		var dx:Float = M.vec3_dot(axis, sx);
		var dy:Float = M.vec3_dot(axis, sy);
		var dz:Float = M.vec3_dot(axis, sz);
		if (dx < 0)
			dx = -dx;
		if (dy < 0)
			dy = -dy;
		if (dz < 0)
			dz = -dz;
		return dx + dy + dz;
	}

	/**
	 * 2D version of `project`.
	 */
	extern inline function project2(axis:IVec3, sx:IVec3, sy:IVec3):Float {
		var dx:Float = M.vec3_dot(axis, sx);
		var dy:Float = M.vec3_dot(axis, sy);
		if (dx < 0)
			dx = -dx;
		if (dy < 0)
			dy = -dy;
		return dx + dy;
	}
}

private class IncidentVertex {
	// projected coord
	public var x:Float;
	public var y:Float;

	// world coord
	public var wx:Float;
	public var wy:Float;
	public var wz:Float;

	public function new() {
		x = 0;
		y = 0;
		wx = 0;
		wy = 0;
		wz = 0;
	}

	extern public inline function init(x:Float, y:Float, wx:Float, wy:Float, wz:Float):Void {
		this.x = x;
		this.y = y;
		this.wx = wx;
		this.wy = wy;
		this.wz = wz;
	}

	extern public inline function copyFrom(v:IncidentVertex):Void {
		x = v.x;
		y = v.y;
		wx = v.wx;
		wy = v.wy;
		wz = v.wz;
	}

	extern public inline function interp(v1:IncidentVertex, v2:IncidentVertex, t:Float):Void {
		x = v1.x + (v2.x - v1.x) * t;
		y = v1.y + (v2.y - v1.y) * t;
		wx = v1.wx + (v2.wx - v1.wx) * t;
		wy = v1.wy + (v2.wy - v1.wy) * t;
		wz = v1.wz + (v2.wz - v1.wz) * t;
	}
}

private class FaceClipper {
	public var w:Float;
	public var h:Float;
	public var numVertices:Int;
	public var vertices:Vector<IncidentVertex>;

	var numTmpVertices:Int;
	var tmpVertices:Vector<IncidentVertex>;

	public function new() {
		w = 0;
		h = 0;
		numVertices = 0;
		numTmpVertices = 0;
		vertices = new Vector<IncidentVertex>(8);
		tmpVertices = new Vector<IncidentVertex>(8);
		for (i in 0...8) {
			vertices[i] = new IncidentVertex();
			tmpVertices[i] = new IncidentVertex();
		}
	}

	extern public inline function init(w:Float, h:Float):Void {
		this.w = w;
		this.h = h;
		numVertices = 0;
		numTmpVertices = 0;
	}

	extern public inline function addIncidentVertex(x:Float, y:Float, wx:Float, wy:Float, wz:Float):Void {
		vertices[numVertices++].init(x, y, wx, wy, wz);
	}

	/**
	 * Clips the incident face by the reference face, generates up to eight vertices.
	 */
	public function clip():Void {
		clipL();
		flip();
		clipR();
		flip();
		clipT();
		flip();
		clipB();
		flip();
	}

	/**
	 * Reduces vertices up to four.
	 */
	public function reduce():Void {
		if (numVertices < 4)
			return;

		// TODO: maximize area
		var max1:Float = MathUtil.NEGATIVE_INFINITY;
		var min1:Float = MathUtil.POSITIVE_INFINITY;
		var max2:Float = MathUtil.NEGATIVE_INFINITY;
		var min2:Float = MathUtil.POSITIVE_INFINITY;
		var max1V:IncidentVertex = null;
		var min1V:IncidentVertex = null;
		var max2V:IncidentVertex = null;
		var min2V:IncidentVertex = null;
		var e1x:Float = 1;
		var e1y:Float = 1;
		var e2x:Float = -1;
		var e2y:Float = 1;

		for (i in 0...numVertices) {
			var v:IncidentVertex = vertices[i];
			var dot1:Float = v.x * e1x + v.y * e1y;
			var dot2:Float = v.x * e2x + v.y * e2y;
			if (i == 0) { // issue #32
				max1 = dot1;
				max1V = v;
				min1 = dot1;
				min1V = v;
				max2 = dot2;
				max2V = v;
				min2 = dot2;
				min2V = v;
			} else {
				if (dot1 > max1) {
					max1 = dot1;
					max1V = v;
				}
				if (dot1 < min1) {
					min1 = dot1;
					min1V = v;
				}
				if (dot2 > max2) {
					max2 = dot2;
					max2V = v;
				}
				if (dot2 < min2) {
					min2 = dot2;
					min2V = v;
				}
			}
		}

		add(max1V);
		add(max2V);
		add(min1V);
		add(min2V);
		flip();
	}

	extern inline function clipL():Void {
		for (i in 0...numVertices) {
			var v1:IncidentVertex = vertices[i];
			var v2:IncidentVertex = vertices[(i + 1) % numVertices];
			var s1:Float = w + v1.x;
			var s2:Float = w + v2.x;
			clipWithParam(v1, v2, s1, s2);
		}
	}

	extern inline function clipR():Void {
		for (i in 0...numVertices) {
			var v1:IncidentVertex = vertices[i];
			var v2:IncidentVertex = vertices[(i + 1) % numVertices];
			var s1:Float = w - v1.x;
			var s2:Float = w - v2.x;
			clipWithParam(v1, v2, s1, s2);
		}
	}

	extern inline function clipT():Void {
		for (i in 0...numVertices) {
			var v1:IncidentVertex = vertices[i];
			var v2:IncidentVertex = vertices[(i + 1) % numVertices];
			var s1:Float = h + v1.y;
			var s2:Float = h + v2.y;
			clipWithParam(v1, v2, s1, s2);
		}
	}

	extern inline function clipB():Void {
		for (i in 0...numVertices) {
			var v1:IncidentVertex = vertices[i];
			var v2:IncidentVertex = vertices[(i + 1) % numVertices];
			var s1:Float = h - v1.y;
			var s2:Float = h - v2.y;
			clipWithParam(v1, v2, s1, s2);
		}
	}

	extern inline function flip():Void {
		BoxBoxDetectorMacro.swap(vertices, tmpVertices);
		numVertices = numTmpVertices;
		numTmpVertices = 0;
	}

	extern inline function clipWithParam(v1:IncidentVertex, v2:IncidentVertex, s1:Float, s2:Float):Void {
		if (s1 > 0 && s2 > 0) {
			add(v1);
		} else if (s1 > 0 && s2 <= 0) {
			// v2 is clipped
			add(v1);
			interp(v1, v2, s1 / (s1 - s2));
		} else if (s1 <= 0 && s2 > 0) {
			// v1 is clipped
			interp(v1, v2, s1 / (s1 - s2));
		}
	}

	extern inline function add(v:IncidentVertex):Void {
		tmpVertices[numTmpVertices++].copyFrom(v);
	}

	extern inline function interp(v1:IncidentVertex, v2:IncidentVertex, t:Float):Void {
		tmpVertices[numTmpVertices++].interp(v1, v2, t);
	}
}
