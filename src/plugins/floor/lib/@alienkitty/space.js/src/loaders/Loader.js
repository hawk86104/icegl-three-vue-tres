/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://github.com/mrdoob/three.js/blob/dev/src/loaders/Cache.js
 * Based on https://github.com/mrdoob/three.js/blob/dev/src/loaders/Loader.js
 */

import { EventEmitter } from '../utils/EventEmitter.js';

export class Loader {
    constructor() {
        this.events = new EventEmitter();
        this.total = 0;
        this.loaded = 0;
        this.progress = 0;
        this.path = '';
        this.crossOrigin = 'anonymous';
        this.fetchOptions;
        this.cache = false;
        this.files = {};
        this.promise = new Promise(resolve => this.resolve = resolve);
    }

    load(/* path, callback */) {}

    loadAsync(path) {
        return new Promise(resolve => this.load(path, resolve));
    }

    loadAll(assets) {
        return assets.map(path => this.load(path));
    }

    loadAllAsync(assets) {
        return Promise.all(assets.map(path => this.loadAsync(path)));
    }

    increment() {
        this.progress = ++this.loaded / this.total;

        this.events.emit('progress', { progress: this.progress });

        if (this.loaded === this.total) {
            this.complete();
        }
    }

    complete() {
        this.resolve();

        this.events.emit('complete');
    }

    add(num = 1) {
        this.total += num;
    }

    trigger(num = 1) {
        for (let i = 0; i < num; i++) {
            this.increment();
        }
    }

    ready() {
        return this.total ? this.promise : Promise.resolve();
    }

    getPath(path) {
        return this.path + path;
    }

    setPath(path) {
        this.path = path;

        return this;
    }

    setCrossOrigin(crossOrigin) {
        this.crossOrigin = crossOrigin;

        return this;
    }

    setFetchOptions(fetchOptions) {
        this.fetchOptions = fetchOptions;

        return this;
    }

    destroy() {
        this.events.destroy();

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
