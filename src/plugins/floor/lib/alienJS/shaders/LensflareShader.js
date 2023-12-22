// Based on https://www.shadertoy.com/view/4sX3Rs by mu6k
// Based on https://www.shadertoy.com/view/wlcyzj by TheNosiriN

import lensflare from './modules/lensflare/lensflare.glsl.js';

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

uniform sampler2D tMap;
uniform vec2 uLightPosition;
uniform vec2 uScale;
uniform float uExposure;
uniform float uClamp;
uniform vec2 uResolution;

in vec2 vUv;

out vec4 FragColor;

${lensflare}

void main() {
    vec2 uv = vUv - 0.5;
    vec2 pos = uLightPosition - 0.5;

    uv.x *= uResolution.x / uResolution.y;
    pos.x *= uResolution.x / uResolution.y;

    uv *= uScale;
    pos *= uScale;

    vec3 color = lensflare(uv, pos) * texture(tMap, uLightPosition).rgb * 2.0;
    color = pow(color, vec3(0.5));
    color *= uExposure;
    color = clamp(color, 0.0, uClamp);

    FragColor = vec4(color, 1.0);
}
`;
