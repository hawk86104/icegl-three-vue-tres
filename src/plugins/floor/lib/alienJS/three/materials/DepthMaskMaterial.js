import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/DepthMaskShader.js';

export class DepthMaskMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                tDepth1: { value: null },
                tDepth2: { value: null }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
