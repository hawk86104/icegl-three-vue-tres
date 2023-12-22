// From https://github.com/dmnsgn/glsl-conditionals

export default /* glsl */ `
float when_lt(float x, float y) {
  return max(sign(y - x), 0.0);
}

vec2 when_lt(vec2 x, vec2 y) {
  return max(sign(y - x), 0.0);
}

vec3 when_lt(vec3 x, vec3 y) {
  return max(sign(y - x), 0.0);
}

vec4 when_lt(vec4 x, vec4 y) {
  return max(sign(y - x), 0.0);
}
`;
