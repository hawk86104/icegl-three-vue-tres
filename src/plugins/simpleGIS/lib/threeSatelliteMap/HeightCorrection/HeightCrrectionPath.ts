import { HeightCorrection } from './HeightCorrection';

/**
 * 通过一条连续GPS坐标点(可带高程)的路径，将高程修正为该路径的高程，可设置路径扩展宽度。
 */
class HeightCrrectionPath extends HeightCorrection {
    /**
     * @param path GPS坐标点路径
     * @param width 路径扩展宽度
     */
    constructor(path: number[][], width: number) {
        super();
        console.log(path, width);
    }
}

export { HeightCrrectionPath };

