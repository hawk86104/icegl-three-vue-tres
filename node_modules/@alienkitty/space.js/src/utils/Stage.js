/**
 * @author pschroen / https://ufo.ai/
 */

import { Interface } from './Interface.js';

import { ticker } from '../tween/Ticker.js';

export var Stage;

if (typeof window !== 'undefined') {
    Stage = new Interface(null, null);

    function addListeners() {
        window.addEventListener('popstate', onPopState);

        ticker.start();
    }

    // Event handlers

    function onPopState(e) {
        Stage.path = location.pathname;

        Stage.events.emit('state_change', e);
    }

    // Public methods

    Stage.init = (element = document.body) => {
        Stage.element = element;

        Stage.root = document.querySelector(':root');
        Stage.rootStyle = getComputedStyle(Stage.root);

        addListeners();
        onPopState();
    };

    Stage.setPath = path => {
        if (path === location.pathname) {
            return;
        }

        history.pushState(null, null, path);

        onPopState();
    };

    Stage.setTitle = title => {
        document.title = title;
    };
}
