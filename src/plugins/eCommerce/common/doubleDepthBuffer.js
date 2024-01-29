import * as THREE from "three"
import { Blit } from "./blit.js"


class DoubleDepthBuffer {
    constructor(mesh, camera, renderer) {
        this.mesh = mesh.clone();
        this.camera = camera;
        this.renderer = renderer;

        this.scene = new THREE.Scene();
        this.scene.add(this.mesh);

        this.blitProgram = new Blit(this.renderer);

        this.ping = new THREE.WebGLRenderTarget(innerWidth, innerHeight, {
            type: THREE.FloatType,
            depthBuffer: false,
            stencilBuffer: false,
        });

        this.pong = new THREE.WebGLRenderTarget(innerWidth, innerHeight, {
            type: THREE.FloatType,
            depthBuffer: false,
            stencilBuffer: false,
        });

        this.frontFaceRT = new THREE.WebGLRenderTarget(innerWidth, innerHeight, {
            type: THREE.FloatType,
        });

        this.frontFaceMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uCameraFarInverse: { value: 1 / this.camera.far },
            },

            vertexShader: `
                varying vec3 vCameraSpacePos;
                varying vec3 vWorldSpaceNormal;

                void main() {
                    vCameraSpacePos = (modelViewMatrix * vec4(position, 1.0)).xyz;
                    vWorldSpaceNormal = normal;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);    
                }`,

            fragmentShader: `
                uniform float uCameraFarInverse;

                varying vec3 vWorldSpaceNormal;
                varying vec3 vCameraSpacePos;

                void main() {
                    float currentDepth = abs(vCameraSpacePos.z) * uCameraFarInverse;
                    gl_FragColor = vec4(vWorldSpaceNormal, currentDepth);    
                }`,

            depthTest: true,
            depthWrite: true,
            side: THREE.FrontSide,
        });


        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uScreenSize: { value: new THREE.Vector2(innerWidth, innerHeight) },
                uPrevDepth: { type: "t", value: this.ping.texture },
                uCameraFarInverse: { value: 1 / this.camera.far },
                uSample: { value: 0 },
            },

            vertexShader: `
                varying vec3 vCameraSpacePos;
                varying vec3 vWorldSpaceNormal;

                void main() {
                    vCameraSpacePos = (modelViewMatrix * vec4(position, 1.0)).xyz;
                    vWorldSpaceNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);    
                }`,

            fragmentShader: `
                uniform sampler2D uPrevDepth;
                uniform float uCameraFarInverse;
                uniform float uSample;
                uniform vec2  uScreenSize;

                varying vec3 vWorldSpaceNormal;
                varying vec3 vCameraSpacePos;

                void main() {

                    vec2 uv = gl_FragCoord.xy / uScreenSize;
                    float prevRegisteredDepth = texture2D(uPrevDepth, uv).w;
                    float currentDepth        = abs(vCameraSpacePos.z) * uCameraFarInverse;

                    if(currentDepth <= prevRegisteredDepth) {
                        discard;
                    }

                    gl_FragColor = vec4(vWorldSpaceNormal, currentDepth);    
                }`,

            depthTest: false,
            depthWrite: false,
            side: THREE.DoubleSide,
        });


        this.mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = this.material
            }
        });
    }

    compute (samples) {
        // *********** render back face material ***********
        this.renderer.setRenderTarget(this.ping);
        this.renderer.clear();
        this.renderer.setRenderTarget(this.pong);
        this.renderer.clear();

        this.mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = this.material;
            }
        });

        this.material.uniforms.uCameraFarInverse.value = 1 / this.camera.far;

        for (let i = 0; i < samples; i++) {
            let p1 = (i % 2) === 0 ? this.ping : this.pong;
            let p2 = (i % 2) === 0 ? this.pong : this.ping;

            this.material.uniforms.uPrevDepth.value = p1.texture;
            this.material.uniforms.uSample.value = i;

            this.renderer.autoClear = false;
            this.renderer.setRenderTarget(p2);
            this.renderer.render(this.scene, this.camera);
            this.renderer.autoClear = true;

            // this will make sure that if all fragments fail the depth test and get discarded, we at least have the fallback texture computed
            this.blitProgram.blit(p2.texture, p1);
        }

        if (samples % 2 === 0) {
            this.resultBuffer = this.ping;
        } else {
            this.resultBuffer = this.pong;
        }
        // *********** render back face material ***********




        // *********** render front face material ***********
        this.mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = this.frontFaceMaterial;
            }
        });
        this.renderer.setRenderTarget(this.frontFaceRT);
        this.renderer.render(this.scene, this.camera);
        // *********** render front face material - END ***********
    }

    getBackFaceTexture () {
        return this.resultBuffer.texture;
    }
    getFrontFaceTexture () {
        return this.frontFaceRT.texture;
    }
}

export { DoubleDepthBuffer };