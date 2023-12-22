// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/ACESFilmicToneMappingShader.js by WestLangley
// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/GammaCorrectionShader.js by WestLangley

export default /* glsl */ `
vec3 RRTAndODTFit(vec3 v) {
    vec3 a = v * (v + 0.0245786) - 0.000090537;
    vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
    return a / b;
}

vec3 ACESFilmicToneMapping(vec3 color) {
    // sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
    const mat3 ACESInputMat = mat3(
        vec3(0.59719, 0.07600, 0.02840), // Transposed from source
        vec3(0.35458, 0.90834, 0.13383),
        vec3(0.04823, 0.01566, 0.83777)
    );

    // ODT_SAT => XYZ => D60_2_D65 => sRGB
    const mat3 ACESOutputMat = mat3(
        vec3( 1.60475, -0.10208, -0.00327), // Transposed from source
        vec3(-0.53108,  1.10813, -0.07276),
        vec3(-0.07367, -0.00605,  1.07602)
    );

    color = ACESInputMat * color;

    // Apply RRT and ODT
    color = RRTAndODTFit(color);

    color = ACESOutputMat * color;

    // Clamp to [0, 1]
    return clamp(color, 0.0, 1.0);
}

vec4 LinearToSRGB(vec4 value) {
    return vec4(mix(pow(value.rgb, vec3(0.41666)) * 1.055 - vec3(0.055), value.rgb * 12.92, vec3(lessThanEqual(value.rgb, vec3(0.0031308)))), value.a);
}
`;
