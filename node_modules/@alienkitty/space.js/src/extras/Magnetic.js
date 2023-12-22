/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://gist.github.com/jesperlandberg/66484c7bb456661662f57361851bfc31
 */

import { Component } from '../utils/Component.js';

export class Magnetic extends Component {
    constructor(object, {
        threshold = 50
    } = {}) {
        super();

        this.object = object;
        this.threshold = threshold;
        this.hoveredIn = false;

        this.initHTML();

        this.enable();
    }

    initHTML() {
        this.object.css({ willChange: 'transform' });
    }

    addListeners() {
        window.addEventListener('pointerdown', this.onPointerDown);
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('pointerup', this.onPointerUp);
    }

    removeListeners() {
        window.removeEventListener('pointerdown', this.onPointerDown);
        window.removeEventListener('pointermove', this.onPointerMove);
        window.removeEventListener('pointerup', this.onPointerUp);
    }

    // Event handlers

    onPointerDown = e => {
        this.onPointerMove(e);
    };

    onPointerMove = ({ clientX, clientY }) => {
        const { left, top, width, height } = this.object.element.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        const distance = Math.sqrt(x * x + y * y);

        if (distance < (width + height) / 2 + this.threshold) {
            this.onHover({ type: 'over', x, y });
        } else if (this.hoveredIn) {
            this.onHover({ type: 'out' });
        }
    };

    onPointerUp = e => {
        this.onPointerMove(e);

        this.onHover({ type: 'out' });
    };

    onHover = ({ type, x, y }) => {
        this.object.clearTween();

        if (type === 'over') {
            this.object.tween({
                x: x * 0.8,
                y: y * 0.8,
                skewX: x * 0.125,
                skewY: 0,
                rotation: x * 0.05,
                scale: 1.1
            }, 500, 'easeOutCubic');

            this.hoveredIn = true;
        } else {
            this.object.tween({
                x: 0,
                y: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                scale: 1,
                spring: 1.2,
                damping: 0.4
            }, 1000, 'easeOutElastic');

            this.hoveredIn = false;
        }
    };

    // Public methods

    enable = () => {
        this.addListeners();
    };

    disable = () => {
        this.removeListeners();
    };

    destroy = () => {
        this.disable();

        return super.destroy();
    };
}
