import { HeaderInfo, Interface } from '@alienkitty/space.js/three';

import { Config } from '../../config/Config.js';
import { NavLink } from './NavLink.js';

export class Header extends Interface {
    constructor() {
        super('.header');

        this.initHTML();
        this.initViews();

        this.addListeners();
        this.onResize();
    }

    initHTML() {
        this.css({
            position: 'absolute',
            left: 20,
            top: 20,
            right: 20
        });
    }

    initViews() {
        this.about = new NavLink('Space.js', 'https://github.com/alienkitty/space.js');
        this.about.css({
            x: -10,
            opacity: 0
        });
        this.add(this.about);

        this.info = new HeaderInfo();
        this.info.css({
            x: -10,
            opacity: 0
        });
        this.add(this.info);
    }

    addListeners() {
        window.addEventListener('resize', this.onResize);
    }

    removeListeners() {
        window.removeEventListener('resize', this.onResize);
    }

    // Event handlers

    onResize = () => {
        if (document.documentElement.clientWidth < Config.BREAKPOINT) {
            this.css({
                left: 10,
                top: 10,
                right: 10
            });
        } else {
            this.css({
                left: 20,
                top: 20,
                right: 20
            });
        }
    };

    // Public methods

    animateIn = () => {
        this.about.tween({ x: 0, opacity: 1 }, 1000, 'easeOutQuart');
        this.info.tween({ x: 0, opacity: 1 }, 1000, 'easeOutQuart', 200);
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
