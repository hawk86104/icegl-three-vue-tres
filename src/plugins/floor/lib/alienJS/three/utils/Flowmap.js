/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://oframe.github.io/ogl/examples/?src=mouse-flowmap.html by gordonnl
 */

import {
    GLSL3,
    HalfFloatType,
    Mesh,
    NoBlending,
    OrthographicCamera,
    RawShaderMaterial,
    Vector2,
    WebGLRenderTarget
} from 'three';

import { getFullscreenTriangle } from '@alienkitty/space.js/three';

import { vertexShader, fragmentShader } from '../../shaders/FlowmapShader.js';

export class Flowmap {
    constructor(renderer, {
        size = 128,
        falloff = 0.15,
        alpha = 1,
        dissipation = 0.98
    } = {}) {
        this.renderer = renderer;

        this.mouse = new Vector2();
        this.velocity = new Vector2();

        // Render targets
        this.renderTargetRead = new WebGLRenderTarget(size, size, {
            type: HalfFloatType,
            depthBuffer: false
        });

        this.renderTargetWrite = this.renderTargetRead.clone();

        // Output uniform containing render target textures
        this.uniform = { value: this.renderTargetRead.texture };

        // Flowmap material
        this.material = new RawShaderMaterial({
            glslVersion: GLSL3,
            uniforms: {
                tMap: this.uniform,

                uFalloff: { value: falloff },
                uAlpha: { value: alpha },
                uDissipation: { value: dissipation },

                // User needs to update these
                uAspect: { value: 1 },
                uMouse: { value: this.mouse },
                uVelocity: { value: this.velocity }
            },
            vertexShader,
            fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false
        });

        // Fullscreen triangle
        this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.screenTriangle = getFullscreenTriangle();
        this.screen = new Mesh(this.screenTriangle, this.material);
        this.screen.frustumCulled = false;
    }

    update() {
        const currentRenderTarget = this.renderer.getRenderTarget();
        const currentAutoClear = this.renderer.autoClear;
        this.renderer.autoClear = false;

        this.renderer.setRenderTarget(this.renderTargetWrite);
        this.renderer.render(this.screen, this.screenCamera);

        // Swap render targets
        const temp = this.renderTargetRead;
        this.renderTargetRead = this.renderTargetWrite;
        this.renderTargetWrite = temp;

        this.uniform.value = this.renderTargetRead.texture;

        // Restore renderer settings
        this.renderer.autoClear = currentAutoClear;
        this.renderer.setRenderTarget(currentRenderTarget);
    }

    destroy() {
        this.renderTargetWrite.dispose();
        this.renderTargetRead.dispose();
        this.material.dispose();
        this.screenTriangle.dispose();

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
