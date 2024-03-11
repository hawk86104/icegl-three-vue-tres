/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-08 16:07:15
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-11 15:53:29
 */

import * as THREE from 'three'
import simVertex from '../shaders/simVertex.vert'
import simFragment from '../shaders/simFragment.frag'

export const makeTexture = (geometry: THREE.BufferGeometry) => {
	let vertAmount = geometry.attributes.position.count
	let texWidth = Math.ceil(Math.sqrt(vertAmount))
	let texHeight = Math.ceil(vertAmount / texWidth)

	let data = new Float32Array(texWidth * texHeight * 4)

	function shuffleArrayByThree(array: any) {
		const groupLength = 3

		let numGroups = Math.floor(array.length / groupLength)

		for (let i = numGroups - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))

			for (let k = 0; k < groupLength; k++) {
				let temp = array[i * groupLength + k]
				array[i * groupLength + k] = array[j * groupLength + k]
				array[j * groupLength + k] = temp
			}
		}

		return array
	}


	shuffleArrayByThree(geometry.attributes.position.array)

	for (let i = 0; i < vertAmount; i++) {

		const x = geometry.attributes.position.array[i * 3 + 0]
		const y = geometry.attributes.position.array[i * 3 + 1]
		const z = geometry.attributes.position.array[i * 3 + 2]
		const w = 0

		data[i * 4 + 0] = x;
		data[i * 4 + 1] = y;
		data[i * 4 + 2] = z;
		data[i * 4 + 3] = w;
	}

	let dataTexture = new THREE.DataTexture(data, texWidth, texHeight, THREE.RGBAFormat, THREE.FloatType)
	dataTexture.needsUpdate = true

	return dataTexture;
}

export const makeSimMaterial = () => {
	const simMaterial = new THREE.ShaderMaterial({
		uniforms: {
			uTextureA: { value: null },
			uTextureB: { value: null },
			uTime: { value: 0 },
			uScroll: { value: 0 },
		},
		vertexShader: simVertex,
		fragmentShader: simFragment
	})
	return simMaterial
}

export const makeSimMesh = () => {
	const simMaterial = makeSimMaterial()
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.BufferAttribute(
		new Float32Array([
			-1, -1, 0,
			1, -1, 0,
			1, 1, 0,

			-1, -1, 0,
			1, 1, 0,
			-1, 1, 0
		]),
		3
	))
	geometry.setAttribute('uv', new THREE.BufferAttribute(
		new Float32Array([
			0, 1,
			1, 1,
			1, 0,

			0, 1,
			1, 0,
			0, 0
		]),
		2
	))
	return new THREE.Mesh(geometry, simMaterial)
}
