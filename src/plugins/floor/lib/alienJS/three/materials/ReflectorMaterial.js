/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-04 08:29:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-22 15:50:52
 */
import { Color, GLSL3, Matrix3, Matrix4, NoBlending, RawShaderMaterial, Vector2 } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/ReflectorShader.js';

export class ReflectorMaterial extends RawShaderMaterial {
    constructor({
        color = new Color(0x101010),
        map = null,
        normalMap = null,
        normalScale = new Vector2(1, 1),
        reflectivity = 0,
        mirror = 0,
        mixStrength = 10,
        fog = null,
        dithering = false
    } = {}) {
        const parameters = {
            glslVersion: GLSL3,
            defines: {
            },
            uniforms: {
                tMap: { value: null },
                tReflect: { value: null },
                uMapTransform: { value: new Matrix3() },
                uMatrix: { value: new Matrix4() },
                uColor: { value: color instanceof Color ? color : new Color(color) },
                uReflectivity: { value: reflectivity },
                uMirror: { value: mirror },
                uMixStrength: { value: mixStrength }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending
        };

        if (map) {
            map.updateMatrix();

            parameters.defines = Object.assign(parameters.defines, {
                USE_MAP: ''
            });

            parameters.uniforms = Object.assign(parameters.uniforms, {
                tMap: { value: map },
                uMapTransform: { value: map.matrix }
            });
        }

        if (normalMap) {
            parameters.defines = Object.assign(parameters.defines, {
                USE_NORMALMAP: ''
            });

            parameters.uniforms = Object.assign(parameters.uniforms, {
                tNormalMap: { value: normalMap },
                uNormalScale: { value: normalScale }
            });

            if (!map) {
                normalMap.updateMatrix();

                parameters.uniforms = Object.assign(parameters.uniforms, {
                    uMapTransform: { value: normalMap.matrix }
                });
            }
        }

        if (fog) {
            parameters.defines = Object.assign(parameters.defines, {
                USE_FOG: ''
            });

            parameters.uniforms = Object.assign(parameters.uniforms, {
                uFogColor: { value: fog.color },
                uFogNear: { value: fog.near },
                uFogFar: { value: fog.far }
            });
        }

        if (dithering) {
            parameters.defines = Object.assign(parameters.defines, {
                DITHERING: ''
            });
        }

        super(parameters);
    }
}
