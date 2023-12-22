import { Vector3 } from 'three';

import { MaterialPanelController, Point3D } from '@alienkitty/space.js/three';

import { CameraController } from '../world/CameraController.js';

export class ScenePanelController {
    static init(view) {
        this.view = view;

        this.initPanel();

        this.addListeners();
    }

    static initPanel() {
        const { darkPlanet, floatingCrystal, abstractCube } = this.view;

        const objects = [darkPlanet, floatingCrystal, abstractCube];

        objects.forEach(object => {
            const { geometry, material } = object.mesh;

            object.point = new Point3D(object.mesh, {
                name: material.name,
                type: geometry.type
            });
            object.add(object.point);

            MaterialPanelController.init(object.mesh, object.point);
        });

        // Shrink tracker meshes a little bit
        floatingCrystal.point.mesh.scale.multiply(new Vector3(1, 0.9, 1));
        abstractCube.point.mesh.scale.multiplyScalar(0.9);
    }

    static addListeners() {
        Point3D.events.on('click', this.onClick);
    }

    // Event handlers

    static onClick = () => {
        if (CameraController.isAnimatingOut) {
            CameraController.isAnimatingOut = false;
        }
    };
}
