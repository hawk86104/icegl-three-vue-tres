/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../../ui/three/Point3D.js';
import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';

import { ToonMaterialCommonPanel } from './ToonMaterialCommonPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';
import { MapPanel } from '../textures/MapPanel.js';

export const ToonMaterialOptions = {
    Common: ToonMaterialCommonPanel,
    Map: MapPanel,
    Helper: MeshHelperPanel
};

export class ToonMaterialPanel extends Panel {
    static type = [
        'common'
    ];

    static properties = {
        common: [
            'color'
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
            delete ToonMaterialOptions.Helper;
        }

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: ToonMaterialOptions,
                value: 'Common',
                callback: (value, panel) => {
                    const MaterialPanel = ToonMaterialOptions[value];

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
