import { LayerMaterial, Depth, Color, Fresnel, Gradient, Noise, Matcap, Texture, Displace, Normal } from 'lamina/vanilla'
import { LayerMaterialParameters } from 'lamina/types'

class LayerMaterialCom extends LayerMaterial {
	constructor(parameters: LayerMaterialParameters = {}) {
		// const layers = [
		// 	new Color({
		// 		color: '#444',
		// 		mode: 'normal',
		// 		alpha: 1,
		// 	}),
		// 	new Depth({
		// 		colorA: 'blue',
		// 		colorB: 'black',
		// 		alpha: 0.5,
		// 		mode: 'normal',
		// 		near: 0,
		// 		far: 300,
		// 		origin: new THREE.Vector3(100, 100, 100),
		// 	}),
		// ]
		// parameters.color = 'blue'
		// parameters.lighting = 'physical'
		// parameters.layers = layers
		super(parameters)
	}
	init(slots: any[]) {
		this.layers = slots[0].children.map((slot: any) => slot.el)
		this.refresh()
	}
}

export { LayerMaterialCom, Color, Depth, Fresnel, Gradient, Noise, Matcap, Texture, Displace, Normal }