/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { ToneMappedOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class ToonMaterialCommonPanel extends Panel {
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
                label: 'Color',
                value: mesh.material.color,
                callback: value => {
                    mesh.material.color.copy(value);
                }
            },
            {
                type: 'list',
                label: 'Tone',
                list: ToneMappedOptions,
                value: getKeyByValue(ToneMappedOptions, mesh.material.toneMapped),
                callback: value => {
                    mesh.material.toneMapped = ToneMappedOptions[value];
                }
            }
            // TODO: Texture thumbnails
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
