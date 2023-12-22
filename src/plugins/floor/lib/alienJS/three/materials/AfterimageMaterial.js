import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/AfterimageShader.js';

export class AfterimageMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tOld: { value: null },
                tNew: { value: null },
                uDamping: { value: 0.96 }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
