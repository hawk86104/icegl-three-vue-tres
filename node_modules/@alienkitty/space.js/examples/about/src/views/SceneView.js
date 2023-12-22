import { Group } from 'three';

import { InputManager } from '../controllers/world/InputManager.js';
import { Floor } from './scene/Floor.js';
import { DarkPlanet } from './scene/DarkPlanet.js';
import { FloatingCrystal } from './scene/FloatingCrystal.js';
import { AbstractCube } from './scene/AbstractCube.js';

export class SceneView extends Group {
    constructor() {
        super();

        this.visible = false;

        this.initViews();
    }

    initViews() {
        this.floor = new Floor();
        this.add(this.floor);

        this.darkPlanet = new DarkPlanet();
        this.add(this.darkPlanet);

        this.floatingCrystal = new FloatingCrystal();
        this.add(this.floatingCrystal);

        this.abstractCube = new AbstractCube();
        this.add(this.abstractCube);
    }

    addListeners() {
        InputManager.add(this.darkPlanet, this.floatingCrystal, this.abstractCube);
    }

    removeListeners() {
        InputManager.remove(this.darkPlanet, this.floatingCrystal, this.abstractCube);
    }

    // Public methods

    invert = isInverted => {
        this.floor.invert(isInverted);
    };

    update = time => {
        this.darkPlanet.update(time);
        this.floatingCrystal.update(time);
        this.abstractCube.update(time);
    };

    animateIn = () => {
        this.addListeners();
    };

    ready = () => Promise.all([
        this.darkPlanet.initMesh(),
        this.floatingCrystal.initMesh(),
        this.abstractCube.initMesh()
    ]);
}
