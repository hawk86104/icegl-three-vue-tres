// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
#ifndef PI
#define PI 3.141592653589793
#endif

float backOut(float t) {
  float f = t < 0.5
    ? 2.0 * t
    : 1.0 - (2.0 * t - 1.0);

  float g = pow(f, 3.0) - f * sin(f * PI);

  return t < 0.5
    ? 0.5 * g
    : 0.5 * (1.0 - g) + 0.5;
}
`;
