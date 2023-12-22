// Based on https://github.com/pmndrs/postprocessing by vanruesc
// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/postprocessing/SMAAPass.js by mpk

export const vertexShader = /* glsl */ `
in vec3 position;
in vec2 uv;

uniform vec2 uTexelSize;

out vec2 vUv;
out vec4 vOffset[3];

void SMAAEdgeDetectionVS(vec2 texCoord) {
    vOffset[0] = texCoord.xyxy + uTexelSize.xyxy * vec4(-1.0, 0.0, 0.0, 1.0);
    vOffset[1] = texCoord.xyxy + uTexelSize.xyxy * vec4(1.0, 0.0, 0.0, -1.0);
    vOffset[2] = texCoord.xyxy + uTexelSize.xyxy * vec4(-2.0, 0.0, 0.0, 2.0);
}

void main() {
    vUv = uv;

    SMAAEdgeDetectionVS(vUv);

    gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tMap;

in vec2 vUv;
in vec4 vOffset[3];

out vec4 FragColor;

vec4 SMAAColorEdgeDetectionPS(vec2 texCoord, vec4 offset[3], sampler2D colorTex) {
    vec2 threshold = vec2(SMAA_THRESHOLD);

    // Color-based edge detection
    vec4 delta;
    vec3 c = texture(colorTex, texCoord).rgb;

    vec3 cLeft = texture(colorTex, offset[0].xy).rgb;
    vec3 t = abs(c - cLeft);
    delta.x = max(max(t.r, t.g), t.b);

    vec3 cTop = texture(colorTex, offset[0].zw).rgb;
    t = abs(c - cTop);
    delta.y = max(max(t.r, t.g), t.b);

    vec2 edges = step(threshold, delta.xy);

    if (dot(edges, vec2(1.0)) == 0.0) {
        discard;
    }

    // Calculate right and bottom deltas
    vec3 cRight = texture(colorTex, offset[1].xy).rgb;
    t = abs(c - cRight);
    delta.z = max(max(t.r, t.g), t.b);

    vec3 cBottom  = texture(colorTex, offset[1].zw).rgb;
    t = abs(c - cBottom);
    delta.w = max(max(t.r, t.g), t.b);

    // Calculate the maximum delta in the direct neighborhood
    float maxDelta = max(max(max(delta.x, delta.y), delta.z), delta.w);

    // Calculate left-left and top-top deltas
    vec3 cLeftLeft = texture(colorTex, offset[2].xy).rgb;
    t = abs(c - cLeftLeft);
    delta.z = max(max(t.r, t.g), t.b);

    vec3 cTopTop = texture(colorTex, offset[2].zw).rgb;
    t = abs(c - cTopTop);
    delta.w = max(max(t.r, t.g), t.b);

    // Calculate the final maximum delta
    maxDelta = max(max(maxDelta, delta.z), delta.w);

    // Local contrast adaptation
    edges *= step(0.5 * maxDelta, delta.xy);

    return vec4(edges, 0.0, 0.0);
}

void main() {
    FragColor = SMAAColorEdgeDetectionPS(vUv, vOffset, tMap);
}
`;
