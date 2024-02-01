/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';
import { Stage } from '../utils/Stage.js';

export class Panel extends Interface {
    constructor() {
        super('.panel');

        this.items = [];
        this.animatedIn = false;
        this.openColor = null;

        this.initHTML();

        this.addListeners();
    }

    initHTML() {
        this.hide();
        this.css({
            fontFamily: 'var(--ui-font-family)',
            fontWeight: 'var(--ui-font-weight)',
            fontSize: 'var(--ui-font-size)',
            lineHeight: 'var(--ui-line-height)',
            letterSpacing: 'var(--ui-letter-spacing)',
            pointerEvents: 'auto',
            webkitUserSelect: 'none',
            userSelect: 'none'
        });
    }

    addListeners() {
        Stage.events.on('color_picker', this.onColorPicker);
    }

    removeListeners() {
        Stage.events.off('color_picker', this.onColorPicker);

        this.items.forEach(item => {
            item.events.off('update', this.onUpdate);
        });
    }

    // Event handlers

    onColorPicker = ({ open, target }) => {
        if (!this.openColor && !this.element.contains(target.element)) {
            return;
        }

        if (open) {
            this.disable(target);

            this.openColor = target;
        } else {
            this.enable();

            this.openColor = null;
        }
    };

    onUpdate = e => {
        this.events.emit('update', e);
    };

    // Public methods

    add = item => {
        item.events.on('update', this.onUpdate);

        super.add(item);

        this.items.push(item);
    };

    setPanelValue = (label, value) => {
        this.items.forEach(item => {
            if (!item.view) {
                return;
            }

            if (item.data.label === label && item.view.setValue) {
                item.view.setValue(value, true);
                return;
            }

            if (item.view.group && item.view.group.children[0] && item.view.group.children[0].setPanelValue) {
                item.view.group.children[0].setPanelValue(label, value);
            }
        });
    };

    setPanelIndex = (label, index) => {
        this.items.forEach(item => {
            if (!item.view) {
                return;
            }

            if (item.data.label === label && item.view.setIndex) {
                item.view.setIndex(index);
                return;
            }

            if (item.view.group && item.view.group.children[0] && item.view.group.children[0].setPanelIndex) {
                item.view.group.children[0].setPanelIndex(label, index);
            }
        });
    };

    animateIn = fast => {
        this.show();

        this.items.forEach((item, i) => item.animateIn(i * 15, fast));

        this.animatedIn = true;
    };

    animateOut = callback => {
        if (!this.animatedIn) {
            return;
        }

        this.animatedIn = false;

        this.items.forEach((item, i) => {
            item.animateOut(i, this.items.length - 1, (this.items.length - 1 - i) * 15, () => {
                this.hide();

                if (callback) {
                    callback();
                }
            });
        });
    };

    enable = () => {
        this.items.forEach(item => {
            if (item.view && item.view.group && item.view.container) {
                item.enable(item.view.container);
            }

            item.enable();
        });
    };

    disable = target => {
        this.items.forEach(item => {
            if (item.view && item.view.group && item.view.container) {
                item.disable(item.view.container);
            }

            if (target && item.element.contains(target.element)) {
                return;
            }

            item.disable();
        });
    };

    active = () => {
        this.clearTween().tween({ opacity: 1 }, 300, 'easeOutSine');
    };

    inactive = () => {
        this.clearTween().tween({ opacity: 0 }, 300, 'easeOutSine');
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
