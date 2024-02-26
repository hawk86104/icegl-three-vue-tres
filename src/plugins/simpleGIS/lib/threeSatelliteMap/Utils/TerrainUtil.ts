import { tileToBBOX } from '@mapbox/tilebelt';

export class TerrainUtil {
    private static offscreencanvas: OffscreenCanvas;
    /**
     * 从图片中解码地形数据
     * @param bitmap 图像数据
     * @param size 瓦片大小
     * @returns 地形数据
     */
    static getFromBitmap(bitmap: ImageBitmap, size = 256) {
        if (!this.offscreencanvas) {
            this.offscreencanvas = new OffscreenCanvas(512, 512);
        }
        const ctx = this.offscreencanvas.getContext('2d');
        if (!ctx) {
            throw new Error('Get context 2d error.');
        }
        ctx.drawImage(bitmap, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        const gridSize = size + 1;
        const terrain = new Float32Array(gridSize * gridSize);
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const k = (y * size + x) * 4;
                const r = data[k + 0];
                const g = data[k + 1];
                const b = data[k + 2];
                terrain[y * gridSize + x] = (r * 256 * 256 + g * 256 + b) / 10 - 10000;
            }
        }
        for (let x = 0; x < gridSize - 1; x++) {
            terrain[gridSize * (gridSize - 1) + x] = terrain[gridSize * (gridSize - 2) + x];
        }
        for (let y = 0; y < gridSize; y++) {
            terrain[gridSize * y + gridSize - 1] = terrain[gridSize * y + gridSize - 2];
        }
        return terrain;
    }

    /**
     * 从源地形数据中裁切出一部分
     * @param sourceTerrain 源地形数据
     * @param sourceSize 源地形大小
     * @param x 裁切开始位置 x 坐标
     * @param y 裁切开始位置 y 坐标
     * @param size 裁切大小
     * @returns 裁切后的地形数据
     */
    static clip(sourceTerrain: Float32Array, sourceSize: number, x: number, y: number, size: number) {
        
        if (x + size > sourceSize + 1 || y + size > sourceSize + 1) {
            console.log('clip: ', x, y, size);
            throw new RangeError('Clip terrain error');
        }
        const gridSize = size + 1;
        const sourceGridSize = sourceSize + 1;
        const terrain = new Float32Array(gridSize * gridSize);
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                terrain[row * gridSize + col] = sourceTerrain[(row + y) * sourceGridSize + (col + x)];
            }
        }
        return terrain;
    }
 
    static getChildPosition(bigTileNo: number[], bigTileSize: number, smallTileNo: number[]) {
        const bigBbox = tileToBBOX(bigTileNo);
        const smallBbox = tileToBBOX(smallTileNo);
        const bigWidth = bigBbox[2] - bigBbox[0];
        const bigHeight = bigBbox[3] - bigBbox[1];
        const left = (smallBbox[0] - bigBbox[0]) / bigWidth;
        const top = (bigBbox[3] - smallBbox[3]) / bigHeight;
        const x = Math.round(left * bigTileSize);
        const y = Math.round(top * bigTileSize);
        // console.log(left * bigTileSize, top * bigTileSize);
        return {x, y, bigBbox, smallBbox};
    }
}