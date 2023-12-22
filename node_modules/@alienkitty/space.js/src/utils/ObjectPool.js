/**
 * @author pschroen / https://ufo.ai/
 */

export class ObjectPool {
    constructor(type, num = 10) {
        this.type = type;

        this.array = [];

        if (type) {
            for (let i = 0; i < num; i++) {
                this.array.push(new type());
            }
        }
    }

    get() {
        return this.array.shift() || (this.type ? new this.type() : null);
    }

    empty() {
        this.array.length = 0;
    }

    put(...objects) {
        this.array.push(...objects);
    }

    length() {
        return this.array.length;
    }

    destroy() {
        for (let i = this.array.length - 1; i >= 0; i--) {
            if (this.array[i] && this.array[i].destroy) {
                this.array[i].destroy();
            }
        }

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
