/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';
import { Stage } from '../utils/Stage.js';
import { Header } from './Header.js';

import { ticker } from '../tween/Ticker.js';

export class UI extends Interface {
    constructor({
        fps = false
    } = {}) {
        super('.ui');

        this.fps = fps;

        if (!Stage.root) {
            Stage.root = document.querySelector(':root');
            Stage.rootStyle = getComputedStyle(Stage.root);
        }

        this.invertColors = {
            light: Stage.rootStyle.getPropertyValue('--ui-invert-light-color').trim(),
            lightTriplet: Stage.rootStyle.getPropertyValue('--ui-invert-light-color-triplet').trim(),
            lightLine: Stage.rootStyle.getPropertyValue('--ui-invert-light-color-line').trim(),
            dark: Stage.rootStyle.getPropertyValue('--ui-invert-dark-color').trim(),
            darkTriplet: Stage.rootStyle.getPropertyValue('--ui-invert-dark-color-triplet').trim(),
            darkLine: Stage.rootStyle.getPropertyValue('--ui-invert-dark-color-line').trim()
        };

        this.startTime = performance.now();

        this.initHTML();
        this.initViews();
    }

    initHTML() {
        this.css({
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            color: 'var(--ui-color)',
            pointerEvents: 'none'
        });
    }

    initViews() {
        if (this.fps) {
            this.header = new Header();
            this.add(this.header);
        }
    }

    // Public methods

    addPanel = item => {
        if (this.header) {
            this.header.info.panel.add(item);
        }
    };

    setPanelValue = (label, value) => {
        if (this.header) {
            this.header.info.panel.setPanelValue(label, value);
        }
    };

    setPanelIndex = (label, index) => {
        if (this.header) {
            this.header.info.panel.setPanelIndex(label, index);
        }
    };

    invert = isInverted => {
        Stage.root.style.setProperty('--ui-color', isInverted ? this.invertColors.light : this.invertColors.dark);
        Stage.root.style.setProperty('--ui-color-triplet', isInverted ? this.invertColors.lightTriplet : this.invertColors.darkTriplet);
        Stage.root.style.setProperty('--ui-color-line', isInverted ? this.invertColors.lightLine : this.invertColors.darkLine);

        Stage.events.emit('invert', { invert: isInverted });
    };

    update = () => {
        if (!ticker.isAnimating) {
            ticker.onTick(performance.now() - this.startTime);
        }

        if (this.header) {
            this.header.info.update();
        }
    };

    animateIn = () => {
        if (this.header) {
            this.header.animateIn();
        }
    };

    animateOut = () => {
        if (this.header) {
            this.header.animateOut();
        }
    };
}
