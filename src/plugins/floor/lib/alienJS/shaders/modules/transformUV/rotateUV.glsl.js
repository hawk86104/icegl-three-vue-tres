export default /* glsl */ `
vec2 rotateUV(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return rotateUV(uv, rotation, vec2(mid));
}

vec2 rotateUV(vec2 uv, float rotation) {
    return rotateUV(uv, rotation, vec2(0.5));
}
`;
