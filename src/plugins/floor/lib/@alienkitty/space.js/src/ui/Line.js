/**
 * @author pschroen / https://ufo.ai/
 */

import { Vector2 } from '../math/Vector2.js';
import { Component } from '../utils/Component.js';

import { clearTween, tween } from '../tween/Tween.js';

export class Line extends Component {
    constructor(context) {
        super();

        this.context = context;

        this.start = new Vector2();
        this.end = new Vector2();

        this.props = {
            alpha: 0,
            start: 0,
            offset: 0,
            progress: 0
        };
    }

    // Public methods

    startPoint = ({ x, y }) => {
        this.start.set(x + 3, y - 3);
    };

    endPoint = position => {
        this.end.copy(position);
    };

    resize = () => {
        // Context properties need to be reassigned after resize
        this.context.lineWidth = 1.5;
        this.context.strokeStyle = getComputedStyle(document.querySelector(':root')).getPropertyValue('--ui-color-line').trim();

        this.update();
    };

    update = () => {
        if (this.props.alpha <= 0) {
            return;
        }

        if (this.props.alpha < 0.001) {
            this.props.alpha = 0;
        }

        this.context.globalAlpha = this.props.alpha;

        const length = this.start.distanceTo(this.end);
        const dash = length * this.props.progress;
        const gap = length - dash;
        const offset = -length * (this.props.start + this.props.offset);

        this.context.setLineDash([dash, gap]);
        this.context.lineDashOffset = offset;

        this.context.beginPath();
        this.context.moveTo(this.start.x, this.start.y);
        this.context.lineTo(this.end.x, this.end.y);
        this.context.stroke();
    };

    animateIn = reverse => {
        clearTween(this.props);

        tween(this.props, { alpha: 1 }, 500, 'easeOutSine');

        if (reverse) {
            this.props.start = 1;
            this.props.progress = 0;

            tween(this.props, { start: 0 }, 500, 'easeInCubic', null, () => {
                this.props.progress = 1 - this.props.start;
            });
        } else {
            this.props.start = 0;
            this.props.progress = 0;

            tween(this.props, { progress: 1 }, 400, 'easeOutCubic');
        }
    };

    animateOut = (fast, callback) => {
        let time;
        let ease;

        if (fast) {
            time = 400;
            ease = 'easeOutCubic';
        } else {
            time = 500;
            ease = 'easeInCubic';
        }

        clearTween(this.props);

        tween(this.props, { start: 1 }, time, ease, () => {
            this.props.alpha = 0;
            this.props.start = 0;

            if (callback) {
                callback();
            }
        }, () => {
            this.props.progress = 1 - this.props.start;
        });
    };

    inactive = () => {
        clearTween(this.props);
        tween(this.props, { alpha: 0 }, 300, 'easeOutSine');
    };
}
