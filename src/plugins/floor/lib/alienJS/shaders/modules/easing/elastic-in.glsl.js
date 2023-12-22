// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif

float elasticIn(float t) {
  return sin(13.0 * t * HALF_PI) * pow(2.0, 10.0 * (t - 1.0));
}
`;
