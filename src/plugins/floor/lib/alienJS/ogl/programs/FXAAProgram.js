import { Program, Vec2 } from 'ogl';

import { vertexShader, fragmentShader } from '../../shaders/FXAAShader.js';

export class FXAAProgram extends Program {
    constructor(gl) {
        super(gl, {
            uniforms: {
                tMap: { value: null },
                uResolution: { value: new Vec2() }
            },
            vertex: `#version 300 es${vertexShader}`,
            fragment: `#version 300 es${fragmentShader}`,
            depthTest: false,
            depthWrite: false
        });
    }
}
