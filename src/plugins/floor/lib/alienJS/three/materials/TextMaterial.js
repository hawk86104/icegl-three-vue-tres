import { Color, GLSL3, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/TextShader.js';

export class TextMaterial extends RawShaderMaterial {
    constructor({
        map,
        color
    } = {}) {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: map },
                uColor: { value: color instanceof Color ? color : new Color(color) },
                uAlpha: { value: 1 }
            },
            vertexShader,
            fragmentShader,
            transparent: true
        });
    }
}
