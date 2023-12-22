// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendSubtract(vec4 x, vec4 y, float opacity) {
    return max(x + y - 1.0, 0.0) * opacity + x * (1.0 - opacity);
}
`;
