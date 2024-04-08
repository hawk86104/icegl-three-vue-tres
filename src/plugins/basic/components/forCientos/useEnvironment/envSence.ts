/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-07 18:13:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-08 12:00:23
 */

import * as THREE from 'three'

class EnvSence extends THREE.Object3D {
	// attach = 'EnvSence'
	virtualScene = null as unknown as THREE.Scene
	// parent = null as unknown as THREE.Object3D
	constructor() {
		// console.log('EnvSence constructor')
		super()
		this.virtualScene = new THREE.Scene()
	}
	add(...object: THREE.Object3D[]): this {
		this.virtualScene.add(...object)
		return this
	}
	destructor() {
		this.virtualScene.traverse((object) => {
			if (object instanceof THREE.Mesh) {
				object.geometry.dispose()
				object.material.dispose()
				if (object.material.map) object.material.map.dispose()
				this.virtualScene.remove(object)
			}
		})
		this.virtualScene = null as unknown as THREE.Scene
		// console.log('EnvSence destructor')
	}
}

export default EnvSence