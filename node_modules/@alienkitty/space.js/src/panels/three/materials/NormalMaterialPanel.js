/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../../ui/three/Point3D.js';
import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';

import { NormalMaterialCommonPanel } from './NormalMaterialCommonPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';

export const NormalMaterialOptions = {
    Common: NormalMaterialCommonPanel,
    Helper: MeshHelperPanel
};

export class NormalMaterialPanel extends Panel {
    static type = [
        'common'
    ];

    static properties = {
        common: [
            'flatShading',
            'wireframe'
        ]
    };

    constructor(mesh) {
        super();

        this.mesh = mesh;

        this.initPanel();
    }

    initPanel() {
        const mesh = this.mesh;

        if (!Point3D.points) {
            delete NormalMaterialOptions.Helper;
        }

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: NormalMaterialOptions,
                value: 'Common',
                callback: (value, panel) => {
                    const MaterialPanel = NormalMaterialOptions[value];

                    const materialPanel = new MaterialPanel(mesh);
                    materialPanel.animateIn(true);

                    panel.setContent(materialPanel);
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
