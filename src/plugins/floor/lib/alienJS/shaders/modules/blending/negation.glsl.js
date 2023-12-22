// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendNegation(vec4 x, vec4 y, float opacity) {
    return (1.0 - abs(1.0 - x - y)) * opacity + x * (1.0 - opacity);
}
`;
