// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendAverage(vec4 x, vec4 y, float opacity) {
    return (x + y) * 0.5 * opacity + x * (1.0 - opacity);
}
`;
