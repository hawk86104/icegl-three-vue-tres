/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';

export class PhysicalMaterialIridescencePanel extends Panel {
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
                value: mesh.material.iridescence,
                callback: value => {
                    mesh.material.iridescence = value;
                }
            },
            {
                type: 'slider',
                label: 'IOR',
                min: 1,
                max: 2.333,
                step: 0.01,
                value: mesh.material.iridescenceIOR,
                callback: value => {
                    mesh.material.iridescenceIOR = value;
                }
            },
            {
                type: 'slider',
                label: 'Thick Min',
                min: 0,
                max: 1400,
                step: 100,
                value: mesh.material.iridescenceThicknessRange[0],
                callback: value => {
                    mesh.material.iridescenceThicknessRange[0] = value;
                }
            },
            {
                type: 'slider',
                label: 'Thick Max',
                min: 0,
                max: 1400,
                step: 100,
                value: mesh.material.iridescenceThicknessRange[1],
                callback: value => {
                    mesh.material.iridescenceThicknessRange[1] = value;
                }
            }
            // TODO: Texture thumbnails
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
