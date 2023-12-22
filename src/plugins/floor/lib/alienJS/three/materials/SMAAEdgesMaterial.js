import { GLSL3, NoBlending, RawShaderMaterial, Vector2 } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/SMAAEdgesShader.js';

export class SMAAEdgesMaterial extends RawShaderMaterial {
    constructor() {
        super({
            glslVersion: GLSL3,
            defines: {
                SMAA_THRESHOLD: '0.1'
            },
            uniforms: {
                tMap: { value: null },
                uTexelSize: { value: new Vector2() }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
