import { Box3Helper, BufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, Texture } from 'three';
import { TerrainMesh } from './TerrainMesh';
import { Provider } from '../Provider';
// import { Completer } from '../Utils/PromiseUtils';

class TerrainMeshProvider implements Provider<Mesh> {
    constructor(
        public geometryProvider: Provider<BufferGeometry>,
        public textureProvider: Provider<Texture>,
    ) { }

    maxZoom = 20;
    showBoundingBox = false;
    wireframe = false;
    flatShading = false;
    useStandardMaterial = false;

    async getTile(tileNo: number[]): Promise<Mesh> {
        const tasks = [
            this.geometryProvider.getTile(tileNo),
            this.textureProvider.getTile(tileNo)
        ];
        const res = await Promise.all(tasks);
        const geometry = res[0] as BufferGeometry;
        const texture = res[1] as Texture;
        const { wireframe, flatShading } = this;
        const material = this.useStandardMaterial
            ? new MeshStandardMaterial({ map: texture, wireframe, flatShading })
            : new MeshBasicMaterial({ map: texture, wireframe });
        const mesh = new TerrainMesh();

        geometry.computeBoundingBox();

        geometry.boundingBox!.getCenter(mesh.center);
        geometry.center();
        geometry.computeBoundingSphere();

        mesh.position.copy(mesh.center);

        mesh.geometry = geometry;
        mesh.material = material;

        if (this.showBoundingBox) {
            const boxHelper = new Box3Helper(geometry.boundingBox!);
            mesh.add(boxHelper);
        }

        return mesh;
    }

    abort(tileNo: number[]): void {
        this.geometryProvider.abort(tileNo);
        this.textureProvider.abort(tileNo);
    }

    dispose(tileNo: number[], target: Mesh): void {
        const geometry = target.geometry as BufferGeometry | undefined;
        const material = target.material as MeshBasicMaterial | undefined;
        if (geometry) {
            this.geometryProvider.dispose(tileNo, geometry);
        }
        if (material && material.map) {
            this.textureProvider.dispose(tileNo, material.map);
        }
        material?.dispose();
    }
}

export { TerrainMeshProvider };