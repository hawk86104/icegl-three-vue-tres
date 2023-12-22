// From https://github.com/dmnsgn/glsl-conditionals

export default /* glsl */ `
float when_or(float a, float b) {
  return min(a + b, 1.0);
}

vec2 when_or(vec2 a, vec2 b) {
  return min(a + b, 1.0);
}

vec3 when_or(vec3 a, vec3 b) {
  return min(a + b, 1.0);
}

vec4 when_or(vec4 a, vec4 b) {
  return min(a + b, 1.0);
}
`;
