// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
float qinticOut(float t) {
  return 1.0 - (pow(t - 1.0, 5.0));
}
`;
