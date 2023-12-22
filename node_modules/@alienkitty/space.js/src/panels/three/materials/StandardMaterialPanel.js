/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../../ui/three/Point3D.js';
import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';

import { StandardMaterialCommonPanel } from './StandardMaterialCommonPanel.js';
import { StandardMaterialEnvPanel } from './StandardMaterialEnvPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';
import { MapPanel } from '../textures/MapPanel.js';

export const StandardMaterialOptions = {
    Common: StandardMaterialCommonPanel,
    Map: MapPanel,
    Env: StandardMaterialEnvPanel,
    Helper: MeshHelperPanel
};

export class StandardMaterialPanel extends Panel {
    static type = [
        'common',
        'standard'
    ];

    static properties = {
        common: [
            'color',
            'emissive',
            'flatShading',
            'wireframe'
        ],
        standard: [
            'roughness',
            'metalness',
            'envMapIntensity'
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
            delete StandardMaterialOptions.Helper;
        }

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: StandardMaterialOptions,
                value: 'Common',
                callback: (value, panel) => {
                    const MaterialPanel = StandardMaterialOptions[value];

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
