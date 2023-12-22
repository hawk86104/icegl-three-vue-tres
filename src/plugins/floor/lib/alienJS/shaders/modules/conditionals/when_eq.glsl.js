// From https://github.com/dmnsgn/glsl-conditionals

export default /* glsl */ `
float when_eq(float x, float y) {
  return 1.0 - abs(sign(x - y));
}

vec2 when_eq(vec2 x, vec2 y) {
  return 1.0 - abs(sign(x - y));
}

vec3 when_eq(vec3 x, vec3 y) {
  return 1.0 - abs(sign(x - y));
}

vec4 when_eq(vec4 x, vec4 y) {
  return 1.0 - abs(sign(x - y));
}
`;
