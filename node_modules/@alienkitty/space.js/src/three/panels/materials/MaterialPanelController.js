/**
 * @author pschroen / https://ufo.ai/
 */

import {
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshMatcapMaterial,
    MeshNormalMaterial,
    MeshPhongMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    MeshToonMaterial
} from 'three';

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { MaterialPatches } from '../Custom.js';
import { SideOptions, VisibleOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

import { BasicMaterialPanel } from './BasicMaterialPanel.js';
import { LambertMaterialPanel } from './LambertMaterialPanel.js';
import { MatcapMaterialPanel } from './MatcapMaterialPanel.js';
import { PhongMaterialPanel } from './PhongMaterialPanel.js';
import { ToonMaterialPanel } from './ToonMaterialPanel.js';
import { StandardMaterialPanel } from './StandardMaterialPanel.js';
import { PhysicalMaterialPanel } from './PhysicalMaterialPanel.js';
import { NormalMaterialPanel } from './NormalMaterialPanel.js';

// https://threejs.org/docs/scenes/material-browser.html
export const MaterialOptions = {
    Basic: [MeshBasicMaterial, BasicMaterialPanel],
    Lambert: [MeshLambertMaterial, LambertMaterialPanel],
    Matcap: [MeshMatcapMaterial, MatcapMaterialPanel],
    Phong: [MeshPhongMaterial, PhongMaterialPanel],
    Toon: [MeshToonMaterial, ToonMaterialPanel],
    Standard: [MeshStandardMaterial, StandardMaterialPanel],
    Physical: [MeshPhysicalMaterial, PhysicalMaterialPanel],
    Normal: [MeshNormalMaterial, NormalMaterialPanel]
};

export function getKeyByMaterial(materialOptions, material) {
    return Object.keys(materialOptions).reverse().find(key => material instanceof materialOptions[key][0]);
}

export class MaterialPanelController {
    static init(mesh, ui, {
        materialOptions = MaterialOptions
    } = {}) {
        this.mesh = mesh;
        this.ui = ui;
        this.materialOptions = materialOptions;

        this.lastMaterialPanel = null;

        this.initPanel();
    }

    static initPanel() {
        const mesh = this.mesh;
        const ui = this.ui;
        const materialOptions = this.materialOptions;

        const materialProperties = {};

        const materialItems = [
            {
                type: 'divider'
            },
            {
                type: 'slider',
                label: 'Opacity',
                min: 0,
                max: 1,
                step: 0.01,
                value: mesh.material.opacity,
                callback: value => {
                    if (value < 1) {
                        mesh.material.transparent = true;
                        mesh.material.needsUpdate = true;
                    }

                    mesh.material.opacity = value;
                }
            },
            {
                type: 'list',
                label: 'Side',
                list: SideOptions,
                value: getKeyByValue(SideOptions, mesh.material.side),
                callback: value => {
                    mesh.material.side = SideOptions[value];
                    mesh.material.needsUpdate = true;
                }
            },
            {
                type: 'list',
                label: 'Material',
                list: materialOptions,
                value: getKeyByMaterial(materialOptions, mesh.material),
                callback: (value, panel) => {
                    const [Material, MaterialPanel] = materialOptions[value];

                    const currentMaterialPanel = this.lastMaterialPanel || MaterialPanel;

                    materialProperties.transparent = mesh.material.transparent;
                    materialProperties.opacity = mesh.material.opacity;
                    materialProperties.side = mesh.material.side;

                    currentMaterialPanel.type.forEach(type => {
                        if (!materialProperties[type]) {
                            materialProperties[type] = {};
                        }

                        currentMaterialPanel.properties[type].forEach(key => {
                            if (key in mesh.material) {
                                const value = mesh.material[key];

                                if (value && (
                                    value.isVector2 ||
                                    value.isVector3 ||
                                    value.isVector4 ||
                                    value.isMatrix3 ||
                                    value.isMatrix4 ||
                                    value.isColor
                                )) {
                                    if (!materialProperties[type][key]) {
                                        materialProperties[type][key] = value.clone();
                                    } else {
                                        materialProperties[type][key].copy(value);
                                    }
                                } else if (Array.isArray(value)) {
                                    materialProperties[type][key] = value.slice();
                                } else {
                                    materialProperties[type][key] = value;
                                }
                            }
                        });
                    });

                    materialProperties.map = mesh.material.map;

                    mesh.material = new Material();
                    mesh.material.userData.onBeforeCompile = {};

                    mesh.material.onBeforeCompile = shader => {
                        for (const key in mesh.material.userData.onBeforeCompile) {
                            mesh.material.userData.onBeforeCompile[key](shader, mesh);
                        }
                    };

                    mesh.material.transparent = materialProperties.transparent;
                    mesh.material.opacity = materialProperties.opacity;
                    mesh.material.side = materialProperties.side;

                    MaterialPanel.type.forEach(type => {
                        if (!materialProperties[type]) {
                            materialProperties[type] = {};
                        }

                        MaterialPanel.properties[type].forEach(key => {
                            if (key in mesh.material && key in materialProperties[type]) {
                                const value = materialProperties[type][key];

                                if (value && (
                                    value.isVector2 ||
                                    value.isVector3 ||
                                    value.isVector4 ||
                                    value.isMatrix3 ||
                                    value.isMatrix4 ||
                                    value.isColor
                                )) {
                                    mesh.material[key].copy(value);
                                } else {
                                    mesh.material[key] = value;
                                }
                            }
                        });

                        if (type in MaterialPatches) {
                            for (const key in MaterialPatches[type]) {
                                mesh.material.userData.onBeforeCompile[key] = MaterialPatches[type][key];
                            }
                        }
                    });

                    if (ui.uvTexture) {
                        mesh.material.map = ui.uvTexture;
                    } else {
                        mesh.material.map = materialProperties.map;
                    }

                    mesh.material.customProgramCacheKey = () => Object.keys(mesh.material.userData.onBeforeCompile).join('|');
                    mesh.material.needsUpdate = true;

                    if (ui.point && ui.isDefault) {
                        ui.point.setData({
                            name: mesh.geometry.type,
                            type: mesh.material.type
                        });
                    }

                    const materialPanel = new MaterialPanel(mesh);
                    materialPanel.animateIn(true);

                    panel.setContent(materialPanel);

                    this.lastMaterialPanel = MaterialPanel;
                }
            }
        ];

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Visible',
                list: VisibleOptions,
                value: getKeyByValue(VisibleOptions, mesh.visible),
                callback: (value, panel) => {
                    if (!panel.group) {
                        const materialPanel = new Panel();
                        materialPanel.animateIn(true);

                        materialItems.forEach(data => {
                            materialPanel.add(new PanelItem(data));
                        });

                        panel.setContent(materialPanel);
                    }

                    mesh.visible = VisibleOptions[value];

                    if (mesh.visible) {
                        panel.group.show();
                    } else {
                        panel.group.hide();
                    }
                }
            }
        ];

        items.forEach(data => {
            ui.addPanel(new PanelItem(data));
        });
    }

    // Public methods

    static destroy = () => {
        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    };
}
