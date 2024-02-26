import { BufferAttribute, BufferGeometry } from 'three';
import { UTM } from '../../Utils/CoordUtil';
import { PromiseWorker } from '../../Utils/WorkerUtil';
import { Provider } from '../Provider';
import MartiniWorker from './MartiniWorker?worker';

class MartiniTerrainProvider implements Provider<BufferGeometry>{
    maxZoom = 12;
    coordType = UTM;
    utmZone = 50;
    private _worker?: PromiseWorker;
    private _useWorker = true;

    source = 'https://api.maptiler.com/tiles/terrain-rgb-v2/[z]/[x]/[y].webp?key=L55MtSxL94Yb4hQeWewp';

    set useWorker(use: boolean) {
        this._useWorker = use;
        if (!this._useWorker) {
            this._worker?.terminate();
            this._worker = undefined;
        }
    }

    get useWorker() {
        return this._useWorker;
    }

    constructor() { }

    async getTile(tileNo: number[]): Promise<BufferGeometry> {
        if (this._useWorker) {
            return this.getInWorkerThread(tileNo);
        }
        return this.getInMainThread();
    }

    private async getInMainThread() {
        const geometry = new BufferGeometry();
        return geometry;
    }

    private async getInWorkerThread(tileNo: number[]) {
        if (!this._worker) {
            this._worker = new PromiseWorker(MartiniWorker);
        }
        const message = {
            tileNo,
            id: this.getId(tileNo),
            url: this.getUrl(tileNo),
            maxZ: this.maxZoom,
            coordType: this.coordType,
            utmZone: this.utmZone,
        };
        const data = await this._worker.postMessage(message);
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(data.positions, 3));
        geometry.setAttribute('uv', new BufferAttribute(data.uv, 2));
        geometry.setIndex(new BufferAttribute(data.triangles, 1));
        // geometry.computeVertexNormals();
        return geometry;
    }

    async abort(tileNo: number[]) {
        if (this._useWorker) {
            this._worker?.postMessage({ id: this.getId(tileNo), abort: true });
        } else {
            // 
        }
    }

    async dispose(tileNo: number[], target: BufferGeometry) {
        target.dispose();
        if (this._useWorker) {
            this._worker?.postMessage({ id: this.getId(tileNo), dispose: true });
        }
    }

    getId(tileNo: number[]) {
        return tileNo.join('-');
    }

    getUrl(tileNo: number[]) {
        const [x, y, z] = tileNo;
        return this.source
            .replace('[x]', x + '')
            .replace('[y]', y + '')
            .replace('[z]', z + '');
    }
}

export { MartiniTerrainProvider };

