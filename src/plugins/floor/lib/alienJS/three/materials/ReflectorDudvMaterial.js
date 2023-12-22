import { GLSL3, Matrix3, Matrix4, NoBlending, RawShaderMaterial } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/ReflectorDudvShader.js';

export class ReflectorDudvMaterial extends RawShaderMaterial {
    constructor({
        map = null,
        reflectivity = 0,
        dithering = false
    } = {}) {
        const parameters = {
            glslVersion: GLSL3,
            defines: {
                DITHERING: dithering
            },
            uniforms: {
                tMap: { value: null },
                tReflect: { value: null },
                tReflectBlur: { value: null },
                uMapTransform: { value: new Matrix3() },
                uMatrix: { value: new Matrix4() },
                uReflectivity: { value: reflectivity }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending
        };

        if (map) {
            map.updateMatrix();

            parameters.uniforms = Object.assign(parameters.uniforms, {
                tMap: { value: map },
                uMapTransform: { value: map.matrix }
            });
        }

        super(parameters);
    }
}
