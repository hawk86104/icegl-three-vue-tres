// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
float blendOverlay(float x, float y) {
    return (x < 0.5) ? (2.0 * x * y) : (1.0 - 2.0 * (1.0 - x) * (1.0 - y));
}

vec4 blendOverlay(vec4 x, vec4 y, float opacity) {
    vec4 z = vec4(blendOverlay(x.r, y.r), blendOverlay(x.g, y.g), blendOverlay(x.b, y.b), blendOverlay(x.a, y.a));
    return z * opacity + x * (1.0 - opacity);
}
`;
