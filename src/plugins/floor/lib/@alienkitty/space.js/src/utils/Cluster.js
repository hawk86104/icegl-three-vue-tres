/**
 * @author pschroen / https://ufo.ai/
 */

export class Cluster {
    constructor(type, num = 10) {
        this.type = type;

        this.array = [];
        this.index = 0;

        if (type) {
            for (let i = 0; i < num; i++) {
                this.array.push(new type());
            }
        }
    }

    get() {
        const object = this.array[this.index];

        this.index++;

        if (this.index === this.array.length) {
            this.index = 0;
        }

        return object;
    }

    empty() {
        this.array.length = 0;
    }

    push(...objects) {
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
