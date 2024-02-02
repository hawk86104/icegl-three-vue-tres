/**
 * @author pschroen / https://ufo.ai/
 */

import { Thread } from '../utils/Thread.js';
import { ImageBitmapLoaderThread } from './ImageBitmapLoaderThread.js';
import { Loader } from './Loader.js';

export class ImageBitmapLoader extends Loader {
    constructor() {
        super();

        this.defaultOptions = {
            imageOrientation: 'none'
        };

        this.options = this.defaultOptions;
    }

    load(path, callback) {
        const cached = this.files[path];

        let promise;

        if (cached) {
            promise = Promise.resolve(cached);
        } else if (Thread.threads) {
            promise = ImageBitmapLoaderThread.load(this.getPath(path), this.fetchOptions, this.options);
        } else {
            promise = fetch(this.getPath(path), this.fetchOptions).then(response => {
                return response.blob();
            }).then(blob => {
                return createImageBitmap(blob, this.options);
            });
        }

        promise.then(bitmap => {
            if (bitmap.error) {
                throw new Error(bitmap.error);
            }

            if (this.cache) {
                this.files[path] = bitmap;
            }

            this.increment();

            if (callback) {
                callback(bitmap);
            }
        }).catch(event => {
            this.increment();

            if (callback) {
                callback(event);
            }
        });

        this.total++;
    }

    setOptions(options) {
        this.options = Object.assign(this.defaultOptions, options);

        return this;
    }
}
