// Based on https://github.com/yuichiroharai/glsl-y-hsv

export default /* glsl */ `
vec3 hsv2rgbSmooth(vec3 hsv) {
    vec3 rgb = clamp(abs(mod(hsv.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);

    rgb = rgb * rgb * (3.0 - 2.0 * rgb); // Cubic smoothing

    return hsv.z * mix(vec3(1.0), rgb, hsv.y);
}
`;
