/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/physics/OimoPhysics.js by VBT-YTokan
 * Based on https://github.com/lo-th/phy
 */

import { Group, MathUtils, Matrix4 } from 'three';

export class OimoPhysicsController {
    constructor(view) {
        this.view = view;

        this.shapes = [];
        this.objects = [];
        this.map = new WeakMap();

        this.object = new Group();
        this.matrix = new Matrix4();
    }

    getObject(position, quaternion, scale, geometry, {
        name,
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
        autoSleep,
        kinematic,
        shapes
    }) {
        const object = {};

        if (name !== undefined) {
            object.name = name;
        } else {
            object.name = MathUtils.generateUUID();
        }

        if (position) {
            object.position = position.toArray();
        }

        if (quaternion) {
            object.quaternion = quaternion.toArray();
        }

        if (geometry) {
            const parameters = geometry.parameters;

            if (geometry.type === 'BoxGeometry') {
                const sx = parameters.width !== undefined ? (parameters.width * scale.x) / 2 : 0.5;
                const sy = parameters.height !== undefined ? (parameters.height * scale.y) / 2 : 0.5;
                const sz = parameters.depth !== undefined ? (parameters.depth * scale.z) / 2 : 0.5;

                object.type = 'box';
                object.size = [sx, sy, sz];
            } else if (geometry.type === 'SphereGeometry' || geometry.type === 'IcosahedronGeometry') {
                const radius = parameters.radius !== undefined ? parameters.radius * scale.x : 1;

                object.type = 'sphere';
                object.size = [radius];
            } else if (geometry.type === 'ConeGeometry') {
                const radius = parameters.radius !== undefined ? parameters.radius * scale.x : 1;
                const height = parameters.height !== undefined ? (parameters.height * scale.y) / 2 : 0.5;

                object.type = 'cone';
                object.size = [radius, height];
            } else if (geometry.type === 'CylinderGeometry') {
                const radius = parameters.radiusTop !== undefined ? parameters.radiusTop * scale.x : 1;
                const height = parameters.height !== undefined ? (parameters.height * scale.y) / 2 : 0.5;

                object.type = 'cylinder';
                object.size = [radius, height];
            } else if (geometry.type === 'CapsuleGeometry') {
                const radius = parameters.radius !== undefined ? parameters.radius * scale.x : 1;
                const height = parameters.length !== undefined ? (parameters.length * scale.y) / 2 : 0.5;

                object.type = 'capsule';
                object.size = [radius, height];
            } else {
                const vertices = geometry.getAttribute('position');
                const array = [];

                for (let i = 0, j = 0; i < vertices.count; i++) {
                    array[j] = vertices.array[j] * scale.x; j += 3;
                    array[j] = vertices.array[j] * scale.y; j += 3;
                    array[j] = vertices.array[j] * scale.z; j += 3;
                }

                object.type = 'convex';
                object.size = array;
            }
        }

        if (density !== undefined) {
            object.density = density;
        }

        if (friction !== undefined) {
            object.friction = friction;
        }

        if (restitution !== undefined) {
            object.restitution = restitution;
        }

        if (collisionMask !== undefined) {
            object.collisionMask = collisionMask;
        }

        if (collisionGroup !== undefined) {
            object.collisionGroup = collisionGroup;
        }

        if (gravityScale !== undefined) {
            object.gravityScale = gravityScale;
        }

        if (linearVelocity !== undefined) {
            object.linearVelocity = linearVelocity;
        }

        if (angularVelocity !== undefined) {
            object.angularVelocity = angularVelocity;
        }

        if (linearDamping !== undefined) {
            object.linearDamping = linearDamping;
        }

        if (angularDamping !== undefined) {
            object.angularDamping = angularDamping;
        }

        if (autoSleep !== undefined) {
            object.autoSleep = autoSleep;
        }

        if (kinematic !== undefined) {
            object.kinematic = kinematic;
        }

        if (shapes !== undefined) {
            object.type = 'compound';
            object.shapes = [];

            for (let i = 0; i < shapes.length; i++) {
                const { position, quaternion, scale, geometry } = shapes[i];
                object.shapes.push(this.getObject(position, quaternion, scale, geometry, { name: `${name}_${i}` }));
            }
        }

        return object;
    }

    getObjectBody(object, index = 0) {
        let body;

        if (object.isInstancedMesh) {
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
        } else {
            return this.handleObject(object, props);
        }
    }

    get(object) {
        return this.map.get(object);
    }

    handleObject(object, props) {
        if (props === undefined) {
            props = object;
        }

        const body = this.getObject(null, null, null, null, props);
        this.shapes.push(body);

        if (object.isObject3D && props.density !== 0) {
            this.objects.push(object);
        }

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

        const body = this.getObject(position, quaternion, scale, geometry, props);
        this.shapes.push(body);

        if (props.density !== 0) {
            this.objects.push(object);
        }

        this.map.set(object, body);

        return body;
    }

    handleInstancedMesh(object, geometry, props = {}) {
        const bodies = [];
        const name = props.name || MathUtils.generateUUID();

        for (let i = 0; i < object.count; i++) {
            const { position, quaternion, scale } = this.object;

            object.getMatrixAt(i, this.matrix);
            this.matrix.decompose(position, quaternion, scale);

            props.name = `${name}_${i}`;

            const body = this.getObject(position, quaternion, scale, geometry, props);
            this.shapes.push(body);

            bodies.push(body);
        }

        if (props.density !== 0) {
            this.objects.push(object);
        }

        this.map.set(object, bodies);

        return bodies;
    }

    step(array) {
        let index = 0;

        for (let i = 0, il = this.objects.length; i < il; i++) {
            const object = this.objects[i];

            if (object.isInstancedMesh) {
                const bodies = this.map.get(object);

                for (let j = 0, jl = bodies.length; j < jl; j++) {
                    if (array[index + 7] !== 1) {
                        this.object.position.fromArray(array, index);
                        this.object.quaternion.fromArray(array, index + 3);
                        this.object.updateMatrix();

                        object.setMatrixAt(j, this.object.matrix);
                        object.computeBoundingSphere();
                    }

                    index += 8;
                }

                object.instanceMatrix.needsUpdate = true;
            } else {
                if (array[index + 7] !== 1) {
                    object.position.fromArray(array, index);
                    object.quaternion.fromArray(array, index + 3);
                }

                index += 8;
            }
        }
    }
}
