// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
float quarticOut(float t) {
  return pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}
`;
