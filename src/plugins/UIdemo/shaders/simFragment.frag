uniform sampler2D uTextureA; // DATA Texture containing original uTextureA
uniform sampler2D uTextureB;
uniform sampler2D uTextureC;
uniform sampler2D uTextureD;
uniform sampler2D uTextureE;
precision mediump float; // Add default precision qualifier
uniform float uTime;
uniform float uScroll;
varying vec2 vUv;

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1. - c;

  return mat4(
      oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,
      oc * axis.z * axis.x + axis.y * s, 0., oc * axis.x * axis.y + axis.z * s,
      oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.,
      oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s,
      oc * axis.z * axis.z + c, 0., 0., 0., 0., 1.);
}

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

// 0 -> 1
float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float remap(float value, float inputMin, float inputMax, float outputMin,
            float outputMax) {
  return outputMin +
         ((outputMax - outputMin) / (inputMax - inputMin)) * (value - inputMin);
}

// mix with deceleration
vec3 mixd(vec3 a, vec3 b, float t) { return mix(a, b, t * t * (3. - 2. * t)); }

void main() {

  float range = 1. / uTotalModels;
  // vec3 pos;

  vec3 textureA = rotationMatrix3(vec3(1., 0., 0.), sin(uTime) * .1) *
                  texture2D(uTextureA, vUv).xyz;
  // vec3 textureA=texture2D(uTextureA,vUv).xyz;

  vec3 textureB = rotationMatrix3(vec3(0., 1., 0.), sin(uTime) * .3 + 3.14) *
                  texture2D(uTextureB, vUv).xyz;
  // vec3 textureC = texture2D(uTextureC, vUv).xyz;
  // vec3 textureD = texture2D(uTextureD, vUv).xyz;
  // vec3 textureE = rotationMatrix3(vec3(0., 1., 0.), uTime * .1) *
  //                 texture2D(uTextureE, vUv).xyz;

  // if (uScroll < range) {
  //   float r = random(vUv) * .2;
  //   float t =
  //       remap(clamp(uScroll - (r * .5), 0., range - r), 0., range - r,
  //       0., 1.);
  //   pos = mix(textureA, textureB, t);
  // } else if (uScroll < range * 2.) {
  //   float r = random(vUv) * .2;
  //   float t = remap(clamp(uScroll - (r * .5), range, range * 2. - r), range,
  //                   range * 2. - r, 0., 1.);
  //   // pos = mix(textureB, textureC, (uScroll - range) * uTotalModels);
  //   pos = mix(textureB, textureC, t);
  // } else if (uScroll < range * 3.) {
  //   float r = random(vUv) * .2;
  //   float t = remap(clamp(uScroll, range * 2., range * 3. - r), range * 2.,
  //                   range * 3. - r, 0., 1.);
  //   // float t = remap(clamp(uScroll - (r * 0.5), range * 2.0, range * 3.0 -
  //   r),
  //   // range * 2.0, range * 3.0 - r, 0.0, 1.0);

  //   // pos = mix(textureC, textureD, (uScroll - range * 2.0) * uTotalModels);
  //   pos = mix(textureC, textureD, t);
  // } else {
  //   float r = random(vUv) * .2;
  //   float t = remap(clamp(uScroll - (r * .5), range * 3., range * 4. - r),
  //                   range * 3., range * 4. - r, 0., 1.);

  //   pos = mix(textureD, textureE, t);
  // }

  float time = uTime * 0.7;

  float m = min(smoothstep(0.1, 3.3, time), 1.0);
  float m2 = min(smoothstep(0.1, 3.3, time - 5.), 1.0);

  vec3 pos = vec3(0.0);

  if (m < 1.0) {
    pos = mix(textureA, textureB, m);
  } else {
    pos = mix(textureB, textureA, m2);
  }

  if (textureA == vec3(0.0) || textureB == vec3(0.0)) {
    pos = vec3(0.0, 0.0, 0.0);
  }

  gl_FragColor = vec4(pos, 1.);
}
