// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
float circularIn(float t) {
  return 1.0 - sqrt(1.0 - t * t);
}
`;
