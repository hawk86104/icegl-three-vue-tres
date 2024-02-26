import { HeightCorrection } from './HeightCorrection';
/**
 * 通过一条连续二维坐标点的路径组成的封闭区域，将该区域范围内的顶点Z修正为给定高程。
 */
class HeightCorrectionArea extends HeightCorrection {
    /**
     * @param path GPS坐标点路径
     * @param height 目标高程
     */
    constructor(path: number[][], height: number) {
        super();
        console.log(path, height);
    }
}

export { HeightCorrectionArea };