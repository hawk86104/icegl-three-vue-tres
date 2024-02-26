import { BufferGeometry, Mesh, Vector3 } from 'three';

class TerrainMesh extends Mesh {
    center = new Vector3();

    constructor(geometry?: BufferGeometry) {
        super(geometry);
    }
}

export { TerrainMesh };