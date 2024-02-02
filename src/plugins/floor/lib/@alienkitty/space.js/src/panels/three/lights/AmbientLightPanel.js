/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';
import { VisibleOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class AmbientLightPanel extends Panel {
    constructor(panel, light) {
        super();

        this.panel = panel;
        this.light = light;

        this.initPanel();
    }

    initPanel() {
        const light = this.light;

        const lightItems = [
            {
                type: 'divider'
            },
            {
                type: 'color',
                value: light.color,
                callback: value => {
                    light.color.copy(value);
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
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
