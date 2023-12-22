import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/CopyShader.js';

export class CopyMaterial extends RawShaderMaterial {
    constructor(map) {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: map }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
