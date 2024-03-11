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
  vec3 textureA = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *
                  texture2D(uTextureA, vUv).xyz;
  // vec3 textureA = texture2D(uTextureA, vUv).xyz;

  vec3 textureB = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *
                  texture2D(uTextureB, vUv).xyz;
  // vec3 textureB = texture2D(uTextureB, vUv).xyz;

  float t = uScroll;
  vec3 pos = mix(textureA, textureB, t);

  gl_FragColor = vec4(pos, 1.);
}
