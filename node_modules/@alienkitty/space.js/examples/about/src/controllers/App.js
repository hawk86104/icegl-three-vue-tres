import { ImageBitmapLoaderThread, Stage, Thread, ticker, wait } from '@alienkitty/space.js/three';

import { WorldController } from './world/WorldController.js';
import { CameraController } from './world/CameraController.js';
import { SceneController } from './world/SceneController.js';
import { PhysicsController } from './world/PhysicsController.js';
import { InputManager } from './world/InputManager.js';
import { RenderManager } from './world/RenderManager.js';
import { PanelController } from './panels/PanelController.js';
import { SceneView } from '../views/SceneView.js';
import { UI } from '../views/UI.js';

export class App {
    static async init() {
        if (!/firefox/i.test(navigator.userAgent)) {
            this.initThread();
        }

        this.initWorld();
        this.initViews();
        this.initControllers();

        this.addListeners();
        this.onResize();

        await Promise.all([
            document.fonts.ready,
            SceneController.ready(),
            WorldController.textureLoader.ready(),
            WorldController.environmentLoader.ready()
        ]);

        this.initPanel();
    }

    static initThread() {
        ImageBitmapLoaderThread.init();

        Thread.shared();
    }

    static initWorld() {
        WorldController.init();
        Stage.add(WorldController.element);
    }

    static initViews() {
        this.view = new SceneView();
        WorldController.scene.add(this.view);

        this.ui = new UI();
        Stage.add(this.ui);
    }

    static initControllers() {
        const { renderer, scene, camera, controls, physics } = WorldController;

        CameraController.init(camera, controls);
        SceneController.init(this.view);
        PhysicsController.init(physics);
        InputManager.init(scene, camera, controls);
        RenderManager.init(renderer, scene, camera, this.ui);
    }

    static initPanel() {
        const { renderer, scene, camera, physics } = WorldController;

        PanelController.init(renderer, scene, camera, physics, this.view, this.ui);
    }

    static addListeners() {
        Stage.events.on('invert', this.onInvert);
        window.addEventListener('resize', this.onResize);
        ticker.add(this.onUpdate);
    }

    // Event handlers

    static onInvert = ({ invert }) => {
        this.view.invert(invert);
        RenderManager.invert(invert);
    };

    static onResize = () => {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        const dpr = window.devicePixelRatio;

        WorldController.resize(width, height, dpr);
        CameraController.resize(width, height);
        RenderManager.resize(width, height, dpr);
    };

    static onUpdate = (time, delta, frame) => {
        WorldController.update(time, delta, frame);
        CameraController.update();
        SceneController.update(time);
        PhysicsController.update();
        InputManager.update(time);
        RenderManager.update(time, delta, frame);
        PanelController.update(time);
    };

    // Public methods

    static start = async () => {
        WorldController.animateIn();
        SceneController.animateIn();

        await wait(1000);

        this.ui.animateIn();
        PanelController.animateIn();
    };
}
