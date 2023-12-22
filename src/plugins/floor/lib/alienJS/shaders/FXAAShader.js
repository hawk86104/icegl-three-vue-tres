// Based on https://github.com/mattdesl/glsl-fxaa

import fxaa from './modules/fxaa/fxaa.glsl.js';

export const vertexShader = /* glsl */ `
in vec3 position;
in vec2 uv;

uniform vec2 uResolution;

out vec2 v_rgbNW;
out vec2 v_rgbNE;
out vec2 v_rgbSW;
out vec2 v_rgbSE;
out vec2 v_rgbM;

out vec2 vUv;

void main() {
    vUv = uv;

    vec2 fragCoord = uv * uResolution;
    vec2 inverseVP = 1.0 / uResolution.xy;
    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    v_rgbM = vec2(fragCoord * inverseVP);

    gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tMap;
uniform vec2 uResolution;

in vec2 v_rgbNW;
in vec2 v_rgbNE;
in vec2 v_rgbSW;
in vec2 v_rgbSE;
in vec2 v_rgbM;

in vec2 vUv;

out vec4 FragColor;

${fxaa}

void main() {
    FragColor = fxaa(tMap, vUv * uResolution, uResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`;
