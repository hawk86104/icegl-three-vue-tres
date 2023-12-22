/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';

export class PhysicalMaterialTransmissionPanel extends Panel {
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
                value: mesh.material.transmission,
                callback: value => {
                    mesh.material.transmission = value;
                }
            },
            {
                type: 'slider',
                label: 'Thick',
                min: -10,
                max: 10,
                step: 0.1,
                value: mesh.material.thickness,
                callback: value => {
                    mesh.material.thickness = value;
                }
            },
            {
                type: 'color',
                label: 'Attenuation Color',
                value: mesh.material.attenuationColor,
                callback: value => {
                    mesh.material.attenuationColor.copy(value);
                }
            },
            {
                type: 'slider',
                label: 'Distance',
                min: -10,
                max: 10,
                step: 0.1,
                value: mesh.material.attenuationDistance,
                callback: value => {
                    mesh.material.attenuationDistance = value;
                }
            },
            {
                type: 'slider',
                label: 'IOR',
                min: 1,
                max: 2.333,
                step: 0.01,
                value: mesh.material.ior,
                callback: value => {
                    mesh.material.ior = value;
                }
            },
            {
                type: 'slider',
                label: 'Reflect',
                min: 0,
                max: 1,
                step: 0.01,
                value: mesh.material.reflectivity,
                callback: value => {
                    mesh.material.reflectivity = value;
                }
            }
            // TODO: Texture thumbnails
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
