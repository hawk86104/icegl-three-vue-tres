import { Interface } from '@alienkitty/space.js/three';

export class NavLink extends Interface {
    constructor(title, link) {
        super('.link', 'a');

        this.title = title;
        this.link = link;
        this.letters = [];

        this.initHTML();
        this.initText();

        this.addListeners();
    }

    initHTML() {
        this.css({
            cssFloat: 'left',
            padding: 10,
            fontWeight: '700',
            fontSize: 11,
            lineHeight: 18,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
            webkitUserSelect: 'none',
            userSelect: 'none'
        });
        this.attr({ href: this.link });
    }

    initText() {
        const split = this.title.split('');
        split.forEach(str => {
            if (str === ' ') {
                str = '&nbsp';
            }

            const letter = new Interface(null, 'span');
            letter.css({ display: 'inline-block' });
            letter.html(str);
            this.add(letter);

            this.letters.push(letter);
        });
    }

    addListeners() {
        this.element.addEventListener('mouseenter', this.onHover);
        this.element.addEventListener('mouseleave', this.onHover);
        this.element.addEventListener('click', this.onClick);
    }

    removeListeners() {
        this.element.removeEventListener('mouseenter', this.onHover);
        this.element.removeEventListener('mouseleave', this.onHover);
        this.element.removeEventListener('click', this.onClick);
    }

    // Event handlers

    onHover = ({ type }) => {
        if (type === 'mouseenter') {
            this.letters.forEach((letter, i) => {
                letter.clearTween().tween({ y: -5, opacity: 0 }, 125, 'easeOutCubic', i * 15, () => {
                    letter.css({ y: 5 }).tween({ y: 0, opacity: 1 }, 300, 'easeOutCubic');
                });
            });
        }
    };

    onClick = () => {
        this.events.emit('click');
    };

    // Public methods

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
