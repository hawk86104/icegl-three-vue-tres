import { LayerMaterial, Depth, Color, Fresnel, Gradient, Noise, Matcap, Texture, Displace, Normal } from 'lamina/vanilla'
import { LayerMaterialParameters } from 'lamina/types'

class LayerMaterialCom extends LayerMaterial {
	constructor(parameters: LayerMaterialParameters = {}) {
		super(parameters)
	}
	init(slots: any[]) {
		this.layers = slots[0].children.map((slot: any) => slot.el)
		this.refresh()
	}
}

export { LayerMaterialCom, Color, Depth, Fresnel, Gradient, Noise, Matcap, Texture, Displace, Normal }