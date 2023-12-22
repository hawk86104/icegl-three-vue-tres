/**
 * @author pschroen / https://ufo.ai/
 */

import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';
import { StandardMaterialPatches } from '../Patches.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class StandardMaterialSubsurfacePanel extends Panel {
    constructor(mesh) {
        super();

        this.mesh = mesh;

        this.initPanel();
    }

    initPanel() {
        const mesh = this.mesh;

        // Defaults
        if (!mesh.userData.subsurface) {
            mesh.userData.subsurface = false;

            mesh.userData.subsurfaceUniforms = {
                thicknessDistortion: { value: 0.1 },
                thicknessAmbient: { value: 0 },
                thicknessAttenuation: { value: 0.1 },
                thicknessPower: { value: 2 },
                thicknessScale: { value: 10 }
            };
        }

        const subsurfaceOptions = {
            Off: false,
            On: true
        };

        const subsurfaceItems = [
            {
                type: 'divider'
            },
            {
                type: 'slider',
                label: 'Distort',
                min: 0,
                max: 1,
                step: 0.01,
                value: mesh.userData.subsurfaceUniforms.thicknessDistortion.value,
                callback: value => {
                    mesh.userData.subsurfaceUniforms.thicknessDistortion.value = value;
                }
            },
            {
                type: 'slider',
                label: 'Ambient',
                min: 0,
                max: 5,
                step: 0.05,
                value: mesh.userData.subsurfaceUniforms.thicknessAmbient.value,
                callback: value => {
                    mesh.userData.subsurfaceUniforms.thicknessAmbient.value = value;
                }
            },
            {
                type: 'slider',
                label: 'Atten',
                min: 0,
                max: 5,
                step: 0.05,
                value: mesh.userData.subsurfaceUniforms.thicknessAttenuation.value,
                callback: value => {
                    mesh.userData.subsurfaceUniforms.thicknessAttenuation.value = value;
                }
            },
            {
                type: 'slider',
                label: 'Power',
                min: 1,
                max: 32,
                step: 0.1,
                value: mesh.userData.subsurfaceUniforms.thicknessPower.value,
                callback: value => {
                    mesh.userData.subsurfaceUniforms.thicknessPower.value = value;
                }
            },
            {
                type: 'slider',
                label: 'Scale',
                min: 0,
                max: 64,
                step: 0.1,
                value: mesh.userData.subsurfaceUniforms.thicknessScale.value,
                callback: value => {
                    mesh.userData.subsurfaceUniforms.thicknessScale.value = value;
                }
            }
            // TODO: Texture thumbnails
        ];

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Subsurface Scattering',
                list: subsurfaceOptions,
                value: getKeyByValue(subsurfaceOptions, mesh.userData.subsurface),
                callback: (value, panel) => {
                    if (!panel.group) {
                        const subsurfacePanel = new Panel();
                        subsurfacePanel.animateIn(true);

                        subsurfaceItems.forEach(data => {
                            subsurfacePanel.add(new PanelItem(data));
                        });

                        panel.setContent(subsurfacePanel);
                    }

                    mesh.userData.subsurface = subsurfaceOptions[value];

                    if (mesh.userData.subsurface) {
                        mesh.material.userData.onBeforeCompile.subsurface = StandardMaterialPatches.subsurface;

                        panel.group.show();
                    } else {
                        delete mesh.material.userData.onBeforeCompile.subsurface;

                        panel.group.hide();
                    }

                    mesh.material.customProgramCacheKey = () => Object.keys(mesh.material.userData.onBeforeCompile).join('|');
                    mesh.material.needsUpdate = true;
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
