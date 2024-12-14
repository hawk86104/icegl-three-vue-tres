/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-09 09:33:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-15 18:42:44
 */
import {
    BufferAttribute,
    Box3,
    Vector3,
    RepeatWrapping,
    Color,
    Mesh,
    PlaneGeometry,
    Vector2,
    DoubleSide,
    Material,
    MeshBasicMaterial,
    BufferGeometry,
    Matrix4,
} from 'three'

import { request } from '@fesjs/fes'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'

//水面
import { useTexture } from '@tresjs/core'
import { Water } from 'three/addons/objects/Water2'

//重置UV 是否从中点 还是左上角的点
export const resetUV = (geometry, isCenter = false) => {
    geometry.computeBoundingBox()
    const { max, min } = geometry.boundingBox
    geometry.deleteAttribute('uv')
    const roomX = max.x - min.x
    const roomY = max.y - min.y
    const PuvList = []
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        if (isCenter) {
            PuvList.push((geometry.attributes.position.getX(i) - (min.x + max.x) / 2) / roomX)
            PuvList.push((geometry.attributes.position.getY(i) - (min.y + max.y) / 2) / roomY)
        } else {
            PuvList.push((geometry.attributes.position.getX(i) - min.x) / roomX)
            PuvList.push((geometry.attributes.position.getY(i) - min.y) / roomY)
        }
    }
    const Puvs = new Float32Array(PuvList)
    geometry.setAttribute('uv', new BufferAttribute(Puvs, 2))
}
export const randomUV = (geometry) => {
    const numVertices = geometry.attributes.position.count
    const uvArray = new Float32Array(numVertices * 2) // 2个值表示一个UV坐标
    for (let i = 0; i < numVertices * 2; i += 2) {
        uvArray[i] = Math.random() * 0.01
        uvArray[i + 1] = Math.random() * 0.01
    }
    const uvAttribute = new BufferAttribute(uvArray, 2)
    geometry.setAttribute('uv', uvAttribute)
}

export const setGeometryUVForm = (srcGeometry, toGeometry) => {
    toGeometry.computeBoundingBox()
    const toroomX = toGeometry.boundingBox.max.x - toGeometry.boundingBox.min.x
    const toroomY = toGeometry.boundingBox.max.y - toGeometry.boundingBox.min.y

    toGeometry.deleteAttribute('uv')
    // srcGeometry.computeBoundingBox()
    const { max, min } = srcGeometry.boundingBox
    const roomX = max.x - min.x
    const roomY = max.y - min.y
    const PuvList = []
    for (let i = 0; i < toGeometry.attributes.position.count; i++) {
        let tmpU = (toGeometry.attributes.position.getX(i) - min.x) / roomX
        tmpU = tmpU / (toroomX / roomX)
        PuvList.push(tmpU)
        let tmpV = (toGeometry.attributes.position.getY(i) - min.y) / roomY
        tmpV = tmpV / (toroomY / roomY)
        PuvList.push(tmpV)
    }
    const Puvs = new Float32Array(PuvList)
    toGeometry.setAttribute('uv', new BufferAttribute(Puvs, 2))
}
export const loadGeojson = (filepath, dataType) =>
    new Promise((resolve, reject) => {
        request(filepath, {}, { method: 'get', mergeRequest: true, responseType: 'json' })
            .then((res) => {
                if (dataType) {
                    resolve(res[dataType])
                }
                resolve(res.features)
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })

export const getBoxInfo = (mesh) => {
    const box3 = new Box3()
    box3.expandByObject(mesh)
    const size = new Vector3()
    const center = new Vector3()
    box3.getCenter(center)
    box3.getSize(size)
    return {
        size,
        center,
    }
}
export const toMeshSceneCenter = (mesh) => {
    const { center, size } = getBoxInfo(mesh)
    mesh.position.copy(center.negate().setY(0))
}
export const objectToSceneCenter = (mesh) => {
    const { center, size } = getBoxInfo(mesh)
    const position = center.negate().setY(0)
    position.x = -position.x
    position.z = -position.z
    mesh.position.copy(position)
}

//自适应 几何中心 外面要再包一层
export const adjustGroupCenter = (group) => {
    const box = new THREE.Box3().setFromObject(group)
    // 计算 Group 的几何中心
    const center = new THREE.Vector3()
    box.getCenter(center)
    // 调整每个子物体的位置，使 Group 的几何中心位于原点
    group.children.forEach((child) => {
        child.position.sub(center)
    })
    // 移动整个 Group 使几何中心对齐
    group.position.copy(center.negate())
}

export const initMeshBvh = () => {
    BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
    BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
    Mesh.prototype.raycast = acceleratedRaycast
}
export const setThreeWater2 = async (mesh) => {
    const pTexture = await useTexture(['./plugins/water/images/Water_1_M_Normal.jpg', './plugins/water/images/Water_2_M_Normal.jpg'])
    const waterGeometry = mesh.geometry.clone()
    resetUV(waterGeometry)
    waterGeometry.computeBoundsTree()
    const tsWater = new Water(waterGeometry, {
        color: new Color('#fff'),
        scale: 20,
        flowDirection: new Vector2(1, 1),
        textureWidth: 1024,
        textureHeight: 1024,
        normalMap0: pTexture[0],
        normalMap1: pTexture[1],
    })
    tsWater.material.transparent = true
    tsWater.material.depthWrite = true
    tsWater.material.depthTest = true
    tsWater.material.side = DoubleSide
    tsWater.material.uniforms.config.value.w = 20
    tsWater.material.uniforms.reflectivity.value = 0.46
    return tsWater
}

/**
 * 锚点重置到中心
 * @param {Object3D} mesh
 */
export function reAnchorCenter(mesh) {
    const geometry = mesh.geometry
    const position = mesh.position
    geometry.computeBoundingBox()
    const center = new Vector3()
    geometry.boundingBox.getCenter(center)
    const m = new Matrix4()
    m.set(1, 0, 0, center.x - position.x, 0, 1, 0, center.y - position.y, 0, 0, 1, center.z - position.z, 0, 0, 0, 1)
    geometry.center()

    mesh.position.applyMatrix4(m)
}

export function getcenterPoint(list) {
    const points = []
    for (let i = 0; i < list.length; i++) {
        points.push(new Vector2(list[i].x, list[i].y))
    }

    // 初始化中心点
    const centerPoint = new Vector2()

    // 计算所有点的总和
    for (let i = 0; i < points.length; i++) {
        centerPoint.add(points[i])
    }

    // 计算平均值
    centerPoint.divideScalar(points.length)

    // 将点转换为相对于中心点的偏移坐标
    for (let i = 0; i < points.length; i++) {
        points[i].sub(centerPoint)
    }

    return { points, centerPoint }
}
