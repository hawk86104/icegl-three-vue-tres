package oimo.dynamics.rigidbody;
import oimo.collision.*;
import oimo.collision.broadphase.*;
import oimo.collision.geometry.*;
import oimo.common.Transform;
import oimo.common.Vec3;
import oimo.dynamics.callback.ContactCallback;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A shape is a component of a rigid body. It attaches a collision geometry to the parent rigid body
 * with some physical properties such as coefficients of friction and restitution. The collision
 * geometry can locally be transformed relative to the parent rigid body's center of gravity.
 */
@:build(oimo.m.B.bu())
class Shape {
	public var _id:Int;

	public var _prev:Shape;
	public var _next:Shape;
	public var _rigidBody:RigidBody;
	public var _geom:Geometry;

	public var _localTransform:Transform;
	public var _ptransform:Transform;
	public var _transform:Transform;

	public var _restitution:Float;
	public var _friction:Float;
	public var _density:Float;

	public var _aabb:Aabb;

	public var _proxy:Proxy;

	public var _collisionGroup:Int;
	public var _collisionMask:Int;

	public var _contactCallback:ContactCallback;

	var displacement:Vec3;

	/**
	 * Extra field that users can use for their own purposes.
	 */
	public var userData:Any;

	/**
	 * Creates a new shape by configuration `config`.
	 */
	public function new(config:ShapeConfig) {
		_id = -1;

		_localTransform = new Transform();
		_ptransform = new Transform();
		_transform = new Transform();

		M.vec3_fromVec3(_localTransform._position, config.position);
		M.mat3_fromMat3(_localTransform._rotation, config.rotation);
		M.transform_assign(_ptransform, _localTransform);
		M.transform_assign(_transform, _localTransform);
		_restitution = config.restitution;
		_friction = config.friction;
		_density = config.density;
		_geom = config.geometry;
		_collisionGroup = config.collisionGroup;
		_collisionMask = config.collisionMask;
		_contactCallback = config.contactCallback;

		_aabb = new Aabb();

		_proxy = null;
		displacement = new Vec3();
	}

	// --- internal ---

	extern public inline function _sync(tf1:Transform, tf2:Transform):Void {
		M.transform_mul(_ptransform, _localTransform, tf1);
		M.transform_mul(_transform, _localTransform, tf2);

		var min:IVec3;
		var max:IVec3;

		M.call(_geom._computeAabb(_aabb, _ptransform));
		M.vec3_assign(min, _aabb._min);
		M.vec3_assign(max, _aabb._max);

		M.call(_geom._computeAabb(_aabb, _transform));
		M.vec3_min(_aabb._min, min, _aabb._min);
		M.vec3_max(_aabb._max, max, _aabb._max);

		if (_proxy != null) {
			var d:IVec3;
			M.vec3_sub(d, _transform._position, _ptransform._position);
			M.vec3_toVec3(displacement, d);
			_rigidBody._world._broadPhase.moveProxy(_proxy, _aabb, displacement);
		}
	}

	// --- public ---

	/**
	 * Returns the coefficient of friction.
	 */
	public inline function getFriction():Float {
		return _friction;
	}

	/**
	 * Sets the coefficient of friction to `friction`.
	 */
	public inline function setFriction(friction:Float):Void {
		_friction = friction;
	}

	/**
	 * Returns the coefficient of restitution.
	 */
	public inline function getRestitution():Float {
		return _restitution;
	}

	/**
	 * Sets the coefficient of restitution to `restitution`.
	 */
	public inline function setRestitution(restitution:Float):Void {
		_restitution = restitution;
	}

	/**
	 * Returns the transform of the shape relative to the parent rigid body's transform.
	 */
	public inline function getLocalTransform():Transform {
		return _localTransform.clone();
	}

	/**
	 * Sets `transform` to the transform of the shape relative to the parent rigid body's
	 * transform.
	 *
	 * This does not create a new instance of `Transform`.
	 */
	public inline function getLocalTransformTo(transform:Transform):Void {
		transform.copyFrom(_localTransform);
	}

	/**
	 * Returns the world transform of the shape.
	 */
	public inline function getTransform():Transform {
		return _transform.clone();
	}

	/**
	 * Sets `transform` to the world transform of the shape.
	 *
	 * This does not create a new instance of `Transform`.
	 */
	public inline function getTransformTo(transform:Transform):Void {
		transform.copyFrom(_transform);
	}

	/**
	 * Sets the shape's transform to `transform` relative to the parent rigid body's transform.
	 *
	 * This affects the parent rigid body's mass data.
	 */
	public inline function setLocalTransform(transform:Transform):Void {
		_localTransform.copyFrom(transform);
		if (_rigidBody != null) {
			_rigidBody._shapeModified();
		}
	}

	/**
	 * Returns the density of the shape.
	 */
	public inline function getDensity():Float {
		return _density;
	}

	/**
	 * Sets the density of the shape to `density`.
	 *
	 * This affects the parent rigid body's mass data.
	 */
	public inline function setDensity(density:Float):Void {
		_density = density;
		if (_rigidBody != null) {
			_rigidBody._shapeModified();
		}
	}

	/**
	 * Returns the AABB of the shape. The AABB may be incorrect if the shape doesn't have a
	 * parent rigid body.
	 */
	public inline function getAabb():Aabb {
		return _aabb.clone();
	}

	/**
	 * Sets `aabb` to the AABB of the shape. The AABB may be incorrect if the shape doesn't have a
	 * parent rigid body.
	 *
	 * This does not create a new instance of `AABB`.
	 */
	public inline function getAabbTo(aabb:Aabb):Void {
		aabb.copyFrom(_aabb);
	}

	/**
	 * Returns the colision geometry of the shape.
	 */
	public inline function getGeometry():Geometry {
		return _geom;
	}

	/**
	 * Returns the parent rigid body. This returns `null` if the shape doesn't have a parent
	 * rigid body.
	 */
	public inline function getRigidBody():RigidBody {
		return _rigidBody;
	}

	/**
	 * Returns the collision group bits the shape belongs to.
	 */
	public inline function getCollisionGroup():Int {
		return _collisionGroup;
	}

	/**
	 * Sets the shape's collision group bits to `collisionGroup`.
	 */
	public inline function setCollisionGroup(collisionGroup:Int):Void {
		_collisionGroup = collisionGroup;
	}

	/**
	 * Returns the collision mask bits of the shape.
	 */
	public inline function getCollisionMask():Int {
		return _collisionMask;
	}

	/**
	 * Sets the shape's collision mask bits to `collisionMask`.
	 */
	public inline function setCollisionMask(collisionMask:Int):Void {
		_collisionMask = collisionMask;
	}

	/**
	 * Returns the contact callback of the shape.
	 */
	public inline function getContactCallback():ContactCallback {
		return _contactCallback;
	}

	/**
	 * Sets the contact callback of the shape to `callback`.
	 */
	public inline function setContactCallback(callback:ContactCallback):Void {
		_contactCallback = callback;
	}

	/**
	 * Returns the previous shape in the rigid body.
	 *
	 * If the previous one does not exist, `null` will be returned.
	 */
	public inline function getPrev():Shape {
		return _prev;
	}

	/**
	 * Returns the next shape in the rigid body.
	 *
	 * If the next one does not exist, `null` will be returned.
	 */
	public inline function getNext():Shape {
		return _next;
	}

}
