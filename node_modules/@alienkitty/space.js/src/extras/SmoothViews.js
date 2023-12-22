/**
 * @author pschroen / https://ufo.ai/
 */

import { Component } from '../utils/Component.js';

import { ticker } from '../tween/Ticker.js';
import { defer } from '../tween/Tween.js';
import { clamp, lerp } from '../utils/Utils.js';

export class SmoothViews extends Component {
    constructor({
        views,
        root,
        container,
        sections,
        lerpSpeed = 0.1
    } = {}) {
        super();

        this.views = views;
        this.root = root;
        this.container = container;
        this.sections = sections;
        this.lerpSpeed = lerpSpeed;

        this.position = 0;
        this.last = 0;
        this.delta = 0;
        this.direction = 0;
        this.index1 = 0;
        this.index2 = 0;
        this.progress = 0;
        this.total = 0;
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

        this.height = 0;

        for (let i = 0, l = this.sections.length; i < l; i++) {
            const view = this.views[i];
            const section = this.sections[i];

            view.top = this.height;
            view.height = section.element.getBoundingClientRect().height;

            this.height += view.height;
        }

        document.body.style.height = `${this.height}px`;

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

        let height = 0;

        for (let i = 0, l = this.views.length; i < l; i++) {
            height += this.views[i].height;

            if (this.position < height) {
                this.index1 = i;
                this.index2 = i + 1;

                if (this.index2 > l - 1) {
                    this.index2 = l - 1;
                }

                break;
            }
        }

        const current = this.position + this.views[this.index2].height - this.views[this.index2].top;
        this.progress = clamp(current / this.views[this.index2].height, 0, 1);

        this.total = clamp(this.position / (this.height - document.documentElement.clientHeight), 0, 1);
    };

    // Public methods

    setScroll = index => {
        document.scrollingElement.scrollTop = this.views[index].top;
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
