// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendAdd(vec4 x, vec4 y, float opacity) {
    return min(x + y, 1.0) * opacity + x * (1.0 - opacity);
}
`;
