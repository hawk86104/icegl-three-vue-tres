import { Mesh, MeshBasicMaterial, Raycaster, Vector2 } from 'three';

import { Stage } from '@alienkitty/space.js/three';
import { RigidBodyConfig, RigidBodyType, SphericalJointConfig } from '@alienkitty/alien.js/three/oimophysics';

import { Config } from '../../config/Config.js';
import { Layer } from '../../config/Layer.js';
import { WorldController } from './WorldController.js';
import { CameraController } from './CameraController.js';
import { PhysicsController } from './PhysicsController.js';

export class InputManager {
    static init(scene, camera, controls) {
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;

        this.raycaster = new Raycaster();
        this.raycaster.layers.enable(Layer.PICKING);

        this.objects = [];
        this.mouse = new Vector2(-1, -1);
        this.delta = new Vector2();
        this.coords = new Vector2();
        this.hover = null;
        this.selected = null;
        this.click = null;
        this.lastTime = null;
        this.lastMouse = new Vector2();
        this.raycastInterval = 1 / 10; // 10 frames per second
        this.lastRaycast = 0;
        this.body = null;
        this.joint = null;
        this.enabled = true;

        this.initMesh();

        this.addListeners();
    }

    static initMesh() {
        const { quad } = WorldController;

        let material;

        if (Config.DEBUG) {
            material = new MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            });
        } else {
            material = new MeshBasicMaterial({ visible: false });
        }

        this.dragPlane = new Mesh(quad, material);
        this.dragPlane.scale.multiplyScalar(200);
        this.dragPlane.layers.enable(Layer.PICKING);
    }

    static addListeners() {
        window.addEventListener('pointerdown', this.onPointerDown);
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('pointerup', this.onPointerUp);
    }

    static removeListeners() {
        window.removeEventListener('pointerdown', this.onPointerDown);
        window.removeEventListener('pointermove', this.onPointerMove);
        window.removeEventListener('pointerup', this.onPointerUp);
    }

    // Event handlers

    static onPointerDown = e => {
        if (!this.enabled) {
            return;
        }

        this.lastTime = performance.now();
        this.lastMouse.set(e.clientX, e.clientY);

        this.onPointerMove(e);

        if (this.hover) {
            this.click = this.hover;
        }
    };

    static onPointerMove = e => {
        if (!this.enabled) {
            return;
        }

        if (e) {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.coords.x = (this.mouse.x / document.documentElement.clientWidth) * 2 - 1;
            this.coords.y = 1 - (this.mouse.y / document.documentElement.clientHeight) * 2;
        }

        if (this.selected) {
            this.raycaster.setFromCamera(this.coords, this.camera);

            const intersection = this.raycaster.intersectObject(this.dragPlane);

            if (intersection.length) {
                const point = intersection[0].point;

                PhysicsController.physics.setPosition(this.body, point);
            }

            return;
        }

        if (document.elementFromPoint(this.mouse.x, this.mouse.y) instanceof HTMLCanvasElement) {
            this.raycaster.setFromCamera(this.coords, this.camera);

            const intersection = this.raycaster.intersectObjects(this.objects);

            if (intersection.length) {
                let object = intersection[0].object;

                if (object.parent.isGroup) {
                    object = object.parent;
                }

                if (
                    PhysicsController.enabled &&
                    CameraController.isDown &&
                    !CameraController.isTransforming &&
                    this.selected !== object
                ) {
                    const point = intersection[0].point;

                    const body = new RigidBodyConfig();
                    body.type = RigidBodyType.STATIC;
                    body.position.copyFrom(point);
                    PhysicsController.physics.add(body);

                    const joint = new SphericalJointConfig();
                    joint.rigidBody1 = PhysicsController.physics.get(object);
                    joint.rigidBody2 = PhysicsController.physics.get(body);
                    joint.rigidBody1.getLocalPointTo(point, joint.localAnchor1);
                    joint.rigidBody2.getLocalPointTo(point, joint.localAnchor2);
                    joint.springDamper.setSpring(4, 1); // frequency, dampingRatio
                    PhysicsController.physics.add(joint);

                    this.selected = object;
                    this.body = body;
                    this.joint = joint;

                    this.dragPlane.position.copy(point);
                    this.dragPlane.quaternion.copy(this.camera.quaternion);

                    this.scene.add(this.dragPlane);

                    this.controls.enabled = false;

                    Stage.css({ cursor: 'move' });
                } else if (!this.hover) {
                    this.hover = object;
                    this.hover.onHover({ type: 'over' });
                    Stage.css({ cursor: 'pointer' });
                } else if (this.hover !== object) {
                    this.hover.onHover({ type: 'out' });
                    this.hover = object;
                    this.hover.onHover({ type: 'over' });
                    Stage.css({ cursor: 'pointer' });
                }
            } else if (this.hover) {
                this.hover.onHover({ type: 'out' });
                this.hover = null;
                Stage.css({ cursor: '' });
            }
        } else if (this.hover) {
            this.hover.onHover({ type: 'out' });
            this.hover = null;
            Stage.css({ cursor: '' });
        }

        this.delta.subVectors(this.mouse, this.lastMouse);
    };

    static onPointerUp = e => {
        if (!this.enabled) {
            return;
        }

        if (this.selected) {
            this.scene.remove(this.dragPlane);

            PhysicsController.physics.remove(this.joint);
            PhysicsController.physics.remove(this.body);

            this.selected = null;

            this.controls.enabled = true;
        }

        this.onPointerMove(e);

        if (performance.now() - this.lastTime > 250 || this.delta.length() > 50) {
            this.click = null;
            return;
        }

        if (this.click && this.click === this.hover) {
            this.click.onClick();
        }

        this.click = null;
    };

    // Public methods

    static update = time => {
        if (!navigator.maxTouchPoints && time - this.lastRaycast > this.raycastInterval) {
            this.onPointerMove();
            this.lastRaycast = time;
        }
    };

    static add = (...objects) => {
        this.objects.push(...objects);
    };

    static remove = (...objects) => {
        objects.forEach(object => {
            const index = this.objects.indexOf(object);

            if (~index) {
                this.objects.splice(index, 1);
            }

            if (object.parent.isGroup) {
                object = object.parent;
            }

            if (object === this.hover) {
                this.hover.onHover({ type: 'out' });
                this.hover = null;
                Stage.css({ cursor: '' });
            }
        });
    };
}
