interface Provider<T>{
    /**
     * 所能提供的数据的最大层级。
     */
    maxZoom: number;

    /**
     * 加载或生成瓦片数据
     * @param tileNo 瓦片编号[x, y, z]
     */
    getTile(tileNo: number[]): Promise<T>;

    /**
     * 取消异步的瓦片加载。
     * @param tileNo 瓦片编号[x, y, z]
     */
    abort(tileNo: number[]): void;

    /**
     * 销毁其所生成的瓦片数据。
     * @param target 瓦片数据
     */
    dispose(tileNo: number[], target: T): void;
}

export type { Provider };