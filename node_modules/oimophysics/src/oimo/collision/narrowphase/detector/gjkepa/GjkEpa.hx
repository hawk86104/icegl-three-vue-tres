package oimo.collision.narrowphase.detector.gjkepa;
import haxe.ds.Vector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.detector.*;
import oimo.common.Mat3;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * GJK algorithm and EPA for narrow-phase collision detection.
 */
@:build(oimo.m.B.bu())
class GjkEpa {
	var c1:ConvexGeometry;
	var c2:ConvexGeometry;
	var tf1:Transform;
	var tf2:Transform;

	static var instance:GjkEpa = new GjkEpa();

	// ------------------------------------------------------------- for GJK

	// simplex
	var s:Vector<Vec3>;
	var simplexSize:Int;

	// witness points
	var w1:Vector<Vec3>;
	var w2:Vector<Vec3>;

	var tempVec3s:Vector<Vec3>;
	var tempTransform:Transform;

	// direction
	var dir:Vec3;

	// closest point
	var closest:Vec3;

	// base directions used to expand simplex
	var baseDirs:Vector<Vec3>;

	// for convex casting
	var tl1:Vec3;
	var tl2:Vec3;
	var rayX:Vec3;
	var rayR:Vec3;

	// ------------------------------------------------------------- for EPA

	var depth:Float;
	var polyhedron:EpaPolyhedron;

	// ------------------------------------------------------------- public vars

	/**
	 * Computed closest point of the first geometry in world coordinate system.
	 */
	public var closestPoint1:Vec3;

	/**
	 * Computed closest point of the second geometry in world coordinate system.
	 */
	public var closestPoint2:Vec3;

	/**
	 * Computed distance between two geometries. This value may be negative if two
	 * geometries are overlapping.
	 */
	public var distance:Float;

	/**
	 * Default constructor. Consider using `GjkEpa.getInstance` instead of creating a new
	 * instance.
	 */
	public function new() {
		s = new Vector<Vec3>(4);
		w1 = new Vector<Vec3>(4);
		w2 = new Vector<Vec3>(4);

		baseDirs = new Vector<Vec3>(3);
		baseDirs[0] = new Vec3(1, 0, 0);
		baseDirs[1] = new Vec3(0, 1, 0);
		baseDirs[2] = new Vec3(0, 0, 1);

		tl1 = new Vec3();
		tl2 = new Vec3();
		rayX = new Vec3();
		rayR = new Vec3();
		tempTransform = new Transform();

		for (i in 0...4) {
			s[i] = new Vec3();
			w1[i] = new Vec3();
			w2[i] = new Vec3();
		}

		dir = new Vec3();
		closest = new Vec3();

		closestPoint1 = new Vec3();
		closestPoint2 = new Vec3();

		polyhedron = new EpaPolyhedron();
	}

	// --- private ---

	function computeClosestPointsImpl(c1:ConvexGeometry, c2:ConvexGeometry, tf1:Transform, tf2:Transform, cache:CachedDetectorData, useEpa:Bool):Int {
		GjkEpaLog.log("----------- GJK begin -----------");

		this.c1 = c1;
		this.c2 = c2;
		this.tf1 = tf1;
		this.tf2 = tf2;

		// simplex
		var s:Vector<Vec3> = this.s;

		// witness points
		var w1:Vector<Vec3> = this.w1;
		var w2:Vector<Vec3> = this.w2;

		var closest:Vec3 = this.closest;

		var dir:Vec3 = this.dir;

		if (cache != null) {
			if (cache._gjkCache == null) cache._gjkCache = new GjkCache();
			loadCache(cache._gjkCache);
		} else {
			dir.zero();
		}

		if (dir.lengthSq() == 0) {
			// compute the first vertex of the simplex
			var firstDir:IVec3;
			M.vec3_sub(firstDir, tf2._position, tf1._position);
			M.vec3_toVec3(dir, firstDir);
			if (dir.lengthSq() < 1e-6) {
				dir.init(1, 0, 0);
			}
		}

		simplexSize = 0;
		computeSupportingVertex();
		simplexSize = 1;

		// loop count and max iteration of the loop
		var count:Int = 0;
		var max:Int = 40;

		var eps:Float = 1e-4;
		var eps2:Float = eps * eps;

		while (count < max) {
			// project the origin to the simplex and compute index of voronoi region of the origin.
			var v:Int = 0;
			GjkEpaLog.log('simplex size: $simplexSize');
			GjkEpaLog.log('projecting the origin to the simplex...');
			switch (simplexSize) {
			case 1:
				closest.copyFrom(s[0]);
				GjkEpaLog.log('${s[0]}');
				v = 1;
			case 2:
				v = SimplexUtil.projectOrigin2(s[0], s[1], closest);
				GjkEpaLog.log('${s[0]}');
				GjkEpaLog.log('${s[1]}');
			case 3:
				v = SimplexUtil.projectOrigin3(s[0], s[1], s[2], closest);
				GjkEpaLog.log('${s[0]}');
				GjkEpaLog.log('${s[1]}');
				GjkEpaLog.log('${s[2]}');
			case 4:
				v = SimplexUtil.projectOrigin4(s[0], s[1], s[2], s[3], closest);
				GjkEpaLog.log('${s[0]}');
				GjkEpaLog.log('${s[1]}');
				GjkEpaLog.log('${s[2]}');
				GjkEpaLog.log('${s[3]}');
			}

			// check if the origin is touching or inside the simplex
			if (closest.lengthSq() < eps2) {
				if (!useEpa) {
					distance = 0;
					return GjkEpaResultState._SUCCEEDED;
				}

				// make the simplex to be a tetrahedron for EPA computation
				switch (simplexSize) {
				case 1:
					pointToTetrahedron();
					GjkEpaLog.log("point -> tetrahedron");
				case 2:
					lineToTetrahedron();
					GjkEpaLog.log("line -> tetrahedron");
				case 3:
					triangleToTetrahedron();
					GjkEpaLog.log("triangle -> tetrahedron");
				}
				if (simplexSize == 4) {
					var epaState:Int = computeDepth(c1, c2, tf1, tf2, s, w1, w2);
					if (epaState != GjkEpaResultState._SUCCEEDED) {
						distance = 0;
						return epaState;
					}
					distance = -depth;
					return GjkEpaResultState._SUCCEEDED;
				}
				// failed to make a tetrahedron
				distance = 0;
				return GjkEpaResultState._GJK_FAILED_TO_MAKE_TETRAHEDRON;
			}

			GjkEpaLog.log('projected origin: $v');

			// shrink the simplex according to the voronoi index of the origin
			shrinkSimplex(v);

			// compute the next vertex
			dir.copyFrom(closest).negateEq();
			computeSupportingVertex();

			if (dir.lengthSq() < eps2) {
				throw M.error("!?"); // this should never be happen
			}

			var d1:Float = closest.dot(dir);
			var d2:Float = s[simplexSize].dot(dir);

			GjkEpaLog.log('n: $simplexSize, prev: $closest, current: ${s[simplexSize]}, dir: $dir, iteration: $count, d2 - d1: ${d2 - d1}');

			if (d2 - d1 < eps2) { // terminate GJK; no improvement
				interpolateClosestPoints();

				GjkEpaLog.log("iteration: " + count);

				distance = closest.length(); // no improvement

				if (cache != null && cache._gjkCache != null) {
					saveCache(cache._gjkCache);
				}

				return GjkEpaResultState._SUCCEEDED;
			}

			simplexSize++;
			count++;
		}

		GjkEpaLog.log("GJK failed: did not converge");
		return GjkEpaResultState._GJK_DID_NOT_CONVERGE;
	}

	// `c1` can be null
	function convexCastImpl(c1:ConvexGeometry, c2:ConvexGeometry, tf1:Transform, tf2:Transform, tl1:Vec3, tl2:Vec3, hit:RayCastHit):Bool {
		GjkEpaLog.log("----------- GJK convex casting begin -----------");

		this.c1 = c1;
		this.c2 = c2;
		this.tf1 = tf1;
		this.tf2 = tf2;

		// simplex
		var s:Vector<Vec3> = this.s;

		// witness points
		var w1:Vector<Vec3> = this.w1;
		var w2:Vector<Vec3> = this.w2;

		var closest:Vec3 = this.closest;

		var dir:Vec3 = this.dir;

		// compute the first vertex of the simplex
		var firstDir:IVec3;
		M.vec3_sub(firstDir, tf2._position, tf1._position);
		M.vec3_toVec3(dir, firstDir);
		if (dir.lengthSq() < 1e-6) {
			dir.init(1, 0, 0);
		}

		simplexSize = 0;
		computeConvexCastSupportingVertex();
		simplexSize = 1;

		// loop count and max iteration of the loop
		var count:Int = 0;
		var max:Int = 40;

		var lambda:Float = 0.0;
		var rayX:Vec3 = this.rayX; // origin
		var rayR:Vec3 = this.rayR; // relative translation
		rayX.zero();
		rayR.copyFrom(tl2).subEq(tl1);

		var eps:Float = 1e-4;
		var eps2:Float = eps * eps;

		while (count < max) {
			// project the origin to the simplex and compute index of voronoi region of the origin.
			var v:Int = 0;
			GjkEpaLog.log('simplex size: $simplexSize');
			GjkEpaLog.log('projecting the origin to the simplex...');
			GjkEpaLog.log('x: $rayX');
			GjkEpaLog.log('lambda: $lambda');
			switch (simplexSize) {
			case 1:
				closest.copyFrom(s[0]);
				GjkEpaLog.log('${s[0]}');
				v = 1;
			case 2:
				v = SimplexUtil.projectOrigin2(s[0], s[1], closest);
				GjkEpaLog.log('${s[0]}');
				GjkEpaLog.log('${s[1]}');
			case 3:
				v = SimplexUtil.projectOrigin3(s[0], s[1], s[2], closest);
				GjkEpaLog.log('${s[0]}');
				GjkEpaLog.log('${s[1]}');
				GjkEpaLog.log('${s[2]}');
			case 4:
				v = SimplexUtil.projectOrigin4(s[0], s[1], s[2], s[3], closest);
				GjkEpaLog.log('${s[0]}');
				GjkEpaLog.log('${s[1]}');
				GjkEpaLog.log('${s[2]}');
				GjkEpaLog.log('${s[3]}');
			}

			GjkEpaLog.log('projected origin: pos = $closest, voronoi index = $v');

			// shrink the simplex according to the voronoi index of the origin
			shrinkSimplex(v);

			// check if the origin is touching or inside the simplex
			if (closest.lengthSq() < eps2) {
				if (lambda == 0 || simplexSize == 4) {
					GjkEpaLog.log("overlapping... closest: " + closest);
					hit.fraction = lambda;
					return false; // overlapping
				}

				interpolateClosestPoints();

				hit.fraction = lambda;
				hit.normal.copyFrom(dir).normalize(); // previous dir
				hit.position.copyFrom(closestPoint1).addScaledEq(tl1, lambda);
				GjkEpaLog.log("GJK convex cast succeeded");
				return true;
			}

			// compute the next vertex
			dir.copyFrom(closest).negateEq();
			computeConvexCastSupportingVertex();
			s[simplexSize].subEq(rayX); // translate origin

			if (dir.lengthSq() < eps2) {
				throw M.error("!?"); // this should never be happen
			}

			// n is the normal at the vertex p
			var p:Vec3 = s[simplexSize];
			var n:Vec3 = dir;
			GjkEpaLog.log('new vertex p = $p');
			GjkEpaLog.log('normal n = $n');
			GjkEpaLog.log('ray dir r = $rayR');

			// check if a part of the ray can be rejected
			var pn:Float = p.dot(n);
			GjkEpaLog.log('p dot n = $pn');
			if (pn < 0) {
				// check if entire the ray can be rejected
				if (rayR.dot(n) >= 0) {
					GjkEpaLog.log("rejected [0");
					return false;
				}
				var dLambda:Float = pn / rayR.dot(n);
				lambda += dLambda;
				if (lambda >= 1) {
					GjkEpaLog.log("rejected 1]");
					return false;
				}
				GjkEpaLog.log("advanced: " + dLambda);
				rayX.addScaledEq(rayR, dLambda);

				// translate the simplex
				for (i in 0...simplexSize + 1) {
					s[i].addScaledEq(rayR, -dLambda);
				}
			} else {
				GjkEpaLog.log("ray did not advance");
			}

			// do not add new vertex to the simplex if already exists
			var duplicate:Bool = false;
			for (i in 0...simplexSize) {
				var dx:Float = s[i].x - s[simplexSize].x;
				var dy:Float = s[i].y - s[simplexSize].y;
				var dz:Float = s[i].z - s[simplexSize].z;
				if (dx * dx + dy * dy + dz * dz < eps2) {
					duplicate = true;
					GjkEpaLog.log('duplicate vertex ${s[i]} and ${s[simplexSize]}');
					break;
				}
			}
			if (!duplicate) {
				GjkEpaLog.log('added ${s[simplexSize]}');
				simplexSize++;
			}

			count++;

			GjkEpaLog.log('iteration: $count');
		}

		GjkEpaLog.log("GJK convex cast failed: did not converge");
		return false;
	}

	function interpolateClosestPoints():Void {
		switch (simplexSize) {
		case 1: {
				closestPoint1.copyFrom(w1[0]);
				closestPoint2.copyFrom(w2[0]);
		}
		case 2: {
				var c:IVec3;
				M.vec3_fromVec3(c, closest);
				var s0:IVec3; var w10:IVec3; var w20:IVec3;
				var s1:IVec3; var w11:IVec3; var w21:IVec3;
				var s2:IVec3; var w12:IVec3; var w22:IVec3;
				M.vec3_fromVec3(s0, s[0]); M.vec3_fromVec3(w10, w1[0]); M.vec3_fromVec3(w20, w2[0]);
				M.vec3_fromVec3(s1, s[1]); M.vec3_fromVec3(w11, w1[1]); M.vec3_fromVec3(w21, w2[1]);
				M.vec3_fromVec3(s2, s[2]); M.vec3_fromVec3(w12, w1[2]); M.vec3_fromVec3(w22, w2[2]);

				var s01:IVec3;
				M.vec3_sub(s01, s1, s0);
				var invDet:Float = M.vec3_dot(s01, s01);
				if (invDet != 0) invDet = 1 / invDet;
				var s0c:IVec3;
				M.vec3_sub(s0c, c, s0);
				var t:Float = M.vec3_dot(s0c, s01) * invDet;

				// compute closest points
				var diff:IVec3;
				var cp1:IVec3;
				var cp2:IVec3;

				M.vec3_sub(diff, w11, w10);
				M.vec3_addRhsScaled(cp1, w10, diff, t);

				M.vec3_sub(diff, w21, w20);
				M.vec3_addRhsScaled(cp2, w20, diff, t);

				M.vec3_toVec3(closestPoint1, cp1);
				M.vec3_toVec3(closestPoint2, cp2);
		}
		case 3: {
				var c:IVec3;
				M.vec3_fromVec3(c, closest);
				var s0:IVec3; var w10:IVec3; var w20:IVec3;
				var s1:IVec3; var w11:IVec3; var w21:IVec3;
				var s2:IVec3; var w12:IVec3; var w22:IVec3;
				M.vec3_fromVec3(s0, s[0]); M.vec3_fromVec3(w10, w1[0]); M.vec3_fromVec3(w20, w2[0]);
				M.vec3_fromVec3(s1, s[1]); M.vec3_fromVec3(w11, w1[1]); M.vec3_fromVec3(w21, w2[1]);
				M.vec3_fromVec3(s2, s[2]); M.vec3_fromVec3(w12, w1[2]); M.vec3_fromVec3(w22, w2[2]);

				var s01:IVec3;
				var s02:IVec3;
				var s0c:IVec3;
				M.vec3_sub(s01, s1, s0);
				M.vec3_sub(s02, s2, s0);
				M.vec3_sub(s0c, c, s0);

				var d11:Float = M.vec3_dot(s01, s01);
				var d12:Float = M.vec3_dot(s01, s02);
				var d22:Float = M.vec3_dot(s02, s02);
				var d1c:Float = M.vec3_dot(s01, s0c);
				var d2c:Float = M.vec3_dot(s02, s0c);
				var invDet:Float = d11 * d22 - d12 * d12;
				if (invDet != 0) invDet = 1 / invDet;
				var s:Float = (d1c * d22 - d2c * d12) * invDet;
				var t:Float = (-d1c * d12 + d2c * d11) * invDet;

				// compute closest points
				var diff:IVec3;
				var cp1:IVec3;
				var cp2:IVec3;

				M.vec3_sub(diff, w11, w10);
				M.vec3_addRhsScaled(cp1, w10, diff, s);
				M.vec3_sub(diff, w12, w10);
				M.vec3_addRhsScaled(cp1, cp1, diff, t);

				M.vec3_sub(diff, w21, w20);
				M.vec3_addRhsScaled(cp2, w20, diff, s);
				M.vec3_sub(diff, w22, w20);
				M.vec3_addRhsScaled(cp2, cp2, diff, t);

				M.vec3_toVec3(closestPoint1, cp1);
				M.vec3_toVec3(closestPoint2, cp2);
		}
		default:
			throw M.error("!?");
		}
	}

	function loadCache(gjkCache:GjkCache):Void {
		// copy simplex data from the cache
		dir.copyFrom(gjkCache.prevClosestDir);
	}

	function saveCache(gjkCache:GjkCache):Void {
		// set GJK cache for the next computation
		gjkCache.prevClosestDir.copyFrom(closest).negateEq();
	}

	function shrinkSimplex(vertexBits:Int):Void {
		simplexSize = vertexBits;
		simplexSize = (simplexSize & 5) + (simplexSize >> 1 & 5);
		simplexSize = (simplexSize & 3) + (simplexSize >> 2 & 3);
		switch (vertexBits) {
		//case 0: // do nothing
		//case 1: // do nothing
		case 2: // 0 <- 1
			 s[0].copyFrom( s[1]);
			w1[0].copyFrom(w1[1]);
			w2[0].copyFrom(w2[1]);
		//case 3: // do nothing
		case 4: // 0 <- 2
			 s[0].copyFrom( s[2]);
			w1[0].copyFrom(w1[2]);
			w2[0].copyFrom(w2[2]);
		case 5: // 1 <- 2
			 s[1].copyFrom( s[2]);
			w1[1].copyFrom(w1[2]);
			w2[1].copyFrom(w2[2]);
		case 6: // 0 <- 2
			 s[0].copyFrom( s[2]);
			w1[0].copyFrom(w1[2]);
			w2[0].copyFrom(w2[2]);
		//case 7: // do nothing
		case 8: // 0 <- 3
			 s[0].copyFrom( s[3]);
			w1[0].copyFrom(w1[3]);
			w2[0].copyFrom(w2[3]);
		case 9: // 1 <- 3
			 s[1].copyFrom( s[3]);
			w1[1].copyFrom(w1[3]);
			w2[1].copyFrom(w2[3]);
		case 10: // 0 <- 3
			 s[0].copyFrom( s[3]);
			w1[0].copyFrom(w1[3]);
			w2[0].copyFrom(w2[3]);
		case 11: // 2 <- 3
			 s[2].copyFrom( s[3]);
			w1[2].copyFrom(w1[3]);
			w2[2].copyFrom(w2[3]);
		case 12: // 0 <- 2, 1 <- 3
			 s[0].copyFrom( s[2]);
			w1[0].copyFrom(w1[2]);
			w2[0].copyFrom(w2[2]);
			 s[1].copyFrom( s[3]);
			w1[1].copyFrom(w1[3]);
			w2[1].copyFrom(w2[3]);
		case 13: // 1 <- 3
			 s[1].copyFrom( s[3]);
			w1[1].copyFrom(w1[3]);
			w2[1].copyFrom(w2[3]);
		case 14: // 0 <- 3
			 s[0].copyFrom( s[3]);
			w1[0].copyFrom(w1[3]);
			w2[0].copyFrom(w2[3]);
		//case 15: // do nothing
		}
	}

	extern inline function computeSupportingVertex():Void {
		computeWitnessPoint1(false);
		computeWitnessPoint2(false);
		s[simplexSize].copyFrom(w1[simplexSize]).subEq(w2[simplexSize]);
	}

	extern inline function computeConvexCastSupportingVertex():Void {
		if (c1 != null) {
			computeWitnessPoint1(true);
		} else {
			M.vec3_toVec3(w1[simplexSize], tf1._position);
		}
		computeWitnessPoint2(true);
		s[simplexSize].copyFrom(w1[simplexSize]).subEq(w2[simplexSize]);
	}

	function computeWitnessPoint1(addMargin:Bool):Void {
		var tmp:IVec3;
		var idir:IVec3;
		M.vec3_fromVec3(idir, dir);

		// compute local dir
		var ldir1:IVec3;
		M.vec3_mulMat3Transposed(ldir1, idir, tf1._rotation);

		// compute local witness point
		var iw1:IVec3;
		M.vec3_toVec3(dir, ldir1);
		c1.computeLocalSupportingVertex(dir, w1[simplexSize]);
		if (addMargin) {
			dir.normalize();
			w1[simplexSize].addScaledEq(dir, c1._gjkMargin);
		}

		// compute world witness point
		M.vec3_fromVec3(tmp, w1[simplexSize]);
		M.vec3_mulMat3(iw1, tmp, tf1._rotation);
		M.vec3_add(iw1, iw1, tf1._position);
		M.vec3_toVec3(w1[simplexSize], iw1);

		M.vec3_toVec3(dir, idir);
	}

	function computeWitnessPoint2(addMargin:Bool):Void {
		var tmp:IVec3;
		var idir:IVec3;
		M.vec3_fromVec3(idir, dir);

		// compute local dir
		var ldir2:IVec3;
		M.vec3_mulMat3Transposed(ldir2, idir, tf2._rotation);
		M.vec3_negate(ldir2, ldir2);

		// compute local witness point
		var iw2:IVec3;
		M.vec3_toVec3(dir, ldir2);
		c2.computeLocalSupportingVertex(dir, w2[simplexSize]);
		if (addMargin) {
			dir.normalize();
			w2[simplexSize].addScaledEq(dir, c2._gjkMargin);
		}

		// compute world witness point
		M.vec3_fromVec3(tmp, w2[simplexSize]);
		M.vec3_mulMat3(iw2, tmp, tf2._rotation);
		M.vec3_add(iw2, iw2, tf2._position);
		M.vec3_toVec3(w2[simplexSize], iw2);

		M.vec3_toVec3(dir, idir);
	}

	function pointToTetrahedron():Void {
		for (i in 0...3) {
			dir.copyFrom(baseDirs[i]);

			computeSupportingVertex();
			simplexSize++;
			lineToTetrahedron();
			if (simplexSize == 4) break;
			simplexSize--;

			dir.negateEq();

			computeSupportingVertex();
			simplexSize++;
			lineToTetrahedron();
			if (simplexSize == 4) break;
			simplexSize--;
		}
	}

	function lineToTetrahedron():Void {
		var oldDir:IVec3;
		M.vec3_fromVec3(oldDir, dir);

		var s0:IVec3;
		var s1:IVec3;
		var lineDir:IVec3;
		M.vec3_fromVec3(s0, s[0]);
		M.vec3_fromVec3(s1, s[1]);
		M.vec3_sub(lineDir, s0, s1);
		for (i in 0...3) {
			var baseDir:IVec3;
			M.vec3_fromVec3(baseDir, baseDirs[i]);
			var newDir:IVec3;
			M.vec3_cross(newDir, lineDir, baseDir);
			M.vec3_toVec3(dir, newDir);

			computeSupportingVertex();
			simplexSize++;
			triangleToTetrahedron();
			if (simplexSize == 4) break;
			simplexSize--;

			dir.negateEq();

			computeSupportingVertex();
			simplexSize++;
			triangleToTetrahedron();
			if (simplexSize == 4) break;
			simplexSize--;
		}

		M.vec3_toVec3(dir, oldDir);
	}

	function triangleToTetrahedron():Void {
		var oldDir:IVec3;
		M.vec3_fromVec3(oldDir, dir);

		do {
			var s0:IVec3;
			var s1:IVec3;
			var s2:IVec3;
			var s01:IVec3;
			var s02:IVec3;
			M.vec3_fromVec3(s0, s[0]);
			M.vec3_fromVec3(s1, s[1]);
			M.vec3_fromVec3(s2, s[2]);
			M.vec3_sub(s01, s1, s0);
			M.vec3_sub(s02, s2, s0);
			var n:IVec3;
			M.vec3_cross(n, s01, s02);
			M.vec3_toVec3(dir, n);

			computeSupportingVertex();
			simplexSize++;
			if (isValidTetrahedron()) break;
			simplexSize--;

			dir.negateEq();

			computeSupportingVertex();
			simplexSize++;
			if (isValidTetrahedron()) break;
			simplexSize--;
		} while (false);

		M.vec3_toVec3(dir, oldDir);
	}

	/*inline*/ function isValidTetrahedron():Bool {
		var e00:Float = s[1].x - s[0].x;
		var e01:Float = s[1].y - s[0].y;
		var e02:Float = s[1].z - s[0].z;
		var e10:Float = s[2].x - s[0].x;
		var e11:Float = s[2].y - s[0].y;
		var e12:Float = s[2].z - s[0].z;
		var e20:Float = s[3].x - s[0].x;
		var e21:Float = s[3].y - s[0].y;
		var e22:Float = s[3].z - s[0].z;
		var det:Float = e00 * (e11 * e22 - e12 * e21) - e01 * (e10 * e22 - e12 * e20) + e02 * (e10 * e21 - e11 * e20);
		return det > 1e-12 || det < -1e-12;
	}

	// EPA

	function computeDepth(convex1:ConvexGeometry, convex2:ConvexGeometry, tf1:Transform, tf2:Transform, initialPolyhedron:Vector<Vec3>, initialPolyhedron1:Vector<Vec3>, initialPolyhedron2:Vector<Vec3>):Int {
		GjkEpaLog.log("----------- EPA begin ----------- ");

		polyhedron._clear();
		if (!polyhedron._init(
			polyhedron._pickVertex().init(initialPolyhedron[0], initialPolyhedron1[0], initialPolyhedron2[0]),
			polyhedron._pickVertex().init(initialPolyhedron[1], initialPolyhedron1[1], initialPolyhedron2[1]),
			polyhedron._pickVertex().init(initialPolyhedron[2], initialPolyhedron1[2], initialPolyhedron2[2]),
			polyhedron._pickVertex().init(initialPolyhedron[3], initialPolyhedron1[3], initialPolyhedron2[3])
		)) {
			GjkEpaLog.log("EPA failed at initialization: " + polyhedron._status);
			return GjkEpaResultState.EPA_FAILED_TO_INIT;
		}

		simplexSize = 0;
		var supportingVertex:Vec3 = s[0];
		var witness1:Vec3 = w1[0];
		var witness2:Vec3 = w2[0];

		var count:Int = 0;
		var maxIterations:Int = 40;
		while (count < maxIterations) {
			var face:EpaTriangle = polyhedron._getBestTriangle();

			GjkEpaLog.log("nearest face:");
			GjkEpaLog.run(face.dump());

			dir.copyFrom(face._normal).normalize();
			computeSupportingVertex();

			var v0:EpaVertex = face._vertices[0];
			var v1:EpaVertex = face._vertices[1];
			var v2:EpaVertex = face._vertices[2];

			var dot1:Float = v0.v.dot(dir);
			var dot2:Float = supportingVertex.dot(dir);

			GjkEpaLog.log("got new vertex: " + supportingVertex);
			GjkEpaLog.log("improvement: " + dot1 + " -> " + dot2 + ", normal: " + dir.toString());

			if (dot2 - dot1 < 1e-6 || count == maxIterations - 1) { // no improvement
				closest.copyFrom(dir).scaleEq(dir.dot(v0.v) / dir.lengthSq());

				var c:IVec3;
				M.vec3_fromVec3(c, closest);
				var s0:IVec3; var w10:IVec3; var w20:IVec3;
				var s1:IVec3; var w11:IVec3; var w21:IVec3;
				var s2:IVec3; var w12:IVec3; var w22:IVec3;
				M.vec3_fromVec3(s0, v0.v); M.vec3_fromVec3(w10, v0.w1); M.vec3_fromVec3(w20, v0.w2);
				M.vec3_fromVec3(s1, v1.v); M.vec3_fromVec3(w11, v1.w1); M.vec3_fromVec3(w21, v1.w2);
				M.vec3_fromVec3(s2, v2.v); M.vec3_fromVec3(w12, v2.w1); M.vec3_fromVec3(w22, v2.w2);

				var s01:IVec3;
				var s02:IVec3;
				var s0c:IVec3;
				M.vec3_sub(s01, s1, s0);
				M.vec3_sub(s02, s2, s0);
				M.vec3_sub(s0c, c, s0);

				var d11:Float = M.vec3_dot(s01, s01);
				var d12:Float = M.vec3_dot(s01, s02);
				var d22:Float = M.vec3_dot(s02, s02);
				var d1c:Float = M.vec3_dot(s01, s0c);
				var d2c:Float = M.vec3_dot(s02, s0c);
				var invDet:Float = d11 * d22 - d12 * d12;
				if (invDet != 0) invDet = 1 / invDet;
				var s:Float = (d1c * d22 - d2c * d12) * invDet;
				var t:Float = (-d1c * d12 + d2c * d11) * invDet;

				// compute closest points
				var diff:IVec3;
				var cp1:IVec3;
				var cp2:IVec3;

				M.vec3_sub(diff, w11, w10);
				M.vec3_addRhsScaled(cp1, w10, diff, s);
				M.vec3_sub(diff, w12, w10);
				M.vec3_addRhsScaled(cp1, cp1, diff, t);

				M.vec3_sub(diff, w21, w20);
				M.vec3_addRhsScaled(cp2, w20, diff, s);
				M.vec3_sub(diff, w22, w20);
				M.vec3_addRhsScaled(cp2, cp2, diff, t);

				M.vec3_toVec3(closestPoint1, cp1);
				M.vec3_toVec3(closestPoint2, cp2);

				depth = closest.length();
				return GjkEpaResultState.SUCCEEDED;
			}
			var epaVertex:EpaVertex = polyhedron._pickVertex().init(supportingVertex, witness1, witness2);
			if (!polyhedron._addVertex(epaVertex, face)) {

				GjkEpaLog.log("EPA failed at vertex addition: " + polyhedron._status);
				GjkEpaLog.run(polyhedron._dumpAsObjModel());

				return GjkEpaResultState.EPA_FAILED_TO_ADD_VERTEX;
			}
			count++;
		}

		GjkEpaLog.log("EPA failed: did not converge.");
		GjkEpaLog.run(polyhedron._dumpAsObjModel());

		return GjkEpaResultState.EPA_DID_NOT_CONVERGE;
	}

	// --- public ---

	/**
	 * Returns an instance of `GjkEpa`.
	 */
	public static inline function getInstance():GjkEpa {
		return instance;
	}

	/**
	 * Computes the closest points of two convex geometries `c1` and `c2` with transforms `tf1` and `tf2`
	 * respectively, and returns the status of the result (see `GjkEpaResultState` for details). If cached
	 * data `cache` is not `null`, this tries to exploit the previous result in `cache` to improve performance,
	 * and stores the new result to `cache`.
	 *
	 * Set the compiler option `OIMO_GJK_EPA_DEBUG` for debugging (warning: massive logging).
	 */
	public inline function computeClosestPoints(c1:ConvexGeometry, c2:ConvexGeometry, tf1:Transform, tf2:Transform, cache:CachedDetectorData):Int {
		return computeClosestPointsImpl(c1, c2, tf1, tf2, cache, true);
	}

	/**
	 * Computes the distance between two convex geometries `c1` and `c2` with transforms `tf1` and `tf2`
	 * respectively, and returns the status of the result (see `GjkEpaResultState` for details). Different
	 * from `GjkEpa.computeClosestPoints`, this does not compute negative distances and closest points if
	 * two geometries are overlapping. If cached data `cache` is not `null`, this tries to exploit the
	 * previous result in `cache` to improve performance, and stores the new result to `cache`.
	 *
	 * Set the compiler option `OIMO_GJK_EPA_DEBUG` for debugging (warning: massive logging).
	 */
	public inline function computeDistance(c1:ConvexGeometry, c2:ConvexGeometry, tf1:Transform, tf2:Transform, cache:CachedDetectorData):Int {
		return computeClosestPointsImpl(c1, c2, tf1, tf2, cache, false);
	}

	/**
	 * Performs a convex casting between `c1` and `c2`. Returns `true` and sets the result information
	 * to `hit` if the convex geometries intersect. Each convex geometries translates by `tl1` and `tl2`,
	 * starting from the beginning transforms `tf1` and `tf2` respectively.
	 *
	 * Set the compiler option `OIMO_GJK_EPA_DEBUG` for debugging (warning: massive logging).
	 */
	public function convexCast(c1:ConvexGeometry, c2:ConvexGeometry, tf1:Transform, tf2:Transform, tl1:Vec3, tl2:Vec3, hit:RayCastHit):Bool {
		return convexCastImpl(c1, c2, tf1, tf2, tl1, tl2, hit);
	}

	/**
	 * Performs ray cansting against the convex geometry `c` with transform `tf`. Returns `true` and sets
	 * the result information to `hit` if the line segment from `begin` to `end` intersects the convex
	 * geometry. Otherwise returns `false`.
	 *
	 * Set the compiler option `OIMO_GJK_EPA_DEBUG` for debugging (warning: massive logging).
	 */
	public function rayCast(c:ConvexGeometry, tf:Transform, begin:Vec3, end:Vec3, hit:RayCastHit):Bool {
		var tf1:Transform = tempTransform;
		var tf2:Transform = tf;

		M.vec3_fromVec3(tf1._position, begin);

		var tl1:Vec3 = this.tl1;
		var tl2:Vec3 = this.tl2;

		tl1.copyFrom(end).subEq(begin);
		tl2.zero();

		return convexCastImpl(null, c, tf1, tf2, tl1, tl2, hit);
	}

}
