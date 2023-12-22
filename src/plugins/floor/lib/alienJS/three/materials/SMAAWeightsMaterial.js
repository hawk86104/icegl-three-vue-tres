import { GLSL3, LinearFilter, NearestFilter, NoBlending, RawShaderMaterial, TextureLoader, Vector2 } from 'three';

import { vertexShader, fragmentShader } from '../../shaders/SMAAWeightsShader.js';

export class SMAAWeightsMaterial extends RawShaderMaterial {
    constructor(loader = new TextureLoader(), {
        areaTexturePath = 'assets/textures/smaa/area.png',
        searchTexturePath = 'assets/textures/smaa/search.png'
    } = {}) {
        const areaTexture = loader.load(areaTexturePath);
        areaTexture.minFilter = LinearFilter;
        areaTexture.generateMipmaps = false;
        areaTexture.flipY = false;

        const searchTexture = loader.load(searchTexturePath);
        searchTexture.magFilter = NearestFilter;
        searchTexture.minFilter = NearestFilter;
        searchTexture.generateMipmaps = false;
        searchTexture.flipY = false;

        super({
            glslVersion: GLSL3,
            defines: {
                SMAA_MAX_SEARCH_STEPS: '8',
                SMAA_AREATEX_MAX_DISTANCE: '16',
                SMAA_AREATEX_PIXEL_SIZE: '(1.0 / vec2(160.0, 560.0))',
                SMAA_AREATEX_SUBTEX_SIZE: '(1.0 / 7.0)'
            },
            uniforms: {
                tMap: { value: null },
                tArea: { value: areaTexture },
                tSearch: { value: searchTexture },
                uTexelSize: { value: new Vector2() }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });
    }
}
