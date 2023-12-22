/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { FlatShadingOptions, ToneMappedOptions, WireframeOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class PhongMaterialCommonPanel extends Panel {
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
                type: 'color',
                label: 'Emissive',
                value: mesh.material.emissive,
                callback: value => {
                    mesh.material.emissive.copy(value);
                }
            },
            {
                type: 'color',
                label: 'Specular',
                value: mesh.material.specular,
                callback: value => {
                    mesh.material.specular.copy(value);
                }
            },
            {
                type: 'slider',
                label: 'Shiny',
                min: 0,
                max: 100,
                step: 0.1,
                value: mesh.material.shininess,
                callback: value => {
                    mesh.material.shininess = value;
                }
            },
            {
                type: 'list',
                label: 'Flat',
                list: FlatShadingOptions,
                value: getKeyByValue(FlatShadingOptions, mesh.material.flatShading),
                callback: value => {
                    mesh.material.flatShading = FlatShadingOptions[value];
                    mesh.material.needsUpdate = true;
                }
            },
            {
                type: 'list',
                label: 'Wire',
                list: WireframeOptions,
                value: getKeyByValue(WireframeOptions, mesh.material.wireframe),
                callback: value => {
                    mesh.material.wireframe = WireframeOptions[value];
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
