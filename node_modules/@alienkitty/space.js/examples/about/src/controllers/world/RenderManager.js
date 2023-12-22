import { MathUtils, Mesh, OrthographicCamera, Vector2, WebGLRenderTarget } from 'three';

import { BloomCompositeMaterial, LuminosityMaterial, UnrealBloomBlurMaterial } from '@alienkitty/alien.js/three';

import { WorldController } from './WorldController.js';
import { CompositeMaterial } from '../../materials/CompositeMaterial.js';

const BlurDirectionX = new Vector2(1, 0);
const BlurDirectionY = new Vector2(0, 1);

export class RenderManager {
    static init(renderer, scene, camera, ui) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.ui = ui;

        this.luminosityThreshold = 0.1;
        this.luminositySmoothing = 1;
        this.bloomStrength = 0.3;
        this.bloomRadius = 0.2;
        this.bloomDistortion = 1.45;
        this.enabled = true;

        this.initRenderer();
    }

    static initRenderer() {
        const { screenTriangle } = WorldController;

        // Fullscreen triangle
        this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.screen = new Mesh(screenTriangle);
        this.screen.frustumCulled = false;

        // Render targets
        this.renderTarget = new WebGLRenderTarget(1, 1, {
            depthBuffer: false
        });

        this.renderTargetsHorizontal = [];
        this.renderTargetsVertical = [];
        this.nMips = 5;

        this.renderTargetBright = this.renderTarget.clone();

        for (let i = 0, l = this.nMips; i < l; i++) {
            this.renderTargetsHorizontal.push(this.renderTarget.clone());
            this.renderTargetsVertical.push(this.renderTarget.clone());
        }

        this.renderTarget.depthBuffer = true;

        // Luminosity high pass material
        this.luminosityMaterial = new LuminosityMaterial();
        this.luminosityMaterial.uniforms.uThreshold.value = this.luminosityThreshold;
        this.luminosityMaterial.uniforms.uSmoothing.value = this.luminositySmoothing;

        // Separable Gaussian blur materials
        this.blurMaterials = [];

        const kernelSizeArray = [3, 5, 7, 9, 11];

        for (let i = 0, l = this.nMips; i < l; i++) {
            this.blurMaterials.push(new UnrealBloomBlurMaterial(kernelSizeArray[i]));
        }

        // Bloom composite material
        this.bloomCompositeMaterial = new BloomCompositeMaterial();
        this.bloomCompositeMaterial.uniforms.tBlur1.value = this.renderTargetsVertical[0].texture;
        this.bloomCompositeMaterial.uniforms.tBlur2.value = this.renderTargetsVertical[1].texture;
        this.bloomCompositeMaterial.uniforms.tBlur3.value = this.renderTargetsVertical[2].texture;
        this.bloomCompositeMaterial.uniforms.tBlur4.value = this.renderTargetsVertical[3].texture;
        this.bloomCompositeMaterial.uniforms.tBlur5.value = this.renderTargetsVertical[4].texture;
        this.bloomCompositeMaterial.uniforms.uBloomFactors.value = this.bloomFactors();

        // Composite material
        this.compositeMaterial = new CompositeMaterial();
        this.compositeMaterial.uniforms.uBloomDistortion.value = this.bloomDistortion;
    }

    static bloomFactors() {
        const bloomFactors = [1, 0.8, 0.6, 0.4, 0.2];

        for (let i = 0, l = this.nMips; i < l; i++) {
            const factor = bloomFactors[i];
            bloomFactors[i] = this.bloomStrength * MathUtils.lerp(factor, 1.2 - factor, this.bloomRadius);
        }

        return bloomFactors;
    }

    // Public methods

    static invert = isInverted => {
        if (isInverted) { // Light colour is inverted
            this.luminosityMaterial.uniforms.uThreshold.value = 0.75;
            this.compositeMaterial.uniforms.uGamma.value = true;
        } else {
            this.luminosityMaterial.uniforms.uThreshold.value = this.luminosityThreshold;
            this.compositeMaterial.uniforms.uGamma.value = false;
        }

        this.ui.setPanelValue('Thresh', this.luminosityMaterial.uniforms.uThreshold.value);
        this.ui.setPanelValue('Gamma', this.compositeMaterial.uniforms.uGamma.value);
    };

    static resize = (width, height, dpr) => {
        this.renderer.setPixelRatio(dpr);
        this.renderer.setSize(width, height);

        width = Math.round(width * dpr);
        height = Math.round(height * dpr);

        this.renderTarget.setSize(width, height);

        width = MathUtils.floorPowerOfTwo(width) / 2;
        height = MathUtils.floorPowerOfTwo(height) / 2;

        this.renderTargetBright.setSize(width, height);

        for (let i = 0, l = this.nMips; i < l; i++) {
            this.renderTargetsHorizontal[i].setSize(width, height);
            this.renderTargetsVertical[i].setSize(width, height);

            this.blurMaterials[i].uniforms.uResolution.value.set(width, height);

            width /= 2;
            height /= 2;
        }
    };

    static update = () => {
        const renderer = this.renderer;
        const scene = this.scene;
        const camera = this.camera;

        if (!this.enabled) {
            renderer.setRenderTarget(null);
            renderer.render(scene, camera);
            return;
        }

        const renderTarget = this.renderTarget;
        const renderTargetBright = this.renderTargetBright;
        const renderTargetsHorizontal = this.renderTargetsHorizontal;
        const renderTargetsVertical = this.renderTargetsVertical;

        // Scene pass
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);

        // Extract bright areas
        this.luminosityMaterial.uniforms.tMap.value = renderTarget.texture;
        this.screen.material = this.luminosityMaterial;
        renderer.setRenderTarget(renderTargetBright);
        renderer.render(this.screen, this.screenCamera);

        // Blur all the mips progressively
        let inputRenderTarget = renderTargetBright;

        for (let i = 0, l = this.nMips; i < l; i++) {
            this.screen.material = this.blurMaterials[i];

            this.blurMaterials[i].uniforms.tMap.value = inputRenderTarget.texture;
            this.blurMaterials[i].uniforms.uDirection.value = BlurDirectionX;
            renderer.setRenderTarget(renderTargetsHorizontal[i]);
            renderer.render(this.screen, this.screenCamera);

            this.blurMaterials[i].uniforms.tMap.value = this.renderTargetsHorizontal[i].texture;
            this.blurMaterials[i].uniforms.uDirection.value = BlurDirectionY;
            renderer.setRenderTarget(renderTargetsVertical[i]);
            renderer.render(this.screen, this.screenCamera);

            inputRenderTarget = renderTargetsVertical[i];
        }

        // Composite all the mips
        this.screen.material = this.bloomCompositeMaterial;
        renderer.setRenderTarget(renderTargetsHorizontal[0]);
        renderer.render(this.screen, this.screenCamera);

        // Composite pass (render to screen)
        this.compositeMaterial.uniforms.tScene.value = renderTarget.texture;
        this.compositeMaterial.uniforms.tBloom.value = renderTargetsHorizontal[0].texture;
        this.screen.material = this.compositeMaterial;
        renderer.setRenderTarget(null);
        renderer.render(this.screen, this.screenCamera);
    };
}
