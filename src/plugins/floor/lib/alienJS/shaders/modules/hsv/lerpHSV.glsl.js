// Based on https://github.com/yuichiroharai/glsl-y-hsv

export default /* glsl */ `
vec3 lerpHSV(vec3 hsv1, vec3 hsv2, float rate) {
    float hue = (mod(mod((hsv2.x - hsv1.x), 1.0) + 1.5, 1.0) - 0.5) * rate + hsv1.x;

    return vec3(hue, mix(hsv1.yz, hsv2.yz, rate));
}
`;
