export default /* glsl */ `
vec2 scaleUV(vec2 uv, float scale, vec2 mid) {
    uv -= mid;
    uv *= 1.0 / scale;
    uv += mid;
    return uv;
}

vec2 scaleUV(vec2 uv, float scale, float mid) {
    return scaleUV(uv, scale, vec2(mid));
}

vec2 scaleUV(vec2 uv, float scale) {
    return scaleUV(uv, scale, vec2(0.5));
}
`;
