// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec4 blendScreen(vec4 x, vec4 y, float opacity) {
    return (1.0 - (1.0 - x) * (1.0 - y)) * opacity + x * (1.0 - opacity);
}
`;
