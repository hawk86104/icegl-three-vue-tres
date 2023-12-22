import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/BadTVShader.js';

export class BadTVMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                uDistortion: { value: 3 },
                uDistortion2: { value: 5 },
                uSpeed: { value: 0.2 },
                uRollSpeed: { value: 0.1 },
                uTime: { value: 0 }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
