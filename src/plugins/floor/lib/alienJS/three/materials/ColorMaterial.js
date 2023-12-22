import { Color, GLSL3, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/ColorShader.js';

export class ColorMaterial extends RawShaderMaterial {
    constructor(color) {
        super({
            glslVersion: GLSL3,
            uniforms: {
                uColor: { value: color instanceof Color ? color : new Color(color) },
                uAlpha: { value: 1 }
            },
            vertexShader,
            fragmentShader
        });
    }
}
