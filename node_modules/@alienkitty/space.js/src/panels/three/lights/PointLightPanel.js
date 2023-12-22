/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';
import { HelperOptions, VisibleOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class PointLightPanel extends Panel {
    constructor(panel, light) {
        super();

        this.panel = panel;
        this.light = light;

        this.initPanel();
    }

    initPanel() {
        const light = this.light;

        // Defaults
        if (!light.userData.helper) {
            light.userData.helper = false;
        }

        const lightItems = [
            {
                type: 'list',
                list: HelperOptions,
                value: getKeyByValue(HelperOptions, light.userData.helper),
                callback: value => {
                    light.userData.helper = HelperOptions[value];

                    this.panel.togglePointLightHelper(light, light.userData.helper);
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'color',
                value: light.color,
                callback: value => {
                    light.color.copy(value);

                    if (light.helper) {
                        light.helper.update();
                    }
                }
            },
            {
                type: 'slider',
                label: 'Int',
                min: 0,
                max: 1,
                step: 0.01,
                value: light.intensity,
                callback: value => {
                    light.intensity = value;
                }
            }
        ];

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: VisibleOptions,
                value: getKeyByValue(VisibleOptions, light.visible),
                callback: (value, panel) => {
                    if (!panel.group) {
                        const lightPanel = new Panel();
                        lightPanel.animateIn(true);

                        lightItems.forEach(data => {
                            lightPanel.add(new PanelItem(data));
                        });

                        panel.setContent(lightPanel);
                    }

                    light.visible = VisibleOptions[value];

                    if (light.visible) {
                        panel.group.show();
                    } else {
                        panel.group.hide();
                    }

                    if (light.helper) {
                        light.helper.visible = light.visible;
                    }
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
