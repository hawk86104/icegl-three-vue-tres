/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { WrapOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class MapPanel extends Panel {
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
            }
            // TODO: Texture thumbnails
        ];

        if (mesh.material.map) {
            const repeatItems = [
                {
                    type: 'slider',
                    label: 'X',
                    min: 1,
                    max: 16,
                    step: 1,
                    value: mesh.material.map.repeat.x,
                    callback: value => {
                        mesh.material.map.repeat.setX(value);
                    }
                },
                {
                    type: 'slider',
                    label: 'Y',
                    min: 1,
                    max: 16,
                    step: 1,
                    value: mesh.material.map.repeat.y,
                    callback: value => {
                        mesh.material.map.repeat.setY(value);
                    }
                }
            ];

            items.push(
                {
                    type: 'slider',
                    label: 'Anisotropy',
                    min: 1,
                    max: 16,
                    step: 1,
                    value: mesh.material.map.anisotropy,
                    callback: value => {
                        mesh.material.map.anisotropy = value;
                    }
                },
                {
                    type: 'list',
                    label: 'Wrap',
                    list: WrapOptions,
                    value: getKeyByValue(WrapOptions, mesh.material.map.wrapS),
                    callback: (value, panel) => {
                        if (!panel.group) {
                            const repeatPanel = new Panel();
                            repeatPanel.animateIn(true);

                            repeatItems.forEach(data => {
                                repeatPanel.add(new PanelItem(data));
                            });

                            panel.setContent(repeatPanel);
                        }

                        const wrapping = WrapOptions[value];

                        mesh.material.map.wrapS = wrapping;
                        mesh.material.map.wrapT = wrapping;

                        if (mesh.material.map.image) {
                            mesh.material.map.needsUpdate = true;
                        }

                        if (value === 'Repeat' || value === 'Mirror') {
                            panel.group.show();
                        } else {
                            panel.group.hide();
                        }
                    }
                }
            );
        }

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
