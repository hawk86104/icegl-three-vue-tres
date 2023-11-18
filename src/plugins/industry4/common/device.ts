/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 14:47:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-18 19:44:25
 */
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

let color = new THREE.Color('#0fb1fb')
const meshMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.3
});
const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    depthTest: true,
    transparent: true
})
export const reduceModelLine = (object: THREE.Object3D): any => {
    const brainBufferGeometries = [] as Array<THREE.BufferGeometry>
    object.traverse((mesh: THREE.Mesh) => {
        if (mesh.isMesh) {
            brainBufferGeometries.push(mesh.geometry)
            mesh.material = meshMaterial
        }
    })
    const tmpGeometry = BufferGeometryUtils.mergeGeometries(
        brainBufferGeometries
    );
    const edges = new THREE.EdgesGeometry(tmpGeometry, Math.PI * 6.137)
    const lines = new THREE.LineSegments(edges);
    lineMaterial.opacity = 1.0
    lines.material = lineMaterial
    return lines
}
const params = {
    threshold: 0,
    strength: 0.972,    // 强度
    radius: 0.21,       // 半径
};
export const unreal = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
    // 渲染器通道，将场景全部加入渲染器
    const renderScene = new RenderPass(scene, camera);
    // 添加虚幻发光通道
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold);

    // 创建合成器
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    // 将渲染器和场景结合到合成器中
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    // 着色器通道
    const mixPass = new ShaderPass(
        // 着色器
        new THREE.ShaderMaterial({
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture }
            },
            vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
            `,
            fragmentShader: `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
            varying vec2 vUv;
            void main() {
                gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
            }
            `,
            defines: {}
        }), 'baseTexture'
    );
    mixPass.needsSwap = true;
    // 合成器输出通道
    const outputPass = new OutputPass();
    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(mixPass);
    finalComposer.addPass(outputPass);
    return {
        finalComposer,
        bloomComposer,
        renderScene,
        bloomPass
    }
}