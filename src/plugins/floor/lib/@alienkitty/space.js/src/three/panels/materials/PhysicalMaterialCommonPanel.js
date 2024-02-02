/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { FlatShadingOptions, ToneMappedOptions, WireframeOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class PhysicalMaterialCommonPanel extends Panel {
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
                label: 'Specular Color',
                value: mesh.material.specularColor,
                callback: value => {
                    mesh.material.specularColor.copy(value);
                }
            },
            {
                type: 'slider',
                label: 'Specular',
                min: 0,
                max: 32,
                step: 0.1,
                value: mesh.material.specularIntensity,
                callback: value => {
                    mesh.material.specularIntensity = value;
                }
            },
            {
                type: 'slider',
                label: 'Rough',
                min: 0,
                max: 2,
                step: 0.01,
                value: mesh.material.roughness,
                callback: value => {
                    mesh.material.roughness = value;
                }
            },
            {
                type: 'slider',
                label: 'Metal',
                min: 0,
                max: 1,
                step: 0.01,
                value: mesh.material.metalness,
                callback: value => {
                    mesh.material.metalness = value;
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
