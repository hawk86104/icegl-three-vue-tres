import { Panel, PanelItem, getKeyByValue } from '@alienkitty/space.js/three';

import { RenderManager } from '../world/RenderManager.js';

export class PostPanel extends Panel {
    constructor() {
        super();

        this.initPanel();
    }

    initPanel() {
        const { luminosityMaterial, bloomCompositeMaterial, compositeMaterial } = RenderManager;

        const postOptions = {
            Off: false,
            On: true
        };

        const toneMappingOptions = {
            Off: false,
            Tone: true
        };

        const gammaOptions = {
            Off: false,
            Gamma: true
        };

        const postItems = [
            {
                type: 'divider'
            },
            {
                type: 'slider',
                label: 'Thresh',
                min: 0,
                max: 1,
                step: 0.01,
                value: luminosityMaterial.uniforms.uThreshold.value,
                callback: value => {
                    luminosityMaterial.uniforms.uThreshold.value = value;
                }
            },
            {
                type: 'slider',
                label: 'Smooth',
                min: 0,
                max: 1,
                step: 0.01,
                value: luminosityMaterial.uniforms.uSmoothing.value,
                callback: value => {
                    luminosityMaterial.uniforms.uSmoothing.value = value;
                }
            },
            {
                type: 'slider',
                label: 'Strength',
                min: 0,
                max: 2,
                step: 0.01,
                value: RenderManager.bloomStrength,
                callback: value => {
                    RenderManager.bloomStrength = value;
                    bloomCompositeMaterial.uniforms.uBloomFactors.value = RenderManager.bloomFactors();
                }
            },
            {
                type: 'slider',
                label: 'Radius',
                min: 0,
                max: 1,
                step: 0.01,
                value: RenderManager.bloomRadius,
                callback: value => {
                    RenderManager.bloomRadius = value;
                    bloomCompositeMaterial.uniforms.uBloomFactors.value = RenderManager.bloomFactors();
                }
            },
            {
                type: 'slider',
                label: 'Chroma',
                min: 0,
                max: 2,
                step: 0.01,
                value: compositeMaterial.uniforms.uBloomDistortion.value,
                callback: value => {
                    compositeMaterial.uniforms.uBloomDistortion.value = value;
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Tone',
                list: toneMappingOptions,
                value: getKeyByValue(toneMappingOptions, compositeMaterial.uniforms.uToneMapping.value),
                callback: value => {
                    compositeMaterial.uniforms.uToneMapping.value = toneMappingOptions[value];
                }
            },
            {
                type: 'slider',
                label: 'Exp',
                min: 0,
                max: 2,
                step: 0.01,
                value: compositeMaterial.uniforms.uExposure.value,
                callback: value => {
                    compositeMaterial.uniforms.uExposure.value = value;
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'list',
                label: 'Gamma',
                list: gammaOptions,
                value: getKeyByValue(gammaOptions, compositeMaterial.uniforms.uGamma.value),
                callback: value => {
                    compositeMaterial.uniforms.uGamma.value = gammaOptions[value];
                }
            }
        ];

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: postOptions,
                value: getKeyByValue(postOptions, RenderManager.enabled),
                callback: (value, panel) => {
                    if (!panel.group) {
                        const postPanel = new Panel();
                        postPanel.animateIn(true);

                        postItems.forEach(data => {
                            postPanel.add(new PanelItem(data));
                        });

                        panel.setContent(postPanel);
                    }

                    RenderManager.enabled = postOptions[value];

                    if (RenderManager.enabled) {
                        panel.group.show();
                    } else {
                        panel.group.hide();
                    }
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
