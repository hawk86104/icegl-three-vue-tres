// From https://github.com/glslify/glsl-easings

import bounceOut from './bounce-out.glsl.js';

export default /* glsl */ `
${bounceOut}

float bounceIn(float t) {
  return 1.0 - bounceOut(1.0 - t);
}
`;
