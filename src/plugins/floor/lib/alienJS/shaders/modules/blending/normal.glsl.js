// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendNormal(vec4 x, vec4 y, float opacity) {
    return y * opacity + x * (1.0 - opacity);
}
`;
