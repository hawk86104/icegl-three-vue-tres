// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendMultiply(vec4 x, vec4 y, float opacity) {
    return x * y * opacity + x * (1.0 - opacity);
}
`;
