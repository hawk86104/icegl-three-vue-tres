import { GLSL3, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/VideoGlitchShader.js';

export class VideoGlitchMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                uDistortion: { value: 1.43 },
                uDistortion2: { value: 0.15 },
                uSpeed: { value: 1 },
                uTime: { value: 0 }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
