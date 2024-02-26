import { BufferGeometry } from 'three';

/**
 * 用户修正地形的海拔高度。
 */
class HeightCorrection {
    static UP = 1;
    static DOWN = 2;
    static MATCH = 3;

    geometry?: BufferGeometry;
    mode = HeightCorrection.DOWN;

    /**
     * @param geometry [BufferGeometry](https://threejs.org/docs/index.html?q=buffer#api/zh/core/BufferGeometry)，
     * 在解码地形时会将地形顶点的高程匹配到几何体上。
     */
    constructor(geometry?: BufferGeometry) {
        this.geometry = geometry;
    }
}

export { HeightCorrection };