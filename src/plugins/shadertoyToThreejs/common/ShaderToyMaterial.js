import { DoubleSide, MeshPhysicalMaterial } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
export default class ShaderToyMaterial {
    constructor(shaderToySample, options_) {
        const usedUniforms = ShaderToyMaterial.replaceVariable(shaderToySample);
        const material = new CustomShaderMaterial({
            baseMaterial: MeshPhysicalMaterial,
            vertexShader: `	
            varying vec2 vUv;
            void main() {
                csm_Position = position * vec3(1.0);
                vUv = uv;
            } `,
            fragmentShader: usedUniforms,
            side: DoubleSide,
            uniforms: options_.material.uniforms,
        });

        this.material = material;
        console.log(this.material);
    }
    static replaceVariable(shaderToySample) {
        shaderToySample = 'varying vec2 vUv;\n' + shaderToySample;
        let time = /iTime|iTimeDelta/g;
        if (time.test(shaderToySample)) {
            let shaderToySampleuv = shaderToySample.split('varying vec2 vUv;\n');
            shaderToySample = 'varying vec2 vUv;\n' + 'uniform float utime;\n' + shaderToySampleuv[1];
            shaderToySample = shaderToySample.replace(/iTime|iTimeDelta/g, 'utime');
        }

        let iResolution = /iResolution\.[a-zA-Z_]+/g;
        if (iResolution.test(shaderToySample)) {
            let shaderToySampleuv = shaderToySample.split('varying vec2 vUv;\n');
            shaderToySample = 'varying vec2 vUv;\n' + 'uniform vec2 uresolution;\n' + shaderToySampleuv[1];
            shaderToySample = shaderToySample.replace(/iResolution\.[a-zA-Z_]+/g, '1.');
            shaderToySample = shaderToySample.replace(/iResolution/g, '1.');
        }
        let utexture = /iChannel0|iChannel1|iChannel2|iChannel3/g;
        if (utexture.test(shaderToySample)) {
            let shaderToySampleuv = shaderToySample.split('varying vec2 vUv;\n');
            shaderToySample = 'varying vec2 vUv;\n' + 'uniform sampler2D  utexture;\n' + shaderToySampleuv[1];
            shaderToySample = shaderToySample.replace(/iChannel0|iChannel1|iChannel2|iChannel3/g, 'utexture');
        }

        let umouse = shaderToySample.replace(/iMouse/g, 'umouse');
        let mainImage = shaderToySample.replace(/void mainImage\( out vec4 fragColor, in vec2 fragCoord \)/g, 'void main()');
        let fragColor = mainImage.replace(/fragColor/g, 'csm_DiffuseColor');
        let fragCoord = fragColor.replace(/fragCoord/g, 'vUv');
        return fragCoord;
    }
}
