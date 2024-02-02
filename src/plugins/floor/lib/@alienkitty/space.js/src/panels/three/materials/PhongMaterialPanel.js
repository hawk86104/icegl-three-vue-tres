/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../../ui/three/Point3D.js';
import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';

import { PhongMaterialCommonPanel } from './PhongMaterialCommonPanel.js';
import { PhongMaterialEnvPanel } from './PhongMaterialEnvPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';
import { MapPanel } from '../textures/MapPanel.js';

export const PhongMaterialOptions = {
    Common: PhongMaterialCommonPanel,
    Map: MapPanel,
    Env: PhongMaterialEnvPanel,
    Helper: MeshHelperPanel
};

export class PhongMaterialPanel extends Panel {
    static type = [
        'common',
        'phong'
    ];

    static properties = {
        common: [
            'color',
            'emissive',
            'flatShading',
            'wireframe',
            'combine',
            'reflectivity',
            'refractionRatio'
        ],
        phong: [
            'specular',
            'shininess'
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
            delete PhongMaterialOptions.Helper;
        }

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: PhongMaterialOptions,
                value: 'Common',
                callback: (value, panel) => {
                    const MaterialPanel = PhongMaterialOptions[value];

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
