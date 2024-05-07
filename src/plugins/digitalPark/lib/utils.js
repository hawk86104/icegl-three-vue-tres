import * as THREE from 'three'
/**
 * 开启模型阴影 数组中移除阴影
 */
export const openCastShadow = (scene, names = []) => {
    scene.traverse((mesh) => {
        if (mesh.type === 'Mesh' && names.indexOf(mesh.name) === -1) {
            mesh.frustumCulled = false // 不剔除
            mesh.material.side = THREE.DoubleSide // 双面显示
            mesh.castShadow = true // 阴影
        }
    })
}
/**
 * 接收阴影
 * @param names 数组中的可以接收阴影
 */
export const openReceiveShadow = (scene, names = []) => {
    scene.traverse((mesh) => {
        if (names.length === 0 || names.indexOf(mesh.name) !== -1) {
            mesh.receiveShadow = true
        }
    })
}
