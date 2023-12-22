// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif

float sineIn(float t) {
  return sin((t - 1.0) * HALF_PI) + 1.0;
}
`;
