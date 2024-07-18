/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-15 08:21:22
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 14:42:51
 */
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import fragmentShader from '../shaders/reflectorCustomMaterial.frag'
import vertexShader from '../shaders/reflectorCustomMaterial.vert'

const makeCustomShaderMaterial = (mirror: THREE.Mesh, reflector: any) => {
    const floorUniforms = {
        uColor: { type: 'c', value: new THREE.Color('white') },
        uReflectMatrix: { type: 'm4', value: new THREE.Matrix4() },
        uReflectTexture: { type: 't', value: new THREE.Texture() },
        uReflectIntensity: { type: 'f', value: 15 },
        uIntensity: { type: 'f', value: 1 },
        uLevel: { type: 'f', value: 3.5 },
        uResolution: { type: 'v2', value: new THREE.Vector2() },
        uTime: { type: 'f', value: 0 },
    }

    const material = new CustomShaderMaterial({
        baseMaterial: mirror.material,
        uniforms: floorUniforms,
        vertexShader,
        fragmentShader,
        silent: true,
    })

    floorUniforms.uReflectTexture.value = reflector.renderTarget.texture
    floorUniforms.uReflectMatrix.value = reflector.matrix

    floorUniforms.uResolution.value.set(reflector.renderTarget.width, reflector.renderTarget.height)
    return material
}

export { makeCustomShaderMaterial }
