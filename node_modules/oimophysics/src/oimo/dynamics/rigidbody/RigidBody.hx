package oimo.dynamics.rigidbody;

import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.constraint.contact.*;
import oimo.dynamics.constraint.joint.*;
import oimo.m.IMat3;
import oimo.m.IQuat;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A rigid body. To add a rigid body to a physics world, create a `RigidBody`
 * instance, create and add shapes via `RigidBody.addShape`, and add the rigid
 * body to the physics world through `World.addRigidBody`. Rigid bodies have
 * three motion types: dynamic, static, and kinematic. See `RigidBodyType` for
 * details of motion types.
 */
@:build(oimo.m.B.bu())
class RigidBody {
	public var _next:RigidBody;
	public var _prev:RigidBody;

	public var _shapeList:Shape;
	public var _shapeListLast:Shape;
	public var _numShapes:Int;

	public var _vel:IVec3;
	public var _angVel:IVec3;

	public var _pseudoVel:IVec3;
	public var _angPseudoVel:IVec3;

	public var _ptransform:Transform;
	public var _transform:Transform;

	public var _type:Int;

	public var _sleepTime:Float;
	public var _sleeping:Bool;
	public var _autoSleep:Bool;

	public var _mass:Float;
	public var _invMass:Float;
	public var _localInertia:IMat3;
	public var _rotFactor:Vec3;
	public var _invLocalInertia:IMat3;
	public var _invLocalInertiaWithoutRotFactor:IMat3;
	public var _invInertia:IMat3;

	public var _linearDamping:Float;
	public var _angularDamping:Float;

	public var _force:IVec3;
	public var _torque:IVec3;

	public var _linearContactImpulse:IVec3;
	public var _angularContactImpulse:IVec3;

	public var _world:World;

	public var _contactLinkList:ContactLink;
	public var _contactLinkListLast:ContactLink;
	public var _numContactLinks:Int;

	public var _jointLinkList:JointLink;
	public var _jointLinkListLast:JointLink;
	public var _numJointLinks:Int;

	public var _addedToIsland:Bool;
	public var _gravityScale:Float;

	/**
	 * Extra field that users can use for their own purposes.
	 */
	public var userData:Any;

	/**
	 * Creates a new rigid body by configuration `config`.
	 */
	public function new(config:RigidBodyConfig) {
		_next = null;
		_prev = null;

		_shapeList = null;
		_shapeListLast = null;
		_numShapes = 0;

		_contactLinkList = null;
		_contactLinkListLast = null;
		_numContactLinks = 0;

		_jointLinkList = null;
		_jointLinkListLast = null;
		_numJointLinks = 0;

		M.vec3_fromVec3(_vel, config.linearVelocity);
		M.vec3_fromVec3(_angVel, config.angularVelocity);

		M.vec3_zero(_pseudoVel);
		M.vec3_zero(_angPseudoVel);

		_ptransform = new Transform();
		_transform = new Transform();
		M.vec3_fromVec3(_ptransform._position, config.position);
		M.mat3_fromMat3(_ptransform._rotation, config.rotation);
		M.transform_assign(_transform, _ptransform);

		_type = config.type;

		_sleepTime = 0;
		_sleeping = false;
		_autoSleep = config.autoSleep;

		_mass = 0;
		_invMass = 0;
		M.mat3_zero(_localInertia);
		M.mat3_zero(_invLocalInertia);
		M.mat3_zero(_invLocalInertiaWithoutRotFactor);
		M.mat3_zero(_invInertia);

		_linearDamping = config.linearDamping;
		_angularDamping = config.angularDamping;

		M.vec3_zero(_force);
		M.vec3_zero(_torque);

		M.vec3_zero(_linearContactImpulse);
		M.vec3_zero(_angularContactImpulse);

		_rotFactor = new Vec3(1, 1, 1);

		_addedToIsland = false;
		_gravityScale = 1;

		_world = null;
	}

	// --- internal ---

	public function _integrate(dt:Float):Void {
		switch (_type) {
			case RigidBodyType._DYNAMIC, RigidBodyType._KINEMATIC:
				var translation:IVec3;
				var rotation:IVec3;
				M.vec3_scale(translation, _vel, dt);
				M.vec3_scale(rotation, _angVel, dt);

				var translationLengthSq:Float = M.vec3_dot(translation, translation);
				var rotationLengthSq:Float = M.vec3_dot(rotation, rotation);

				if (translationLengthSq == 0 && rotationLengthSq == 0) {
					return; // no need of integration
				}

				// limit linear velocity
				if (translationLengthSq > Setting.maxTranslationPerStep * Setting.maxTranslationPerStep) {
					var l:Float = Setting.maxTranslationPerStep / MathUtil.sqrt(translationLengthSq);
					M.vec3_scale(_vel, _vel, l);
					M.vec3_scale(translation, translation, l);
				}

				// limit angular velocity
				if (rotationLengthSq > Setting.maxRotationPerStep * Setting.maxRotationPerStep) {
					var l:Float = Setting.maxRotationPerStep / MathUtil.sqrt(rotationLengthSq);
					M.vec3_scale(_angVel, _angVel, l);
					M.vec3_scale(rotation, rotation, l);
				}

				// update the transform
				M.call(_applyTranslation(translation));
				M.call(_applyRotation(rotation));

			case RigidBodyType._STATIC:
				M.vec3_zero(_vel);
				M.vec3_zero(_angVel);
				M.vec3_zero(_pseudoVel);
				M.vec3_zero(_angPseudoVel);
		}
	}

	public function _integratePseudoVelocity():Void {
		var pseudoVelLengthSq:Float = M.vec3_dot(_pseudoVel, _pseudoVel);
		var angPseudoVelLengthSq:Float = M.vec3_dot(_angPseudoVel, _angPseudoVel);
		if (pseudoVelLengthSq == 0 && angPseudoVelLengthSq == 0) {
			return; // no need of intgration
		}

		switch (_type) {
			case RigidBodyType._DYNAMIC, RigidBodyType._KINEMATIC:
				var translation:IVec3;
				var rotation:IVec3;
				M.vec3_assign(translation, _pseudoVel);
				M.vec3_assign(rotation, _angPseudoVel);

				// clear pseudo velocity
				M.vec3_zero(_pseudoVel);
				M.vec3_zero(_angPseudoVel);

				// update the transform
				M.call(_applyTranslation(translation));
				M.call(_applyRotation(rotation));
			case RigidBodyType._STATIC:
				M.vec3_zero(_pseudoVel);
				M.vec3_zero(_angPseudoVel);
		}
	}

	extern public inline function _isSleepy():Bool {
		return _autoSleep
			&& M.vec3_dot(_vel, _vel) < Setting.sleepingVelocityThreshold * Setting.sleepingVelocityThreshold
			&& M.vec3_dot(_angVel, _angVel) < Setting.sleepingAngularVelocityThreshold * Setting.sleepingAngularVelocityThreshold;
	}

	extern public inline function _isAlone():Bool {
		return _numContactLinks == 0 && _numJointLinks == 0;
	}

	extern public inline function _applyTranslation(translation:IVec3):Void {
		M.vec3_add(_transform._position, _transform._position, translation);
	}

	extern public inline function _applyRotation(rotation:IVec3):Void {
		// compute derivative of the quaternion
		var theta:Float = M.vec3_length(rotation);
		var halfTheta:Float = theta * 0.5;
		var rotationToSinAxisFactor:Float; // sin(halfTheta) / theta;
		var cosHalfTheta:Float; // cos(halfTheta)
		if (halfTheta < 0.5) {
			// use Maclaurin expansion
			var ht2:Float = halfTheta * halfTheta;
			rotationToSinAxisFactor = (1 / 2) * (1 - ht2 * (1 / 6) + ht2 * ht2 * (1 / 120));
			cosHalfTheta = 1 - ht2 * (1 / 2) + ht2 * ht2 * (1 / 24);
		} else {
			rotationToSinAxisFactor = MathUtil.sin(halfTheta) / theta;
			cosHalfTheta = MathUtil.cos(halfTheta);
		}
		var sinAxis:IVec3;
		M.vec3_scale(sinAxis, rotation, rotationToSinAxisFactor);
		var dq:IQuat;
		M.quat_fromVec3AndFloat(dq, sinAxis, cosHalfTheta);

		// integrate quaternion
		var q:IQuat;
		M.quat_fromMat3(q, _transform._rotation);
		M.quat_mul(q, dq, q);
		M.quat_normalize(q, q);

		// update rotation
		M.mat3_fromQuat(_transform._rotation, q);

		// update inertia tensor
		updateInvInertia();
	}

	// call when added/removed/modified shapes
	extern public inline function _shapeModified():Void {
		updateMass();
		_syncShapes();
	}

	extern public inline function _syncShapes():Void {
		var s:Shape = _shapeList;
		M.list_foreach(s, _next, {
			M.call(s._sync(_ptransform, _transform));
		});
	}

	extern public inline function _applyLinearPositionImpulse(imp:IVec3):Void {
		var translation:IVec3;
		M.vec3_scale(translation, imp, _invMass);
		M.call(_applyTranslation(translation));
	}

	extern public inline function _applyAngularPositionImpulse(imp:IVec3):Void {
		var rotation:IVec3;
		M.vec3_mulMat3(rotation, imp, _invInertia);
		M.call(_applyRotation(rotation));
	}

	// --- private ---

	function updateMass():Void {
		var totalInertia:IMat3;
		var totalMass:Float;
		M.mat3_zero(totalInertia);
		totalMass = 0;

		var s:Shape = _shapeList;
		M.list_foreach(s, _next, {
			var g:Geometry = s._geom;
			g._updateMass();

			var mass:Float = s._density * g._volume;
			var inertia:IMat3;

			// I_transformed = (R * I_localCoeff * R^T) * mass
			M.mat3_transformInertia(inertia, g._inertiaCoeff, s._localTransform._rotation);
			M.mat3_scale(inertia, inertia, mass);

			// I_cog = |  y*y+z*z  -x*y      -x*z     |
			//         | -x*y       x*x+z*z  -y*z     | * mass
			//         | -x*z      -y*z       x*x+y*y |
			// I = I_transformed + I_cog
			var cogInertia:IMat3;
			M.mat3_inertiaFromCOG(cogInertia, s._localTransform._position);
			M.mat3_addRhsScaled(inertia, inertia, cogInertia, mass);

			// add mass data
			totalMass += mass;
			M.mat3_add(totalInertia, totalInertia, inertia);
		});

		_mass = totalMass;
		M.mat3_assign(_localInertia, totalInertia);

		completeMassData();

		// wake up the rigid body
		wakeUp();
	}

	// compute inverse mass and inertias from _mass and _localInertia
	extern inline function completeMassData():Void {
		var det:Float;
		det = M.mat3_det(_localInertia);
		if (_mass > 0 && det > 0 && _type == RigidBodyType._DYNAMIC) {
			_invMass = 1 / _mass;
			M.mat3_inv(_invLocalInertia, _localInertia);
			M.mat3_assign(_invLocalInertiaWithoutRotFactor, _invLocalInertia);
			M.mat3_scaleRows(_invLocalInertia, _invLocalInertiaWithoutRotFactor, _rotFactor.x, _rotFactor.y, _rotFactor.z);
		} else {
			// set mass and inertia zero
			_invMass = 0;
			M.mat3_zero(_invLocalInertia);
			M.mat3_zero(_invLocalInertiaWithoutRotFactor);

			// force static
			if (_type == RigidBodyType._DYNAMIC) {
				_type = RigidBodyType._STATIC;
			}
		}
		updateInvInertia();
	}

	extern inline function updateInvInertia():Void {
		M.mat3_transformInertia(_invInertia, _invLocalInertia, _transform._rotation);
		M.mat3_scaleRows(_invInertia, _invInertia, _rotFactor.x, _rotFactor.y, _rotFactor.z);
	}

	// call when the transform is externally updated
	extern inline function updateTransformExt():Void {
		M.transform_assign(_ptransform, _transform);
		_syncShapes();
		wakeUp();
	}

	// --- public ---

	/**
	 * Returns the world position of the rigid body.
	 */
	public inline function getPosition():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _transform._position);
		return v;
	}

	/**
	 * Sets `position` to the world position of the rigid body.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getPositionTo(position:Vec3):Void {
		M.vec3_toVec3(position, _transform._position);
	}

	/**
	 * Sets the world position of the rigid body to `position`.
	 */
	public inline function setPosition(position:Vec3):Void {
		M.vec3_fromVec3(_transform._position, position);
		updateTransformExt();
	}

	/**
	 * Translates the position of the rigid body by `translation`.
	 */
	public inline function translate(translation:Vec3):Void {
		var diff:IVec3;
		M.vec3_fromVec3(diff, translation);
		M.vec3_add(_transform._position, _transform._position, diff);
		updateTransformExt();
	}

	/**
	 * Returns the rotation matrix of the rigid body.
	 */
	public inline function getRotation():Mat3 {
		var m:Mat3 = new Mat3();
		M.mat3_toMat3(m, _transform._rotation);
		return m;
	}

	/**
	 * Sets `rotation` to the rotation matrix of the rigid body.
	 *
	 * This does not create a new instance of `Mat3`.
	 */
	public inline function getRotationTo(rotation:Mat3):Void {
		M.mat3_toMat3(rotation, _transform._rotation);
	}

	/**
	 * Sets the rotation matrix of the rigid body to `rotation`.
	 */
	public inline function setRotation(rotation:Mat3):Void {
		M.mat3_fromMat3(_transform._rotation, rotation);

		updateInvInertia();
		updateTransformExt();
	}

	/**
	 * Sets the rotation of the rigid body by Euler angles `eulerAngles` in radians.
	 */
	public inline function setRotationXyz(eulerAngles:Vec3):Void {
		var xyz:IVec3;
		M.vec3_fromVec3(xyz, eulerAngles);
		M.mat3_fromEulerXyz(_transform._rotation, xyz);

		updateInvInertia();
		updateTransformExt();
	}

	/**
	 * Rotates the rigid body by the rotation matrix `rotation`.
	 */
	public inline function rotate(rotation:Mat3):Void {
		var rot:IMat3;
		M.mat3_fromMat3(rot, rotation);
		M.mat3_mul(_transform._rotation, rot, _transform._rotation);

		updateInvInertia();
		updateTransformExt();
	}

	/**
	 * Rotates the rigid body by Euler angles `eulerAngles` in radians.
	 */
	public inline function rotateXyz(eulerAngles:Vec3):Void {
		var xyz:IVec3;
		var rot:IMat3;
		M.vec3_fromVec3(xyz, eulerAngles);
		M.mat3_fromEulerXyz(rot, xyz);
		M.mat3_mul(_transform._rotation, rot, _transform._rotation);

		updateInvInertia();
		updateTransformExt();
	}

	/**
	 * Returns the rotation of the rigid body as a quaternion.
	 */
	public inline function getOrientation():Quat {
		var q:Quat = new Quat();
		var iq:IQuat;
		M.quat_fromMat3(iq, _transform._rotation);
		M.quat_toQuat(q, iq);
		return q;
	}

	/**
	 * Sets `orientation` to the rotation quaternion of the rigid body.
	 *
	 * This does not create a new instance of `Quat`.
	 */
	public inline function getOrientationTo(orientation:Quat):Void {
		var iq:IQuat;
		M.quat_fromMat3(iq, _transform._rotation);
		M.quat_toQuat(orientation, iq);
	}

	/**
	 * Sets the rotation of the rigid body from a quaternion `quaternion`.
	 */
	public inline function setOrientation(quaternion:Quat):Void {
		var q:IQuat;
		M.quat_fromQuat(q, quaternion);
		M.mat3_fromQuat(_transform._rotation, q);

		updateInvInertia();
		updateTransformExt();
	}

	/**
	 * Returns the transform of the rigid body.
	 */
	public inline function getTransform():Transform {
		return _transform.clone();
	}

	/**
	 * Sets `transform` to the transform of the rigid body.
	 *
	 * This does not create a new instance of `Transform`.
	 */
	public inline function getTransformTo(transform:Transform):Void {
		transform.copyFrom(_transform);
	}

	/**
	 * Sets the transform of the rigid body to `transform`.
	 *
	 * This does not keep any references to `transform`.
	 */
	public inline function setTransform(transform:Transform):Void {
		M.vec3_assign(_transform._position, transform._position);
		M.mat3_assign(_transform._rotation, transform._rotation);

		updateInvInertia();
		updateTransformExt();
	}

	/**
	 * Returns the mass of the rigid body.
	 *
	 * If the rigid body has infinite mass, `0` will be returned.
	 */
	public inline function getMass():Float {
		return _mass;
	}

	/**
	 * Returns the moment of inertia tensor in local space.
	 */
	public inline function getLocalInertia():Mat3 {
		var m:Mat3 = new Mat3();
		M.mat3_toMat3(m, _localInertia);
		return m;
	}

	/**
	 * Sets `inertia` to the moment of inertia tensor in local space.
	 *
	 * This does not create a new instance of `Mat3`
	 */
	public inline function getLocalInertiaTo(inertia:Mat3):Void {
		M.mat3_toMat3(inertia, _localInertia);
	}

	/**
	 * Returns the mass data of the rigid body.
	 */
	public inline function getMassData():MassData {
		var md:MassData = new MassData();
		md.mass = _mass;
		M.mat3_toMat3(md.localInertia, _localInertia);
		return md;
	}

	/**
	 * Sets `massData` to the mass data of the rigid body.
	 *
	 * This does not create a new instance of `MassData`.
	 */
	public inline function getMassDataTo(massData:MassData):Void {
		massData.mass = _mass;
		M.mat3_toMat3(massData.localInertia, _localInertia);
	}

	/**
	 * Sets the mass and moment of inertia of the rigid body by the mass data `massData`.
	 * The properties set by this will be overwritten when
	 *
	 * - some shapes are added or removed
	 * - the type of the rigid body is changed
	 */
	public inline function setMassData(massData:MassData):Void {
		_mass = massData.mass;
		M.mat3_fromMat3(_localInertia, massData.localInertia);
		completeMassData();
		wakeUp();
	}

	/**
	 * Returns the rotation factor of the rigid body.
	 */
	public inline function getRotationFactor():Vec3 {
		return _rotFactor.clone();
	}

	/**
	 * Sets the rotation factor of the rigid body to `rotationFactor`.
	 *
	 * This changes moment of inertia internally, so that the change of
	 * angular velocity in **global space** along X, Y and Z axis will scale by `rotationFactor.x`,
	 * `rotationFactor.y` and `rotationFactor.z` times respectively.
	 */
	public inline function setRotationFactor(rotationFactor:Vec3):Void {
		_rotFactor.copyFrom(rotationFactor);

		updateInvInertia();
		wakeUp();
	}

	/**
	 * Returns the linear velocity of the rigid body.
	 */
	public inline function getLinearVelocity():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _vel);
		return v;
	}

	/**
	 * Sets `linearVelocity` to the linear velocity of the rigid body.
	 *
	 * This does not create a new intrance of `Vec3`.
	 */
	public inline function getLinearVelocityTo(linearVelocity:Vec3):Void {
		M.vec3_toVec3(linearVelocity, _vel);
	}

	/**
	 * Sets the linear velocity of the rigid body.
	 */
	public inline function setLinearVelocity(linearVelocity:Vec3):Void {
		if (_type == RigidBodyType._STATIC) {
			M.vec3_zero(_vel);
		} else {
			M.vec3_fromVec3(_vel, linearVelocity);
		}
		wakeUp();
	}

	/**
	 * Returns the angular velocity of the rigid body.
	 */
	public inline function getAngularVelocity():Vec3 {
		var v:Vec3 = new Vec3();
		M.vec3_toVec3(v, _angVel);
		return v;
	}

	/**
	 * Sets `angularVelocity` to the angular velocity of the rigid body.
	 *
	 * This does not create a new intrance of `Vec3`.
	 */
	public inline function getAngularVelocityTo(angularVelocity:Vec3):Void {
		M.vec3_toVec3(angularVelocity, _vel);
	}

	/**
	 * Sets the angular velocity of the rigid body.
	 */
	public inline function setAngularVelocity(angularVelocity:Vec3):Void {
		if (_type == RigidBodyType._STATIC) {
			M.vec3_zero(_angVel);
		} else {
			M.vec3_fromVec3(_angVel, angularVelocity);
		}
		wakeUp();
	}

	/**
	 * Adds `linearVelocityChange` to the linear velcity of the rigid body.
	 */
	public inline function addLinearVelocity(linearVelocityChange:Vec3):Void {
		if (_type != RigidBodyType._STATIC) {
			var d:IVec3;
			M.vec3_fromVec3(d, linearVelocityChange);
			M.vec3_add(_vel, _vel, d);
		}
		wakeUp();
	}

	/**
	 * Adds `angularVelocityChange` to the angular velcity of the rigid body.
	 */
	public inline function addAngularVelocity(angularVelocityChange:Vec3):Void {
		if (_type != RigidBodyType._STATIC) {
			var d:IVec3;
			M.vec3_fromVec3(d, angularVelocityChange);
			M.vec3_add(_angVel, _angVel, d);
		}
		wakeUp();
	}

	/**
	 * Applies the impulse `impulse` to the rigid body at `positionInWorld` in world position.
	 *
	 * This changes both the linear velocity and the angular velocity.
	 */
	public function applyImpulse(impulse:Vec3, positionInWorld:Vec3):Void {
		// linear
		var imp:IVec3;
		M.vec3_fromVec3(imp, impulse);
		M.vec3_addRhsScaled(_vel, _vel, imp, _invMass);

		// angular
		var aimp:IVec3;
		var pos:IVec3;
		M.vec3_fromVec3(pos, positionInWorld);
		M.vec3_sub(pos, pos, _transform._position);
		M.vec3_cross(aimp, pos, imp);
		M.vec3_mulMat3(aimp, aimp, _invInertia);
		M.vec3_add(_angVel, _angVel, aimp);

		wakeUp();
	}

	/**
	 * Applies the linear impulse `impulse` to the rigid body.
	 *
	 * This does not change the angular velocity.
	 */
	public function applyLinearImpulse(impulse:Vec3):Void {
		var imp:IVec3;
		M.vec3_fromVec3(imp, impulse);
		M.vec3_addRhsScaled(_vel, _vel, imp, _invMass);
		wakeUp();
	}

	/**
	 * Applies the angular impulse `impulse` to the rigid body.
	 *
	 * This does not change the linear velocity.
	 */
	public function applyAngularImpulse(impulse:Vec3):Void {
		var imp:IVec3;
		M.vec3_fromVec3(imp, impulse);
		M.vec3_mulMat3(imp, imp, _invInertia);
		M.vec3_add(_angVel, _angVel, imp);
		wakeUp();
	}

	/**
	 * Applies the force `force` to `positionInWorld` in world position.
	 */
	public function applyForce(force:Vec3, positionInWorld:Vec3):Void {
		// linear
		var iforce:IVec3;
		M.vec3_fromVec3(iforce, force);
		M.vec3_add(_force, _force, iforce);

		// angular
		var itorque:IVec3;
		var pos:IVec3;
		M.vec3_fromVec3(pos, positionInWorld);
		M.vec3_sub(pos, pos, _transform._position);
		M.vec3_cross(itorque, pos, iforce);
		M.vec3_add(_torque, _torque, itorque);

		wakeUp();
	}

	/**
	 * Applies the force `force` to the center of mass.
	 */
	public function applyForceToCenter(force:Vec3):Void {
		// linear
		var iforce:IVec3;
		M.vec3_fromVec3(iforce, force);
		M.vec3_add(_force, _force, iforce);

		wakeUp();
	}

	/**
	 * Applies the torque `torque`.
	 */
	public function applyTorque(torque:Vec3):Void {
		// angular
		var itorque:IVec3;
		M.vec3_fromVec3(itorque, torque);
		M.vec3_add(_torque, _torque, itorque);

		wakeUp();
	}

	/**
	 * Returns the total linear impulse applied by contact constraints.
	 */
	public inline function getLinearContactImpulse():Vec3 {
		var res:Vec3 = new Vec3();
		M.vec3_toVec3(res, _linearContactImpulse);
		return res;
	}

	/**
	 * Sets `linearContactImpulse` to the total linear impulse applied by contact constraints.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getLinearContactImpulseTo(linearContactImpulse:Vec3):Void {
		M.vec3_toVec3(linearContactImpulse, _linearContactImpulse);
	}

	/**
	 * Returns the total angular impulse applied by contact constraints.
	 */
	public inline function getAngularContactImpulse():Vec3 {
		var res:Vec3 = new Vec3();
		M.vec3_toVec3(res, _angularContactImpulse);
		return res;
	}

	/**
	 * Sets `angularContactImpulse` to the total angular impulse applied by contact constraints.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getAngularContactImpulseTo(angularContactImpulse:Vec3):Void {
		M.vec3_toVec3(angularContactImpulse, _angularContactImpulse);
	}

	/**
	 * Returns the gravity scaling factor of the rigid body.
	 */
	public inline function getGravityScale():Float {
		return _gravityScale;
	}

	/**
	 * Sets the gravity scaling factor of the rigid body to `gravityScale`.
	 *
	 * If `0` is set, the rigid body will not be affected by gravity.
	 */
	public inline function setGravityScale(gravityScale:Float):Void {
		_gravityScale = gravityScale;
		wakeUp();
	}

	/**
	 * Returns the local coordinates of the point `worldPoint` in world coodinates.
	 */
	public inline function getLocalPoint(worldPoint:Vec3):Vec3 {
		var v:IVec3;
		M.vec3_fromVec3(v, worldPoint);
		M.vec3_sub(v, v, _transform._position);
		M.vec3_mulMat3Transposed(v, v, _transform._rotation);
		var res:Vec3 = new Vec3();
		M.vec3_toVec3(res, v);
		return res;
	}

	/**
	 * Sets `localPoint` to the local coordinates of the point `worldPoint` in world coodinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getLocalPointTo(worldPoint:Vec3, localPoint:Vec3):Void {
		var v:IVec3;
		M.vec3_fromVec3(v, worldPoint);
		M.vec3_sub(v, v, _transform._position);
		M.vec3_mulMat3Transposed(v, v, _transform._rotation);
		M.vec3_toVec3(localPoint, v);
	}

	/**
	 * Returns the local coordinates of the vector `worldVector` in world coodinates.
	 */
	public inline function getLocalVector(worldVector:Vec3):Vec3 {
		var v:IVec3;
		M.vec3_fromVec3(v, worldVector);
		M.vec3_mulMat3Transposed(v, v, _transform._rotation);
		var res:Vec3 = new Vec3();
		M.vec3_toVec3(res, v);
		return res;
	}

	/**
	 * Sets `localVector` to the local coordinates of the vector `worldVector` in world coodinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getLocalVectorTo(worldVector:Vec3, localVector:Vec3):Void {
		var v:IVec3;
		M.vec3_fromVec3(v, worldVector);
		M.vec3_mulMat3Transposed(v, v, _transform._rotation);
		M.vec3_toVec3(localVector, v);
	}

	/**
	 * Returns the world coordinates of the point `localPoint` in local coodinates.
	 */
	public inline function getWorldPoint(localPoint:Vec3):Vec3 {
		var v:IVec3;
		M.vec3_fromVec3(v, localPoint);
		M.vec3_mulMat3(v, v, _transform._rotation);
		M.vec3_add(v, v, _transform._position);
		var res:Vec3 = new Vec3();
		M.vec3_toVec3(res, v);
		return res;
	}

	/**
	 * Sets `worldPoint` to the world coordinates of the point `localPoint` in local coodinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getWorldPointTo(localPoint:Vec3, worldPoint:Vec3):Void {
		var v:IVec3;
		M.vec3_fromVec3(v, localPoint);
		M.vec3_mulMat3(v, v, _transform._rotation);
		M.vec3_add(v, v, _transform._position);
		M.vec3_toVec3(worldPoint, v);
	}

	/**
	 * Returns the world coordinates of the vector `localVector` in local coodinates.
	 */
	public inline function getWorldVector(localVector:Vec3):Vec3 {
		var v:IVec3;
		M.vec3_fromVec3(v, localVector);
		M.vec3_mulMat3(v, v, _transform._rotation);
		var res:Vec3 = new Vec3();
		M.vec3_toVec3(res, v);
		return res;
	}

	/**
	 * Sets `worldVector` to the world coordinates of the vector `localVector` in local coodinates.
	 *
	 * This does not create a new instance of `Vec3`.
	 */
	public inline function getWorldVectorTo(localVector:Vec3, worldVector:Vec3):Void {
		var v:IVec3;
		M.vec3_fromVec3(v, localVector);
		M.vec3_mulMat3(v, v, _transform._rotation);
		M.vec3_toVec3(worldVector, v);
	}

	/**
	 * Returns the number of the shapes added.
	 */
	public inline function getNumShapes():Int {
		return _numShapes;
	}

	/**
	 * Returns the list of the shapes of the rigid body.
	 */
	public inline function getShapeList():Shape {
		return _shapeList;
	}

	/**
	 * Returns the number of the contact lists the rigid body is involved.
	 */
	public inline function getNumContactLinks():Int {
		return _numContactLinks;
	}

	/**
	 * Returns the list of the contact links the rigid body is involved.
	 */
	public inline function getContactLinkList():ContactLink {
		return _contactLinkList;
	}

	/**
	 * Returns the number of the joint links the rigid body is attached.
	 */
	public inline function getNumJointLinks():Int {
		return _numJointLinks;
	}

	/**
	 * Returns the list of the joint links the rigid body is attached.
	 */
	public inline function getJointLinkList():JointLink {
		return _jointLinkList;
	}

	/**
	 * Adds the shape to the rigid body.
	 */
	public function addShape(shape:Shape):Void {
		// first, add the shape to the linked list so that it will be considered
		M.list_push(_shapeList, _shapeListLast, _prev, _next, shape);
		_numShapes++;
		shape._rigidBody = this;

		// then add the shape to the world
		if (_world != null) {
			_world._addShape(shape);
		}

		_shapeModified();
	}

	/**
	 * Removes the shape from the rigid body.
	 */
	public function removeShape(shape:Shape):Void {
		// first, remove the shape from the linked list so that it will be ignored
		M.list_remove(_shapeList, _shapeListLast, _prev, _next, shape);
		_numShapes--;
		shape._rigidBody = null;

		// then remove the shape from the world
		if (_world != null) {
			_world._removeShape(shape);
		}

		_shapeModified();
	}

	/**
	 * Returns the rigid body's type of behaviour.
	 *
	 * See `RigidBodyType` class for details.
	 */
	public inline function getType():Int {
		return _type;
	}

	/**
	 * Sets the rigid body's type of behaviour.
	 *
	 * See `RigidBodyType` class for details.
	 */
	public function setType(type:Int):Void {
		_type = type;
		updateMass();
	}

	/**
	 * Sets the rigid body's sleep flag false.
	 *
	 * This also resets the sleeping timer of the rigid body.
	 */
	public inline function wakeUp():Void {
		_sleeping = false;
		_sleepTime = 0;
	}

	/**
	 * Sets the rigid body's sleep flag true.
	 *
	 * This also resets the sleeping timer of the rigid body.
	 */
	public inline function sleep():Void {
		_sleeping = true;
		_sleepTime = 0;
	}

	/**
	 * Returns whether the rigid body is sleeping.
	 */
	public inline function isSleeping():Bool {
		return _sleeping;
	}

	/**
	 * Returns how long the rigid body is stopping moving. This returns `0` if the body
	 * has already slept.
	 */
	public inline function getSleepTime():Float {
		return _sleepTime;
	}

	/**
	 * Sets the rigid body's auto sleep flag.
	 *
	 * If auto sleep is enabled, the rigid body will automatically sleep when needed.
	 */
	public inline function setAutoSleep(autoSleepEnabled:Bool):Void {
		_autoSleep = autoSleepEnabled;
		wakeUp();
	}

	/**
	 * Returns the linear damping.
	 */
	public inline function getLinearDamping():Float {
		return _linearDamping;
	}

	/**
	 * Sets the linear damping to `damping`.
	 */
	public inline function setLinearDamping(damping:Float):Void {
		_linearDamping = damping;
	}

	/**
	 * Returns the angular damping.
	 */
	public inline function getAngularDamping():Float {
		return _angularDamping;
	}

	/**
	 * Sets the angular damping to `damping`.
	 */
	public inline function setAngularDamping(damping:Float):Void {
		_angularDamping = damping;
	}

	/**
	 * Returns the previous rigid body in the world.
	 *
	 * If the previous one does not exist, `null` will be returned.
	 */
	public inline function getPrev():RigidBody {
		return _prev;
	}

	/**
	 * Returns the next rigid body in the world.
	 *
	 * If the next one does not exist, `null` will be returned.
	 */
	public inline function getNext():RigidBody {
		return _next;
	}
}
