import { Interface } from '@alienkitty/space.js/three';

import { ProgressCanvas } from './ui/ProgressCanvas.js';

export class PreloaderView extends Interface {
    constructor() {
        super('.preloader');

        this.initHTML();
        this.initView();

        this.addListeners();
    }

    initHTML() {
        this.css({
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--bg-color)',
            zIndex: 100,
            pointerEvents: 'none'
        });
    }

    initView() {
        this.view = new ProgressCanvas();
        this.view.css({
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -this.view.width / 2,
            marginTop: -this.view.height / 2
        });
        this.add(this.view);
    }

    addListeners() {
        this.view.events.on('complete', this.onComplete);
    }

    removeListeners() {
        this.view.events.off('complete', this.onComplete);
    }

    // Event handlers

    onProgress = e => {
        this.view.onProgress(e);
    };

    onComplete = () => {
        this.events.emit('complete');
    };

    // Public methods

    animateIn = () => {
        this.view.animateIn();
    };

    animateOut = () => {
        this.view.animateOut();
        return this.tween({ opacity: 0 }, 250, 'easeOutSine', 500);
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
