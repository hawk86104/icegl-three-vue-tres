// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
vec3 blendAlpha(vec3 x, vec3 y, float opacity) {
    return y * opacity + x * (1.0 - opacity);
}

vec4 blendAlpha(vec4 x, vec4 y, float opacity) {
    float a = min(y.a, opacity);
    return vec4(blendAlpha(x.rgb, y.rgb, a), max(x.a, a));
}
`;
