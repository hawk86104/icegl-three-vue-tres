// Based on https://www.shadertoy.com/view/lsfGWn by hornet
// Based on https://github.com/spite/Wagner
// Based on https://github.com/spite/codevember-2016

export default /* glsl */ `
const int NUM_TAPS = 27;
const float rcp_maxdist = 1.0 / 4.22244;

vec4 poissonSample(sampler2D image, vec2 uv, vec2 resolution, float radius, vec4 basis) {
    float max_siz = radius;
    vec2 fTaps_Poisson[NUM_TAPS];

    fTaps_Poisson[0]  = rcp_maxdist * vec2(  -0.8835609, 2.523391 );
    fTaps_Poisson[1]  = rcp_maxdist * vec2(  -1.387375, 1.056318 );
    fTaps_Poisson[2]  = rcp_maxdist * vec2(  -2.854452, 1.313645 );
    fTaps_Poisson[3]  = rcp_maxdist * vec2(  0.6326182, 1.14569 );
    fTaps_Poisson[4]  = rcp_maxdist * vec2(  1.331515, 3.637297 );
    fTaps_Poisson[5]  = rcp_maxdist * vec2(  -2.175307, 3.885795 );
    fTaps_Poisson[6]  = rcp_maxdist * vec2(  -0.5396664, 4.1938 );
    fTaps_Poisson[7]  = rcp_maxdist * vec2(  -0.6708734, -0.36875 );
    fTaps_Poisson[8]  = rcp_maxdist * vec2(  -2.083908, -0.6921188 );
    fTaps_Poisson[9]  = rcp_maxdist * vec2(  -3.219028, 2.85465 );
    fTaps_Poisson[10] = rcp_maxdist * vec2(  -1.863933, -2.742254 );
    fTaps_Poisson[11] = rcp_maxdist * vec2(  -4.125739, -1.283028 );
    fTaps_Poisson[12] = rcp_maxdist * vec2(  -3.376766, -2.81844 );
    fTaps_Poisson[13] = rcp_maxdist * vec2(  -3.974553, 0.5459405 );
    fTaps_Poisson[14] = rcp_maxdist * vec2(  3.102514, 1.717692 );
    fTaps_Poisson[15] = rcp_maxdist * vec2(  2.951887, 3.186624 );
    fTaps_Poisson[16] = rcp_maxdist * vec2(  1.33941, -0.166395 );
    fTaps_Poisson[17] = rcp_maxdist * vec2(  2.814727, -0.3216669 );
    fTaps_Poisson[18] = rcp_maxdist * vec2(  0.7786853, -2.235639 );
    fTaps_Poisson[19] = rcp_maxdist * vec2(  -0.7396695, -1.702466 );
    fTaps_Poisson[20] = rcp_maxdist * vec2(  0.4621856, -3.62525 );
    fTaps_Poisson[21] = rcp_maxdist * vec2(  4.181541, 0.5883132 );
    fTaps_Poisson[22] = rcp_maxdist * vec2(  4.22244, -1.11029 );
    fTaps_Poisson[23] = rcp_maxdist * vec2(  2.116917, -1.789436 );
    fTaps_Poisson[24] = rcp_maxdist * vec2(  1.915774, -3.425885 );
    fTaps_Poisson[25] = rcp_maxdist * vec2(  3.142686, -2.656329 );
    fTaps_Poisson[26] = rcp_maxdist * vec2(  -1.108632, -4.023479 );

    vec4 sum = vec4(0);

    for (int i = 0; i < NUM_TAPS; i++) {
        vec2 ofs = fTaps_Poisson[i];
        ofs = vec2(dot(ofs, basis.xz), dot(ofs, basis.yw));
        vec2 texcoord = uv + max_siz * ofs / resolution.xy;
        sum += texture(image, texcoord, -16.0);
    }

    return sum / float(NUM_TAPS);
}
`;
