import { GLSL3, NoBlending, RawShaderMaterial, Vector2 } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/BlurShader.js';

export class BlurMaterial extends RawShaderMaterial {
    constructor(direction = new Vector2(0.5, 0.5)) {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                uBluriness: { value: 1 },
                uDirection: { value: direction },
                uResolution: { value: new Vector2() }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
