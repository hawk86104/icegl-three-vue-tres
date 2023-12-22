// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
float quarticInOut(float t) {
  return t < 0.5
    ? +8.0 * pow(t, 4.0)
    : -8.0 * pow(t - 1.0, 4.0) + 1.0;
}
`;
