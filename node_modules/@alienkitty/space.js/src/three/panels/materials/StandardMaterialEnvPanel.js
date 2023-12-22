/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';

export class StandardMaterialEnvPanel extends Panel {
    constructor(mesh) {
        super();

        this.mesh = mesh;

        this.initPanel();
    }

    initPanel() {
        const mesh = this.mesh;

        const items = [
            {
                type: 'divider'
            },
            // TODO: Texture thumbnails
            {
                type: 'slider',
                label: 'Int',
                min: 0,
                max: 10,
                step: 0.1,
                value: mesh.material.envMapIntensity,
                callback: value => {
                    mesh.material.envMapIntensity = value;
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
