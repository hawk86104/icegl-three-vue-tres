import { Provider } from '../Provider';
import { BufferAttribute, BufferGeometry, PlaneGeometry } from 'three';
import { tileToBBOX } from '@mapbox/tilebelt';
import { lonLatToWebMerctor, UTM, lonLatToUtm, MERC } from '../../Utils/CoordUtil';

class PlaneProvider implements Provider<BufferGeometry>{

    utmZone = 50;
    coordType = UTM;

    constructor() { }

    maxZoom = 20;

    async getTile(tileNo: number[]): Promise<BufferGeometry> {
        const geometry = new PlaneGeometry();
        const bbox = tileToBBOX(tileNo);
        const lt = this.convertCoordinate(bbox[0], bbox[3]);
        const rt = this.convertCoordinate(bbox[2], bbox[3]);
        const lb = this.convertCoordinate(bbox[0], bbox[1]);
        const rb = this.convertCoordinate(bbox[2], bbox[1]);
        const vertex = new Float32Array([
            lt[0], lt[1], 0,
            rt[0], rt[1], 0,
            lb[0], lb[1], 0,
            rb[0], rb[1], 0,
        ]);
        geometry.setAttribute('position', new BufferAttribute(vertex, 3));
        return geometry;
    }

    abort(_tileNo: number[]): void { }

    dispose(_tileNo: number[], target: BufferGeometry): void {
        target.dispose();
    }

    private convertCoordinate(lon: number, lat: number): number[] {
        switch (this.coordType) {
            case (UTM):
                return lonLatToUtm(lon, lat, this.utmZone);
            case (MERC):
                return lonLatToWebMerctor(lon, lat);
            default:
                return lonLatToWebMerctor(lon, lat);
        }
    }
}

export { PlaneProvider };