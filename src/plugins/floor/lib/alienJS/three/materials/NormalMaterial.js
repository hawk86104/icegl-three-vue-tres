import { GLSL3, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/NormalShader.js';

export class NormalMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            vertexShader,
            fragmentShader
        });
    }
}
