/**
 * @author pschroen / https://ufo.ai/
 */

import { EventEmitter } from './EventEmitter.js';
import { Cluster } from './Cluster.js';

import { absolute, getConstructor, guid } from './Utils.js';

export class Thread extends EventEmitter {
    static count = navigator.hardwareConcurrency || 4;
    static params = {};

    static upload(...objects) {
        if (!this.handlers) {
            this.handlers = [];
        }

        objects.forEach(object => this.handlers.push(object));
    }

    static shared(params) {
        if (!this.threads) {
            this.params = params || {};
            this.params.handlers = this.handlers;
            this.threads = new Cluster(Thread, this.count);
        }

        return !params ? this.threads.get() : this.threads;
    }

    constructor({
        imports = [],
        classes = [],
        controller = [],
        handlers = []
    } = Thread.params) {
        super();

        const array = [];

        imports.forEach(bundle => {
            const [path, ...names] = bundle;

            array.push(`import { ${names.join(', ')} } from '${absolute(path)}';`);
        });

        if (classes.length) {
            array.push(classes.map(object => object.toString()).join('\n\n'));
        }

        if (controller.length) {
            const [object, ...handlers] = controller;
            const { name, code } = getConstructor(object);

            array.push(`${code}\n\nnew ${name}();`);

            handlers.forEach(name => this.createMethod(name));
        } else {
            array.push('addEventListener(\'message\', ({ data }) => self[data.message.fn].call(self, data.message));');
        }

        handlers.forEach(object => {
            const { name, code } = getConstructor(object);

            this.createMethod(name);

            array.push(`self.${name}=${code};`);
        });

        this.worker = new Worker(URL.createObjectURL(new Blob([array.join('\n\n')], { type: 'text/javascript' })), { type: 'module' });

        this.addListeners();
    }

    createMethod(name) {
        this[name] = (message = {}, callback) => {
            const promise = new Promise(resolve => this.send(name, message, resolve));

            if (callback) {
                promise.then(callback);
            }

            return promise;
        };
    }

    addListeners() {
        this.worker.addEventListener('message', this.onMessage);
    }

    removeListeners() {
        this.worker.removeEventListener('message', this.onMessage);
    }

    onMessage = ({ data }) => {
        if (data.event) {
            this.emit(data.event, data.message);
        } else if (data.id) {
            this.emit(data.id, data.message);
            this.off(data.id);
        }
    };

    send(name, message = {}, callback) {
        message.fn = name;

        if (callback) {
            const id = guid();

            message.id = id;

            this.on(id, callback);
        }

        this.worker.postMessage({ message }, message.buffer);
    }

    destroy() {
        this.removeListeners();

        this.worker.terminate();

        return super.destroy();
    }
}
