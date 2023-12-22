/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../ui/Point3D.js';
import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { MaterialPanels } from '../Custom.js';

import { LambertMaterialCommonPanel } from './LambertMaterialCommonPanel.js';
import { LambertMaterialEnvPanel } from './LambertMaterialEnvPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';
import { OimoPhysicsPanel } from '../physics/OimoPhysicsPanel.js';
import { MapPanel } from '../textures/MapPanel.js';

export const LambertMaterialOptions = {
    Common: LambertMaterialCommonPanel,
    Map: MapPanel,
    Env: LambertMaterialEnvPanel,
    Helper: MeshHelperPanel,
    Physics: OimoPhysicsPanel
};

export class LambertMaterialPanel extends Panel {
    static type = [
        'common'
    ];

    static properties = {
        common: [
            'color',
            'emissive',
            'flatShading',
            'wireframe',
            'toneMapped',
            'combine',
            'reflectivity',
            'refractionRatio'
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
            delete LambertMaterialOptions.Helper;
        }

        if (!Point3D.physics) {
            delete LambertMaterialOptions.Physics;
        }

        const materialItems = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Lambert',
                list: LambertMaterialOptions,
                value: 'Common',
                callback: (value, panel) => {
                    const MaterialPanel = LambertMaterialOptions[value];

                    const materialPanel = new MaterialPanel(mesh);
                    materialPanel.animateIn(true);

                    panel.setContent(materialPanel);
                }
            }
        ];

        const items = [];

        if (mesh.isInstancedMesh) {
            items.push(
                {
                    type: 'content',
                    callback: (value, panel) => {
                        const { InstancedMeshPanel } = MaterialPanels;

                        const materialPanel = new InstancedMeshPanel(mesh, materialItems);
                        materialPanel.animateIn(true);

                        panel.setContent(materialPanel);
                    }
                }
            );
        } else {
            items.push(...materialItems);
        }

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
