// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
float blendColorDodge(float x, float y) {
    return (y == 1.0) ? y : min(x / (1.0 - y), 1.0);
}

vec4 blendColorDodge(vec4 x, vec4 y, float opacity) {
    vec4 z = vec4(blendColorDodge(x.r, y.r), blendColorDodge(x.g, y.g), blendColorDodge(x.b, y.b), blendColorDodge(x.a, y.a));
    return z * opacity + x * (1.0 - opacity);
}
`;
