/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';

export class PhysicalMaterialClearcoatPanel extends Panel {
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
            {
                type: 'slider',
                label: 'Int',
                min: 0,
                max: 1,
                step: 0.01,
                value: mesh.material.clearcoat,
                callback: value => {
                    mesh.material.clearcoat = value;
                }
            },
            {
                type: 'slider',
                label: 'Rough',
                min: 0,
                max: 1,
                step: 0.01,
                value: mesh.material.clearcoatRoughness,
                callback: value => {
                    mesh.material.clearcoatRoughness = value;
                }
            }
            // TODO: Texture thumbnails
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
