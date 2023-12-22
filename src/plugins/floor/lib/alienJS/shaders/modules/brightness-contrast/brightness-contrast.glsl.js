// Based on https://github.com/spite/Wagner

export default /* glsl */ `
vec3 getBrightnessContrast(vec3 rgb, float brightness, float contrast) {
    rgb *= contrast;
    rgb += brightness;
    return rgb;
}
`;
