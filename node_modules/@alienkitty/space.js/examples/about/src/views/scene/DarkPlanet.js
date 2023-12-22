import { Color, Group, MathUtils, Mesh, MeshStandardMaterial } from 'three';

import { getSphericalCube } from '@alienkitty/space.js/three';

import { WorldController } from '../../controllers/world/WorldController.js';
import { PhysicsController } from '../../controllers/world/PhysicsController.js';

export class DarkPlanet extends Group {
    constructor() {
        super();

        this.position.x = -2.5;

        // 25 degree tilt like Mars
        this.rotation.z = MathUtils.degToRad(25);
    }

    async initMesh() {
        const { physics } = WorldController;

        const geometry = getSphericalCube(0.6, 20);
        geometry.computeTangents();

        // For sphere geometry physics
        geometry.type = 'SphereGeometry';
        geometry.parameters.radius = geometry.parameters.width;

        const material = new MeshStandardMaterial({
            name: 'Dark Planet',
            color: new Color().offsetHSL(0, 0, -0.65),
            metalness: 0.7,
            roughness: 1,
            envMapIntensity: 1.2
        });

        const mesh = new Mesh(geometry, material);
        // mesh.castShadow = true;
        // mesh.receiveShadow = true;
        this.add(mesh);

        physics.add(mesh, { density: 2, autoSleep: false });

        this.mesh = mesh;
    }

    // Event handlers

    onHover = ({ type }) => {
        console.log('DarkPlanet', type);
        // if (type === 'over') {
        // } else {
        // }
    };

    onClick = () => {
        console.log('DarkPlanet', 'click');
        // open('https://alien.js.org/');
    };

    // Public methods

    update = () => {
        if (PhysicsController.enabled) {
            return;
        }

        // Counter clockwise rotation
        this.mesh.rotation.y += 0.005;
    };
}
