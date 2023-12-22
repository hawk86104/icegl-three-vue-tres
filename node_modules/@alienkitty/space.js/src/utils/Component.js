/**
 * @author pschroen / https://ufo.ai/
 */

import { EventEmitter } from './EventEmitter.js';

import { clearTween, delayedCall, tween } from '../tween/Tween.js';

export class Component {
    constructor() {
        this.events = new EventEmitter();
        this.children = [];
        this.timeouts = [];
    }

    add(child) {
        if (!this.children) {
            return;
        }

        this.children.push(child);

        child.parent = this;

        if (this.group && this.group.isObject3D) {
            if (child.group && child.group.isObject3D) {
                this.group.add(child.group);
            } else if (child.isObject3D) {
                this.group.add(child);
            }
        }
    }

    remove(child) {
        if (!this.children) {
            return;
        }

        if (this.group && this.group.isObject3D) {
            if (child.group && child.group.isObject3D) {
                this.group.remove(child.group);
            } else if (child.isObject3D) {
                this.group.remove(child);
            }
        }

        const index = this.children.indexOf(child);

        if (~index) {
            this.children.splice(index, 1);
        }
    }

    tween(props, duration, ease, delay, complete, update) {
        return tween(this, props, duration, ease, delay, complete, update);
    }

    clearTween() {
        clearTween(this);

        return this;
    }

    delayedCall(duration, complete) {
        if (!this.timeouts) {
            return;
        }

        const timeout = delayedCall(duration, () => {
            this.clearTimeout(timeout, true);

            if (complete) {
                complete();
            }
        });

        this.timeouts.push(timeout);

        return timeout;
    }

    clearTimeout(timeout, isStopped) {
        if (!this.timeouts) {
            return;
        }

        if (!isStopped) {
            clearTween(timeout);
        }

        const index = this.timeouts.indexOf(timeout);

        if (~index) {
            this.timeouts.splice(index, 1);
        }
    }

    clearTimeouts() {
        if (!this.timeouts) {
            return;
        }

        for (let i = this.timeouts.length - 1; i >= 0; i--) {
            this.clearTimeout(this.timeouts[i]);
        }
    }

    destroy() {
        if (!this.children) {
            return;
        }

        if (this.parent && this.parent.remove) {
            this.parent.remove(this);
        }

        this.clearTimeouts();
        this.clearTween();

        this.events.destroy();

        for (let i = this.children.length - 1; i >= 0; i--) {
            if (this.children[i] && this.children[i].destroy) {
                this.children[i].destroy();
            }
        }

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
