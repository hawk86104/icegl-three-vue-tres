// From https://github.com/glslify/glsl-easings

import bounceOut from './bounce-out.glsl.js';

export default /* glsl */ `
${bounceOut}

float bounceInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}
`;
