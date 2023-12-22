package oimo.collision.narrowphase.detector.gjkepa;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Vec3;

/**
 * Simplex utilities for GJK/EPA computations.
 */
@:build(oimo.m.B.bu())
class SimplexUtil {
	/**
	 * Sets `out` to the minimum length point on the line (`vec1`, `vec2`)
	 * and returns the index of the voronoi region.
	 */
	public static inline function projectOrigin2(vec1:Vec3, vec2:Vec3, out:Vec3):Int {
		var v1:IVec3;
		var v2:IVec3;
		M.vec3_fromVec3(v1, vec1);
		M.vec3_fromVec3(v2, vec2);

		var v12:IVec3;
		M.vec3_sub(v12, v2, v1);

		var d:Float = M.vec3_dot(v12, v12);
		var t:Float = M.vec3_dot(v12, v1);
		t = -t / d;

		if (t < 0) {
			M.vec3_toVec3(out, v1);
			return 1;
		}
		if (t > 1) {
			M.vec3_toVec3(out, v2);
			return 2;
		}

		var p:IVec3;
		M.vec3_addRhsScaled(p, v1, v12, t);
		M.vec3_toVec3(out, p);
		return 3;
	}

	/**
	 * Sets `out` to the minimum length point on the triangle (`vec1`, `vec2`, `vec3`)
	 * and returns the index of the voronoi region.
	 */
	public static inline function projectOrigin3(vec1:Vec3, vec2:Vec3, vec3:Vec3, out:Vec3):Int {
		var v1:IVec3;
		var v2:IVec3;
		var v3:IVec3;
		var v12:IVec3;
		var v23:IVec3;
		var v31:IVec3;
		M.vec3_fromVec3(v1, vec1);
		M.vec3_fromVec3(v2, vec2);
		M.vec3_fromVec3(v3, vec3);
		M.vec3_sub(v12, v2, v1);
		M.vec3_sub(v23, v3, v2);
		M.vec3_sub(v31, v1, v3);

		var n:IVec3;
		M.vec3_cross(n, v12, v23);

		var n12:IVec3;
		var n23:IVec3;
		var n31:IVec3;
		M.vec3_cross(n12, v12, n);
		M.vec3_cross(n23, v23, n);
		M.vec3_cross(n31, v31, n);
		var d12:Float = M.vec3_dot(v1, n12);
		var d23:Float = M.vec3_dot(v2, n23);
		var d31:Float = M.vec3_dot(v3, n31);

		var mind:Float = -1;
		var minv:IVec3;
		var mini:Int = 0; // index of voronoi region
		M.vec3_zero(minv);

		if (d12 < 0) {
			var b:Int = projectOrigin2(vec1, vec2, out);
			var d:Float = out.x * out.x + out.y * out.y + out.z * out.z;
			mini = b;
			mind = d;
			M.vec3_fromVec3(minv, out);
		}
		if (d23 < 0) {
			var b:Int = projectOrigin2(vec2, vec3, out);
			var d:Float = out.x * out.x + out.y * out.y + out.z * out.z;
			if (mind < 0 || d < mind) {
				mini = b << 1; // 00000021 -> 00000210
				mind = d;
				M.vec3_fromVec3(minv, out);
			}
		}
		if (d31 < 0) {
			var b:Int = projectOrigin2(vec1, vec3, out);
			var d:Float = out.x * out.x + out.y * out.y + out.z * out.z;
			if (mind < 0 || d < mind) {
				mini = b & 1 | (b & 2) << 1; // 00000021 -> 00000201
				mind = d;
				M.vec3_fromVec3(minv, out);
			}
		}
		if (mind > 0) {
			M.vec3_toVec3(out, minv);
			return mini;
		}

		M.vec3_normalize(n, n);
		var dn:Float = M.vec3_dot(v1, n);
		var l2:Float = M.vec3_dot(n, n);
		l2 = dn / l2;
		M.vec3_scale(minv, n, l2);
		M.vec3_toVec3(out, minv);
		return 7;
	}

	/**
	 * Sets `out` to the minimum length point on the tetrahedron (`vec1`, `vec2`, `vec3`, `vec4`)
	 * and returns the index of the voronoi region.
	 */
	public static inline function projectOrigin4(vec1:Vec3, vec2:Vec3, vec3:Vec3, vec4:Vec3, out:Vec3):Int {
		var v1:IVec3;
		var v2:IVec3;
		var v3:IVec3;
		var v4:IVec3;
		var v12:IVec3;
		var v13:IVec3;
		var v14:IVec3;
		var v23:IVec3;
		var v24:IVec3;
		var v34:IVec3;
		M.vec3_fromVec3(v1, vec1);
		M.vec3_fromVec3(v2, vec2);
		M.vec3_fromVec3(v3, vec3);
		M.vec3_fromVec3(v4, vec4);
		M.vec3_sub(v12, v2, v1);
		M.vec3_sub(v13, v3, v1);
		M.vec3_sub(v14, v4, v1);
		M.vec3_sub(v23, v3, v2);
		M.vec3_sub(v24, v4, v2);
		M.vec3_sub(v34, v4, v3);

		var rev:Bool;
		var n123:IVec3;
		var n134:IVec3;
		var n142:IVec3;
		var n243:IVec3;
		var n:IVec3;
		M.vec3_cross(n123, v12, v13);
		M.vec3_cross(n134, v13, v14);
		M.vec3_cross(n142, v14, v12);
		M.vec3_cross(n243, v24, v23);

		var sign:Int = M.vec3_dot(v12, n243) > 0 ? 1 : -1;
		var d123:Float = M.vec3_dot(v1, n123);
		var d134:Float = M.vec3_dot(v1, n134);
		var d142:Float = M.vec3_dot(v1, n142);
		var d243:Float = M.vec3_dot(v2, n243);

		var mind:Float = -1;
		var minv:IVec3;
		var mini:Int = 0; // index of voronoi region
		M.vec3_zero(minv);

		if (d123 * sign < 0) {
			var b:Int = projectOrigin3(vec1, vec2, vec3, out);
			var d:Float = out.x * out.x + out.y * out.y + out.z * out.z;
			mini = b;
			mind = d;
			M.vec3_fromVec3(minv, out);
		}
		if (d134 * sign < 0) {
			var b:Int = projectOrigin3(vec1, vec3, vec4, out);
			var d:Float = out.x * out.x + out.y * out.y + out.z * out.z;
			if (mind < 0 || d < mind) {
				mini = b & 1 | (b & 6) << 1; // 00000321 -> 00003201
				mind = d;
				M.vec3_fromVec3(minv, out);
			}
		}
		if (d142 * sign < 0) {
			var b:Int = projectOrigin3(vec1, vec2, vec4, out);
			var d:Float = out.x * out.x + out.y * out.y + out.z * out.z;
			if (mind < 0 || d < mind) {
				mini = b & 3 | (b & 4) << 1; // 00000321 -> 00003021
				mind = d;
				M.vec3_fromVec3(minv, out);
			}
		}
		if (d243 * sign < 0) {
			var b:Int = projectOrigin3(vec2, vec3, vec4, out);
			var d:Float = out.x * out.x + out.y * out.y + out.z * out.z;
			if (mind < 0 || d < mind) {
				mini = b << 1; // 00000321 -> 00003210
				mind = d;
				M.vec3_fromVec3(minv, out);
			}
		}

		if (mind > 0) {
			M.vec3_toVec3(out, minv);
			return mini;
		}

		// the origin is inside the tetrahedron
		out.zero();
		return 15;
	}
}
