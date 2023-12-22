/**
 * @author pschroen / https://ufo.ai/
 */

import { Color } from 'three';

import { Point3D } from '../../ui/Point3D.js';
import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { InstanceOptions } from '../Options.js';

export class InstancedMeshPanel extends Panel {
    constructor(mesh, materialItems) {
        super();

        this.mesh = mesh;
        this.materialItems = materialItems;

        this.initPanel();
    }

    initPanel() {
        const mesh = this.mesh;
        const point = Point3D.getPoint(mesh);
        const materialItems = this.materialItems;

        const color = new Color();

        const items = [
            {
                type: 'list',
                label: 'Instance',
                list: InstanceOptions,
                value: 'Mesh',
                callback: (value, panel) => {
                    if (InstanceOptions[value]) {
                        mesh.getColorAt(point.instances[0].index, color);

                        const instanceItems = [
                            {
                                type: 'divider'
                            },
                            {
                                type: 'color',
                                label: 'Color',
                                value: color,
                                callback: value => {
                                    color.copy(value);

                                    point.instances.forEach(instance => {
                                        mesh.setColorAt(instance.index, color);
                                    });

                                    mesh.instanceColor.needsUpdate = true;
                                }
                            }
                        ];

                        const instancePanel = new Panel();
                        instancePanel.animateIn(true);

                        instanceItems.forEach(data => {
                            instancePanel.add(new PanelItem(data));
                        });

                        panel.setContent(instancePanel);
                    } else {
                        const materialPanel = new Panel();
                        materialPanel.animateIn(true);

                        materialItems.forEach(data => {
                            materialPanel.add(new PanelItem(data));
                        });

                        panel.setContent(materialPanel);
                    }
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
