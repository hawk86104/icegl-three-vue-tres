/**
 * @author pschroen / https://ufo.ai/
 */

import { Easing } from './Easing.js';

import { ticker } from './Ticker.js';

const Tweens = [];

export class Tween {
    constructor(object, props, duration, ease, delay = 0, complete, update) {
        if (typeof delay !== 'number') {
            update = complete;
            complete = delay;
            delay = 0;
        }

        this.object = object;
        this.duration = duration;
        this.elapsed = 0;
        this.ease = typeof ease === 'function' ? ease : Easing[ease] || Easing['easeOutCubic'];
        this.delay = delay;
        this.complete = complete;
        this.update = update;
        this.isAnimating = false;

        this.from = {};
        this.to = Object.assign({}, props);

        this.spring = this.to.spring;
        this.damping = this.to.damping;

        delete this.to.spring;
        delete this.to.damping;

        for (const prop in this.to) {
            if (typeof this.to[prop] === 'number' && typeof object[prop] === 'number') {
                this.from[prop] = object[prop];
            }
        }

        this.start();
    }

    onUpdate = (time, delta) => {
        this.elapsed += delta;

        const progress = Math.max(0, Math.min(1, (this.elapsed - this.delay) / this.duration));
        const alpha = this.ease(progress, this.spring, this.damping);

        for (const prop in this.from) {
            this.object[prop] = this.from[prop] + (this.to[prop] - this.from[prop]) * alpha;
        }

        if (this.update) {
            this.update();
        }

        if (progress === 1) {
            clearTween(this);

            if (this.complete) {
                this.complete();
            }
        }
    };

    start() {
        if (this.isAnimating) {
            return;
        }

        this.isAnimating = true;

        ticker.add(this.onUpdate);
    }

    stop() {
        if (!this.isAnimating) {
            return;
        }

        this.isAnimating = false;

        ticker.remove(this.onUpdate);
    }
}

/**
 * Defers a function by the specified duration.
 *
 * @export
 * @param {number} duration Time to wait in milliseconds.
 * @param {function} complete Callback function.
 * @returns {Tween}
 * @example
 * delayedCall(500, animateIn);
 * @example
 * delayedCall(500, () => animateIn(delay));
 * @example
 * timeout = delayedCall(500, () => animateIn(delay));
 */
export function delayedCall(duration, complete) {
    const tween = new Tween(complete, null, duration, 'linear', 0, complete);

    Tweens.push(tween);

    return tween;
}

/**
 * Defers by the specified duration.
 *
 * @export
 * @param {number} [duration=0] Time to wait in milliseconds.
 * @returns {Promise}
 * @example
 * await wait(250);
 */
export function wait(duration = 0) {
    return new Promise(resolve => delayedCall(duration, resolve));
}

/**
 * Defers to the next tick.
 *
 * @export
 * @param {function} [complete] Callback function.
 * @returns {Promise}
 * @example
 * defer(resize);
 * @example
 * defer(() => resize());
 * @example
 * await defer();
 */
export function defer(complete) {
    const promise = new Promise(resolve => delayedCall(0, resolve));

    if (complete) {
        promise.then(complete);
    }

    return promise;
}

/**
 * Tween that animates to the specified destination properties.
 *
 * See the Easing Functions Cheat Sheet for examples by name.
 * https://easings.net/
 *
 * @export
 * @param {object} object Target object.
 * @param {object} props Tween properties.
 * @param {number} duration Time in milliseconds.
 * @param {string|function} ease Ease string or function.
 * @param {number} [delay=0] Time to wait in milliseconds.
 * @param {function} [complete] Callback function when the animation has completed.
 * @param {function} [update] Callback function every time the animation updates.
 * @returns {Promise}
 * @example
 * tween(data, { value: 0.3 }, 1000, 'linear');
 */
export function tween(object, props, duration, ease, delay = 0, complete, update) {
    if (typeof delay !== 'number') {
        update = complete;
        complete = delay;
        delay = 0;
    }

    const promise = new Promise(resolve => {
        const tween = new Tween(object, props, duration, ease, delay, resolve, update);

        Tweens.push(tween);
    });

    if (complete) {
        promise.then(complete);
    }

    return promise;
}

/**
 * Immediately clears all delayedCalls and tweens of the specified object.
 *
 * @export
 * @param {object} object Target object.
 * @returns {void}
 * @example
 * delayedCall(500, animateIn);
 * clearTween(animateIn);
 * @example
 * clearTween(timeout);
 * timeout = delayedCall(500, () => animateIn());
 * @example
 * tween(data, { value: 0.3 }, 1000, 'linear');
 * clearTween(data);
 */
export function clearTween(object) {
    if (object instanceof Tween) {
        object.stop();

        const index = Tweens.indexOf(object);

        if (~index) {
            Tweens.splice(index, 1);
        }
    } else {
        for (let i = Tweens.length - 1; i >= 0; i--) {
            if (Tweens[i].object === object) {
                clearTween(Tweens[i]);
            }
        }
    }
}
