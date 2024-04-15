import * as kokomi from "kokomi.js";
import * as THREE from "three";
import * as STDLIB from "three-stdlib";

import type Experience from "../Experience";

import speedUpVertexShader from "../Shaders/Speedup/vert.glsl";
import speedUpFragmentShader from "../Shaders/Speedup/frag.glsl";

export default class Speedup extends kokomi.Component {
  declare base: Experience;
  model: STDLIB.GLTF;
  uj: kokomi.UniformInjector;
  material: THREE.ShaderMaterial;
  constructor(base: Experience) {
    super(base);

    const model = this.base.am.items["sm_speedup"] as STDLIB.GLTF;
    this.model = model;

    const modelParts = kokomi.flatModel(model.scene);
    // kokomi.printModel(modelParts);

    const uj = new kokomi.UniformInjector(this.base);
    this.uj = uj;
    const material = new THREE.ShaderMaterial({
      vertexShader: speedUpVertexShader,
      fragmentShader: speedUpFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        ...uj.shadertoyUniforms,
        uSpeed: {
          value: this.base.params.speed,
        },
        uOpacity: {
          value: this.base.params.speedUpOpacity,
        },
      },
    });
    this.material = material;

    const speedupMesh = modelParts[1] as THREE.Mesh;
    speedupMesh.material = material;
  }
  addExisting() {
    this.container.add(this.model.scene);
  }
  update(): void {
    this.uj.injectShadertoyUniforms(this.material.uniforms);

    this.material.uniforms.uSpeed.value = this.base.params.speed;
  }
}
