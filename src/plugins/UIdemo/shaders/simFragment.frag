uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
precision mediump float; // Add default precision qualifier
uniform float uTime;
uniform float uScroll;
varying vec2 vUv;

mat3 rotationMatrix3(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1. - c;

  return mat3(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,
              oc * axis.z * axis.x + axis.y * s,
              oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,
              oc * axis.y * axis.z - axis.x * s,
              oc * axis.z * axis.x - axis.y * s,
              oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c);
}

void main() {
  // vec3 textureA = rotationMatrix3(vec3(1., 0., 0.), sin(uTime) * .1) *
  //                 texture2D(uTextureA, vUv).xyz;
  vec3 textureA = texture2D(uTextureA, vUv).xyz;

  // vec3 textureB = rotationMatrix3(vec3(0., 1., 0.), sin(uTime) * .3 + 3.14) *
  //                 texture2D(uTextureB, vUv).xyz;
  vec3 textureB = texture2D(uTextureB, vUv).xyz;

  // float time = uTime;

  // float m = min(smoothstep(0.1, 1.3, time), 1.0);
  // float m2 = min(smoothstep(0.1, 3.3, time - 5.), 1.0);

  vec3 pos = vec3(0.0);

  // if (m < 1.0) {
  //   pos = mix(textureA, textureB, m);
  // } else {
  //   pos = mix(textureB, textureA, m2);
  // }
  // float range = 1. / 2.0;
  // float r = random(vUv) * .2;
  float t = uScroll;
  pos = mix(textureA, textureB, t);

  // if (textureA == vec3(0.0) || textureB == vec3(0.0)) {
  //   pos = vec3(0.0, 0.0, 0.0);
  // }

  gl_FragColor = vec4(pos, 1.);
}
