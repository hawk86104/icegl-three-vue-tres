// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
float blendDivide(float x, float y) {
    return (y > 0.0) ? min(x / y, 1.0) : 1.0;
}

vec4 blendDivide(vec4 x, vec4 y, float opacity) {
    vec4 z = vec4(blendDivide(x.r, y.r), blendDivide(x.g, y.g), blendDivide(x.b, y.b), blendDivide(x.a, y.a));
    return z * opacity + x * (1.0 - opacity);
}
`;
