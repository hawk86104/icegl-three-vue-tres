// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
float quadraticInOut(float t) {
  float p = 2.0 * t * t;
  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}
`;
