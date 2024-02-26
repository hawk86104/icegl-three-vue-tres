import { Object3D } from 'three';
import { Provider } from '../Provider';

class OpenMapProvider implements Provider<Object3D> {
    maxZoom = 14;

    getTile(_tileNo: number[]): Promise<Object3D> {
        throw new Error('Method not implemented.');
    }

    abort(_tileNo: number[]): void {
        throw new Error('Method not implemented.');
    }

    dispose(_tileNo: number[], _target: Object3D): void {
        throw new Error('Method not implemented.');
    }
}

export { OpenMapProvider };