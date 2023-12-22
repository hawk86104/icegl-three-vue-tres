import { GLSL3, NearestFilter, NoBlending, RawShaderMaterial, RepeatWrapping, TextureLoader, Vector2 } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/PoissonDiscBlurShader.js';

export class PoissonDiscBlurMaterial extends RawShaderMaterial {
    constructor(loader = new TextureLoader(), {
        blueNoisePath = 'assets/textures/blue_noise.png',
        blueNoiseResolution = new Vector2(256, 256)
    } = {}) {
        const texture = loader.load(blueNoisePath);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.magFilter = NearestFilter;
        texture.minFilter = NearestFilter;
        texture.generateMipmaps = false;

        super({
            glslVersion: GLSL3,
            uniforms: {
                tMap: { value: null },
                tBlueNoise: { value: texture },
                uBlueNoiseResolution: { value: blueNoiseResolution },
                uRadius: { value: 42 },
                uResolution: { value: new Vector2() },
                uTime: { value: 0 }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
