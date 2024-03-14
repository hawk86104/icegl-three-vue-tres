/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-26 18:58:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-14 16:25:47
 */
import { Texture } from 'three';
import { Provider } from '../Provider';
import { Fetch } from '../../Utils/Fetch';
import { getTileBitmap } from './getTileBitmap';
import { PromiseWorker } from '../../Utils/WorkerUtil';
import MapWorker from './MapWorker?worker';

class MapProvider implements Provider<Texture>{
    maxZoom = 20;
    source = 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x=[x]&y=[y]&z=[z]';
    showTileNo = false;
    private _useWorker = false;
    private _worker?: PromiseWorker;

    fetching = new Map<number[], Fetch>();

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

    async getTile(tileNo: number[]): Promise<Texture> {
        const url = this.getUrl(tileNo);
        const texture = new Texture();

        if (this._useWorker) {
            if (!this._worker) {
                this._worker = new PromiseWorker(MapWorker);
            }
            const id = this.getId(tileNo);
            const data = await this._worker.postMessage({ id, tileNo, url, debug: this.showTileNo });
            // @ts-ignore
            texture.image = data!.bitmap as ImageBitmap;
        } else {
            const fetch = new Fetch(url, { cache: 'force-cache', mode: 'cors' });
            this.fetching.set(tileNo, fetch);
            try {
                texture.image = await getTileBitmap(tileNo, fetch, this.showTileNo);
            } finally {
                this.fetching.delete(tileNo);
            }
        }

        texture.needsUpdate = true;
        texture.anisotropy = 4;
        return texture;
    }

    abort(tileNo: number[]): void {
        if (!this._useWorker) {
            const fetch = this.fetching.get(tileNo);
            if (fetch) {
                fetch.abort();
            }
            this.fetching.delete(tileNo);
        } else {
            this._worker?.postMessage({ id: this.getId(tileNo), abort: true });
        }
    }

    dispose(_tileNo: number[], target: Texture): void {
        target.dispose();
    }

    private getId(tileNo: number[]) {
        return tileNo.join('-');
    }

    private getUrl(tileNo: number[]) {
        const [x, y, z] = tileNo;
        // hawk add 增加 {x} 的支持
        if (this.source.indexOf('[x]') === -1) {
            return this.source
                .replace('{x}', x + '')
                .replace('{y}', y + '')
                .replace('{z}', z + '');
        } else {
            return this.source
                .replace('[x]', x + '')
                .replace('[y]', y + '')
                .replace('[z]', z + '');
        }
    }
}

export { MapProvider };