/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-03 16:58:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 10:31:00
 */
import { LayerMaterial, Depth, Color, Fresnel, Gradient, Noise, Matcap, Texture, Displace, Normal } from 'lamina/vanilla'
import {
    LayerMaterialParameters,
    ColorProps,
    DepthProps,
    FresnelProps,
    GradientProps,
    NoiseProps,
    MatcapProps,
    TextureProps,
    DisplaceProps,
    NormalProps,
} from 'lamina/types'

class LayerMaterialCom extends LayerMaterial {
    constructor(parameters: LayerMaterialParameters = {}) {
        super(parameters)
    }
    init() {
        // const keysWithPrefix = Object.keys(this).filter((key) => key.startsWith('layercoms_'))
        // const valuesWithPrefix = keysWithPrefix.map((key: any) => this[key])
        // this.layers = valuesWithPrefix
        // @ts-ignore
        this.__tres.objects.forEach((obj: any) => {
            if (obj.attach.startsWith) {
                obj.attach.startsWith('layercoms_')
                this.layers.push(obj)
            }
        })
        this.refresh()
    }
}
class MatcapCom extends Matcap {
    attach = 'layercoms_matcap_'
    constructor(parameters: MatcapProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class TextureCom extends Texture {
    attach = 'layercoms_texture_'
    constructor(parameters: TextureProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class DisplaceCom extends Displace {
    attach = 'layercoms_displace_'
    constructor(parameters: DisplaceProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class DepthCom extends Depth {
    attach = 'layercoms_depth_'
    constructor(parameters: DepthProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class NormalCom extends Normal {
    attach = 'layercoms_normal_'
    constructor(parameters: NormalProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class ColorCom extends Color {
    attach = 'layercoms_color_'
    constructor(parameters: ColorProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class FresnelCom extends Fresnel {
    attach = 'layercoms_fresnel_'
    constructor(parameters: FresnelProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class GradientCom extends Gradient {
    attach = 'layercoms_gradient_'
    constructor(parameters: GradientProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}
class NoiseCom extends Noise {
    attach = 'layercoms_noise_'
    constructor(parameters: NoiseProps = {}) {
        super(parameters)
        this.attach += this.uuid.substring(this.uuid.length - 12)
    }
}

export {
    LayerMaterialCom,
    ColorCom as Color,
    DepthCom as Depth,
    FresnelCom as Fresnel,
    GradientCom as Gradient,
    NoiseCom as Noise,
    MatcapCom as Matcap,
    TextureCom as Texture,
    DisplaceCom as Displace,
    NormalCom as Normal,
}
