// Based on https://github.com/pmndrs/postprocessing by vanruesc

export default /* glsl */ `
float blendColorBurn(float x, float y) {
    return (y == 0.0) ? y : max(1.0 - (1.0 - x) / y, 0.0);
}

vec4 blendColorBurn(vec4 x, vec4 y, float opacity) {
    vec4 z = vec4(blendColorBurn(x.r, y.r), blendColorBurn(x.g, y.g), blendColorBurn(x.b, y.b), blendColorBurn(x.a, y.a));
    return z * opacity + x * (1.0 - opacity);
}
`;
