import when_gt from './when_gt.glsl.js';

// From https://github.com/dmnsgn/glsl-conditionals

export default /* glsl */ `
${when_gt}

float when_le(float x, float y) {
  return 1.0 - when_gt(x, y);
}

vec2 when_le(vec2 x, vec2 y) {
  return 1.0 - when_gt(x, y);
}

vec3 when_le(vec3 x, vec3 y) {
  return 1.0 - when_gt(x, y);
}

vec4 when_le(vec4 x, vec4 y) {
  return 1.0 - when_gt(x, y);
}
`;
