import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/DiscardShader.js';

export class DiscardMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
