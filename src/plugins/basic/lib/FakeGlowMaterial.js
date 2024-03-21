/**
 * FakeGlow material by Anderson Mancini - Fec 2024.
 */
import { ShaderMaterial, Uniform, Color, AdditiveBlending, FrontSide, BackSide, DoubleSide } from 'three';

class FakeGlowMaterial extends ShaderMaterial {

  /**
   * Create a FakeGlowMaterial.
   *
   * @param {Object} parameters - The parameters to configure the material.
   * @param {number} [parameters.falloff=0.1] - The falloff factor for the glow effect.
   * @param {number} [parameters.glowInternalRadius=6.0] - The internal radius for the glow effect.
   * @param {Color} [parameters.glowColor=new Color('#00d5ff')] - The color of the glow effect.
   * @param {number} [parameters.glowSharpness=0.5] - The sharpness of the glow effect.
   * @param {number} [parameters.opacity=1.0] - The opacity of the hologram.
   * @param {number} [parameters.side=THREE.FrontSide] - The rendering side. Use `THREE.FrontSide`, `THREE.BackSide`, or `THREE.DoubleSide`.
   * @param {boolean} [parameters.depthTest=false] - Enable or disable depth testing.
   */

  constructor(parameters = {}) {
    super();

    this.vertexShader = /*GLSL */
      `
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
        vPosition = modelPosition.xyz;
        vNormal = modelNormal.xyz;

      }
    `

    this.fragmentShader = /*GLSL */
      `
      uniform vec3 glowColor;
      uniform float falloff;
      uniform float glowSharpness;
      uniform float glowInternalRadius;
      uniform float opacity;

      varying vec3 vPosition;
      varying vec3 vNormal;

      void main()
      {
        // Normal
        vec3 normal = normalize(vNormal);
        if(!gl_FrontFacing)
            normal *= - 1.0;
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = dot(viewDirection, normal);
        fresnel = pow(fresnel, glowInternalRadius + 0.1);
        float falloff = smoothstep(0., falloff, fresnel);
        float fakeGlow = fresnel;
        fakeGlow += fresnel * glowSharpness;
        fakeGlow *= falloff;
        gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., opacity));

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      } 
      `

    // Set default values or modify existing properties if needed
    this.uniforms = {

      /**
       * The opacity for the glow effect.
       * @type {Uniform<number>}
       * @default 1.0
       */
      opacity: new Uniform(parameters.opacity !== undefined ? parameters.opacity : 1.0),

      /**
       * The strength of the glowInternalRadius.
       * @type {Uniform<number>}
       * @default 6.0
       */
      glowInternalRadius: new Uniform(parameters.glowInternalRadius !== undefined ? parameters.glowInternalRadius : 6.0),

      /**
       * The glowSharpness.
       * @type {Uniform<number>}
       * @default 0.5
       */
      glowSharpness: new Uniform(parameters.glowSharpness !== undefined ? parameters.glowSharpness : 0.5),

      /**
       * The falloff.
       * @type {Uniform<number>}
       * @default 0.1
       */
      falloff: new Uniform(parameters.falloff !== undefined ? parameters.falloff : 0.1),

      /**
       * The color of the glow.
       * @type {Uniform<Color>}
       * @default new Color(#00d5ff)
       */
      glowColor: new Uniform(parameters.glowColor !== undefined ? new Color(parameters.glowColor) : new Color("#00d5ff")),

    };

    this.setValues(parameters);
    this.depthTest = parameters.depthTest !== undefined ? parameters.depthTest : false;
    this.blending = parameters.blendMode !== undefined ? parameters.blendMode : AdditiveBlending;
    this.transparent = true;
    this.side = parameters.side !== undefined ? parameters.side : DoubleSide;

  }

}

export default FakeGlowMaterial;