/**
 * @author pschroen / https://ufo.ai/
 */

import { Vector2 } from '../math/Vector2.js';
import { Interface } from '../utils/Interface.js';
import { ReticleText } from './ReticleText.js';

export class Reticle extends Interface {
    constructor({
        noText = true
    } = {}) {
        super('.reticle');

        this.noText = noText;

        const size = 10;

        this.width = size;
        this.height = size;

        this.position = new Vector2();
        this.target = new Vector2();
        this.lerpSpeed = 1;

        this.initHTML();
        this.initViews();
    }

    initHTML() {
        this.invisible();
        this.css({
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: this.width,
            height: this.height,
            marginLeft: -this.width / 2,
            marginTop: -this.height / 2,
            pointerEvents: 'none',
            webkitUserSelect: 'none',
            userSelect: 'none'
        });

        this.center = new Interface('.center');
        this.center.css({
            position: 'absolute',
            boxSizing: 'border-box',
            left: '50%',
            top: '50%',
            width: this.width,
            height: this.height,
            marginLeft: -this.width / 2,
            marginTop: -this.height / 2,
            border: `${window.devicePixelRatio > 1 ? 1.5 : 1}px solid var(--ui-color)`,
            borderRadius: '50%'
        });
        this.add(this.center);
    }

    initViews() {
        if (!this.noText) {
            this.text = new ReticleText();
            this.add(this.text);
        }
    }

    // Public methods

    setData = data => {
        this.text.setData(data);
    };

    update = () => {
        this.position.lerp(this.target, this.lerpSpeed);

        this.css({ left: Math.round(this.position.x), top: Math.round(this.position.y) });
    };

    animateIn = () => {
        this.clearTween().visible().css({ scale: 0.25, opacity: 0 }).tween({ scale: 1, opacity: 1 }, 400, 'easeOutCubic');
    };

    animateOut = () => {
        this.clearTween().tween({ scale: 0, opacity: 0 }, 500, 'easeInCubic', () => {
            this.invisible();
        });
    };
}
