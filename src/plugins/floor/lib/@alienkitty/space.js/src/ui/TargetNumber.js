/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';

export class TargetNumber extends Interface {
    constructor() {
        super('.target-number');

        const size = window.devicePixelRatio > 1 ? 17 : 18;

        this.width = size;
        this.height = size;

        this.initHTML();
    }

    initHTML() {
        this.invisible();
        this.css({
            position: 'relative',
            boxSizing: 'border-box',
            width: this.width,
            height: this.height,
            border: `${window.devicePixelRatio > 1 ? 1.5 : 1}px solid var(--ui-color)`
        });

        this.number = new Interface('.number');
        this.number.css({
            position: 'absolute',
            left: window.devicePixelRatio > 1 ? 4 : 5,
            fontVariantNumeric: 'tabular-nums',
            lineHeight: this.height - (window.devicePixelRatio > 1 ? 3 : 2),
            letterSpacing: 'var(--ui-number-letter-spacing)',
            textAlign: 'center'
        });
        this.add(this.number);
    }

    // Public methods

    setData = data => {
        if (!data) {
            return;
        }

        if (data.targetNumber) {
            this.number.text(data.targetNumber);
        }
    };

    animateIn = delay => {
        this.clearTween().visible().css({ opacity: 0 }).tween({ opacity: 1 }, 400, 'easeOutCubic', delay);
    };

    animateOut = () => {
        this.clearTween().tween({ opacity: 0 }, 400, 'easeOutCubic', () => {
            this.invisible();
        });
    };
}
