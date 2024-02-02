/**
 * @author pschroen / https://ufo.ai/
 */

import { Vector2 } from '../math/Vector2.js';
import { Interface } from '../utils/Interface.js';
import { Stage } from '../utils/Stage.js';
import { PointText } from './PointText.js';

import { defer, tween } from '../tween/Tween.js';

export class Point extends Interface {
    constructor(panel, tracker) {
        super('.point');

        this.panel = panel;
        this.tracker = tracker;

        this.position = new Vector2();
        this.origin = new Vector2();
        this.originPosition = new Vector2();
        this.target = new Vector2();
        this.mouse = new Vector2();
        this.delta = new Vector2();
        this.lastTime = null;
        this.lastMouse = new Vector2();
        this.lastOrigin = new Vector2();
        this.lerpSpeed = 0.07;
        this.openColor = null;
        this.isOpen = false;
        this.isMove = false;

        this.initHTML();
        this.initViews();

        this.addListeners();
    }

    initHTML() {
        this.invisible();
        this.css({
            position: 'absolute',
            pointerEvents: 'auto',
            webkitUserSelect: 'none',
            userSelect: 'none'
        });
    }

    initViews() {
        this.text = new PointText();
        this.add(this.text);
    }

    addListeners() {
        Stage.events.on('color_picker', this.onColorPicker);
        this.text.container.element.addEventListener('mouseenter', this.onHover);
        this.text.container.element.addEventListener('mouseleave', this.onHover);
        window.addEventListener('pointerdown', this.onPointerDown);
    }

    removeListeners() {
        Stage.events.off('color_picker', this.onColorPicker);
        this.text.container.element.removeEventListener('mouseenter', this.onHover);
        this.text.container.element.removeEventListener('mouseleave', this.onHover);
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

    onHover = async ({ type }) => {
        await defer();

        if (type === 'mouseenter') {
            this.panel.onHover({ type: 'over', isPoint: true });
        } else {
            this.panel.onHover({ type: 'out', isPoint: true });
        }
    };

    onPointerDown = e => {
        if (!this.isOpen) {
            return;
        }

        if (this.text.container.element.contains(e.target)) {
            this.lastTime = performance.now();
            this.lastMouse.set(e.clientX, e.clientY);
            this.lastOrigin.copy(this.origin);

            this.onPointerMove(e);

            window.addEventListener('pointermove', this.onPointerMove);
            window.addEventListener('pointerup', this.onPointerUp);
        }
    };

    onPointerMove = ({ clientX, clientY }) => {
        const event = {
            x: clientX,
            y: clientY
        };

        this.mouse.copy(event);
        this.delta.subVectors(this.mouse, this.lastMouse);
        this.origin.addVectors(this.lastOrigin, this.delta);

        this.isMove = true;
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
        }

        if (this.tracker && this.tracker.isVisible && this.text.container.element.contains(e.target)) {
            if (!this.tracker.animatedIn) {
                this.panel.show();
            } else if (!this.tracker.locked) {
                this.panel.lock();
            } else {
                this.panel.unlock();
                this.panel.hide();
            }
        }
    };

    // Public methods

    setData = data => {
        this.text.setData(data);
    };

    setTargetNumbers = targetNumbers => {
        this.text.setTargetNumbers(targetNumbers);
    };

    update = () => {
        if (!this.isMove) {
            this.position.lerp(this.target, this.lerpSpeed);
        }

        this.originPosition.addVectors(this.origin, this.position);

        this.css({ left: Math.round(this.originPosition.x), top: Math.round(this.originPosition.y) });
    };

    lock = () => {
        this.text.lock();
    };

    unlock = () => {
        this.text.unlock();
    };

    open = () => {
        this.text.open();

        this.isOpen = true;
    };

    close = fast => {
        if (fast) {
            this.clearTimeout(this.timeout);
            this.timeout = this.delayedCall(300, () => {
                this.origin.set(0, 0);

                this.isOpen = false;
                this.isMove = false;
            });
        } else {
            tween(this.origin, { x: 0, y: 0 }, 400, 'easeOutCubic');

            this.isOpen = false;
            this.isMove = false;
        }

        this.text.close();
    };

    animateIn = () => {
        this.visible();
        this.clearTween().css({ opacity: 1 });
        this.text.animateIn();
    };

    animateOut = () => {
        this.text.animateOut(() => {
            this.invisible();
        });
    };

    enable = () => {
        this.text.container.tween({ opacity: 1 }, 400, 'easeInOutSine');
    };

    disable = () => {
        this.text.container.tween({ opacity: 0.35 }, 400, 'easeInOutSine');
    };

    active = () => {
        this.clearTween().tween({ opacity: 1 }, 300, 'easeOutSine');
    };

    inactive = () => {
        this.clearTween().tween({ opacity: 0 }, 300, 'easeOutSine');
        this.close(true);
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
