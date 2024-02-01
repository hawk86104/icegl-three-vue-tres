/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';

export class PhysicalMaterialAnisotropyPanel extends Panel {
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
                value: mesh.material.anisotropy,
                callback: value => {
                    mesh.material.anisotropy = value;
                }
            },
            {
                type: 'slider',
                label: 'Angle',
                min: 0,
                max: Math.PI / 2,
                step: 0.01,
                value: mesh.material.anisotropyRotation,
                callback: value => {
                    mesh.material.anisotropyRotation = value;
                }
            }
            // TODO: Texture thumbnails
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
