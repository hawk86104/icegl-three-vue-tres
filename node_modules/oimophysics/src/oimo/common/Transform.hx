package oimo.common;
import oimo.m.IMat3;
import oimo.m.IQuat;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.Mat3;
import oimo.common.Quat;
import oimo.common.Vec3;

/**
 * Transform class provides a set of translation and rotation.
 */
#if !macro
@:build(oimo.m.B.bu())
#end
class Transform {
	public var _position:IVec3;
	public var _rotation:IMat3;

	/**
	 * Creates a new identical transform.
	 */
	public function new() {
		M.vec3_zero(_position);
		M.mat3_id(_rotation);
	}

	/**
	 * Sets the transformation to identity and returns `this`.
	 */
	public inline function identity():Transform {
		M.vec3_zero(_position);
		M.mat3_id(_rotation);
		return this;
	}

	/**
	 * Returns the position of the transformation.
	 */
	public inline function getPosition():Vec3 {
		var position:Vec3 = new Vec3();
		M.vec3_toVec3(position, _position);
		return position;
	}

	/**
	 * Sets `position` to the position of the transformation.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getPositionTo(position:Vec3):Void {
		M.vec3_toVec3(position, _position);
	}

	/**
	 * Sets the position of the transformation to `position` and returns `this`.
	 */
	public inline function setPosition(position:Vec3):Transform {
		M.vec3_fromVec3(_position, position);
		return this;
	}

	/**
	 * Translates the position by `translation`.
	 */
	public inline function translate(translation:Vec3):Void {
		var diff:IVec3;
		M.vec3_fromVec3(diff, translation);
		M.vec3_add(_position, _position, diff);
	}

	/**
	 * Returns the rotation matrix.
	 */
	public inline function getRotation():Mat3 {
		var rotation:Mat3 = new Mat3();
		M.mat3_toMat3(rotation, _rotation);
		return rotation;
	}

	/**
	 * Sets `out` to the rotation matrix.
	 *
	 * This does not create a new instance of `Mat3`.
	 */
	public inline function getRotationTo(out:Mat3):Void {
		M.mat3_toMat3(out, _rotation);
	}

	/**
	 * Sets the rotation matrix to `rotation` and returns `this`.
	 */
	public inline function setRotation(rotation:Mat3):Transform {
		M.mat3_fromMat3(_rotation, rotation);
		return this;
	}

	/**
	 * Sets the rotation by Euler angles `eulerAngles` in radians.
	 */
	public inline function setRotationXyz(eulerAngles:Vec3):Void {
		var xyz:IVec3;
		M.vec3_fromVec3(xyz, eulerAngles);
		M.mat3_fromEulerXyz(_rotation, xyz);
	}

	/**
	 * Applies rotation by the rotation matrix `rotation`.
	 */
	public inline function rotate(rotation:Mat3):Void {
		var rot:IMat3;
		M.mat3_fromMat3(rot, rotation);
		M.mat3_mul(_rotation, rot, _rotation);
	}

	/**
	 * Applies the rotation by Euler angles `eulerAngles` in radians.
	 */
	public inline function rotateXyz(eulerAngles:Vec3):Void {
		var xyz:IVec3;
		var rot:IMat3;
		M.vec3_fromVec3(xyz, eulerAngles);
		M.mat3_fromEulerXyz(rot, xyz);
		M.mat3_mul(_rotation, rot, _rotation);
	}

	/**
	 * Returns the rotation as a quaternion.
	 */
	public inline function getOrientation():Quat {
		var q:Quat = new Quat();
		var iq:IQuat;
		M.quat_fromMat3(iq, _rotation);
		M.quat_toQuat(q, iq);
		return q;
	}

	/**
	 * Sets `orientation` to the quaternion representing the rotation.
	 *
	 * This does not create a new instance of `Quat`.
	 */
	public inline function getOrientationTo(orientation:Quat):Void {
		var iq:IQuat;
		M.quat_fromMat3(iq, _rotation);
		M.quat_toQuat(orientation, iq);
	}

	/**
	 * Sets the rotation from a quaternion `quaternion` and returns `this`.
	 */
	public inline function setOrientation(quaternion:Quat):Transform {
		var q:IQuat;
		M.quat_fromQuat(q, quaternion);
		M.mat3_fromQuat(_rotation, q);
		return this;
	}

	/**
	 * Returns a clone of the transformation.
	 */
	public inline function clone():Transform {
		var tf = new Transform();
		M.vec3_assign(tf._position, _position);
		M.mat3_assign(tf._rotation, _rotation);
		return tf;
	}

	/**
	 * Sets the transformation to `transform` and returns `this`.
	 */
	public inline function copyFrom(transform:Transform):Transform {
		M.vec3_assign(_position, transform._position);
		M.mat3_assign(_rotation, transform._rotation);
		return this;
	}

}

