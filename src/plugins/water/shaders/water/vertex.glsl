uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform sampler2D water;

attribute vec3 position;

varying vec3 eye;
varying vec3 pos;


void main() {
  vec4 info = texture2D(water, position.xy * 0.5 + 0.5);
  pos = position.xzy;
  pos.y += info.r;

  vec3 axis_x = vec3(modelViewMatrix[0].x, modelViewMatrix[0].y, modelViewMatrix[0].z);
  vec3 axis_y = vec3(modelViewMatrix[1].x, modelViewMatrix[1].y, modelViewMatrix[1].z);
  vec3 axis_z = vec3(modelViewMatrix[2].x, modelViewMatrix[2].y, modelViewMatrix[2].z);
  vec3 offset = vec3(modelViewMatrix[3].x, modelViewMatrix[3].y, modelViewMatrix[3].z);

  eye = vec3(dot(-offset, axis_x), dot(-offset, axis_y), dot(-offset, axis_z));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
