// From https://www.shadertoy.com/view/4dS3Wd by morgan3d

import noise from '../noise/noise3d.glsl.js';

export default /* glsl */ `
#define NUM_OCTAVES 5

${noise}

float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
`;
