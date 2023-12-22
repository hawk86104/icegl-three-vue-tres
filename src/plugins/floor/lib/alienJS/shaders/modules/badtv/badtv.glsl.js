// Based on https://github.com/felixturner/bad-tv-shader

import simplex2d from '../noise/simplex2d.glsl.js';

export default /* glsl */ `
${simplex2d}

vec4 getBadTV(sampler2D image, vec2 uv, float time, float distortion, float distortion2, float speed, float rollSpeed) {
    vec2 p = uv;
    float ty = time * speed;
    float yt = p.y - ty;

    // Smooth distortion
    float offset = snoise(vec2(yt * 3.0, 0.0)) * 0.2;

    // Boost distortion
    offset = offset * distortion * offset * distortion * offset;

    // Add fine grain distortion
    offset += snoise(vec2(yt * 50.0, 0.0)) * distortion2 * 0.001;

    // Combine distortion on X with roll on Y
    return texture(image, vec2(fract(p.x + offset), fract(p.y - time * rollSpeed)));
}
`;
