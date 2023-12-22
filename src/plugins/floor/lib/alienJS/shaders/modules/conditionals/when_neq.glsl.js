// From https://github.com/dmnsgn/glsl-conditionals

export default /* glsl */ `
float when_neq(float x, float y) {
  return abs(sign(x - y));
}

vec2 when_neq(vec2 x, vec2 y) {
  return abs(sign(x - y));
}

vec3 when_neq(vec3 x, vec3 y) {
  return abs(sign(x - y));
}

vec4 when_neq(vec4 x, vec4 y) {
  return abs(sign(x - y));
}
`;
