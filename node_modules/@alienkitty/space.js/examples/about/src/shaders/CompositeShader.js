// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/ACESFilmicToneMappingShader.js by WestLangley
// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/GammaCorrectionShader.js by WestLangley

import rgbshift from '@alienkitty/alien.js/src/shaders/modules/rgbshift/rgbshift.glsl.js';
import encodings from '@alienkitty/alien.js/src/shaders/modules/encodings/encodings.glsl.js';

export const vertexShader = /* glsl */ `
    in vec3 position;
    in vec2 uv;

    out vec2 vUv;

    void main() {
        vUv = uv;

        gl_Position = vec4(position, 1.0);
    }
`;

export const fragmentShader = /* glsl */ `
    precision highp float;

    uniform sampler2D tScene;
    uniform sampler2D tBloom;
    uniform float uBloomDistortion;
    uniform bool uToneMapping;
    uniform float uExposure;
    uniform bool uGamma;

    in vec2 vUv;

    out vec4 FragColor;

    ${rgbshift}
    ${encodings}

    void main() {
        FragColor = texture(tScene, vUv);

        float angle = length(vUv - 0.5);
        float amount = 0.001 * uBloomDistortion;

        FragColor.rgb += getRGB(tBloom, vUv, angle, amount).rgb;

        if (uToneMapping) {
            FragColor.rgb *= uExposure;

            FragColor = vec4(ACESFilmicToneMapping(FragColor.rgb), FragColor.a);
        }

        if (uGamma) {
            FragColor = LinearToSRGB(FragColor);
        }
    }
`;
