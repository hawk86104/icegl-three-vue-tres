// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
float cubicOut(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}
`;
