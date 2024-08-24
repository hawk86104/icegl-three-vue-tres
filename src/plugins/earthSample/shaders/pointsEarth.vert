  uniform float size;
  uniform sampler2D elevTexture;
  uniform sampler2D alphaTexture;
  uniform float uTime;
  uniform float uWaveHeight;
  uniform float uWaveSpeed;

  varying vec2 vUv;
  varying float vVisible;
  varying float vAlpha;
  varying float vElevation;
  // Function to generate fBm with vec3 input
  float random(vec3 st) {
    return fract(sin(dot(st.xyz, vec3(12.9898,78.233,45.164))) * 43758.5453123);
}

float noise(vec3 st) {
    vec3 i = floor(st);
    vec3 f = fract(st);

    // Eight corners in 3D of a tile
    float a = random(i);
    float b = random(i + vec3(1.0, 0.0, 0.0));
    float c = random(i + vec3(0.0, 1.0, 0.0));
    float d = random(i + vec3(1.0, 1.0, 0.0));
    float e = random(i + vec3(0.0, 0.0, 1.0));
    float f1 = random(i + vec3(1.0, 0.0, 1.0));
    float g = random(i + vec3(0.0, 1.0, 1.0));
    float h = random(i + vec3(1.0, 1.0, 1.0));

    vec3 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y),
               mix(mix(e, f1, u.x), mix(g, h, u.x), u.y), u.z);
}

float fbm(vec3 st) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

  void main() {
    vUv = uv;
    float alphaLand = 1.0 - texture2D(alphaTexture, vUv).r;
    vAlpha = alphaLand;
    vec3 newPosition = position;

    if(alphaLand < 0.5) {
      // Sea
      // fBm for wave-like displacement
      float waveHeight = uWaveHeight; // Adjust wave height as needed
      float waveSpeed = uWaveSpeed;  // Adjust wave speed as needed
      float displacement = (fbm(newPosition * 5.0 + uTime * waveSpeed) * 2.0 - 1.0) * waveHeight;
      vElevation = displacement;
      newPosition += normal * displacement ;
    }

    vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
    float elv = texture2D(elevTexture, vUv).r;
    vec3 vNormal = normalMatrix * normal;
    vVisible = step(0.0, dot( -normalize(mvPosition.xyz), normalize(vNormal)));
    mvPosition.z += 0.45 * elv;

    // 求出 mvPosition 距离相机的距离
    float dist = length(mvPosition.xyz);
    // 根据距离调整 size
    float pointSize = size * (1.0 - dist / 10.0);
    gl_PointSize = max(pointSize, 1.0);
    gl_PointSize = pointSize;
    gl_Position = projectionMatrix * mvPosition;
  }
