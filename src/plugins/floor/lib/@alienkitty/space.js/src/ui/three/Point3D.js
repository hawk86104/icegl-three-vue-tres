/**
 * @author pschroen / https://ufo.ai/
 */

import { Group, Mesh, MeshBasicMaterial, Raycaster, SphereGeometry, TextureLoader, Vector2 } from 'three';

import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper.js';

import { EventEmitter } from '../../utils/EventEmitter.js';
import { Interface } from '../../utils/Interface.js';
import { Stage } from '../../utils/Stage.js';
import { Line } from '../Line.js';
import { Reticle } from '../Reticle.js';
import { Tracker } from '../Tracker.js';
import { Point } from '../Point.js';

import { clearTween, delayedCall } from '../../tween/Tween.js';
import { getScreenSpaceBox } from '../../utils/three/Utils3D.js';

export class Point3D extends Group {
    static init(scene, camera, {
        root = document.body,
        container = document.body,
        loader = new TextureLoader(),
        uvTexturePath = 'assets/textures/uv.jpg',
        uvHelper = false,
        debug = false
    } = {}) {
        this.events = new EventEmitter();
        this.scene = scene;
        this.camera = camera;
        this.root = root instanceof Interface ? root : new Interface(root);
        this.container = container instanceof Interface ? container : new Interface(container);
        this.loader = loader;
        this.uvTexturePath = uvTexturePath;
        this.uvHelper = uvHelper;
        this.debug = debug;

        this.objects = [];
        this.points = [];
        this.raycaster = new Raycaster();
        this.raycaster.layers.enable(31); // Last layer
        this.mouse = new Vector2(-1, -1);
        this.delta = new Vector2();
        this.coords = new Vector2();
        this.hover = null;
        this.click = null;
        this.lastTime = null;
        this.lastMouse = new Vector2();
        this.raycastInterval = 1 / 10; // 10 frames per second
        this.lastRaycast = 0;
        this.halfScreen = new Vector2();
        this.enabled = true;

        this.initCanvas();
        this.initLoaders();

        this.addListeners();
        this.onResize();
    }

    static initCanvas() {
        this.canvas = new Interface(null, 'canvas');
        this.canvas.css({
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none'
        });
        this.context = this.canvas.element.getContext('2d');
        this.container.add(this.canvas);
    }

    static initLoaders() {
        if (this.uvHelper) {
            this.uvTexture = this.loader.load(this.uvTexturePath);
        }
    }

    static addListeners() {
        Stage.events.on('invert', this.onInvert);
        window.addEventListener('resize', this.onResize);
        window.addEventListener('pointerdown', this.onPointerDown);
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('pointerup', this.onPointerUp);
        window.addEventListener('keyup', this.onKeyUp);
    }

    static removeListeners() {
        Stage.events.off('invert', this.onInvert);
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('pointerdown', this.onPointerDown);
        window.removeEventListener('pointermove', this.onPointerMove);
        window.removeEventListener('pointerup', this.onPointerUp);
        window.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * Event handlers
     */

    static onInvert = () => {
        this.invert();
    };

    static onResize = () => {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.dpr = window.devicePixelRatio;

        this.halfScreen.set(this.width / 2, this.height / 2);

        this.canvas.element.width = Math.round(this.width * this.dpr);
        this.canvas.element.height = Math.round(this.height * this.dpr);
        this.canvas.element.style.width = this.width + 'px';
        this.canvas.element.style.height = this.height + 'px';
        this.context.scale(this.dpr, this.dpr);

        this.points.forEach(point => point.resize());
    };

    static onPointerDown = e => {
        if (!this.enabled) {
            return;
        }

        this.onPointerMove(e);

        this.lastTime = performance.now();
        this.lastMouse.copy(this.mouse);

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
            this.coords.x = (this.mouse.x / this.width) * 2 - 1;
            this.coords.y = 1 - (this.mouse.y / this.height) * 2;
        }

        if (document.elementFromPoint(this.mouse.x, this.mouse.y) instanceof HTMLCanvasElement) {
            this.raycaster.setFromCamera(this.coords, this.camera);

            const intersection = this.raycaster.intersectObjects(this.objects);

            if (intersection.length) {
                const point = this.points[this.objects.indexOf(intersection[0].object)];

                if (!this.hover) {
                    this.hover = point;
                    this.hover.onHover({ type: 'over' });
                    this.root.css({ cursor: 'pointer' });
                } else if (this.hover !== point) {
                    this.hover.onHover({ type: 'out' });
                    this.hover = point;
                    this.hover.onHover({ type: 'over' });
                    this.root.css({ cursor: 'pointer' });
                }
            } else if (this.hover) {
                this.hover.onHover({ type: 'out' });
                this.hover = null;
                this.root.css({ cursor: '' });
            }
        } else if (this.hover) {
            this.hover.onHover({ type: 'out' });
            this.hover = null;
            this.root.css({ cursor: '' });
        }
    };

    static onPointerUp = e => {
        if (!this.enabled) {
            return;
        }

        this.onPointerMove(e);

        if (performance.now() - this.lastTime > 750 || this.delta.subVectors(this.mouse, this.lastMouse).length() > 50) {
            this.click = null;
            return;
        }

        if (this.click && this.click === this.hover) {
            if (!e.altKey) {
                this.points.forEach(point => {
                    if (point !== this.click && point.animatedIn) {
                        point.animateOut(true);
                        point.inactive();
                    }
                });
            }

            this.click.onClick();
        } else if (document.elementFromPoint(this.mouse.x, this.mouse.y) instanceof HTMLCanvasElement) {
            this.animateOut();
        }

        this.click = null;
    };

    static onKeyUp = e => {
        if (e.keyCode >= 48 && e.keyCode <= 57) { // 0-9
            const select = this.points[e.keyCode - 49];

            if (select) {
                if (!e.altKey) {
                    this.points.forEach(point => {
                        if (point !== select && point.animatedIn) {
                            point.animateOut(true);
                            point.inactive();
                        }
                    });
                }

                select.onHover({ type: 'over' });
                select.onClick();
            } else {
                this.animateOut();
            }
        }
    };

    /**
     * Public methods
     */

    static getPoint = mesh => {
        return this.points.find(point => point.object === mesh);
    };

    static getSelected = () => {
        return this.points.filter(point => point.selected).map(point => point.object);
    };

    static setIndexes = () => {
        this.points.forEach((point, i) => point.setIndex(i));
    };

    static invert = () => {
        this.points.forEach(point => point.resize());
    };

    static update = time => {
        this.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);

        this.points.forEach(point => point.update());

        if (!navigator.maxTouchPoints && time - this.lastRaycast > this.raycastInterval) {
            this.onPointerMove();
            this.lastRaycast = time;
        }
    };

    static add = (...points) => {
        points.forEach(point => {
            this.objects.push(point.object);
            this.points.push(point);
        });

        this.setIndexes();
    };

    static remove = (...points) => {
        points.forEach(point => {
            const index = this.points.indexOf(point);

            if (~index) {
                this.objects.splice(index, 1);
                this.points.splice(index, 1);
            }

            if (point === this.hover) {
                this.hover.onHover({ type: 'out' });
                this.hover = null;
                this.root.css({ cursor: '' });
            }
        });

        this.setIndexes();
    };

    static animateOut = () => {
        this.points.forEach(point => {
            if (point.animatedIn) {
                point.animateOut(true);
                point.inactive();
            }
        });

        if (this.hover) {
            this.hover.onHover({ type: 'out' });
            this.hover = null;
            this.root.css({ cursor: '' });
        }
    };

    static destroy = () => {
        this.removeListeners();

        if (this.uvTexture) {
            this.uvTexture.dispose();
        }

        for (let i = this.points.length - 1; i >= 0; i--) {
            if (this.points[i] && this.points[i].destroy) {
                this.points[i].destroy();
            }
        }

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    };

    constructor(mesh, {
        name = mesh.material.name || mesh.geometry.type,
        type = mesh.material.type,
        noTracker
    } = {}) {
        super();

        this.object = mesh;
        this.name = name;
        this.type = type;
        this.noTracker = noTracker;
        this.isDefault = name === mesh.geometry.type && type === mesh.material.type;
        this.camera = Point3D.camera;
        this.halfScreen = Point3D.halfScreen;

        this.center = new Vector2();
        this.size = new Vector2();
        this.selected = false;
        this.animatedIn = false;

        this.initMesh();
        this.initHTML();
        this.initViews();

        Point3D.add(this);
    }

    initMesh() {
        this.object.geometry.computeBoundingSphere();

        const { center, radius } = this.object.geometry.boundingSphere;

        this.geometry = new SphereGeometry(radius);

        if (Point3D.debug) {
            this.material = new MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            });
            this.camera.layers.enable(31); // Last layer
        } else {
            this.material = new MeshBasicMaterial({ visible: false });
        }

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.copy(this.object.position);
        this.mesh.position.x = this.mesh.position.x + center.x;
        this.mesh.position.y = this.mesh.position.y - center.y; // Y flipped
        this.mesh.position.z = this.mesh.position.z + center.z;
        this.mesh.scale.copy(this.object.scale);
        this.mesh.layers.set(31); // Last layer
        this.add(this.mesh);
    }

    initHTML() {
        this.element = new Interface('.target');
        this.element.css({
            position: 'static',
            fontFamily: 'var(--ui-font-family)',
            fontWeight: 'var(--ui-font-weight)',
            fontSize: 'var(--ui-font-size)',
            lineHeight: 'var(--ui-line-height)',
            letterSpacing: 'var(--ui-letter-spacing)'
        });
        Point3D.container.add(this.element);
    }

    initViews() {
        const { context } = Point3D;

        this.line = new Line(context);
        this.element.add(this.line);

        this.reticle = new Reticle();
        this.element.add(this.reticle);

        if (!this.noTracker) {
            this.tracker = new Tracker();
            this.element.add(this.tracker);
        }

        this.point = new Point(this, this.tracker);
        this.point.setData({
            name: this.name,
            type: this.type
        });
        this.element.add(this.point);

        this.panel = this.point.text.panel;
    }

    setInitialPosition() {
        this.updateMatrixWorld();

        this.reticle.position.copy(this.reticle.target);

        if (this.tracker) {
            this.tracker.position.copy(this.tracker.target);
        }

        this.point.position.copy(this.point.target);
    }

    /**
     * Event handlers
     */

    onHover = ({ type }) => {
        clearTween(this.timeout);

        if (this.tracker && this.selected) {
            if (type === 'over') {
                this.tracker.show();
            } else {
                this.tracker.hide();
            }

            return;
        }

        if (type === 'over') {
            if (!this.animatedIn) {
                this.setInitialPosition();
                this.resize();
                this.animateIn();
            }
        } else {
            this.timeout = delayedCall(2000, () => {
                this.animateOut();
            });
        }

        Point3D.events.emit('hover', { type, target: this });
    };

    onClick = () => {
        clearTween(this.timeout);

        if (this.tracker) {
            this.selected = !this.selected;

            if (this.selected) {
                this.toggle(true);
            } else {
                this.toggle(false);
            }

            Point3D.events.emit('click', { selected: Point3D.getSelected(), target: this });
        } else {
            Point3D.events.emit('click', { target: this });
        }
    };

    /**
     * Public methods
     */

    setIndex = index => {
        this.index = index;

        if (this.tracker) {
            const targetNumber = index + 1;

            this.tracker.number.setData({ targetNumber });
            this.point.text.number.setData({ targetNumber });
        }
    };

    addPanel = item => {
        this.panel.add(item);
    };

    toggleNormalsHelper = show => {
        if (show) {
            if (!this.normalsHelper) {
                this.object.geometry.computeBoundingSphere();

                const { radius } = this.object.geometry.boundingSphere;

                this.normalsHelper = new VertexNormalsHelper(this.object, radius / 5);
                Point3D.scene.add(this.normalsHelper);
            }

            this.normalsHelper.visible = true;
        } else if (this.normalsHelper) {
            this.normalsHelper.visible = false;
        }
    };

    toggleTangentsHelper = show => {
        if (show) {
            if (!this.tangentsHelper) {
                this.object.geometry.computeBoundingSphere();
                this.object.geometry.computeTangents();

                const { radius } = this.object.geometry.boundingSphere;

                this.tangentsHelper = new VertexTangentsHelper(this.object, radius / 5);
                Point3D.scene.add(this.tangentsHelper);
            }

            this.tangentsHelper.visible = true;
        } else if (this.tangentsHelper) {
            this.tangentsHelper.visible = false;
        }
    };

    toggleUVHelper = show => {
        const material = this.object.material;

        if (show) {
            if (Point3D.uvTexture && Point3D.uvTexture.image) {
                if (!this.uvTexture) {
                    this.uvTexture = Point3D.uvTexture.clone();
                }

                if (!this.currentMaterialMap && material.map !== this.uvTexture) {
                    this.currentMaterialMap = material.map;

                    material.map = this.uvTexture;
                    material.needsUpdate = true;
                }
            }
        } else {
            material.map = this.currentMaterialMap;
            material.needsUpdate = true;

            if (this.uvTexture) {
                this.uvTexture.dispose();
            }

            delete this.currentMaterialMap;
            delete this.uvTexture;
        }
    };

    resize = () => {
        this.line.resize();
    };

    update = () => {
        this.line.startPoint(this.reticle.position);
        this.line.endPoint(this.point.originPosition);
        this.line.update();
        this.reticle.update();

        if (this.tracker) {
            this.tracker.update();
        }

        this.point.update();
    };

    updateMatrixWorld = force => {
        super.updateMatrixWorld(force);

        this.camera.updateMatrixWorld();

        const box = getScreenSpaceBox(this.mesh, this.camera);
        const center = box.getCenter(this.center).multiply(this.halfScreen);
        const size = box.getSize(this.size).multiply(this.halfScreen);
        const centerX = this.halfScreen.x + center.x;
        const centerY = this.halfScreen.y - center.y;
        const width = Math.round(size.x);
        const height = Math.round(size.y);
        const halfWidth = Math.round(width / 2);
        const halfHeight = Math.round(height / 2);

        this.reticle.target.set(centerX, centerY);

        if (this.tracker) {
            this.tracker.target.set(centerX, centerY);
            this.tracker.css({
                width,
                height,
                marginLeft: -halfWidth,
                marginTop: -halfHeight
            });
        }

        this.point.target.set(centerX + halfWidth, centerY - halfHeight);

        if (this.normalsHelper) {
            this.normalsHelper.update();
        }

        if (this.tangentsHelper) {
            this.tangentsHelper.update();
        }
    };

    animateIn = (reverse = false) => {
        this.line.animateIn(reverse);
        this.reticle.animateIn();
        this.point.animateIn();

        this.animatedIn = true;
    };

    animateOut = (fast = false, callback) => {
        this.line.animateOut(fast, callback);
        this.reticle.animateOut();

        if (this.tracker) {
            this.tracker.animateOut();
        }

        this.point.animateOut();

        this.animatedIn = false;
    };

    toggle = show => {
        if (show) {
            this.line.animateOut(true);
            this.reticle.animateOut();

            if (this.tracker) {
                this.tracker.animateIn();
            }

            this.point.open();
        } else {
            this.line.animateIn(true);
            this.reticle.animateIn();

            if (this.tracker) {
                this.tracker.animateOut();
            }

            this.point.close();

            Stage.events.emit('color_picker', { open: false, target: this.panel });
        }
    };

    inactive = () => {
        this.selected = false;
        this.line.inactive();
        this.point.inactive();

        Stage.events.emit('color_picker', { open: false, target: this.panel });
    };

    destroy = () => {
        if (this.normalsHelper) {
            this.toggleNormalsHelper(false);
            Point3D.scene.remove(this.normalsHelper);
            this.normalsHelper.dispose();
        }

        if (this.tangentsHelper) {
            this.toggleTangentsHelper(false);
            Point3D.scene.remove(this.tangentsHelper);
            this.tangentsHelper.dispose();
        }

        if (this.currentMaterialMap) {
            this.toggleUVHelper(false);
        }

        this.material.dispose();
        this.geometry.dispose();

        this.animateOut(false, () => {
            this.element = this.element.destroy();
        });
    };
}
