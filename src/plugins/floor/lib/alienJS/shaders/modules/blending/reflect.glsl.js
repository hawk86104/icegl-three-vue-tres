// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
float blendReflect(float x, float y) {
    return (y == 1.0) ? y : min(x * x / (1.0 - y), 1.0);
}

vec4 blendReflect(vec4 x, vec4 y, float opacity) {
    vec4 z = vec4(blendReflect(x.r, y.r), blendReflect(x.g, y.g), blendReflect(x.b, y.b), blendReflect(x.a, y.a));
    return z * opacity + x * (1.0 - opacity);
}
`;
