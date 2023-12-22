/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://gist.github.com/jesperlandberg/dd2cb6c6d7c928601b7f0229db818171
 */

import { Component } from '../utils/Component.js';

import { ticker } from '../tween/Ticker.js';
import { defer } from '../tween/Tween.js';
import { clamp, lerp } from '../utils/Utils.js';

export class Smooth extends Component {
    constructor({
        root,
        container,
        lerpSpeed = 0.1
    } = {}) {
        super();

        this.root = root;
        this.container = container;
        this.lerpSpeed = lerpSpeed;

        this.position = 0;
        this.last = 0;
        this.delta = 0;
        this.direction = 0;
        this.progress = 0;
        this.height = 0;

        this.initHTML();

        this.enable();
    }

    initHTML() {
        if (!navigator.maxTouchPoints) {
            this.root.css({
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            });

            this.container.css({ willChange: 'transform' });
        }
    }

    addListeners() {
        window.addEventListener('resize', this.onResize);
        ticker.add(this.onUpdate);
    }

    removeListeners() {
        window.removeEventListener('resize', this.onResize);
        ticker.remove(this.onUpdate);
    }

    // Event handlers

    onResize = async () => {
        await defer();

        const { height } = this.container.element.getBoundingClientRect();

        document.body.style.height = `${height}px`;

        this.height = height;
        this.position = document.scrollingElement.scrollTop;
    };

    onUpdate = () => {
        if (!navigator.maxTouchPoints) {
            this.position = lerp(this.position, document.scrollingElement.scrollTop, this.lerpSpeed);
        } else {
            this.position = document.scrollingElement.scrollTop;
        }

        this.delta = this.position - this.last;
        this.last = this.position;
        this.direction = Math.sign(this.delta);

        if (Math.abs(this.delta) < 0.001) {
            return;
        }

        if (!navigator.maxTouchPoints) {
            this.container.css({ y: -Math.round(this.position) });
        }

        this.progress = clamp(this.position / (this.height - document.documentElement.clientHeight), 0, 1);
    };

    // Public methods

    setScroll = top => {
        document.scrollingElement.scrollTop = top;
    };

    enable = () => {
        this.addListeners();
        this.onResize();
    };

    disable = () => {
        this.removeListeners();

        document.body.style.height = '';
    };

    destroy = () => {
        this.disable();

        return super.destroy();
    };
}
