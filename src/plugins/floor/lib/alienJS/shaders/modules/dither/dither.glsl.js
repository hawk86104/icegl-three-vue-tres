// Based on https://www.shadertoy.com/view/MslGR8 by hornet

import random from '../random/random.glsl.js';

export default /* glsl */ `
${random}

vec3 dither(vec3 color) {
    // Calculate grid position
    float grid_position = random(gl_FragCoord.xy);

    // Shift the individual colors differently, thus making it even harder to see the dithering pattern
    vec3 dither_shift_RGB = vec3(0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0);

    // Modify shift acording to grid position
    dither_shift_RGB = mix(2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position);

    // Shift the color by dither_shift
    return color + dither_shift_RGB;
}
`;
