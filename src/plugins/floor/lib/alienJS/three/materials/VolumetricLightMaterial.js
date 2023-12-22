import { GLSL3, NoBlending, RawShaderMaterial, Vector2 } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/VolumetricLightShader.js';

export class VolumetricLightMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                uLightPosition: { value: new Vector2(0.5, 0.5) },
                uScale: { value: new Vector2(1, 1) },
                uSwizzle: { value: 0 },
                uExposure: { value: 0.6 },
                uDecay: { value: 0.93 },
                uDensity: { value: 0.96 },
                uWeight: { value: 0.4 },
                uClamp: { value: 1 }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
