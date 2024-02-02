/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';

export class ListToggle extends Interface {
    constructor({
        label,
        index
    }) {
        super('.list-toggle');

        this.label = label;
        this.index = index;

        this.clicked = false;

        this.initHTML();

        this.addListeners();
    }

    initHTML() {
        this.css({
            position: 'relative',
            cssFloat: 'left',
            width: 54,
            height: 20,
            lineHeight: 20,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            cursor: 'pointer'
        });

        this.text = new Interface('.text');
        this.text.css({
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.35
        });
        this.text.text(this.label);
        this.add(this.text);

        this.over = new Interface('.over');
        this.over.css({
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0
        });
        this.over.text(this.label);
        this.add(this.over);
    }

    addListeners() {
        this.element.addEventListener('mouseenter', this.onHover);
        this.element.addEventListener('mouseleave', this.onHover);
        this.element.addEventListener('click', this.onClick);
    }

    removeListeners() {
        this.element.removeEventListener('mouseenter', this.onHover);
        this.element.removeEventListener('mouseleave', this.onHover);
        this.element.removeEventListener('click', this.onClick);
    }

    // Event handlers

    onHover = ({ type }) => {
        if (this.clicked) {
            return;
        }

        this.text.clearTween();
        this.over.clearTween();

        if (type === 'mouseenter') {
            this.text.tween({ y: -8, opacity: 0 }, 100, 'easeOutCubic');
            this.over.css({ y: 8, opacity: 0 }).tween({ y: 0, opacity: 1 }, 175, 'easeOutCubic', 50);
        } else {
            this.text.tween({ y: 0, opacity: 0.35 }, 300, 'easeOutCubic', 50);
            this.over.tween({ y: 8, opacity: 0 }, 175, 'easeOutCubic');
        }
    };

    onClick = () => {
        this.events.emit('click', { target: this });
    };

    // Public methods

    active = () => {
        this.clicked = true;

        this.text.css({ y: -8, opacity: 0 });
        this.over.css({ y: 0, opacity: 1 });
    };

    inactive = () => {
        this.clicked = false;

        this.onHover({ type: 'mouseleave' });
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
