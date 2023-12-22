// From https://github.com/dmnsgn/glsl-conditionals

export default /* glsl */ `
float when_gt(float x, float y) {
  return max(sign(x - y), 0.0);
}

vec2 when_gt(vec2 x, vec2 y) {
  return max(sign(x - y), 0.0);
}

vec3 when_gt(vec3 x, vec3 y) {
  return max(sign(x - y), 0.0);
}

vec4 when_gt(vec4 x, vec4 y) {
  return max(sign(x - y), 0.0);
}
`;
