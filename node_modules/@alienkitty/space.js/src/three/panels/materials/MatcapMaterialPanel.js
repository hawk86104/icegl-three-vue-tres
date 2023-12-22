/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../ui/Point3D.js';
import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { MaterialPanels } from '../Custom.js';

import { MatcapMaterialCommonPanel } from './MatcapMaterialCommonPanel.js';
import { MeshHelperPanel } from '../objects/MeshHelperPanel.js';
import { OimoPhysicsPanel } from '../physics/OimoPhysicsPanel.js';
import { MapPanel } from '../textures/MapPanel.js';

export const MatcapMaterialOptions = {
    Common: MatcapMaterialCommonPanel,
    Map: MapPanel,
    Helper: MeshHelperPanel,
    Physics: OimoPhysicsPanel
};

export class MatcapMaterialPanel extends Panel {
    static type = [
        'common'
    ];

    static properties = {
        common: [
            'color',
            'flatShading',
            'toneMapped'
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
            delete MatcapMaterialOptions.Helper;
        }

        if (!Point3D.physics) {
            delete MatcapMaterialOptions.Physics;
        }

        const materialItems = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Matcap',
                list: MatcapMaterialOptions,
                value: 'Common',
                callback: (value, panel) => {
                    const MaterialPanel = MatcapMaterialOptions[value];

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
