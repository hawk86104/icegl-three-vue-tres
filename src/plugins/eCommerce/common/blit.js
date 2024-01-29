import * as THREE from "three"

class Blit {
    constructor(renderer, customFragment) {

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { type: "t", value: null }
            },

            vertexShader: `
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = vec4(position.xy, 0.0, 1.0);    
                }`,

            fragmentShader: `
                uniform sampler2D uTexture;

                varying vec2 vUv;

                void main() {
                    ${customFragment ? customFragment : "gl_FragColor = texture2D(uTexture, vUv);"}  
                }`,

            depthTest: false,
            depthWrite: false,
        });

        this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material)
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
        this.renderer = renderer

        this.scene = new THREE.Scene()
        this.scene.add(this.mesh)
    }

    blit (textureFrom, renderTargetDest) {
        this.renderer.setRenderTarget(renderTargetDest)

        this.material.uniforms.uTexture.value = textureFrom
        this.renderer.render(this.scene, this.camera)

        this.renderer.setRenderTarget(null)
    }
}

export { Blit }