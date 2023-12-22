package oimo.dynamics.common;
import haxe.ds.Vector;
import haxe.macro.Expr;
import oimo.dynamics.common.DebugDrawStyle;
import oimo.common.Mat3;
import oimo.common.MathUtil;
import oimo.common.Pool;
import oimo.common.Vec3;
import oimo.common.Transform;
import oimo.m.M;

/**
 * The interface of debug drawer. This provides graphical information of a physics world
 * for debugging softwares. Users should override at least three methods `DebugDraw.point`,
 * `DebugDraw.triangle`, `DebugDraw.line`.
 */
@:interface
class DebugDraw {
	/**
	 * Whether the shapes are drawn in wireframe mode.
	 */
	public var wireframe:Bool;

	/**
	 * Whether to draw the shapes.
	 */
	public var drawShapes:Bool;

	/**
	 * Whether to draw the bounding volume hierarchy of the broad-phase collision
	 * detection. If `BvhBroadPhase` is not used, nothing will be drawn regardless
	 * of the value of this parameter.
	 */
	public var drawBvh:Bool;

	/**
	 * The minimum depth of the BVH to be drawn. If `DebugDrawer.drawBvh` is set to
	 * `false`, the entire BVH will not be drawn.
	 */
	public var drawBvhMinLevel:Int;

	/**
	 * The maximum depth of the BVH to be drawn. If `DebugDrawer.drawBvh` is set to
	 * `false`, the entire BVH will not be drawn.
	 */
	public var drawBvhMaxLevel:Int;

	/**
	 * Whether to draw the AABBs.
	 */
	public var drawAabbs:Bool;

	/**
	 * Whether to draw the bases of the rigid bodies.
	 */
	public var drawBases:Bool;

	/**
	 * Whether to draw the overlapping pairs of the AABBs.
	 */
	public var drawPairs:Bool;

	/**
	 * Whether to draw the contacts.
	 */
	public var drawContacts:Bool;

	/**
	 * Whether to draw the bases (normals, tangents, and binormals) of the contacts.
	 */
	public var drawContactBases:Bool;

	/**
	 * Whether to draw the joints.
	 */
	public var drawJoints:Bool;

	/**
	 * Whether to draw the limits of the joints.
	 */
	public var drawJointLimits:Bool;

	/**
	 * The rendering style of the debug draw.
	 */
	public var style:DebugDrawStyle;

	var p:Pool;

	inline static var SPHERE_PHI_DIVISION:Int = 8;
	inline static var SPHERE_THETA_DIVISION:Int = 4;
	var sphereCoords:Vector<Vector<Vec3>>;
	var tmpSphereVerts:Vector<Vector<Vec3>>;
	var tmpSphereNorms:Vector<Vector<Vec3>>;

	inline static var CIRCLE_THETA_DIVISION:Int = 8;
	var circleCoords:Vector<Vec3>;
	var circleCoordsShift:Vector<Vec3>;
	var tmpCircleVerts1:Vector<Vec3>;
	var tmpCircleVerts2:Vector<Vec3>;
	var tmpCircleNorms:Vector<Vec3>;

	/**
	 * Default constructor.
	 */
	public function new() {
		p = new Pool();

		wireframe = false;
		drawShapes = true;
		drawBvh = false;
		drawBvhMinLevel = 0;
		drawBvhMaxLevel = 65536;
		drawAabbs = false;
		drawBases = false;
		drawPairs = false;
		drawContacts = false;
		drawJoints = true;
		drawJointLimits = false;

		initSphereCoords();
		initCircleCoords();

		style = new DebugDrawStyle();
	}

	// --- private ---

	static macro function vec3():Expr {
		return macro p.vec3();
	}

	static macro function mat3():Expr {
		return macro p.mat3();
	}

	static macro function mat4():Expr {
		return macro p.mat4();
	}

	static macro function quat():Expr {
		return macro p.quat();
	}

	static macro function disp(obj:Expr):Expr {
		return macro p.dispose($obj);
	}

	extern inline function initSphereCoords():Void {
		// theta
		var nt:Int = SPHERE_THETA_DIVISION;
		var dt:Float = MathUtil.PI / nt;

		// phi
		var np:Int = SPHERE_PHI_DIVISION;
		var dp:Float = MathUtil.TWO_PI / np;

		sphereCoords = new Vector<Vector<Vec3>>(nt + 1);
		tmpSphereVerts = new Vector<Vector<Vec3>>(nt + 1);
		tmpSphereNorms = new Vector<Vector<Vec3>>(nt + 1);
		for (i in 0...nt + 1) {
			var num:Int = i == 0 || i == nt ? 1 : np;
			sphereCoords[i] = new Vector<Vec3>(num);
			tmpSphereVerts[i] = new Vector<Vec3>(num);
			tmpSphereNorms[i] = new Vector<Vec3>(num);
			for (j in 0...np) {
				var theta:Float = i * dt;
				var phi:Float = j * dp;
				sphereCoords[i][j] = new Vec3(
					MathUtil.sin(theta) * MathUtil.cos(phi),
					MathUtil.cos(theta),
					-MathUtil.sin(theta) * MathUtil.sin(phi)
				);
				tmpSphereVerts[i][j] = new Vec3();
				tmpSphereNorms[i][j] = new Vec3();
			}
		}
	}

	extern inline function initCircleCoords():Void {
		circleCoords = new Vector<Vec3>(CIRCLE_THETA_DIVISION);
		circleCoordsShift = new Vector<Vec3>(CIRCLE_THETA_DIVISION);
		tmpCircleVerts1 = new Vector<Vec3>(CIRCLE_THETA_DIVISION);
		tmpCircleVerts2 = new Vector<Vec3>(CIRCLE_THETA_DIVISION);
		tmpCircleNorms = new Vector<Vec3>(CIRCLE_THETA_DIVISION);

		var td:Float = MathUtil.TWO_PI / CIRCLE_THETA_DIVISION;
		for (i in 0...CIRCLE_THETA_DIVISION) {
			circleCoords[i] = new Vec3(MathUtil.cos(i * td), 0, -MathUtil.sin(i * td));
			circleCoordsShift[i] = new Vec3(MathUtil.cos((i + 0.5) * td), 0, -MathUtil.sin((i + 0.5) * td));
			tmpCircleVerts1[i] = new Vec3();
			tmpCircleVerts2[i] = new Vec3();
			tmpCircleNorms[i] = new Vec3();
		}
	}

	extern inline function sphericalCoord(origin:Vec3, x:Vec3, y:Vec3, z:Vec3, r:Float, theta:Float, phi:Float):Vec3 {
		var v:Vec3 = cartesianCoord(origin, x, y, z,
			r * MathUtil.sin(theta) * MathUtil.cos(phi),
			r * MathUtil.cos(theta),
			r * -MathUtil.sin(theta) * MathUtil.sin(phi)
		);
		return v;
	}

	extern inline function polarCoord(origin:Vec3, x:Vec3, y:Vec3, r:Float, theta:Float):Vec3 {
		var v:Vec3 = cartesianCoord2D(origin, x, y,
			r * MathUtil.cos(theta),
			r * MathUtil.sin(theta)
		);
		return v;
	}

	static macro function cartesianCoord(origin, x, y, z, cx, cy, cz) {
		return macro vec3().copyFrom($origin)
			.addScaledEq($x, $cx)
			.addScaledEq($y, $cy)
			.addScaledEq($z, $cz)
		;
	}

	static macro function cartesianCoord2D(origin, x, y, cx, cy) {
		return macro vec3().copyFrom($origin)
			.addScaledEq($x, $cx)
			.addScaledEq($y, $cy)
		;
	}

	static macro function cartesianCoord1D(origin, x, cx) {
		return macro vec3().copyFrom($origin)
			.addScaledEq($x, $cx)
		;
	}

	// --- public ---

	/**
	 * Draws an axis-aligned bounding box.
	 *
	 * `min` is the minimum point of the AABB.
	 *
	 * `max` is the maximum point of the AABB.
	 *
	 * `color` is the color of the AABB.
	 */
	public function aabb(min:Vec3, max:Vec3, color:Vec3):Void {
		var v1:Vec3 = vec3().init(min.x, min.y, min.z);
		var v2:Vec3 = vec3().init(min.x, min.y, max.z);
		var v3:Vec3 = vec3().init(min.x, max.y, min.z);
		var v4:Vec3 = vec3().init(min.x, max.y, max.z);
		var v5:Vec3 = vec3().init(max.x, min.y, min.z);
		var v6:Vec3 = vec3().init(max.x, min.y, max.z);
		var v7:Vec3 = vec3().init(max.x, max.y, min.z);
		var v8:Vec3 = vec3().init(max.x, max.y, max.z);
		line(v1, v2, color);
		line(v3, v4, color);
		line(v5, v6, color);
		line(v7, v8, color);
		line(v1, v3, color);
		line(v2, v4, color);
		line(v5, v7, color);
		line(v6, v8, color);
		line(v1, v5, color);
		line(v2, v6, color);
		line(v3, v7, color);
		line(v4, v8, color);
		disp(v1);
		disp(v2);
		disp(v3);
		disp(v4);
		disp(v5);
		disp(v6);
		disp(v7);
		disp(v8);
	}

	/**
	 * Draws the basis of a transform `transform`.
	 *
	 * `length` is the length of the lines to be drawn.
	 *
	 * `colorX` is the color of the x-axis of the basis.
	 *
	 * `colorY` is the color of the y-axis of the basis.
	 *
	 * `colorZ` is the color of the z-axis of the basis.
	 */
	public function basis(transform:Transform, length:Float, colorX:Vec3, colorY:Vec3, colorZ:Vec3):Void {
		var pos:Vec3 = vec3();
		var rot:Mat3 = mat3();
		var ex:Vec3 = vec3();
		var ey:Vec3 = vec3();
		var ez:Vec3 = vec3();

		M.vec3_toVec3(pos, transform._position);
		M.mat3_toMat3(rot, transform._rotation);
		rot.getColTo(0, ex);
		rot.getColTo(1, ey);
		rot.getColTo(2, ez);

		ex.scaleEq(length).addEq(pos);
		ey.scaleEq(length).addEq(pos);
		ez.scaleEq(length).addEq(pos);

		line(pos, ex, colorX);
		line(pos, ey, colorY);
		line(pos, ez, colorZ);

		disp(pos);
		disp(rot);
		disp(ex);
		disp(ey);
		disp(ez);
	}

	/**
	 * Draws an ellipse.
	 *
	 * `center` is the center of the ellipse.
	 *
	 * `ex` is the normalized x-axis vector of the ellipse.
	 *
	 * `ey` is the normalized y-axis vector of the ellipse.
	 *
	 * `radiusX` is the radius along the x-axis of the ellipse.
	 *
	 * `radiusY` is the radius along the y-axis of the ellipse.
	 *
	 * `color` is the color of the ellipse.
	 */
	public function ellipse(center:Vec3, ex:Vec3, ey:Vec3, radiusX:Float, radiusY:Float, color:Vec3):Void {
		arc(center, ex, ey, radiusX, radiusY, 0, MathUtil.TWO_PI, false, color);
	}

	/**
	 * Draws an arc.
	 *
	 * `center` is the center of the arc.
	 *
	 * `ex` is the normalized x-axis vector of the arc.
	 *
	 * `ey` is the normalized y-axis vector of the arc.
	 *
	 * `radiusX` is the radius along the x-axis of the arc.
	 *
	 * `radiusY` is the radius along the y-axis of the arc.
	 *
	 * `startAngle` is the start angle of the arc in radians.
	 *
	 * `endAngle` is the end angle of the arc in radians.
	 *
	 * `drawSector` is whether to draw line segments between start/end point and center point.
	 *
	 * `color` is the color of the arc.
	 */
	public function arc(center:Vec3, ex:Vec3, ey:Vec3, radiusX:Float, radiusY:Float, startAngle:Float, endAngle:Float, drawSector:Bool, color:Vec3):Void {
		ex = vec3().copyFrom(ex).scaleEq(radiusX);
		ey = vec3().copyFrom(ey).scaleEq(radiusY);

		var step:Float = MathUtil.PI / 6;
		var angDiff:Float = endAngle - startAngle;
		if (angDiff < 0) angDiff = -angDiff;

		var n:Int = Std.int(angDiff / step + 0.5);
		if (n == 0) n = 1;

		var theta:Float = startAngle;
		var dt:Float = (endAngle - startAngle) / n;
		var prevV:Vec3 = polarCoord(center, ex, ey, 1, theta);

		if (drawSector) {
			line(center, prevV, color);
		}

		for (i in 0...n) {
			theta += dt;
			var v:Vec3 = polarCoord(center, ex, ey, 1, theta);
			line(prevV, v, color);
			disp(prevV);
			prevV = v;
		}

		if (drawSector) {
			line(center, prevV, color);
		}

		disp(prevV);

		disp(ex);
		disp(ey);
	}

	/**
	 * Draws a cone locally along to the y-axis. The center of the cone is in the middle of
	 * the vertex and the center of the base circle.
	 *
	 * `tf` is the transformation of the cone.
	 *
	 * `radius` is the radius of the base circle of the cone.
	 *
	 * `halfHeight` is the half-height of the cone. The local position of the vertex of
	 * the cone is `(0, halfHeight, 0)`.
	 *
	 * `color` is the color of the cone.
	 */
	public function cone(tf:Transform, radius:Float, halfHeight:Float, color:Vec3):Void {
		var ex:Vec3 = vec3();
		var ey:Vec3 = vec3();
		var ez:Vec3 = vec3();
		var o:Vec3 = vec3();
		var m:Mat3 = mat3();
		tf.getPositionTo(o);
		tf.getRotationTo(m);
		m.getColTo(0, ex);
		m.getColTo(1, ey);
		m.getColTo(2, ez);

		var top:Vec3 = cartesianCoord1D(o, ey, halfHeight);
		var bottom:Vec3 = cartesianCoord1D(o, ey, -halfHeight);

		if (wireframe) {
			var bottom1:Vec3 = cartesianCoord2D(bottom, ex, ez, -radius, 0);
			var bottom2:Vec3 = cartesianCoord2D(bottom, ex, ez, radius, 0);
			var bottom3:Vec3 = cartesianCoord2D(bottom, ex, ez, 0, -radius);
			var bottom4:Vec3 = cartesianCoord2D(bottom, ex, ez, 0, radius);

			ellipse(bottom, ex, ez, radius, radius, color);

			line(top, bottom1, color);
			line(top, bottom2, color);
			line(top, bottom3, color);
			line(top, bottom4, color);

			disp(bottom1);
			disp(bottom2);
			disp(bottom3);
			disp(bottom4);
		} else {
			var invDenom:Float = 1 / MathUtil.sqrt(radius * radius + 4 * halfHeight * halfHeight);
			var cos:Float = 2 * halfHeight * invDenom;
			var sin:Float = radius * invDenom;
			var invDenom2:Float = 1 / MathUtil.sqrt(2 * (1 + cos));
			for (i in 0...CIRCLE_THETA_DIVISION) {
				tmpCircleNorms[i].copyFrom(circleCoords[i]).scaleEq(cos).y += sin;
				tmpCircleNorms[i].mulMat3Eq(m);

				tmpCircleVerts1[i].copyFrom(circleCoordsShift[i]).scaleEq(cos).y += sin;
				tmpCircleVerts1[i].mulMat3Eq(m);

				tmpCircleVerts2[i].copyFrom(circleCoords[i]).mulMat3Eq(m).scaleEq(radius).addEq(o);
				tmpCircleVerts2[i].addScaledEq(ey, -halfHeight);
			}
			for (i in 0...CIRCLE_THETA_DIVISION) {
				var v1:Vec3;
				var v2:Vec3;
				var v3:Vec3;
				var n1:Vec3;
				var n2:Vec3;
				var n3:Vec3;

				// side
				v1 = top;
				v2 = tmpCircleVerts2[i];
				v3 = tmpCircleVerts2[(i + 1) % CIRCLE_THETA_DIVISION];
				n1 = tmpCircleVerts1[i];
				n2 = tmpCircleNorms[i];
				n3 = tmpCircleNorms[(i + 1) % CIRCLE_THETA_DIVISION];
				triangle(v1, v2, v3, n1, n2, n3, color);

				// bottom
				v1 = bottom;
				v2 = tmpCircleVerts2[(i + 1) % CIRCLE_THETA_DIVISION];
				v3 = tmpCircleVerts2[i];
				n1 = vec3().copyFrom(ey).negateEq();
				triangle(v1, v2, v3, n1, n1, n1, color);
				disp(n1);
			}
		}

		disp(top);
		disp(bottom);

		disp(o);
		disp(m);
		disp(ex);
		disp(ey);
		disp(ez);
	}

	/**
	 * Draws a cylinder locally along to the y-axis.
	 *
	 * `tf` is the transformation of the cylinder.
	 *
	 * `radius` is the radius of the cylinder.
	 *
	 * `halfHeight` is the half-height of the cylinder.
	 *
	 * `color` is the color of the cylinder.
	 */
	public function cylinder(tf:Transform, radius:Float, halfHeight:Float, color:Vec3):Void {
		var ex:Vec3 = vec3();
		var ey:Vec3 = vec3();
		var ez:Vec3 = vec3();
		var o:Vec3 = vec3();
		var m:Mat3 = mat3();
		tf.getPositionTo(o);
		tf.getRotationTo(m);
		m.getColTo(0, ex);
		m.getColTo(1, ey);
		m.getColTo(2, ez);

		var top:Vec3 = cartesianCoord1D(o, ey, halfHeight);
		var bottom:Vec3 = cartesianCoord1D(o, ey, -halfHeight);

		if (wireframe) {
			var top1:Vec3 = cartesianCoord2D(top, ex, ez, -radius, 0);
			var top2:Vec3 = cartesianCoord2D(top, ex, ez, radius, 0);
			var top3:Vec3 = cartesianCoord2D(top, ex, ez, 0, -radius);
			var top4:Vec3 = cartesianCoord2D(top, ex, ez, 0, radius);

			var bottom1:Vec3 = cartesianCoord2D(bottom, ex, ez, -radius, 0);
			var bottom2:Vec3 = cartesianCoord2D(bottom, ex, ez, radius, 0);
			var bottom3:Vec3 = cartesianCoord2D(bottom, ex, ez, 0, -radius);
			var bottom4:Vec3 = cartesianCoord2D(bottom, ex, ez, 0, radius);

			ellipse(top, ex, ez, radius, radius, color);
			ellipse(bottom, ex, ez, radius, radius, color);

			line(top1, bottom1, color);
			line(top2, bottom2, color);
			line(top3, bottom3, color);
			line(top4, bottom4, color);

			disp(top1);
			disp(top2);
			disp(top3);
			disp(top4);
			disp(bottom1);
			disp(bottom2);
			disp(bottom3);
			disp(bottom4);
		} else {
			for (i in 0...CIRCLE_THETA_DIVISION) {
				tmpCircleNorms[i].copyFrom(circleCoords[i]).mulMat3Eq(m);
				tmpCircleVerts1[i].copyFrom(tmpCircleNorms[i]).scaleEq(radius).addEq(o);
				tmpCircleVerts2[i].copyFrom(tmpCircleVerts1[i]);

				tmpCircleVerts1[i].addScaledEq(ey, halfHeight);
				tmpCircleVerts2[i].addScaledEq(ey, -halfHeight);
			}
			for (i in 0...CIRCLE_THETA_DIVISION) {
				var v1:Vec3;
				var v2:Vec3;
				var v3:Vec3;
				var v4:Vec3;
				var n1:Vec3;
				var n2:Vec3;
				var n3:Vec3;
				var n4:Vec3;

				// top
				v1 = top;
				v2 = tmpCircleVerts1[i];
				v3 = tmpCircleVerts1[(i + 1) % CIRCLE_THETA_DIVISION];
				n1 = ey;
				triangle(v1, v2, v3, n1, n1, n1, color);

				// bottom
				v1 = bottom;
				v2 = tmpCircleVerts2[(i + 1) % CIRCLE_THETA_DIVISION];
				v3 = tmpCircleVerts2[i];
				n1 = vec3().copyFrom(ey).negateEq();
				triangle(v1, v2, v3, n1, n1, n1, color);
				disp(n1);

				// side
				v1 = tmpCircleVerts1[i];
				v2 = tmpCircleVerts2[i];
				v3 = tmpCircleVerts2[(i + 1) % CIRCLE_THETA_DIVISION];
				v4 = tmpCircleVerts1[(i + 1) % CIRCLE_THETA_DIVISION];
				n1 = tmpCircleNorms[i];
				n2 = tmpCircleNorms[(i + 1) % CIRCLE_THETA_DIVISION];
				rect(v1, v2, v3, v4, n1, n1, n2, n2, color);
			}
		}

		disp(top);
		disp(bottom);

		disp(o);
		disp(m);
		disp(ex);
		disp(ey);
		disp(ez);
	}

	/**
	 * Draws a capsule locally along to the y-axis.
	 *
	 * `tf` is the transformation of the capsule.
	 *
	 * `radius` is the radius of the capsule.
	 *
	 * `halfHeight` is the half-height of the capsule.
	 *
	 * `color` is the color of the capsule.
	 */
	public function capsule(tf:Transform, radius:Float, halfHeight:Float, color:Vec3):Void {
		var ex:Vec3 = vec3();
		var ey:Vec3 = vec3();
		var ez:Vec3 = vec3();
		var o:Vec3 = vec3();
		var m:Mat3 = mat3();
		tf.getPositionTo(o);
		tf.getRotationTo(m);
		m.getColTo(0, ex);
		m.getColTo(1, ey);
		m.getColTo(2, ez);

		// draw caps

		// theta
		var nt:Int = SPHERE_THETA_DIVISION;

		// phi
		var np:Int = SPHERE_PHI_DIVISION;

		var vs:Vector<Vector<Vec3>> = tmpSphereVerts;
		var ns:Vector<Vector<Vec3>> = tmpSphereNorms;

		// build normals first
		for (i2 in 0...nt + 1) {
			var n:Int = tmpSphereVerts[i2].length;
			for (j2 in 0...n) {
				ns[i2][j2].copyFrom(sphereCoords[i2][j2]).mulMat3Eq(m);
			}
		}

		for (i in 0...nt) {

			if (i == 0) {
				// build upper hemisphere
				var half:Int = nt >> 1;
				for (i2 in 0...half + 1) {
					var n:Int = tmpSphereVerts[i2].length;
					for (j2 in 0...n) {
						vs[i2][j2].copyFrom(ns[i2][j2]).scaleEq(radius).addEq(o).addScaledEq(ey, halfHeight);
					}
				}
			}

			if (i == (nt >> 1)) {
				// build lower hemisphere
				var half:Int = nt >> 1;
				for (i2 in half...nt + 1) {
					var n:Int = tmpSphereVerts[i2].length;
					for (j2 in 0...n) {
						vs[i2][j2].copyFrom(ns[i2][j2]).scaleEq(radius).addEq(o).addScaledEq(ey, -halfHeight);
					}
				}
			}

			for (j in 0...np) {
				var v1:Vec3;
				var v2:Vec3;
				var v3:Vec3;
				var v4:Vec3;
				var n1:Vec3;
				var n2:Vec3;
				var n3:Vec3;
				var n4:Vec3;
				if (i == 0) {
					// top
					if (wireframe) {
						v1 = vs[0][0];
						v2 = vs[1][j];
						line(v1, v2, color);
					} else {
						v1 = vs[0][0];
						v2 = vs[1][j];
						v3 = vs[1][(j + 1) % np];
						n1 = ns[0][0];
						n2 = ns[1][j];
						n3 = ns[1][(j + 1) % np];
						triangle(v1, v2, v3, n1, n2, n3, color);
					}
				} else if (i == nt - 1) {
					// bottom
					if (wireframe) {
						v1 = vs[nt][0];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i][j];
						line(v1, v2, color);
						line(v2, v3, color);
					} else {
						v1 = vs[nt][0];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i][j];
						n1 = ns[nt][0];
						n2 = ns[i][(j + 1) % np];
						n3 = ns[i][j];
						triangle(v1, v2, v3, n1, n2, n3, color);
					}
				} else {
					// middle
					if (wireframe) {
						v1 = vs[i][j];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i + 1][j];
						line(v1, v2, color);
						line(v1, v3, color);
					} else {
						v1 = vs[i][j];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i + 1][j];
						v4 = vs[i + 1][(j + 1) % np];
						n1 = ns[i][j];
						n2 = ns[i][(j + 1) % np];
						n3 = ns[i + 1][j];
						n4 = ns[i + 1][(j + 1) % np];
						rect(v1, v3, v4, v2, n1, n3, n4, n2, color);
					}
				}
			}
		}

		// draw side

		var top:Vec3 = cartesianCoord1D(o, ey, halfHeight);
		var bottom:Vec3 = cartesianCoord1D(o, ey, -halfHeight);

		if (wireframe) {
			var top1:Vec3 = cartesianCoord2D(top, ex, ez, -radius, 0);
			var top2:Vec3 = cartesianCoord2D(top, ex, ez, radius, 0);
			var top3:Vec3 = cartesianCoord2D(top, ex, ez, 0, -radius);
			var top4:Vec3 = cartesianCoord2D(top, ex, ez, 0, radius);

			var bottom1:Vec3 = cartesianCoord2D(bottom, ex, ez, -radius, 0);
			var bottom2:Vec3 = cartesianCoord2D(bottom, ex, ez, radius, 0);
			var bottom3:Vec3 = cartesianCoord2D(bottom, ex, ez, 0, -radius);
			var bottom4:Vec3 = cartesianCoord2D(bottom, ex, ez, 0, radius);

			ellipse(top, ex, ez, radius, radius, color);
			ellipse(bottom, ex, ez, radius, radius, color);

			line(top1, bottom1, color);
			line(top2, bottom2, color);
			line(top3, bottom3, color);
			line(top4, bottom4, color);

			disp(top1);
			disp(top2);
			disp(top3);
			disp(top4);
			disp(bottom1);
			disp(bottom2);
			disp(bottom3);
			disp(bottom4);
		} else {
			for (i in 0...CIRCLE_THETA_DIVISION) {
				tmpCircleNorms[i].copyFrom(circleCoords[i]).mulMat3Eq(m);
				tmpCircleVerts1[i].copyFrom(tmpCircleNorms[i]).scaleEq(radius).addEq(o);
				tmpCircleVerts2[i].copyFrom(tmpCircleVerts1[i]);

				tmpCircleVerts1[i].addScaledEq(ey, halfHeight);
				tmpCircleVerts2[i].addScaledEq(ey, -halfHeight);
			}
			for (i in 0...CIRCLE_THETA_DIVISION) {
				var v1:Vec3;
				var v2:Vec3;
				var v3:Vec3;
				var v4:Vec3;
				var n1:Vec3;
				var n2:Vec3;

				// side
				v1 = tmpCircleVerts1[i];
				v2 = tmpCircleVerts2[i];
				v3 = tmpCircleVerts2[(i + 1) % CIRCLE_THETA_DIVISION];
				v4 = tmpCircleVerts1[(i + 1) % CIRCLE_THETA_DIVISION];
				n1 = tmpCircleNorms[i];
				n2 = tmpCircleNorms[(i + 1) % CIRCLE_THETA_DIVISION];
				rect(v1, v2, v3, v4, n1, n1, n2, n2, color);
			}
		}

		disp(top);
		disp(bottom);

		disp(o);
		disp(m);
		disp(ex);
		disp(ey);
		disp(ez);
	}

	/**
	 * Draws a sphere.
	 *
	 * `tf` is the transformation of the sphere.
	 *
	 * `radius` is the radius of the sphere.
	 *
	 * `color` is the color of the sphere.
	 */
	public function sphere(tf:Transform, radius:Float, color:Vec3):Void {
		var o:Vec3 = vec3();
		var m:Mat3 = mat3();
		tf.getPositionTo(o);
		tf.getRotationTo(m);

		// theta
		var nt:Int = SPHERE_THETA_DIVISION;

		// phi
		var np:Int = SPHERE_PHI_DIVISION;

		var vs:Vector<Vector<Vec3>> = tmpSphereVerts;
		var ns:Vector<Vector<Vec3>> = tmpSphereNorms;

		for (i in 0...nt + 1) {
			var n:Int = tmpSphereVerts[i].length;
			for (j in 0...n) {
				ns[i][j].copyFrom(sphereCoords[i][j]).mulMat3Eq(m);
				vs[i][j].copyFrom(ns[i][j]).scaleEq(radius).addEq(o);
			}
		}

		for (i in 0...nt) {
			for (j in 0...np) {
				var v1:Vec3;
				var v2:Vec3;
				var v3:Vec3;
				var v4:Vec3;
				var n1:Vec3;
				var n2:Vec3;
				var n3:Vec3;
				var n4:Vec3;
				if (i == 0) {
					// top
					if (wireframe) {
						v1 = vs[0][0];
						v2 = vs[1][j];
						line(v1, v2, color);
					} else {
						v1 = vs[0][0];
						v2 = vs[1][j];
						v3 = vs[1][(j + 1) % np];
						n1 = ns[0][0];
						n2 = ns[1][j];
						n3 = ns[1][(j + 1) % np];
						triangle(v1, v2, v3, n1, n2, n3, color);
					}
				} else if (i == nt - 1) {
					// bottom
					if (wireframe) {
						v1 = vs[nt][0];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i][j];
						line(v1, v2, color);
						line(v2, v3, color);
					} else {
						v1 = vs[nt][0];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i][j];
						n1 = ns[nt][0];
						n2 = ns[i][(j + 1) % np];
						n3 = ns[i][j];
						triangle(v1, v2, v3, n1, n2, n3, color);
					}
				} else {
					// middle
					if (wireframe) {
						v1 = vs[i][j];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i + 1][j];
						line(v1, v2, color);
						line(v1, v3, color);
					} else {
						v1 = vs[i][j];
						v2 = vs[i][(j + 1) % np];
						v3 = vs[i + 1][j];
						v4 = vs[i + 1][(j + 1) % np];
						n1 = ns[i][j];
						n2 = ns[i][(j + 1) % np];
						n3 = ns[i + 1][j];
						n4 = ns[i + 1][(j + 1) % np];
						rect(v1, v3, v4, v2, n1, n3, n4, n2, color);
					}
				}
			}
		}

		disp(o);
		disp(m);
	}

	/**
	 * Draws a box.
	 *
	 * `tf` is the transformation of the box.
	 *
	 * `halfExtents` is the half-extents of the box.
	 *
	 * `color` is the color of the box.
	 */
	public function box(tf:Transform, halfExtents:Vec3, color:Vec3):Void {
		var v1:Vec3;
		var v2:Vec3;
		var v3:Vec3;
		var v4:Vec3;
		var v5:Vec3;
		var v6:Vec3;
		var v7:Vec3;
		var v8:Vec3;

		var ex:Vec3 = vec3();
		var ey:Vec3 = vec3();
		var ez:Vec3 = vec3();
		var o:Vec3 = vec3();
		var m:Mat3 = mat3();
		tf.getPositionTo(o);
		tf.getRotationTo(m);
		m.getColTo(0, ex);
		m.getColTo(1, ey);
		m.getColTo(2, ez);

		var hx:Float = halfExtents.x;
		var hy:Float = halfExtents.y;
		var hz:Float = halfExtents.z;

		v1 = cartesianCoord(o, ex, ey, ez, -hx, -hy, -hz);
		v2 = cartesianCoord(o, ex, ey, ez, -hx, -hy, hz);
		v3 = cartesianCoord(o, ex, ey, ez, -hx, hy, -hz);
		v4 = cartesianCoord(o, ex, ey, ez, -hx, hy, hz);
		v5 = cartesianCoord(o, ex, ey, ez, hx, -hy, -hz);
		v6 = cartesianCoord(o, ex, ey, ez, hx, -hy, hz);
		v7 = cartesianCoord(o, ex, ey, ez, hx, hy, -hz);
		v8 = cartesianCoord(o, ex, ey, ez, hx, hy, hz);
		if (wireframe) {
			line(v1, v2, color);
			line(v3, v4, color);
			line(v5, v6, color);
			line(v7, v8, color);
			line(v1, v3, color);
			line(v2, v4, color);
			line(v5, v7, color);
			line(v6, v8, color);
			line(v1, v5, color);
			line(v2, v6, color);
			line(v3, v7, color);
			line(v4, v8, color);
		} else {
			var nex:Vec3 = vec3().copyFrom(ex).negateEq();
			var ney:Vec3 = vec3().copyFrom(ey).negateEq();
			var nez:Vec3 = vec3().copyFrom(ez).negateEq();
			// x-
			rect(v1, v2, v4, v3, nex, nex, nex, nex, color);
			// x+
			rect(v5, v7, v8, v6, ex, ex, ex, ex, color);
			// y-
			rect(v1, v5, v6, v2, ney, ney, ney, ney, color);
			// y+
			rect(v3, v4, v8, v7, ey, ey, ey, ey, color);
			// z-
			rect(v1, v3, v7, v5, nez, nez, nez, nez, color);
			// z+
			rect(v2, v6, v8, v4, ez, ez, ez, ez, color);
			disp(nex);
			disp(ney);
			disp(nez);
		}
		disp(v1);
		disp(v2);
		disp(v3);
		disp(v4);
		disp(v5);
		disp(v6);
		disp(v7);
		disp(v8);

		disp(o);
		disp(m);
		disp(ex);
		disp(ey);
		disp(ez);
	}

	/**
	 * Draws a rectangle.
	 *
	 * `v1`, `v2`, `v3`, `v4` are the rectangle's vertices in CCW order.
	 *
	 * `n1`, `n2`, `n3`, `n4` are the normals of the rectangle's vertices in CCW order.
	 *
	 * `color` is the color of the rectangle.
	 */
	public function rect(v1:Vec3, v2:Vec3, v3:Vec3, v4:Vec3, n1:Vec3, n2:Vec3, n3:Vec3, n4:Vec3, color:Vec3):Void {
		triangle(v1, v2, v3, n1, n2, n3, color);
		triangle(v1, v3, v4, n1, n3, n4, color);
	}

	/**
	 * Draws a point at `v`.
	 *
	 * `color` is the color of the point.
	 */
	public function point(v:Vec3, color:Vec3):Void {
		// override this
	}

	/**
	 * Draws a triangle.
	 *
	 * `v1`, `v2`, `v3` are the triangle's vertices in CCW order.
	 *
	 * `n1`, `n2`, `n3` are the normals of the triangle's vertices in CCW order.
	 *
	 * `color` is the color of the triangle.
	 */
	public function triangle(v1:Vec3, v2:Vec3, v3:Vec3, n1:Vec3, n2:Vec3, n3:Vec3, color:Vec3):Void {
		// override this
	}

	/**
	 * Draws a line segment between `v1` and `v2`.
	 *
	 * `color` is the color of the line segment.
	 */
	public function line(v1:Vec3, v2:Vec3, color:Vec3):Void {
		// override this
	}
}
