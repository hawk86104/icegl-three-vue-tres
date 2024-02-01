/**
 * @author pschroen / https://ufo.ai/
 */

import { Vector2 } from '../math/Vector2.js';
import { Interface } from '../utils/Interface.js';
import { Stage } from '../utils/Stage.js';
import { Panel } from '../panels/Panel.js';

export class HeaderInfo extends Interface {
    constructor() {
        super('.info');

        this.count = 0;
        this.time = 0;
        this.prev = 0;
        this.fps = 0;

        this.mouse = new Vector2();
        this.delta = new Vector2();
        this.lastTime = null;
        this.lastMouse = new Vector2();
        this.openColor = null;
        this.isOpen = false;

        this.initHTML();
        this.initViews();

        this.addListeners();
    }

    initHTML() {
        this.css({
            cssFloat: 'right',
            padding: 10,
            fontFamily: 'var(--ui-font-family)',
            fontWeight: 'var(--ui-font-weight)',
            fontSize: 'var(--ui-font-size)',
            lineHeight: 'var(--ui-line-height)',
            letterSpacing: 'var(--ui-letter-spacing)',
            pointerEvents: 'auto',
            webkitUserSelect: 'none',
            userSelect: 'none'
        });

        this.number = new Interface('.number');
        this.number.css({
            letterSpacing: 1
        });
        this.number.text(this.fps);
        this.add(this.number);
    }

    initViews() {
        this.panel = new Panel();
        this.panel.css({
            position: 'absolute',
            top: 0,
            right: 10
        });
        this.add(this.panel);
    }

    addListeners() {
        Stage.events.on('color_picker', this.onColorPicker);
        this.element.addEventListener('mouseenter', this.onHover);
        this.element.addEventListener('mouseleave', this.onHover);
        window.addEventListener('pointerdown', this.onPointerDown);
    }

    removeListeners() {
        Stage.events.off('color_picker', this.onColorPicker);
        this.element.removeEventListener('mouseenter', this.onHover);
        this.element.removeEventListener('mouseleave', this.onHover);
        window.removeEventListener('pointerdown', this.onPointerDown);
    }

    // Event handlers

    onColorPicker = ({ open, target }) => {
        if (!this.openColor && !this.element.contains(target.element)) {
            return;
        }

        if (open) {
            this.disable();

            this.openColor = target;
        } else {
            this.enable();

            this.openColor = null;
        }
    };

    onHover = ({ type }) => {
        if (this.isOpen) {
            return;
        }

        if (type === 'mouseenter') {
            this.isOpen = true;
            this.css({ pointerEvents: 'none' });
            this.panel.animateIn();
        }
    };

    onPointerDown = e => {
        if (!this.isOpen) {
            return;
        }

        this.lastTime = performance.now();
        this.lastMouse.set(e.clientX, e.clientY);

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
    };

    onPointerUp = e => {
        window.removeEventListener('pointerup', this.onPointerUp);
        window.removeEventListener('pointermove', this.onPointerMove);

        if (!this.isOpen) {
            return;
        }

        this.onPointerMove(e);

        if (performance.now() - this.lastTime > 250 || this.delta.length() > 50) {
            return;
        }

        if (this.openColor && !this.openColor.element.contains(e.target)) {
            Stage.events.emit('color_picker', { open: false, target: this });
        } else if (!this.element.contains(e.target)) {
            this.panel.animateOut(() => {
                this.isOpen = false;
                this.css({ pointerEvents: 'auto' });
            });
        }
    };

    // Public methods

    update = () => {
        this.time = performance.now();

        if (this.time - 1000 > this.prev) {
            this.prev = this.time;
            this.fps = this.count;
            this.count = 0;
        }

        this.count++;

        this.number.text(this.fps);
    };

    enable = () => {
        this.number.tween({ opacity: 1 }, 400, 'easeInOutSine');
    };

    disable = () => {
        this.number.tween({ opacity: 0.35 }, 400, 'easeInOutSine');
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
