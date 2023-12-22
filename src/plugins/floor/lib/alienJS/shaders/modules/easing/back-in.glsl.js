// From https://github.com/glslify/glsl-easings

export default /* glsl */ `
#ifndef PI
#define PI 3.141592653589793
#endif

float backIn(float t) {
  return pow(t, 3.0) - t * sin(t * PI);
}
`;
