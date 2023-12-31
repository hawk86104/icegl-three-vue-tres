// From https://github.com/glslify/glsl-aastep by mattdesl

export default /* glsl */ `
float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}
`;
