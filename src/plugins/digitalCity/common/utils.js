/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-09 09:33:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-04 09:25:52
 */
import { BufferAttribute, Box3, Vector3, RepeatWrapping, Color, Mesh, PlaneGeometry, Vector2, DoubleSide, Material, MeshBasicMaterial, BufferGeometry, Matrix4 } from 'three'

export const resetUV = (geometry) => {
	geometry.computeBoundingBox()
	const { max, min } = geometry.boundingBox;
	geometry.deleteAttribute('uv')
	const roomX = max.x - min.x
	const roomY = max.y - min.y
	const PuvList = []
	for (let i = 0; i < geometry.attributes.position.count; i++) {
		PuvList.push((geometry.attributes.position.getX(i) - min.x) / roomX)
		PuvList.push((geometry.attributes.position.getY(i) - min.y) / roomY)
	}
	const Puvs = new Float32Array(PuvList)
	geometry.setAttribute('uv', new BufferAttribute(Puvs, 2));
}
const randomUV = (geometry) => {
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
	const { max, min } = srcGeometry.boundingBox;
	const roomX = max.x - min.x
	const roomY = max.y - min.y
	// debugger
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
	toGeometry.setAttribute('uv', new BufferAttribute(Puvs, 2));
}

import { request } from '@fesjs/fes'
export const loadGeojson = (filepath, dataType) => new Promise((resolve, reject) => {
	request(filepath, {}, { method: 'get' })
		.then((res) => {
			if (dataType) {
				resolve(res.dataType)
			}
			resolve(res.features)
		})
		.catch((err) => {
			console.err(err)
			reject(error)
		});
})

export const getBoxInfo = (mesh) => {
	const box3 = new Box3()
	box3.expandByObject(mesh)
	const size = new Vector3()
	const center = new Vector3()
	box3.getCenter(center)
	box3.getSize(size)
	return {
		size, center
	}
}
export const toMeshSceneCenter = (mesh) => {
	const { center, size } = getBoxInfo(mesh)
	mesh.position.copy(center.negate().setY(0))
}
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
export const initMeshBvh = () => {
	BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
	BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
	Mesh.prototype.raycast = acceleratedRaycast;
}

//水面
import { useTexture } from '@tresjs/core'
import { Water } from 'three/addons/objects/Water2'
export const setThreeWater2 = async (mesh) => {
	const pTexture = await useTexture(['./plugins/water/images/Water_1_M_Normal.jpg', './plugins/water/images/Water_2_M_Normal.jpg'])
	const waterGeometry = mesh.geometry.clone()
	resetUV(waterGeometry)
	waterGeometry.computeBoundsTree()
	const tsWater = new Water(
		waterGeometry,
		{
			color: new Color('#fff'),
			scale: 20,
			flowDirection: new Vector2(1, 1),
			textureWidth: 1024,
			textureHeight: 1024,
			normalMap0: pTexture[0],
			normalMap1: pTexture[1]
		}
	)
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
export function reAnchorCenter (mesh) {
	const geometry = mesh.geometry
	const position = mesh.position
	geometry.computeBoundingBox()
	const center = new Vector3();
	geometry.boundingBox.getCenter(center);
	const m = new Matrix4();
	m.set(1, 0, 0, center.x - position.x,
		0, 1, 0, center.y - position.y,
		0, 0, 1, center.z - position.z,
		0, 0, 0, 1)
	geometry.center();

	mesh.position.applyMatrix4(m)
}