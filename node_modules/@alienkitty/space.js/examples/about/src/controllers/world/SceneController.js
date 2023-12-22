import { wait } from '@alienkitty/space.js/three';

import { RenderManager } from './RenderManager.js';

export class SceneController {
    static init(view) {
        this.view = view;
    }

    // Public methods

    static update = time => {
        if (!this.view.visible) {
            return;
        }

        this.view.update(time);
    };

    static animateIn = () => {
        this.view.animateIn();

        this.view.visible = true;
    };

    static ready = async () => {
        await this.view.ready();

        // Centre objects for prerender
        const currentPositions = this.view.children.map(object => object.position.clone());

        this.view.children.forEach(object => object.position.set(0, 0, 0));
        this.view.visible = true;

        RenderManager.update();

        await wait(500);

        // Restore positions
        this.view.visible = false;
        this.view.children.forEach((object, i) => object.position.copy(currentPositions[i]));
    };
}
