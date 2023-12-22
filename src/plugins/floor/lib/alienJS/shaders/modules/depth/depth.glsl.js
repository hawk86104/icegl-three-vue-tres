// Based on https://threejs.org/examples/#webgl_depth_texture by mattdesl

export default /* glsl */ `
float getDepth(float fragCoordZ, float near, float far) {
    float viewZ = perspectiveDepthToViewZ(fragCoordZ, near, far);
    return viewZToOrthographicDepth(viewZ, near, far);
}

float getDepth(sampler2D tex, vec2 coord, float near, float far) {
    float fragCoordZ = texture(tex, coord).x;
    return getDepth(fragCoordZ, near, far);
}
`;
