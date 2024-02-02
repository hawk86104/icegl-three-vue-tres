/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://github.com/lo-th/uil
 */

import { Vector2 } from '../math/Vector2.js';
import { Interface } from '../utils/Interface.js';

import { clamp } from '../utils/Utils.js';

export class Slider extends Interface {
    constructor({
        label,
        min = 0,
        max = 1,
        step = 0.01,
        value = 0,
        callback
    }) {
        super('.slider');

        this.label = label;
        this.min = min;
        this.max = max;
        this.step = step;
        this.precision = this.getPrecision(this.step);
        this.value = typeof value === 'string' ? parseFloat(value) : value;
        this.callback = callback;

        this.range = this.max - this.min;
        this.value = this.getValue(this.value);
        this.lastValue = this.value;

        this.origin = new Vector2();
        this.mouse = new Vector2();
        this.delta = new Vector2();
        this.bounds = null;
        this.lastMouse = new Vector2();
        this.lastOrigin = new Vector2();

        this.initHTML();
        this.setValue(this.value, true);

        this.addListeners();
    }

    initHTML() {
        this.container = new Interface('.container');
        this.container.css({
            height: 27,
            cursor: 'w-resize'
        });
        this.add(this.container);

        this.text = new Interface('.text');
        this.text.css({
            cssFloat: 'left',
            marginRight: 10,
            textTransform: 'uppercase',
            lineHeight: 20,
            whiteSpace: 'nowrap'
        });
        this.text.text(this.label);
        this.container.add(this.text);

        this.number = new Interface('.number');
        this.number.css({
            cssFloat: 'right',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 20,
            letterSpacing: 'var(--ui-number-letter-spacing)',
            whiteSpace: 'nowrap'
        });
        this.container.add(this.number);

        this.line = new Interface('.line');
        this.line.css({
            clear: 'both',
            height: 1,
            backgroundColor: 'var(--ui-color)',
            transformOrigin: 'left center'
        });
        this.container.add(this.line);
    }

    addListeners() {
        this.element.addEventListener('pointerdown', this.onPointerDown);
    }

    removeListeners() {
        this.element.removeEventListener('pointerdown', this.onPointerDown);
    }

    getPrecision(value) {
        const str = String(value);
        const delimiter = str.indexOf('.') + 1;

        return !delimiter ? 0 : str.length - delimiter;
    }

    getValue(value) {
        return parseFloat(clamp(value, this.min, this.max).toFixed(this.precision));
    }

    // Event handlers

    onPointerDown = e => {
        this.bounds = this.element.getBoundingClientRect();
        this.lastMouse.set(e.clientX, e.clientY);
        this.lastOrigin.subVectors(this.lastMouse, this.bounds);
        this.lastValue = this.value;

        this.onPointerMove(e);

        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('pointerup', this.onPointerUp);
    };

    onPointerMove = ({ clientX, clientY }) => {
        const event = {
            x: clientX,
            y: clientY
        };

        this.mouse.copy(event);
        this.delta.subVectors(this.mouse, this.lastMouse);
        this.origin.addVectors(this.lastOrigin, this.delta);

        let value = ((this.origin.x / this.bounds.width) * this.range + this.min) - this.lastValue;
        value = Math.floor(value / this.step);
        this.value = this.getValue(this.lastValue + value * this.step);

        this.update();
    };

    onPointerUp = e => {
        window.removeEventListener('pointerup', this.onPointerUp);
        window.removeEventListener('pointermove', this.onPointerMove);

        this.onPointerMove(e);
    };

    // Public methods

    setContent = content => {
        if (!this.group) {
            this.group = new Interface('.group');
            this.group.css({
                position: 'relative'
            });
            this.add(this.group);
        }

        const oldGroup = this.group;

        const newGroup = this.group.clone();
        newGroup.add(content);

        this.replace(oldGroup, newGroup);
        this.group = newGroup;

        oldGroup.destroy();
    };

    setValue = (value, force) => {
        this.value = typeof value === 'string' ? parseFloat(value) : value;
        this.value = this.getValue(this.value);
        this.lastValue = this.value;

        this.update(force);
    };

    update = force => {
        const scaleX = (this.value - this.min) / this.range;

        this.line.css({ scaleX });
        this.number.text(this.value);

        if (this.value !== this.lastValue || force) {
            this.lastValue = this.value;

            this.events.emit('update', { path: [], value: this.value, target: this });

            if (this.callback) {
                this.callback(this.value, this);
            }
        }
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
