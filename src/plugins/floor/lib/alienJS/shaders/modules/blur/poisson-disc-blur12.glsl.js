// Based on https://www.shadertoy.com/view/lsfGWn by hornet
// Based on https://github.com/spite/Wagner
// Based on https://github.com/spite/codevember-2016

export default /* glsl */ `
const int NUM_TAPS = 12;

vec4 poissonSample(sampler2D image, vec2 uv, vec2 resolution, float radius, vec4 basis) {
    float max_siz = radius;
    vec2 fTaps_Poisson[NUM_TAPS];

    fTaps_Poisson[0]  = vec2(-.326,-.406);
    fTaps_Poisson[1]  = vec2(-.840,-.074);
    fTaps_Poisson[2]  = vec2(-.696, .457);
    fTaps_Poisson[3]  = vec2(-.203, .621);
    fTaps_Poisson[4]  = vec2( .962,-.195);
    fTaps_Poisson[5]  = vec2( .473,-.480);
    fTaps_Poisson[6]  = vec2( .519, .767);
    fTaps_Poisson[7]  = vec2( .185,-.893);
    fTaps_Poisson[8]  = vec2( .507, .064);
    fTaps_Poisson[9]  = vec2( .896, .412);
    fTaps_Poisson[10] = vec2(-.322,-.933);
    fTaps_Poisson[11] = vec2(-.792,-.598);

    vec4 sum = vec4(0);

    for (int i = 0; i < NUM_TAPS; i++) {
        vec2 ofs = fTaps_Poisson[i];
        ofs = vec2(dot(ofs, basis.xz), dot(ofs, basis.yw));
        vec2 texcoord = uv + max_siz * ofs / resolution.xy;
        sum += texture(image, texcoord, -10.0);
    }

    return sum / float(NUM_TAPS);
}
`;
