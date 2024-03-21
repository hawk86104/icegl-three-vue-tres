import * as THREE from 'three'
import copyfs from '../shaders/copy-fs.glsl?raw';
import { loadShader, processShader } from './utils.js';

class postComposer {
  constructor(renderer, settings) {
    this.width = 1;
    this.height = 1;

    this.settings = settings || {};
    this.useRGBA = this.settings.useRGBA || false;

    this.renderer = renderer;

    this.copyPass = this.CopyPass(this.settings);

    this.scene = new THREE.Scene();
    this.quad = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial()
    );
    this.scene.add(this.quad);
    this.camera = new THREE.OrthographicCamera(1, 1, 1, 1, -10000, 10000);

    this.front = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: this.settings.minFilter !== undefined ? this.settings.minFilter : THREE.LinearFilter,
      magFilter: this.settings.magFilter !== undefined ? this.settings.magFilter : THREE.LinearFilter,
      wrapS: this.settings.wrapS !== undefined ? this.settings.wrapS : THREE.ClampToEdgeWrapping,
      wrapT: this.settings.wrapT !== undefined ? this.settings.wrapT : THREE.ClampToEdgeWrapping,
      format: this.useRGBA ? THREE.RGBAFormat : THREE.RGBFormat,
      type: this.settings.type !== undefined ? this.settings.type : THREE.UnsignedByteType,
      stencilBuffer: this.settings.stencilBuffer !== undefined ? this.settings.stencilBuffer : true
    });

    this.back = this.front.clone();

    this.startTime = Date.now();

    this.passes = {};

    this.Stack = {
      passItems: [],
      passes: [],
    };
  }
  //添加后处理通道
  addPass (shaderName, shaderPass, params, uuid) {
    this.loadShadervf(shaderPass);
    const passItem = {
      shaderName,
      params,
      uuid,
      shader: this.shader
    };
    this.Stack.passItems.push(passItem);
  };
  //移除后处理通道
  removePass (uuid) {

    for (let i = this.Stack.passItems.length - 1; i >= 0; i--) {
      if (this.Stack.passItems[i].uuid === parseInt(uuid)) {
        this.Stack.passItems.splice(i, 1); // 移除满足条件的对象
      }
    }

    console.log(this.Stack.passItems);

  }
  CopyPass () {

    this.Pass.call(this);
    const shader = this.loadShadervf(copyfs);
    // console.log(copyfs);
    // console.log(self.shader);
    return shader;
  }
  loadShadervf (fs) {
    const vs = 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }';
    this.shader = processShader(vs, fs);
    //self.mapUniforms( self.shader.uniforms );
    return this.shader;
  };
  Pass (shaderobj) {

    this.shader = null;
    this.params = {};

  }
  Reset () {
    this.read = this.front;
    this.write = this.back;

    // this.output = this.write;
    // this.input = this.read;

  };
  onWindowResize (renderer, camera) {

    const s = 1,
      w = window.innerWidth,
      h = window.innerHeight;

    renderer.setSize(s * w, s * h);
    camera.projectionMatrix.makePerspective(70, w / h, camera.near, camera.far);
    this.setSize(w, h);
    const depthTexture = this.getOfflineTexture(w, h, true);
    return depthTexture;
  }
  setSize (w, h) {

    this.width = w;
    this.height = h;
    this.camera.projectionMatrix.makeOrthographic(w / - 2, w / 2, h / 2, h / - 2, this.camera.near, this.camera.far);
    this.quad.scale.set(w, h, 1);
    this.front.setSize(w, h);
    this.back.setSize(w, h);

  };
  getOfflineTexture (w, h, useRGBA) {

    const rtTexture = new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: useRGBA ? THREE.RGBAFormat : THREE.RGBFormat
    });

    return rtTexture;

  };
  render (scene, camera, keep, output) {

    // if (this.copyPass.isLoaded()) {
    //   if (keep) this.swapBuffers();
    this.renderer.setRenderTarget(this.write);
    this.renderer.render(scene, camera);
    if (!output) this.swapBuffers();
    // }

  };
  swapBuffers () {

    // this.output = this.write;
    // this.input = this.read;

    const t = this.write;
    this.write = this.read;
    this.read = t;

  };
  pass () {

    for (let index = 0; index < this.Stack.passItems.length; index++) {
      const pass = this.Stack.passItems[index].shader;
      const params = this.Stack.passItems[index].params;
      this.renderer.setRenderTarget(this.write);
      if (pass instanceof THREE.ShaderMaterial) {
        this.quad.material = pass;
        this.quad.material.uniforms.tInput.value = this.read.texture;
        this.quad.material.uniforms.resolution.value.set(this.width, this.height);
        this.quad.material.uniforms.time.value = 0.001 * (Date.now() - this.startTime);
        for (const key in params) {

          this.quad.material.uniforms[key].value = params[key];
        }
        this.renderer.render(this.scene, this.camera);
        this.swapBuffers();
      }
    }
  }

  toScreen (scene, camera) {
    this.renderer.setRenderTarget(null);
    this.quad.material = this.copyPass;
    this.quad.material.uniforms.tInput.value = this.read.texture;
    this.quad.material.uniforms.resolution.value.set(this.width, this.height);
    this.renderer.render(this.scene, this.camera);

  };
}
export { postComposer }