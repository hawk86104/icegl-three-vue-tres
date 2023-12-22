/**
 * @author pschroen / https://ufo.ai/
 */

import { Loader } from './Loader.js';

export class MultiLoader extends Loader {
    constructor() {
        super();

        this.loaders = [];
        this.weights = [];
    }

    load(loader, weight = 1) {
        loader.events.on('progress', this.onProgress);
        loader.events.on('complete', this.onComplete);

        this.loaders.push(loader);
        this.weights.push(weight);

        this.total += weight;
    }

    // Event handlers

    onProgress = () => {
        let loaded = this.loaded;

        for (let i = 0, l = this.loaders.length; i < l; i++) {
            loaded += this.weights[i] * this.loaders[i].progress;
        }

        const progress = loaded / this.total;

        if (progress < 1) {
            this.events.emit('progress', { progress });
        }
    };

    onComplete = () => {
        this.increment();
    };

    // Public methods

    destroy = () => {
        for (let i = this.loaders.length - 1; i >= 0; i--) {
            if (this.loaders[i] && this.loaders[i].destroy) {
                this.loaders[i].destroy();
            }
        }

        return super.destroy();
    };
}
