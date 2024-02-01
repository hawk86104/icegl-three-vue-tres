/**
 * @author pschroen / https://ufo.ai/
 */

import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    PointLight,
    PointLightHelper,
    RectAreaLight,
    SpotLight,
    SpotLightHelper
} from 'three';

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

import { PanelItem } from '../../PanelItem.js';

import { AmbientLightPanel } from './AmbientLightPanel.js';
import { HemisphereLightPanel } from './HemisphereLightPanel.js';
import { DirectionalLightPanel } from './DirectionalLightPanel.js';
import { PointLightPanel } from './PointLightPanel.js';
import { SpotLightPanel } from './SpotLightPanel.js';
import { RectAreaLightPanel } from './RectAreaLightPanel.js';

export const LightOptions = {
    Ambient: [AmbientLight, AmbientLightPanel],
    Hemisphere: [HemisphereLight, HemisphereLightPanel],
    Directional: [DirectionalLight, DirectionalLightPanel],
    Point: [PointLight, PointLightPanel],
    Spot: [SpotLight, SpotLightPanel],
    RectArea: [RectAreaLight, RectAreaLightPanel]
};

export function getKeyByLight(lightOptions, light) {
    return Object.keys(lightOptions).reverse().find(key => light instanceof lightOptions[key][0]);
}

export class LightPanelController {
    static init(scene, ui) {
        this.scene = scene;
        this.ui = ui;

        this.lights = [];

        if (this.ui) {
            this.initPanel();
        }
    }

    static initPanel() {
        const scene = this.scene;
        const ui = this.ui;

        const lightOptions = {};

        scene.traverse(object => {
            if (object.isLight) {
                this.lights.push(object);
            }
        });

        const keys = this.lights.map(light => getKeyByLight(LightOptions, light));
        const counts = {};

        keys.forEach(key => {
            counts[key] = counts[key] ? counts[key] + 1 : 1;
        });

        this.lights.forEach(light => {
            const key = getKeyByLight(LightOptions, light);

            let count = 1;
            let lightKey = `${key}${counts[key] > 1 ? count++ : ''}`;

            while (Object.keys(lightOptions).includes(lightKey)) {
                lightKey = `${key}${count++}`;
            }

            lightOptions[lightKey] = [light, LightOptions[key][1]];
        });

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: lightOptions,
                value: Object.keys(lightOptions)[0],
                callback: (value, panel) => {
                    const [light, LightPanel] = lightOptions[value];

                    const lightPanel = new LightPanel(this, light);
                    lightPanel.animateIn(true);

                    panel.setContent(lightPanel);
                }
            }
        ];

        items.forEach(data => {
            ui.addPanel(new PanelItem(data));
        });
    }

    /**
     * Public methods
     */

    static toggleHemisphereLightHelper = (light, show) => {
        if (show) {
            if (!light.helper) {
                light.helper = new HemisphereLightHelper(light);
                this.scene.add(light.helper);
            }

            light.helper.visible = true;
        } else if (light.helper) {
            light.helper.visible = false;
        }
    };

    static toggleDirectionalLightHelper = (light, show) => {
        if (show) {
            if (!light.helper) {
                light.helper = new DirectionalLightHelper(light, 0.125);
                this.scene.add(light.helper);
            }

            light.helper.visible = true;
        } else if (light.helper) {
            light.helper.visible = false;
        }
    };

    static togglePointLightHelper = (light, show) => {
        if (show) {
            if (!light.helper) {
                light.helper = new PointLightHelper(light, 0.125);
                this.scene.add(light.helper);
            }

            light.helper.visible = true;
        } else if (light.helper) {
            light.helper.visible = false;
        }
    };

    static toggleSpotLightHelper = (light, show) => {
        if (show) {
            if (!light.helper) {
                light.helper = new SpotLightHelper(light);
                this.scene.add(light.helper);
            }

            light.helper.visible = true;
        } else if (light.helper) {
            light.helper.visible = false;
        }
    };

    static toggleRectAreaLightHelper = (light, show) => {
        if (show) {
            if (!light.helper) {
                light.helper = new RectAreaLightHelper(light);
                this.scene.add(light.helper);
            }

            light.helper.visible = true;
        } else if (light.helper) {
            light.helper.visible = false;
        }
    };

    static update = () => {
        this.lights.forEach(light => {
            if (light.helper && !light.isRectAreaLight) {
                light.helper.update();
            }
        });
    };

    static destroy = () => {
        this.lights.forEach(light => {
            if (light.helper) {
                if (light.isHemisphereLight) {
                    this.toggleHemisphereLightHelper(light, false);
                }

                if (light.isDirectionalLight) {
                    this.toggleDirectionalLightHelper(light, false);
                }

                if (light.isPointLight) {
                    this.togglePointLightHelper(light, false);
                }

                if (light.isSpotLight) {
                    this.toggleSpotLightHelper(light, false);
                }

                if (light.isRectAreaLight) {
                    this.toggleRectAreaLightHelper(light, false);
                }

                this.scene.remove(light.helper);
                light.helper.dispose();

                delete light.helper;
            }
        });

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    };
}
