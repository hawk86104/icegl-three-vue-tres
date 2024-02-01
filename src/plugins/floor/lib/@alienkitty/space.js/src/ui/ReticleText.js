/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';

export class ReticleText extends Interface {
    constructor() {
        super('.text');

        this.initHTML();
    }

    initHTML() {
        this.css({
            position: 'absolute',
            left: 20,
            top: -3
        });

        this.primary = new Interface('.primary');
        this.primary.css({
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 18,
            letterSpacing: 'var(--ui-number-letter-spacing)',
            whiteSpace: 'nowrap'
        });
        this.add(this.primary);

        this.secondary = new Interface('.secondary');
        this.secondary.css({
            fontSize: 'var(--ui-secondary-font-size)',
            letterSpacing: 'var(--ui-secondary-letter-spacing)',
            paddingBottom: 3,
            opacity: 0.7
        });
        this.add(this.secondary);
    }

    // Public methods

    setData = data => {
        if (!data) {
            return;
        }

        if (data.primary) {
            this.primary.html(data.primary);
        }

        if (data.secondary) {
            this.secondary.html(data.secondary);
        }
    };
}
