import { MartiniTileUtil } from './MartiniTileUtil';

type MessageType = MessageEvent<{
    id: string;
    tileNo: number[];
    maxZ: number; // RGB 图片最大层级
    url: string;
    coordType?: string;
    utmZone?: number;
    abort?: boolean;
    dispose?: boolean;
}>;

self.onmessage = async (e: MessageType) => {
    const { id, tileNo, maxZ, url, coordType, utmZone, abort, dispose } = e.data;

    if (abort) {
        MartiniTileUtil.fetchingMap.get(id)?.abort();
        MartiniTileUtil.fetchingMap.delete(id);
        self.postMessage({ id, error: true });
        return;
    }
    if (dispose) {
        MartiniTileUtil.terrainDataMap.delete(id);
        return;
    }

    try {
        const { positions, uv, triangles } = await MartiniTileUtil.getTileGeometryAttributes(tileNo, url, maxZ, coordType, utmZone);
        const transferableObjects = [
            positions.buffer,
            uv.buffer,
            triangles.buffer,
        ];
        // @ts-ignore
        self.postMessage({ id, positions, uv, triangles }, transferableObjects);
    } finally {
        MartiniTileUtil.fetchingMap.delete(id);
    }
};