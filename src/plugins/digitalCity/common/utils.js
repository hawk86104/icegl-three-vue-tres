/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-09 09:33:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-28 15:17:58
 */
import { BufferAttribute } from 'three'

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