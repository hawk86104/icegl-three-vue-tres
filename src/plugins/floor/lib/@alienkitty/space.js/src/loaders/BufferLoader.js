/**
 * @author pschroen / https://ufo.ai/
 */

import { Loader } from './Loader.js';

export class BufferLoader extends Loader {
    constructor() {
        super();

        this.cache = true;
    }

    load(path, callback) {
        const cached = this.files[path];

        let promise;

        if (cached) {
            promise = Promise.resolve(cached);
        } else {
            promise = fetch(this.getPath(path), this.fetchOptions).then(response => {
                return response.arrayBuffer();
            });
        }

        promise.then(buffer => {
            if (this.cache) {
                this.files[path] = buffer;
            }

            this.increment();

            if (callback) {
                callback(buffer);
            }
        }).catch(event => {
            this.increment();

            if (callback) {
                callback(event);
            }
        });

        this.total++;
    }
}
