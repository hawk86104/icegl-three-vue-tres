import { GLSL3, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/ShadowTextureShader.js';

export class ShadowTextureMaterial extends RawShaderMaterial {
    constructor(map) {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: map },
                uAlpha: { value: 1 }
            },
            vertexShader,
            fragmentShader,
            transparent: true
        });
    }
}
