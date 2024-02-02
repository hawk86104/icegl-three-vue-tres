/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';
import { TargetNumber } from './TargetNumber.js';
import { Panel } from '../panels/Panel.js';

export class PointText extends Interface {
    constructor() {
        super('.text');

        this.numbers = [];
        this.locked = false;

        this.initHTML();
        this.initViews();
    }

    initHTML() {
        this.css({
            position: 'absolute',
            left: 10,
            top: -15,
            pointerEvents: 'none'
        });

        this.container = new Interface('.container');
        this.container.css({
            position: 'relative',
            cursor: 'move',
            zIndex: 1
        });
        this.add(this.container);

        this.name = new Interface('.name');
        this.name.css({
            lineHeight: 18,
            whiteSpace: 'nowrap'
        });
        this.container.add(this.name);

        this.type = new Interface('.type');
        this.type.css({
            fontSize: 'var(--ui-secondary-font-size)',
            letterSpacing: 'var(--ui-secondary-letter-spacing)',
            paddingBottom: 3,
            opacity: 0.7
        });
        this.container.add(this.type);

        this.targetNumbers = new Interface('.numbers');
        this.targetNumbers.css({
            position: 'absolute',
            left: -28,
            top: 0,
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,
            paddingTop: 3
        });
        this.container.add(this.targetNumbers);
    }

    initViews() {
        this.panel = new Panel();
        this.add(this.panel);
    }

    // Public methods

    setData = data => {
        if (!data) {
            return;
        }

        if (data.name) {
            this.name.html(data.name);
        }

        if (data.type) {
            this.type.html(data.type);
        }
    };

    setTargetNumbers = targetNumbers => {
        this.targetNumbers.empty();
        this.numbers.length = 0;

        targetNumbers.forEach(targetNumber => {
            const number = new TargetNumber();
            number.setData({ targetNumber });
            this.targetNumbers.add(number);
            this.numbers.push(number);
        });

        if (this.locked) {
            this.numbers.forEach(number => {
                number.visible();
            });
        }
    };

    lock = () => {
        this.numbers.forEach(number => {
            number.animateIn();
        });

        this.locked = true;
    };

    unlock = () => {
        this.numbers.forEach(number => {
            number.animateOut();
        });

        this.locked = false;
    };

    open = () => {
        this.css({ pointerEvents: 'auto' });

        this.clearTween().tween({ left: 48, opacity: 1 }, 400, 'easeOutCubic');

        if (this.locked) {
            this.numbers.forEach(number => {
                number.animateIn(100);
            });
        }

        this.panel.animateIn();
        this.panel.active();
    };

    close = () => {
        this.css({ pointerEvents: 'none' });

        this.clearTween().tween({ left: 10, opacity: 1 }, 400, 'easeInCubic', 200);

        this.numbers.forEach(number => {
            number.animateOut();
        });

        this.panel.animateOut();
        this.panel.inactive();
    };

    animateIn = () => {
        this.clearTween().css({ opacity: 0 }).tween({ left: 10, opacity: 1 }, 400, 'easeOutCubic', 200);
    };

    animateOut = callback => {
        this.clearTween().tween({ opacity: 0 }, 500, 'easeInCubic', 200, callback);
    };
}
