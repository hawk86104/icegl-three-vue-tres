export default /* glsl */ `
float getFresnel(vec3 viewDir, vec3 worldNormal, float power) {
    return pow(1.0 - abs(dot(viewDir, worldNormal)), power);
}
`;
