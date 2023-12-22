import { Color, Group, Mesh, MeshStandardMaterial, OctahedronGeometry } from 'three';

import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

import { WorldController } from '../../controllers/world/WorldController.js';
import { PhysicsController } from '../../controllers/world/PhysicsController.js';

export class FloatingCrystal extends Group {
    constructor() {
        super();

        this.position.y = 0.7;

        // Resize to rhombus shape
        this.scale.set(0.5, 1, 0.5);
    }

    async initMesh() {
        const { physics } = WorldController;

        let geometry = new OctahedronGeometry();

        // Convert to indexed geometry
        geometry = mergeVertices(geometry);

        geometry.computeTangents();

        const material = new MeshStandardMaterial({
            name: 'Floating Crystal',
            color: new Color().offsetHSL(0, 0, -0.65),
            metalness: 0.7,
            roughness: 0.7,
            envMapIntensity: 1.2,
            flatShading: true
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
        console.log('FloatingCrystal', type);
        // if (type === 'over') {
        // } else {
        // }
    };

    onClick = () => {
        console.log('FloatingCrystal', 'click');
        // open('https://alien.js.org/');
    };

    // Public methods

    update = time => {
        if (PhysicsController.enabled) {
            return;
        }

        this.position.y = 0.7 + Math.sin(time) * 0.1;
        this.rotation.y += 0.01;
    };
}
