import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../shaders/CompositeShader.js';

export class CompositeMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tScene: { value: null },
                tBloom: { value: null },
                uBloomDistortion: { value: 1.45 },
                uToneMapping: { value: false },
                uExposure: { value: 1 },
                uGamma: { value: false }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
