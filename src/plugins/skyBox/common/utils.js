import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
export const loadHDR = (filepath) => new Promise((resolve, reject) => {
	const loader = new RGBELoader()
	// loader.setDataType(THREE.UnsignedByteType)
	loader.load(filepath, (texture, textureData) => {
		texture.minFilter = THREE.LinearFilter	//当一个纹素覆盖小于一个像素时，贴图将如何采样
		texture.magFilter = THREE.LinearFilter	//当一个纹素覆盖大于一个像素时，贴图将如何采样
		texture.mapping = THREE.EquirectangularReflectionMapping
		texture.needsUpdate = true
		// texture.flipY = true	//翻转图像的Y轴以匹配WebGL纹理坐标空间
		resolve(texture)
	})
})