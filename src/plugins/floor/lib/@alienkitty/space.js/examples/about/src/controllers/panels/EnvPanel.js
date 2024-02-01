import { Panel, PanelItem } from '@alienkitty/space.js/three';

export class EnvPanel extends Panel {
    constructor(scene) {
        super();

        this.scene = scene;

        this.initPanel();
    }

    initPanel() {
        const items = [
            {
                type: 'divider'
            }
            // TODO: Texture thumbnails
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
