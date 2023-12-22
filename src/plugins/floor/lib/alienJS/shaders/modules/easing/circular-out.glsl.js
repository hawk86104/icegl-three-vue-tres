// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
float circularOut(float t) {
  return sqrt((2.0 - t) * t);
}
`;
