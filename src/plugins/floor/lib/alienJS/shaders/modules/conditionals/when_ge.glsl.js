import when_lt from './when_lt.glsl.js';

// From https://github.com/dmnsgn/glsl-conditionals

export default /* glsl */ `
${when_lt}

float when_ge(float x, float y) {
  return 1.0 - when_lt(x, y);
}

vec2 when_ge(vec2 x, vec2 y) {
  return 1.0 - when_lt(x, y);
}

vec3 when_ge(vec3 x, vec3 y) {
  return 1.0 - when_lt(x, y);
}

vec4 when_ge(vec4 x, vec4 y) {
  return 1.0 - when_lt(x, y);
}
`;
