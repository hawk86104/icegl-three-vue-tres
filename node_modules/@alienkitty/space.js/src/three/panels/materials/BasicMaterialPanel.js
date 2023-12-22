/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../ui/Point3D.js';
import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { MaterialPanels } from '../Custom.js';

import { BasicMaterialCommonPanel } from './BasicMaterialCommonPanel.js';
import { BasicMaterialEnvPanel } from './BasicMaterialEnvPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';
import { OimoPhysicsPanel } from '../physics/OimoPhysicsPanel.js';
import { MapPanel } from '../textures/MapPanel.js';

export const BasicMaterialOptions = {
    Common: BasicMaterialCommonPanel,
    Map: MapPanel,
    Env: BasicMaterialEnvPanel,
    Helper: MeshHelperPanel,
    Physics: OimoPhysicsPanel
};

export class BasicMaterialPanel extends Panel {
    static type = [
        'common'
    ];

    static properties = {
        common: [
            'color',
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
            delete BasicMaterialOptions.Helper;
        }

        if (!Point3D.physics) {
            delete BasicMaterialOptions.Physics;
        }

        const materialItems = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Basic',
                list: BasicMaterialOptions,
                value: 'Common',
                callback: (value, panel) => {
                    const MaterialPanel = BasicMaterialOptions[value];

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
