package oimo.collision.geometry;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Vec3;
import oimo.collision.raycast.*;

/**
 * The axis-aligned bounding box.
 */
@:build(oimo.m.B.bu())
class Aabb {
	public var _min:IVec3;
	public var _max:IVec3;

	/**
	 * Creates an empty AABB. Minimum and maximum points are set to zero.
	 */
	public function new() {
		M.vec3_zero(_min);
		M.vec3_zero(_max);
	}

	/**
	 * Sets the minimum and maximum point and returns `this`.
	 *
	 * Equivallent to `setMin(min).setMax(max)`.
	 */
	public inline function init(min:Vec3, max:Vec3):Aabb {
		M.vec3_fromVec3(_min, min);
		M.vec3_fromVec3(_max, max);
		return this;
	}

	/**
	 * Returns the minimum point of the axis-aligned bounding box.
	 */
	public inline function getMin():Vec3 {
		var min:Vec3 = new Vec3();
		M.vec3_toVec3(min, _min);
		return min;
	}

	/**
	 * Sets the minimum point of the axis-aligned bounding box to `min`.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getMinTo(min:Vec3):Void {
		M.vec3_toVec3(min, _min);
	}

	/**
	 * Sets the minimum point of the axis-aligned bounding box to `min` and returns `this`.
	 */
	public inline function setMin(min:Vec3):Aabb {
		M.vec3_fromVec3(_min, min);
		return this;
	}

	/**
	 * Returns the maximum point of the axis-aligned bounding box.
	 */
	public inline function getMax():Vec3 {
		var max:Vec3 = new Vec3();
		M.vec3_toVec3(max, _max);
		return max;
	}

	/**
	 * Sets the maximum point of the axis-aligned bounding box to `max`.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getMaxTo(max:Vec3):Void {
		M.vec3_toVec3(max, _max);
	}

	/**
	 * Sets the maximum point of the axis-aligned bounding box to `max` and returns `this`.
	 */
	public inline function setMax(max:Vec3):Aabb {
		M.vec3_fromVec3(_max, max);
		return this;
	}

	/**
	 * Returns the center of the AABB.
	 */
	public inline function getCenter():Vec3 {
		var v:Vec3 = new Vec3();
		var c:IVec3;
		M.vec3_add(c, _min, _max);
		M.vec3_scale(c, c, 0.5);
		M.vec3_toVec3(v, c);
		return v;
	}

	/**
	 * Sets `center` to the center of the AABB.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getCenterTo(center:Vec3):Void {
		var c:IVec3;
		M.vec3_add(c, _min, _max);
		M.vec3_scale(c, c, 0.5);
		M.vec3_toVec3(center, c);
	}

	/**
	 * Returns the half extents of the AABB.
	 */
	public inline function getExtents():Vec3 {
		var v:Vec3 = new Vec3();
		var c:IVec3;
		M.vec3_sub(c, _max, _min);
		M.vec3_scale(c, c, 0.5);
		M.vec3_toVec3(v, c);
		return v;
	}

	/**
	 * Sets `halfExtents` to the half extents of the AABB.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getExtentsTo(halfExtents:Vec3):Void {
		var c:IVec3;
		M.vec3_sub(c, _max, _min);
		M.vec3_scale(c, c, 0.5);
		M.vec3_toVec3(halfExtents, c);
	}

	/**
	 * Combines `other` into this AABB and returns `this`.
	 */
	public inline function combine(other:Aabb):Aabb {
		M.aabb_combine(_min, _max, _min, _max, other._min, other._max);
		return this;
	}

	/**
	 * Returns the combined aabb of `this` and `other`.
	 */
	public inline function combined(other:Aabb):Aabb {
		var aabb:Aabb = new Aabb();
		M.aabb_combine(aabb._min, aabb._max, _min, _max, other._min, other._max);
		return aabb;
	}

	/**
	 * Returns whether `this` and `other` intersect.
	 */
	public inline function overlap(other:Aabb):Bool {
		return M.aabb_overlap(_min, _max, other._min, other._max);
	}

	/**
	 * Returns the intersection of `this` and `other`.
	 */
	public inline function getIntersection(other:Aabb):Aabb {
		var aabb:Aabb = new Aabb();
		M.vec3_max(aabb._min, _min, other._min);
		M.vec3_min(aabb._max, _max, other._max);
		return aabb;
	}

	/**
	 * Sets `intersection` to the intersection of `this` and `other`.
	 *
	 * This does not create a new instance of `Aabb`.
	 */
	public inline function getIntersectionTo(other:Aabb, intersection:Aabb):Void {
		M.vec3_max(intersection._min, _min, other._min);
		M.vec3_min(intersection._max, _max, other._max);
	}

	/**
	 * Copies AABB from `aabb` to and returns `this`.
	 */
	public function copyFrom(aabb:Aabb):Aabb {
		M.vec3_assign(_min, aabb._min);
		M.vec3_assign(_max, aabb._max);
		return this;
	}

	/**
	 * Returns a clone of the AABB.
	 */
	public function clone():Aabb {
		var aabb:Aabb = new Aabb();
		M.vec3_assign(aabb._min, _min);
		M.vec3_assign(aabb._max, _max);
		return aabb;
	}

}
