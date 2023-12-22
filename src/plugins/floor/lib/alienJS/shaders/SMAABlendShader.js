// Based on https://github.com/pmndrs/postprocessing by vanruesc
// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/postprocessing/SMAAPass.js by mpk

export const vertexShader = /* glsl */ `
in vec3 position;
in vec2 uv;

uniform vec2 uTexelSize;

out vec2 vUv;
out vec4 vOffset[2];

void SMAANeighborhoodBlendingVS(vec2 texCoord) {
    vOffset[0] = texCoord.xyxy + uTexelSize.xyxy * vec4(-1.0, 0.0, 0.0, 1.0);
    vOffset[1] = texCoord.xyxy + uTexelSize.xyxy * vec4(1.0, 0.0, 0.0, -1.0);
}

void main() {
    vUv = uv;

    SMAANeighborhoodBlendingVS(vUv);

    gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tMap;
uniform sampler2D tWeightMap;
uniform vec2 uTexelSize;

in vec2 vUv;
in vec4 vOffset[2];

out vec4 FragColor;

vec4 SMAANeighborhoodBlendingPS(vec2 texCoord, vec4 offset[2], sampler2D colorTex, sampler2D blendTex) {
    // Fetch the blending weights for the current pixel
    vec4 a;
    a.xz = texture(blendTex, texCoord).xz;
    a.y = texture(blendTex, offset[1].zw).g;
    a.w = texture(blendTex, offset[1].xy).a;

    // Ignore tiny blending weights
    if (dot(a, vec4(1.0)) < 1e-5) {
        return texture(colorTex, texCoord);
    } else {
        // Up to 4 lines can be crossing a pixel (one through each edge). We
        // favor blending by choosing the line with the maximum weight for each
        // direction.
        vec2 offset;
        offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
        offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom

        // Then we go in the direction that has the maximum weight
        if (abs(offset.x) > abs(offset.y)) { // horizontal vs. vertical
            offset.y = 0.0;
        } else {
            offset.x = 0.0;
        }

        // Fetch the opposite color and lerp by hand
        vec4 c = texture(colorTex, texCoord);
        texCoord += sign(offset) * uTexelSize;
        vec4 cOp = texture(colorTex, texCoord);
        float s = abs(offset.x) > abs(offset.y) ? abs(offset.x) : abs(offset.y);

        // Gamma correction
        c.xyz = pow(c.xyz, vec3(2.2));
        cOp.xyz = pow(cOp.xyz, vec3(2.2));
        vec4 mixed = mix(c, cOp, s);
        mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

        return mixed;
    }
}

void main() {
    FragColor = SMAANeighborhoodBlendingPS(vUv, vOffset, tMap, tWeightMap);
}
`;
