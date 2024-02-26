import { BufferGeometry } from 'three';
import { Provider } from '../Provider';
import { bboxToTiles, tileToBBox } from 'tilebelt-wgs84';
import { tileToBBOX } from '@mapbox/tilebelt';
import { Fetch } from '../../Utils/Fetch';
import decode, { DECODING_STEPS } from '@here/quantized-mesh-decoder';

// const plan = new Plane();
// const line = new Line3();
// const lineStart = new Vector3();
// const lineEnd = new Vector3();
const vertexMaxPos = 32767;

class QuantizedMeshTerrainProvider implements Provider<BufferGeometry> {
    source = 'https://api.maptiler.com/tiles/terrain-quantized-mesh-v2/[z]/[x]/[y].terrain?key=L55MtSxL94Yb4hQeWewp';
    maxZoom = 13;

    async getTile(tileNo: number[]): Promise<BufferGeometry> {
        const tileNos = this.getTileNos(tileNo);
        const urls = tileNos.map(this.getUrl);
        const reqs = urls.map(url => this.fetchQuantizedMesh(url));
        const res = await Promise.all(reqs);
        const cliped = res.map((item, i) => this.clip(item, tileNos[i], tileNo));
        const merged = this.merge(cliped);
        console.log(merged);
        return new BufferGeometry();
    }

    abort(tileNo: number[]): void {
        console.log('[abort] Method not implemented.' + tileNo);
    }

    dispose(_tileNo: number[], target: BufferGeometry): void {
        throw new Error('Method not implemented.' + target);
    }

    async fetchQuantizedMesh(url: string) {
        const fetch = new Fetch(url, { cache: 'force-cache' });
        const res = await fetch.ready();
        const arrayBuffer = await res.arrayBuffer();
        const data = decode(arrayBuffer, { maxDecodingStep: DECODING_STEPS.triangleIndices });
        return data;
    }

    getTileNos(tileNo: number[]) {
        const z = tileNo[2] - 1 < 0 ? 0 : tileNo[2] - 1;
        const bbox = tileToBBOX(tileNo);
        return bboxToTiles(bbox, z);
    }

    getUrl(tileNo: number[]) {
        return this.source
            .replace('[x]', tileNo[0] + '')
            .replace('[y]', tileNo[1] + '')
            .replace('[z]', tileNo[2] + '');
    }
    /**
     * 裁切地形数据
     * @param data 量化网格地形数据
     * @param fromTileNo 84瓦片坐标
     * @param toTileNo 墨卡托瓦片坐标
     */
    clip(data: QuantizedMeshData, fromTileNo: number[], toTileNo: number[]): QuantizedMeshData {
        const fromBBox = tileToBBox(fromTileNo);
        const toBBox = tileToBBOX(toTileNo);
        const left = fromBBox[0] / toBBox[2] * vertexMaxPos;
        const right = fromBBox[2] / toBBox[2] * vertexMaxPos;
        const bottom = fromBBox[1] / toBBox[3] * vertexMaxPos;
        const top = fromBBox[3] / toBBox[3] * vertexMaxPos;

        console.log(left, right, bottom, top);

        // const { vertexData, triangleIndices } = data;
        // const triangleCount = triangleIndices.length / 3;

        // for (let i = 0; i < triangleCount; i++) {
        //     // const v1 = 
        // }

        return data;
    }

    clipSide() {}

    merge(data: QuantizedMeshData[]): QuantizedMeshData {
        return data[0];
    }
}

export { QuantizedMeshTerrainProvider };