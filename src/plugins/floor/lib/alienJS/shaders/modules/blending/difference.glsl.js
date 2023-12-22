// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendDifference(vec4 x, vec4 y, float opacity) {
    return abs(x - y) * opacity + x * (1.0 - opacity);
}
`;
