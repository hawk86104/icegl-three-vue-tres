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
	toGeometry.deleteAttribute('uv')
	srcGeometry.computeBoundingBox()
	const { max, min } = srcGeometry.boundingBox;
	const roomX = max.x - min.x
	const roomY = max.y - min.y
	const PuvList = []
	for (let i = 0; i < toGeometry.attributes.position.count; i++) {
		PuvList.push((toGeometry.attributes.position.getX(i) - min.x) / roomX)
		PuvList.push((toGeometry.attributes.position.getY(i) - min.y) / roomY)
	}
	const Puvs = new Float32Array(PuvList)
	toGeometry.setAttribute('uv', new BufferAttribute(Puvs, 2));
}