export default /* glsl */ `
float getBlueNoise(sampler2D tex, vec2 coord, vec2 resolution, vec2 offset) {
    return texture(tex, coord / resolution + offset).x;
}

float getBlueNoise(sampler2D tex, vec2 coord, vec2 resolution) {
    return getBlueNoise(tex, coord, resolution, vec2(0));
}

float getBlueNoise(sampler2D tex, float t, vec2 resolution) {
    return getBlueNoise(tex, vec2(t, 0.0), resolution, vec2(0));
}
`;
