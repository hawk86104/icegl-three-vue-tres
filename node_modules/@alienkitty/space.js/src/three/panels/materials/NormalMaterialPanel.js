/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../ui/Point3D.js';
import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { MaterialPanels } from '../Custom.js';

import { NormalMaterialCommonPanel } from './NormalMaterialCommonPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';
import { OimoPhysicsPanel } from '../physics/OimoPhysicsPanel.js';

export const NormalMaterialOptions = {
    Common: NormalMaterialCommonPanel,
    Helper: MeshHelperPanel,
    Physics: OimoPhysicsPanel
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

        if (!Point3D.physics) {
            delete NormalMaterialOptions.Physics;
        }

        const materialItems = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Normal',
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
