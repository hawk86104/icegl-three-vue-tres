/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from '../utils/Interface.js';
import { ListToggle } from './ListToggle.js';
import { ListSelect } from './ListSelect.js';

export class List extends Interface {
    constructor({
        label,
        list,
        value,
        callback
    }) {
        super('.list');

        this.label = label;
        this.list = list;
        this.keys = Object.keys(this.list);
        this.values = Object.values(this.list);
        this.index = this.keys.indexOf(value);
        this.callback = callback;

        this.items = [];

        this.initHTML();
        this.initViews();

        this.update();
    }

    initHTML() {
        this.container = new Interface('.container');
        this.container.css({
            height: 20
        });
        this.add(this.container);
    }

    initViews() {
        if (this.keys.length > 2) {
            const item = new ListSelect({ list: this.keys, index: this.index });
            item.events.on('click', this.onClick);
            this.container.add(item);
            this.items.push(item);
        } else {
            this.keys.forEach((label, index) => {
                const item = new ListToggle({ label, index });
                item.events.on('click', this.onClick);
                this.container.add(item);
                this.items.push(item);
            });
        }
    }

    removeListeners() {
        this.items.forEach(item => {
            item.events.off('click', this.onClick);
        });
    }

    // Event handlers

    onClick = ({ target }) => {
        this.index = target.index;

        this.update();
    };

    onUpdate = e => {
        e.path.unshift([this.label, this.index]);

        this.events.emit('update', e);
    };

    // Public methods

    setContent = content => {
        content.events.on('update', this.onUpdate);

        if (!this.group) {
            this.group = new Interface('.group');
            this.group.css({
                position: 'relative'
            });
            this.add(this.group);
        }

        const oldGroup = this.group;

        const newGroup = this.group.clone();
        newGroup.add(content);

        this.replace(oldGroup, newGroup);
        this.group = newGroup;

        oldGroup.destroy();
    };

    setValue = value => {
        this.index = this.values.indexOf(value);

        if (this.keys.length > 2) {
            this.items[0].setIndex(this.index);
        }

        this.update();
    };

    setIndex = index => {
        this.index = index;

        if (this.keys.length > 2) {
            this.items[0].setIndex(this.index);
        }

        this.update();
    };

    update = () => {
        const value = this.keys[this.index];

        this.events.emit('update', { path: [], index: this.index, target: this });

        if (this.callback) {
            this.callback(value, this);
        }

        if (this.keys.length > 2) {
            return;
        }

        const target = this.items[this.index];

        if (target && !target.clicked) {
            target.active();
        }

        this.items.forEach(item => {
            if (item !== target && item.clicked) {
                item.inactive();
            }
        });
    };

    destroy = () => {
        this.removeListeners();

        return super.destroy();
    };
}
