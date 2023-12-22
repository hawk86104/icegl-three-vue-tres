// Based on https://github.com/BKcore/Three.js-experiments-pool
// Based on https://github.com/netpraxis/volumetric_light_example
// Based on https://codepen.io/peterhry/pen/egzjGR
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
uniform float uSwizzle;
uniform float uExposure;
uniform float uDecay;
uniform float uDensity;
uniform float uWeight;
uniform float uClamp;
uniform vec2 uLensflareScale;
uniform float uLensflareExposure;
uniform float uLensflareClamp;
uniform vec2 uResolution;

in vec2 vUv;

out vec4 FragColor;

const int samples = 20;

${lensflare}

void main() {
    vec2 texCoord = vUv;
    vec2 deltaTextCoord = texCoord - uLightPosition;
    deltaTextCoord *= 1.0 / float(samples) * uDensity;
    vec4 color = vec4(0);
    float illuminationDecay = 1.0;

    for (int i = 0; i < samples; i++) {
        texCoord -= ((deltaTextCoord.xy * (1.0 - uSwizzle)) + (deltaTextCoord.xx * uSwizzle)) * uScale;
        vec4 texel = texture(tMap, texCoord);
        texel *= illuminationDecay * uWeight;
        color += texel;
        illuminationDecay *= uDecay;
    }

    color *= uExposure;
    color = clamp(color, 0.0, uClamp);

    // Lens flare
    vec2 uv = vUv - 0.5;
    vec2 pos = uLightPosition - 0.5;

    uv.x *= uResolution.x / uResolution.y;
    pos.x *= uResolution.x / uResolution.y;

    uv *= uLensflareScale;
    pos *= uLensflareScale;

    vec3 flare = lensflare(uv, pos) * texture(tMap, uLightPosition).rgb * 2.0;
    flare = pow(flare, vec3(0.5));
    flare *= uLensflareExposure;
    flare = clamp(flare, 0.0, uLensflareClamp);

    FragColor = vec4(flare + color.rgb, 1.0);
}
`;
