/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';
import { FlatShadingOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class MatcapMaterialCommonPanel extends Panel {
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
                type: 'color',
                value: mesh.material.color,
                callback: value => {
                    mesh.material.color.copy(value);
                }
            },
            {
                type: 'list',
                list: FlatShadingOptions,
                value: getKeyByValue(FlatShadingOptions, mesh.material.flatShading),
                callback: value => {
                    mesh.material.flatShading = FlatShadingOptions[value];
                    mesh.material.needsUpdate = true;
                }
            }
            // TODO: Texture thumbnails
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
