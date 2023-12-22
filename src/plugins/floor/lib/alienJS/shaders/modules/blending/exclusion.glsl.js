// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendExclusion(vec4 x, vec4 y, float opacity) {
    return (x + y - 2.0 * x * y) * opacity + x * (1.0 - opacity);
}
`;
