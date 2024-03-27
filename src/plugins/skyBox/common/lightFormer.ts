import * as THREE from "three"

class lightFormer {
	constructor(config: { color?: string, form?: "circle" | "ring" | "rect", intensity?: number } = {}) {
		const { color = "white", form = "rect", intensity = 1 } = config

		const geometry = {
			circle: new THREE.RingGeometry(0, 1, 64),
			ring: new THREE.RingGeometry(0.5, 1, 64),
			rect: new THREE.PlaneGeometry(),
		}[form]

		const material = new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			color: new THREE.Color(color),
		})

		material.color.multiplyScalar(intensity)
		this.material = material
		const mesh = new THREE.Mesh(geometry, material)
		this.mesh = mesh
	}

	material: THREE.MeshBasicMaterial
	mesh: THREE.Mesh
}

export { lightFormer }