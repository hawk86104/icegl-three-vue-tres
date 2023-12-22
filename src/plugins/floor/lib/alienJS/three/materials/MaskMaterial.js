import { GLSL3, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/MaskShader.js';

export class MaskMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                tMask: { value: null }
            },
            vertexShader,
            fragmentShader,
            transparent: true
        });
    }
}
