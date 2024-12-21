precision mediump int;
precision mediump float;

uniform vec3 u_camera;
uniform vec3 u_resolution;
uniform mediump sampler3D u_volume;
uniform vec3 u_crossSectionSize;
uniform float u_dt;
uniform float u_time;
uniform float u_color;
uniform float u_isoValue;
uniform float u_alphaVal;

vec3 palette(in float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.00, 0.33, 0.67);

  return a + b * cos(6.28318 * (c * t + d));
}

varying vec3 v_hitPos;
varying vec3 v_hitPosWorldSpace;
varying vec3 v_cameraObjectSpace;

vec2 intersect_box(vec3 orig, vec3 dir) {

  vec3 box_min = vec3(-u_crossSectionSize);
  vec3 box_max = vec3(u_crossSectionSize);
  vec3 inv_dir = 1.0 / dir;
  vec3 tmin_tmp = (box_min - orig) * inv_dir;
  vec3 tmax_tmp = (box_max - orig) * inv_dir;
  vec3 tmin = min(tmin_tmp, tmax_tmp);
  vec3 tmax = max(tmin_tmp, tmax_tmp);
  float t0 = max(tmin.x, max(tmin.y, tmin.z));
  float t1 = min(tmax.x, min(tmax.y, tmax.z));
  return vec2(t0, t1);
}

void main() {
  vec3 rayOrigin = vec3(0.0, 0.0, -3.0);
  rayOrigin = v_cameraObjectSpace;

  vec2 uv = 2.0 * gl_FragCoord.xy / u_resolution.xy - 1.0;
  vec3 rayDir = normalize(vec3(uv, 1.0));
  rayDir = normalize(v_hitPos - rayOrigin);

  vec2 t_hit = intersect_box(rayOrigin, rayDir);
  if (t_hit.x > t_hit.y) {
    discard;
  }

  t_hit.x = max(t_hit.x, 0.0);

  float dt = u_dt;

  vec4 color = vec4(0.0);

  vec3 p = rayOrigin + t_hit.x * rayDir + 0.5;
  for (float t = t_hit.x; t < t_hit.y; t += dt) {

    float textureVal = texture(u_volume, p).r;

    vec4 val_color = vec4(0.0);
    float val_color_alpha = textureVal * 0.1;

    val_color_alpha = smoothstep(0.0, u_alphaVal, val_color_alpha);

    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 white = vec3(1.0);
    if (abs(u_color - 1.0) <= 0.01) {
      val_color = vec4(white, val_color_alpha);
    } else if (abs(u_color - 2.0) <= 0.01) {
      val_color = vec4(mix(red, white, val_color_alpha), val_color_alpha);
    } else {
      val_color = vec4(palette(textureVal), val_color_alpha);
    }

    color.rgb += (1.0 - color.a) * val_color.a * val_color.rgb;
    color.a += (1.0 - color.a) * val_color.a;

    if (textureVal > u_isoValue) {
      float gxLess = texture(u_volume, vec3(p.x - rayDir.x * u_dt, p.y, p.z)).r;
      float gxMore = texture(u_volume, vec3(p.x + rayDir.x * u_dt, p.y, p.z)).r;
      float dgx = gxMore - gxLess;

      float gyLess = texture(u_volume, vec3(p.x, p.y - rayDir.y * u_dt, p.z)).r;
      float gyMore = texture(u_volume, vec3(p.x, p.y + rayDir.y * u_dt, p.z)).r;
      float dgy = gyMore - gyLess;

      float gzLess = texture(u_volume, vec3(p.x, p.y, p.z - rayDir.z * u_dt)).r;
      float gzMore = texture(u_volume, vec3(p.x, p.y, p.z + rayDir.z * u_dt)).r;
      float dgz = gzMore - gzLess;
      vec3 n = normalize(vec3(dgx, dgy, dgz));

      vec3 lightSource = vec3(1.0);
      vec3 lightDir = normalize(lightSource);
      float diffuseStrength = max(dot(n, lightDir), 0.0);

      vec3 viewSource = normalize(rayOrigin);
      vec3 reflectSource = normalize(reflect(-lightSource, n));
      float specularStrength = max(0.0, dot(viewSource, reflectSource));
      specularStrength = pow(specularStrength, 64.0);

      color.rgb = diffuseStrength * val_color.rgb + specularStrength * val_color.rgb;
      color.rgb *= val_color.rgb;
      color.a = 0.95;
      break;
    }

    if (color.a >= 0.95) {
      break;
    }

    p += rayDir * dt;
  }

  gl_FragColor = color;
}