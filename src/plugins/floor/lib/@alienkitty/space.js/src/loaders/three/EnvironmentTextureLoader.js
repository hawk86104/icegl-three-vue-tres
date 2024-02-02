/**
 * @author pschroen / https://ufo.ai/
 */

import { PMREMGenerator } from 'three';

import { TextureLoader } from './TextureLoader.js';
import { Loader } from '../Loader.js';

export class EnvironmentTextureLoader extends Loader {
    constructor(renderer, options = {}) {
        super();

        this.textureLoader = new TextureLoader();
        this.textureLoader.setOptions(options);

        // Generates an environment diffuse texture
        this.pmremGenerator = new PMREMGenerator(renderer);
        this.pmremGenerator.compileEquirectangularShader();
    }

    load(path, callback) {
        this.textureLoader.load(path, texture => {
            if (texture instanceof Error) {
                throw new Error(texture);
            }

            const renderTargetCube = this.pmremGenerator.fromEquirectangular(texture);

            texture.dispose();

            this.increment();

            if (callback) {
                callback(renderTargetCube.texture);
            }
        });

        this.total++;
    }

    getPath(path) {
        return this.textureLoader.getPath(path);
    }

    setPath(path) {
        return this.textureLoader.setPath(path);
    }

    setCrossOrigin(crossOrigin) {
        return this.textureLoader.setCrossOrigin(crossOrigin);
    }

    setFetchOptions(fetchOptions) {
        return this.textureLoader.setFetchOptions(fetchOptions);
    }

    destroy() {
        this.pmremGenerator.dispose();
        this.textureLoader.destroy();

        return super.destroy();
    }
}
