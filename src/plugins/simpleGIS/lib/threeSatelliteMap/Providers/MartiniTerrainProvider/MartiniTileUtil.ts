import { Fetch } from '../../Utils/Fetch';
import { Martini } from './Martini';
import { tileToBBOX } from '@mapbox/tilebelt';
import { lonLatToUtm, lonLatToWebMerctor, MERC } from '../../Utils/CoordUtil';
import { TerrainUtil } from '../../Utils/TerrainUtil';
import { getParent } from '@mapbox/tilebelt';


export class MartiniTileUtil {
    static terrainDataMap = new Map<string, Float32Array>();
    static fetchingMap = new Map<string, Fetch>();
    static martiniMap = new Map<number, Martini>();
    static baseSize = 512;

    static getMartini(size: number) {
        let martini = this.martiniMap.get(size);
        if (!martini) {
            martini = new Martini(size + 1);
            this.martiniMap.set(size, martini);
        }
        return martini;
    }

    /**
     * 从缓存的地形里找到指定瓦片编号的祖先地形数据及其编号
     * @param tileNo 瓦片编号
     * @param maxZ 瓦片数据源所能提供的最大层级
     * @returns 地形数据，及地形所对应的瓦片编号
     */
    static findAncestorTerrainData(tileNo: number[], maxZ: number) {
        const z = tileNo[2];
        let terrain: Float32Array | undefined = undefined;
        let parentTileNo = tileNo;
        const maxClip = z >= maxZ ? z - maxZ : 5;
        for (let i = 0; i < maxClip; i++) {
            parentTileNo = getParent(parentTileNo);
            const _terrain = this.terrainDataMap.get(parentTileNo.join('-'));
            if (_terrain) {
                terrain = _terrain;
                break;
            }
        }
        return { terrain, tileNo: parentTileNo };
    }

    /**
     * 获取地形数据，根据情况从缓存读取祖先地形并切割，或直接从url获取地形图片并解码
     * @param tileNo 瓦片编号
     * @param url 瓦片下载地址
     * @param maxZ 瓦片数据源所能提供的最大层级，大于此层级将从缓存切割瓦片而非下载
     * @returns 地形数据，地形大小，及地形对应的bbox
     */
    static async getTerrainData(tileNo: number[], url: string, maxZ: number) {
        const id = tileNo.join('-');
        const { baseSize } = this;

        const { terrain, tileNo: parentTileNo } = this.findAncestorTerrainData(tileNo, maxZ);
        if (terrain) {
            let clipTimes = tileNo[2] - parentTileNo[2];
            let size = this.baseSize;
            while(clipTimes > 0) {
                size = size / 2;
                clipTimes--;
            }
            const { x, y, smallBbox } = TerrainUtil.getChildPosition(parentTileNo, baseSize, tileNo);
            const _terrain = TerrainUtil.clip(terrain, baseSize, x, y, size);
            return { terrain: _terrain, size, bbox: smallBbox };
        }

        const fetch = new Fetch(url, { cache: 'force-cache' });
        this.fetchingMap.set(id, fetch);
        try {
            const res = await fetch.ready();
            const blob = await res.blob();
            const bitmap = await createImageBitmap(blob);
            const _terrain = TerrainUtil.getFromBitmap(bitmap, baseSize);
            this.terrainDataMap.set(id, _terrain);
            return { terrain: _terrain, size: baseSize, bbox: tileToBBOX(tileNo) };
        } finally {
            this.fetchingMap.delete(id);
        }
    }

    /**
     * 根据瓦片编号获取模型数据
     * @param tileNo 瓦片编号
     * @param url 瓦片下载地址
     * @param maxZ 瓦片数据源所能提供的最大层级
     * @param coordType 坐标类型，默认 MERC
     * @param utmZone 当坐标类型为utm时的区号。
     * @returns 几何体顶点、UV、顶点索引
     */
    static async getTileGeometryAttributes(tileNo: number[], url: string, maxZ: number, coordType = MERC, utmZone?: number) {
        const { terrain, size, bbox } = await this.getTerrainData(tileNo, url, maxZ);
        const martini = this.getMartini(size);
        const martiniTile = martini.createTile(terrain);
        const { vertices, triangles, numVerticesWithoutSkirts } = martiniTile.getMeshWithSkirts(10);

        const numOfVertices = vertices.length / 2;
        const positions = new Float32Array(numOfVertices * 3);
        const uv = new Float32Array(numOfVertices * 2);

        const z = tileNo[2];
        const gridSize = size + 1;

        const coordConvertMethod = coordType === MERC ? lonLatToWebMerctor : lonLatToUtm;
        for (let i = 0; i < numOfVertices; i++) {
            const x = vertices[2 * i];
            const y = vertices[2 * i + 1];
            const pixelIdx = y * gridSize + x;
            const lon = (bbox[2] - bbox[0]) * x / size + bbox[0];
            const lat = (bbox[3] - bbox[1]) * (size - y) / size + bbox[1];

            const [vx, vy] = coordConvertMethod(lon, lat, utmZone);
            const vz = terrain[pixelIdx];

            const skirtsHeight = (21 - z) * 10;

            positions[3 * i] = vx;
            positions[3 * i + 1] = vy;
            positions[3 * i + 2] = i >= numVerticesWithoutSkirts ? vz - skirtsHeight : vz;

            uv[2 * i + 0] = x / size;
            uv[2 * i + 1] = (size - y) / size;
        }

        return { positions, uv, triangles };
    }

}
