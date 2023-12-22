// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
float blendSoftLight(float x, float y) {
    return (y < 0.5) ?
        (2.0 * x * y + x * x * (1.0 - 2.0 * y)) :
        (sqrt(x) * (2.0 * y - 1.0) + 2.0 * x * (1.0 - y));
}

vec4 blendSoftLight(vec4 x, vec4 y, float opacity) {
    vec4 z = vec4(blendSoftLight(x.r, y.r), blendSoftLight(x.g, y.g), blendSoftLight(x.b, y.b), blendSoftLight(x.a, y.a));
    return z * opacity + x * (1.0 - opacity);
}
`;
