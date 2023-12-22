import { BoxGeometry, Color, Group, Mesh } from 'three';

import { WorldController } from '../../controllers/world/WorldController.js';
import { GridHelper } from './GridHelper.js';

export class Floor extends Group {
    constructor() {
        super();

        this.position.y = -1.36; // -0.86 - 1 / 2

        this.initMesh();
    }

    initMesh() {
        const { physics } = WorldController;

        this.gridHelper = new GridHelper();
        this.gridHelper.position.y = 0.494; // 1 / 2 - 0.006
        this.add(this.gridHelper);

        // Physics mesh
        const floor = new Mesh(new BoxGeometry(11, 1, 11));
        floor.geometry.setDrawRange(0, 0); // Avoid rendering geometry
        this.add(floor);

        physics.add(floor, { density: 0, autoSleep: false });
    }

    // Public methods

    invert = isInverted => {
        const colorStyle = `rgb(${getComputedStyle(document.querySelector(':root')).getPropertyValue('--ui-color-triplet').trim()})`;
        const color = new Color(colorStyle);

        if (!isInverted) { // Dark colour is muted
            color.offsetHSL(0, 0, -0.65);
        }

        const array = color.toArray();

        const colors = this.gridHelper.geometry.getAttribute('color');

        for (let i = 0; i < colors.count; i++) {
            colors.setXYZ(i, ...array);
        }

        colors.needsUpdate = true;
    };
}
