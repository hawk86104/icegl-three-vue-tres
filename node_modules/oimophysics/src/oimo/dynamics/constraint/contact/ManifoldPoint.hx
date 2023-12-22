package oimo.dynamics.constraint.contact;
import oimo.collision.narrowphase.DetectorResultPoint;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Vec3;
import oimo.collision.narrowphase.*;
import oimo.common.Transform;

/**
 * A manifold point is a contact point in a contact manifold. This holds detailed collision
 * data (position, overlap depth, impulse, etc...) for collision response.
 */
@:build(oimo.m.B.bu())
class ManifoldPoint {
	// manifold point relative to rigid bodies. NOT SHAPES.
	public var _localPos1:IVec3;
	public var _localPos2:IVec3;

	// local position with rotation
	public var _relPos1:IVec3;
	public var _relPos2:IVec3;

	// world position
	public var _pos1:IVec3;
	public var _pos2:IVec3;
	public var _depth:Float;

	public var _impulse:ContactImpulse;

	public var _warmStarted:Bool;

	// manifold points can be disabled for some reasons (separated, etc...)
	public var _disabled:Bool;

	public var _id:Int;

	@:dox(hide)
	public function new() {
		M.vec3_zero(_localPos1);
		M.vec3_zero(_localPos2);
		M.vec3_zero(_relPos1);
		M.vec3_zero(_relPos2);
		M.vec3_zero(_pos1);
		M.vec3_zero(_pos2);
		_depth = 0;

		_impulse = new ContactImpulse();

		_warmStarted = false;
		_disabled = false;
		_id = -1;
	}

	// --- internal ---

	extern public inline function _clear():Void {
		M.vec3_zero(_localPos1);
		M.vec3_zero(_localPos2);
		M.vec3_zero(_relPos1);
		M.vec3_zero(_relPos2);
		M.vec3_zero(_pos1);
		M.vec3_zero(_pos2);
		_depth = 0;
		_impulse.clear();
		_warmStarted = false;
		_disabled = false;
		_id = -1;
	}

	extern public inline function _initialize(result:DetectorResultPoint, tf1:Transform, tf2:Transform):Void {
		// world position
		M.vec3_fromVec3(_pos1, result.position1);
		M.vec3_fromVec3(_pos2, result.position2);

		// local position with rotation
		M.vec3_sub(_relPos1, _pos1, tf1._position);
		M.vec3_sub(_relPos2, _pos2, tf2._position);

		// local position
		M.vec3_mulMat3Transposed(_localPos1, _relPos1, tf1._rotation);
		M.vec3_mulMat3Transposed(_localPos2, _relPos2, tf2._rotation);

		_depth = result.depth;

		_impulse.clear();

		_id = result.id;
		_warmStarted = false;
		_disabled = false;
	}

	extern public inline function _updateDepthAndPositions(result:DetectorResultPoint, tf1:Transform, tf2:Transform):Void {
		// world position
		M.vec3_fromVec3(_pos1, result.position1);
		M.vec3_fromVec3(_pos2, result.position2);

		// local position with rotation
		M.vec3_sub(_relPos1, _pos1, tf1._position);
		M.vec3_sub(_relPos2, _pos2, tf2._position);

		// local position
		M.vec3_mulMat3Transposed(_localPos1, _relPos1, tf1._rotation);
		M.vec3_mulMat3Transposed(_localPos2, _relPos2, tf2._rotation);

		_depth = result.depth;
	}

	extern public inline function _copyFrom(cp:ManifoldPoint):Void {
		M.vec3_assign(_localPos1, cp._localPos1);
		M.vec3_assign(_localPos2, cp._localPos2);
		M.vec3_assign(_relPos1, cp._relPos1);
		M.vec3_assign(_relPos2, cp._relPos2);
		M.vec3_assign(_pos1, cp._pos1);
		M.vec3_assign(_pos2, cp._pos2);
		_depth = cp._depth;
		_impulse.copyFrom(cp._impulse);
		_id = cp._id;
		_warmStarted = cp._warmStarted;
		_disabled = false;
	}

	// --- public ---

	/**
	 * Returns the first rigid body's manifold point in world coordinate.
	 */
	public inline function getPosition1():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _pos1);
		return v;
	}

	/**
	 * Sets `position` to the first rigid body's manifold point in world coordinate.
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getPosition1To(position:Vec3):Void {
		M.vec3_toVec3(position, _pos1);
	}

	/**
	 * Returns the second rigid body's manifold point in world coordinate.
	 */
	public inline function getPosition2():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _pos2);
		return v;
	}

	/**
	 * Sets `position` to the second rigid body's manifold point in world coordinate.
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getPosition2To(position:Vec3):Void {
		M.vec3_toVec3(position, _pos2);
	}

	/**
	 * Returns the amount of the overlap. If the manifold point is separate, a negative
	 * value is returned.
	 */
	public inline function getDepth():Float {
		return _depth;
	}

	/**
	 * Returns whether the manifold point has existed for more than two steps.
	 */
	public inline function isWarmStarted():Bool {
		return _warmStarted;
	}

	/**
	 * Returns the normal impulse of the manifold point.
	 */
	public inline function getNormalImpulse():Float {
		return _impulse.impulseN;
	}

	/**
	 * Returns the tangent impulse of the manifold point.
	 */
	public inline function getTangentImpulse():Float {
		return _impulse.impulseT;
	}

	/**
	 * Returns the binormal impulse of the manifold point.
	 */
	public inline function getBinormalImpulse():Float {
		return _impulse.impulseB;
	}

	/**
	 * Returns whether the manifold point is enabled.
	 */
	public inline function isEnabled():Bool {
		return !_disabled;
	}

}
