/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/physics/OimoPhysics.js by VBT-YTokan
 * Based on https://github.com/lo-th/phy
 */

import { Group, Matrix4, Vector3 } from 'three';

import { oimo } from 'oimophysics';

// Dynamics
export const World = oimo.dynamics.World;
export const RigidBodyType = oimo.dynamics.rigidbody.RigidBodyType;
export const RigidBodyConfig = oimo.dynamics.rigidbody.RigidBodyConfig;
export const RigidBody = oimo.dynamics.rigidbody.RigidBody;
export const ShapeConfig = oimo.dynamics.rigidbody.ShapeConfig;
export const Shape = oimo.dynamics.rigidbody.Shape;
export const SphericalJointConfig = oimo.dynamics.constraint.joint.SphericalJointConfig;
export const SphericalJoint = oimo.dynamics.constraint.joint.SphericalJoint;
export const RevoluteJointConfig = oimo.dynamics.constraint.joint.RevoluteJointConfig;
export const RevoluteJoint = oimo.dynamics.constraint.joint.RevoluteJoint;
export const CylindricalJointConfig = oimo.dynamics.constraint.joint.CylindricalJointConfig;
export const CylindricalJoint = oimo.dynamics.constraint.joint.CylindricalJoint;
export const PrismaticJointConfig = oimo.dynamics.constraint.joint.PrismaticJointConfig;
export const PrismaticJoint = oimo.dynamics.constraint.joint.PrismaticJoint;
export const UniversalJointConfig = oimo.dynamics.constraint.joint.UniversalJointConfig;
export const UniversalJoint = oimo.dynamics.constraint.joint.UniversalJoint;
export const RagdollJointConfig = oimo.dynamics.constraint.joint.RagdollJointConfig;
export const RagdollJoint = oimo.dynamics.constraint.joint.RagdollJoint;
export const GenericJointConfig = oimo.dynamics.constraint.joint.GenericJointConfig;
export const GenericJoint = oimo.dynamics.constraint.joint.GenericJoint;
export const JointConfig = oimo.dynamics.constraint.joint.JointConfig;
export const Joint = oimo.dynamics.constraint.joint.Joint;
export const SpringDamper = oimo.dynamics.constraint.joint.SpringDamper;
export const TranslationalLimitMotor = oimo.dynamics.constraint.joint.TranslationalLimitMotor;
export const RotationalLimitMotor = oimo.dynamics.constraint.joint.RotationalLimitMotor;

// Common
export const Vec3 = oimo.common.Vec3;
export const Quat = oimo.common.Quat;
export const Mat3 = oimo.common.Mat3;
export const MathUtil = oimo.common.MathUtil;
export const Transform = oimo.common.Transform;
export const Setting = oimo.common.Setting;

// Collision
export const BoxGeometry = oimo.collision.geometry.BoxGeometry;
export const SphereGeometry = oimo.collision.geometry.SphereGeometry;
export const ConeGeometry = oimo.collision.geometry.ConeGeometry;
export const CylinderGeometry = oimo.collision.geometry.CylinderGeometry;
export const CapsuleGeometry = oimo.collision.geometry.CapsuleGeometry;
export const ConvexHullGeometry = oimo.collision.geometry.ConvexHullGeometry;
export const Geometry = oimo.collision.geometry.Geometry;

// Callback
export const RayCastClosest = oimo.dynamics.callback.RayCastClosest;
export const ContactCallback = oimo.dynamics.callback.ContactCallback;

// Defaults
Setting.defaultGJKMargin = 0.0001; // Default 0.05

export class OimoPhysics {
    constructor({
        fps = 60,
        timestep = 1 / fps,
        broadphase = 2,
        gravity = new Vec3(0, -9.81, 0),
        velocityIterations = 10,
        positionIterations = 5
    } = {}) {
        this.timestep = timestep;

        this.world = new World(broadphase, gravity);
        this.world.setNumVelocityIterations(velocityIterations);
        this.world.setNumPositionIterations(positionIterations);

        this.objects = [];
        this.map = new WeakMap();

        this.v = new Vector3();
        this.object = new Group();
        this.matrix = new Matrix4();
    }

    getShape(position, quaternion, scale, geometry, {
        density,
        friction,
        restitution,
        collisionMask,
        collisionGroup
    }) {
        const shapeConfig = new ShapeConfig();

        if (density !== undefined) {
            shapeConfig.density = density;
        }

        if (friction !== undefined) {
            shapeConfig.friction = friction;
        }

        if (restitution !== undefined) {
            shapeConfig.restitution = restitution;
        }

        if (collisionMask !== undefined) {
            shapeConfig.collisionMask = collisionMask;
        }

        if (collisionGroup !== undefined) {
            shapeConfig.collisionGroup = collisionGroup;
        }

        const parameters = geometry.parameters;

        if (geometry.type === 'BoxGeometry') {
            const sx = parameters.width !== undefined ? (parameters.width * scale.x) / 2 : 0.5;
            const sy = parameters.height !== undefined ? (parameters.height * scale.y) / 2 : 0.5;
            const sz = parameters.depth !== undefined ? (parameters.depth * scale.z) / 2 : 0.5;

            shapeConfig.geometry = new BoxGeometry(new Vec3(sx, sy, sz));
        } else if (geometry.type === 'SphereGeometry' || geometry.type === 'IcosahedronGeometry') {
            const radius = parameters.radius !== undefined ? parameters.radius * scale.x : 1;

            shapeConfig.geometry = new SphereGeometry(radius);
        } else if (geometry.type === 'ConeGeometry') {
            const radius = parameters.radius !== undefined ? parameters.radius * scale.x : 1;
            const height = parameters.height !== undefined ? (parameters.height * scale.y) / 2 : 0.5;

            shapeConfig.geometry = new ConeGeometry(radius, height);
        } else if (geometry.type === 'CylinderGeometry') {
            const radius = parameters.radiusTop !== undefined ? parameters.radiusTop * scale.x : 1;
            const height = parameters.height !== undefined ? (parameters.height * scale.y) / 2 : 0.5;

            shapeConfig.geometry = new CylinderGeometry(radius, height);
        } else if (geometry.type === 'CapsuleGeometry') {
            const radius = parameters.radius !== undefined ? parameters.radius * scale.x : 1;
            const height = parameters.length !== undefined ? (parameters.length * scale.y) / 2 : 0.5;

            shapeConfig.geometry = new CapsuleGeometry(radius, height);
        } else {
            const vertices = geometry.getAttribute('position');
            const array = [];

            for (let i = 0; i < vertices.count; i++) {
                const v = new Vec3(
                    vertices.array[i * 3 + 0] * scale.x,
                    vertices.array[i * 3 + 1] * scale.y,
                    vertices.array[i * 3 + 2] * scale.z
                );

                array.push(v);
            }

            shapeConfig.geometry = new ConvexHullGeometry(array);
        }

        if (position) {
            shapeConfig.position.copyFrom(position);
        }

        if (quaternion) {
            shapeConfig.rotation.fromQuat(quaternion);
        }

        return new Shape(shapeConfig);
    }

    getBody(position, quaternion, scale, geometry, {
        density,
        friction,
        restitution,
        collisionMask,
        collisionGroup,
        gravityScale,
        linearVelocity,
        angularVelocity,
        linearDamping,
        angularDamping,
        contactCallback,
        autoSleep,
        kinematic,
        shapes
    }) {
        const bodyConfig = new RigidBodyConfig();

        if (autoSleep !== undefined) {
            bodyConfig.autoSleep = autoSleep;
        }

        if (kinematic) {
            bodyConfig.type = RigidBodyType.KINEMATIC;
        } else if (density === 0) {
            bodyConfig.type = RigidBodyType.STATIC;
        } else {
            bodyConfig.type = RigidBodyType.DYNAMIC;
        }

        const body = new RigidBody(bodyConfig);

        if (shapes !== undefined) {
            for (let i = 0; i < shapes.length; i++) {
                const { position, quaternion, scale, geometry } = shapes[i];

                body.addShape(this.getShape(position, quaternion, scale, geometry, {
                    density,
                    friction,
                    restitution,
                    collisionMask,
                    collisionGroup
                }));
            }
        } else {
            body.addShape(this.getShape(null, null, scale, geometry, {
                density,
                friction,
                restitution,
                collisionMask,
                collisionGroup
            }));
        }

        if (position) {
            body.setPosition(position);
        }

        if (quaternion) {
            body.setOrientation(quaternion);
        }

        if (gravityScale) {
            body.setGravityScale(gravityScale);
        }

        if (linearVelocity) {
            body.setLinearVelocity(linearVelocity);
        }

        if (angularVelocity) {
            body.setAngularVelocity(angularVelocity);
        }

        if (linearDamping) {
            body.setLinearDamping(linearDamping);
        }

        if (angularDamping) {
            body.setAngularDamping(angularDamping);
        }

        if (contactCallback) {
            this.setContactCallback(body, contactCallback);
        }

        return body;
    }

    getObjectBody(object, index = 0) {
        let body;

        if (object instanceof RigidBody) {
            body = object;
        } else if (object.isInstancedMesh) {
            body = this.map.get(object)[index];
        } else {
            body = this.map.get(object);
        }

        return body;
    }

    add(object, props) {
        if (object.geometry) {
            if (object.isInstancedMesh) {
                return this.handleInstancedMesh(object, object.geometry, props);
            } else {
                return this.handleMesh(object, object.geometry, props);
            }
        } else if (object instanceof JointConfig) {
            return this.handleJoint(object);
        } else if (object instanceof RigidBodyConfig) {
            return this.handleBody(object);
        }
    }

    get(object) {
        return this.map.get(object);
    }

    remove(object) {
        const body = this.map.get(object);

        if (object instanceof JointConfig) {
            this.world.removeJoint(body);
        } else if (object instanceof RigidBody) {
            this.world.removeRigidBody(body);
        }

        this.map.delete(object);
    }

    handleJoint(object) {
        let Joint;

        if (object instanceof SphericalJointConfig) {
            Joint = SphericalJoint;
        } else if (object instanceof RevoluteJointConfig) {
            Joint = RevoluteJoint;
        } else if (object instanceof CylindricalJointConfig) {
            Joint = CylindricalJoint;
        } else if (object instanceof PrismaticJointConfig) {
            Joint = PrismaticJoint;
        } else if (object instanceof UniversalJointConfig) {
            Joint = UniversalJoint;
        } else if (object instanceof RagdollJointConfig) {
            Joint = RagdollJoint;
        } else if (object instanceof GenericJointConfig) {
            Joint = GenericJoint;
        }

        const joint = new Joint(object);
        this.world.addJoint(joint);

        this.map.set(object, joint);

        return joint;
    }

    handleBody(object) {
        const body = new RigidBody(object);
        this.world.addRigidBody(body);

        this.map.set(object, body);

        return body;
    }

    handleMesh(object, geometry, props) {
        if (object.parent && object.parent.isGroup) {
            object = object.parent;
        }

        if (props === undefined) {
            props = object;
        }

        const { position, quaternion, scale } = object;

        const body = this.getBody(position, quaternion, scale, geometry, props);
        this.world.addRigidBody(body);

        if (props.density !== 0) {
            this.objects.push(object);
        }

        this.map.set(object, body);

        return body;
    }

    handleInstancedMesh(object, geometry, props = {}) {
        const bodies = [];

        for (let i = 0; i < object.count; i++) {
            const { position, quaternion, scale } = this.object;

            object.getMatrixAt(i, this.matrix);
            this.matrix.decompose(position, quaternion, scale);

            const body = this.getBody(position, quaternion, scale, geometry, props);
            this.world.addRigidBody(body);

            bodies.push(body);
        }

        if (props.density !== 0) {
            this.objects.push(object);
        }

        this.map.set(object, bodies);

        return bodies;
    }

    getPosition(object, index) {
        const body = this.getObjectBody(object, index);

        return this.v.copy(body.getPosition()).clone();
    }

    setPosition(object, position, index) {
        const body = this.getObjectBody(object, index);

        body.setPosition(position);
    }

    getOrientation(object, index) {
        const body = this.getObjectBody(object, index);

        return this.v.copy(body.getOrientation()).clone();
    }

    setOrientation(object, position, index) {
        const body = this.getObjectBody(object, index);

        body.setOrientation(position);
    }

    getGravityScale(object, index) {
        const body = this.getObjectBody(object, index);

        return body.getGravityScale();
    }

    setGravityScale(object, gravityScale, index) {
        const body = this.getObjectBody(object, index);

        body.setGravityScale(gravityScale);
    }

    getLinearVelocity(object, index) {
        const body = this.getObjectBody(object, index);

        return this.v.copy(body.getLinearVelocity()).clone();
    }

    setLinearVelocity(object, linearVelocity, index) {
        const body = this.getObjectBody(object, index);

        body.setLinearVelocity(linearVelocity);
    }

    getAngularVelocity(object, index) {
        const body = this.getObjectBody(object, index);

        return this.v.copy(body.getAngularVelocity()).clone();
    }

    setAngularVelocity(object, angularVelocity, index) {
        const body = this.getObjectBody(object, index);

        body.setAngularVelocity(angularVelocity);
    }

    getLinearDamping(object, index) {
        const body = this.getObjectBody(object, index);

        return this.v.copy(body.getLinearDamping()).clone();
    }

    setLinearDamping(object, linearDamping, index) {
        const body = this.getObjectBody(object, index);

        body.setLinearDamping(linearDamping);
    }

    getAngularDamping(object, index) {
        const body = this.getObjectBody(object, index);

        return this.v.copy(body.getAngularDamping()).clone();
    }

    setAngularDamping(object, angularDamping, index) {
        const body = this.getObjectBody(object, index);

        body.setAngularDamping(angularDamping);
    }

    setContactCallback(object, callback, index) {
        const body = this.getObjectBody(object, index);

        const contactCallback = new ContactCallback();
        contactCallback.preSolve = contact => callback(body, contact);

        let shape = body.getShapeList();

        while (shape) {
            shape.setContactCallback(contactCallback);
            shape = shape.getNext();
        }
    }

    step() {
        this.world.step(this.timestep);

        for (let i = 0, il = this.objects.length; i < il; i++) {
            const object = this.objects[i];

            if (object.isInstancedMesh) {
                const bodies = this.map.get(object);

                for (let j = 0, jl = bodies.length; j < jl; j++) {
                    const body = bodies[j];

                    this.object.position.copy(body.getPosition());
                    this.object.quaternion.copy(body.getOrientation());
                    this.object.updateMatrix();

                    object.setMatrixAt(j, this.object.matrix);
                    object.computeBoundingSphere();
                }

                object.instanceMatrix.needsUpdate = true;
            } else {
                const body = this.map.get(object);

                object.position.copy(body.getPosition());
                object.quaternion.copy(body.getOrientation());
            }
        }
    }
}
