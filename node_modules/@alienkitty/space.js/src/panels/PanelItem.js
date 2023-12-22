/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';
import { Link } from './Link.js';
import { List } from './List.js';
import { Slider } from './Slider.js';
import { Content } from './Content.js';
import { ColorPicker } from './ColorPicker.js';

export class PanelItem extends Interface {
    constructor(data) {
        super('.panel-item');

        this.data = data;

        this.initHTML();
    }

    initHTML() {
        this.css({
            width: 108
        });

        this.container = new Interface('.container');
        this.container.css({
            boxSizing: 'border-box'
        });
        this.add(this.container);

        if (!this.data.type) {
            this.container.css({
                margin: '10px 0'
            });

            this.text = new Interface('.text');
            this.text.css({
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
            });
            this.text.text(this.data.label);
            this.container.add(this.text);
        } else if (this.data.type === 'spacer') {
            this.container.css({
                height: 7
            });
        } else if (this.data.type === 'divider') {
            this.container.css({
                margin: '6px 0'
            });

            this.line = new Interface('.line');
            this.line.css({
                height: 1,
                backgroundColor: 'rgba(var(--ui-color-triplet), 0.25)',
                transformOrigin: 'left center'
            });
            this.container.add(this.line);
        } else if (this.data.type === 'link') {
            this.container.css({
                margin: '2px 0 0'
            });

            this.view = new Link(this.data);
            this.view.events.on('update', this.onUpdate);
            this.container.add(this.view);
        } else if (this.data.type === 'list') {
            this.container.css({
                margin: '2px 0 0'
            });

            this.view = new List(this.data);
            this.view.events.on('update', this.onUpdate);
            this.container.add(this.view);
        } else if (this.data.type === 'slider') {
            this.view = new Slider(this.data);
            this.view.events.on('update', this.onUpdate);
            this.container.add(this.view);
        } else if (this.data.type === 'content') {
            this.view = new Content(this.data);
            this.view.events.on('update', this.onUpdate);
            this.container.add(this.view);
        } else if (this.data.type === 'color') {
            this.container.css({
                height: 19,
                margin: '0 0 7px'
            });

            this.view = new ColorPicker(this.data);
            this.view.events.on('update', this.onUpdate);
            this.container.add(this.view);
        }
    }

    removeListeners() {
        if (this.view) {
            this.view.events.off('update', this.onUpdate);
        }
    }

    // Event handlers

    onUpdate = e => {
        this.events.emit('update', e);
    };

    // Public methods

    animateIn = (delay, fast) => {
        this.clearTween();

        if (fast) {
            this.css({ y: 0, opacity: 1 });
        } else {
            this.css({ y: -10, opacity: 0 }).tween({ y: 0, opacity: 1 }, 400, 'easeOutCubic', delay);
        }
    };

    animateOut = (index, total, delay, callback) => {
        this.clearTween().tween({ y: -10, opacity: 0 }, 500, 'easeInCubic', delay, () => {
            if (index === 0 && callback) {
                callback();
            }
        });
    };

    enable = (target = this.container) => {
        target.clearTween();
        target.tween({ opacity: 1 }, 500, 'easeInOutSine', () => {
            target.css({ pointerEvents: 'auto' });
        });
    };

    disable = (target = this.container) => {
        target.clearTween();
        target.css({ pointerEvents: 'none' });
        target.tween({ opacity: 0.35 }, 500, 'easeInOutSine');
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
