import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/LuminosityShader.js';

export class LuminosityMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                uThreshold: { value: 1 },
                uSmoothing: { value: 1 }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
