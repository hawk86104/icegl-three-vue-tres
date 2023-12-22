// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
#ifndef PI
#define PI 3.141592653589793
#endif

float sineInOut(float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}
`;
