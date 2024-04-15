
import { FullScreenQuad } from 'three-stdlib'
import { Color, ShaderMaterial, MathUtils, WebGLRenderTarget, NearestFilter, Material, WebGLRenderer, Texture } from 'three'
import { CopyShader } from 'three-stdlib';
import { clone, MipGenerationShader } from './MipGenerationShader.js';

const _originalClearColor = new Color();
export class PackedMipMapGenerator {

  _swapTarget: WebGLRenderTarget;
  _copyQuad: FullScreenQuad<ShaderMaterial>;
  _mipQuad: FullScreenQuad<Material>;
  _mipMaterials: any[];


  constructor(mipmapLogic?: string) {

    if (!mipmapLogic) {

      mipmapLogic = /* glsl */`

				#pragma unroll_loop
				for ( int i = 0; i < SAMPLES; i ++ ) {

					gl_FragColor += samples[ i ] * weights[ i ];

				}

			`;

    }

    const shader = clone(MipGenerationShader);
    shader.fragmentShader = shader.fragmentShader.replace(/<mipmap_logic>/g, mipmapLogic);

    // Save the mip materials such that mip 0 indicates whether or not X is power
    // of two and 1 indicates the same for y to prevent material recompilation.
    const mipMaterials = new Array(4);
    mipMaterials[0] = new ShaderMaterial(clone(shader));
    mipMaterials[0].defines.X_IS_EVEN = 0;
    mipMaterials[0].defines.Y_IS_EVEN = 0;

    mipMaterials[1] = new ShaderMaterial(clone(shader));
    mipMaterials[1].defines.X_IS_EVEN = 1;
    mipMaterials[1].defines.Y_IS_EVEN = 0;

    mipMaterials[2] = new ShaderMaterial(clone(shader));
    mipMaterials[2].defines.X_IS_EVEN = 0;
    mipMaterials[2].defines.Y_IS_EVEN = 1;

    mipMaterials[3] = new ShaderMaterial(clone(shader));
    mipMaterials[3].defines.X_IS_EVEN = 1;
    mipMaterials[3].defines.Y_IS_EVEN = 1;

    const swapTarget = new WebGLRenderTarget();
    swapTarget.texture.minFilter = NearestFilter;
    swapTarget.texture.magFilter = NearestFilter;

    this._swapTarget = swapTarget;
    this._copyQuad = new FullScreenQuad(new ShaderMaterial(CopyShader));
    // @ts-ignore
    this._mipQuad = new FullScreenQuad(null);
    this._mipMaterials = mipMaterials;

  }

  update(texture: Texture, target: WebGLRenderTarget, renderer: WebGLRenderer, forcePowerOfTwo = false) {
    // @ts-ignore
    if (texture.isWebGLRenderTarget) {
      // @ts-ignore
      texture = texture.texture;

    }

    const originalAutoClear = renderer.autoClear;
    const originalClearAlpha = renderer.getClearAlpha();
    const originalRenderTarget = renderer.getRenderTarget();
    renderer.getClearColor(_originalClearColor);

    const copyQuad = this._copyQuad;
    const mipQuad = this._mipQuad;
    const swapTarget = this._swapTarget;
    const mipMaterials = this._mipMaterials;

    // TODO: add option for ceil power of two and option to not power of two at all? This
    // causes the mip texels to not align, though...
    let width, height;
    if (forcePowerOfTwo) {

      width = MathUtils.floorPowerOfTwo(texture.image.width);
      height = MathUtils.floorPowerOfTwo(texture.image.height);

    } else {

      width = Math.floor(texture.image.width);
      height = Math.floor(texture.image.height);

    }

    const targetWidth = Math.floor(width * 1.5);
    const targetHeight = Math.floor(height);

    // init the targets
    target.setSize(targetWidth, targetHeight);

    if (swapTarget.texture.type !== target.texture.type) {

      swapTarget.dispose();
      swapTarget.copy(target);

      // mrdoob/three.js issue #20328
      swapTarget.texture.image = { ...swapTarget.texture.image };

    } else {

      swapTarget.setSize(targetWidth, targetHeight);

    }

    // init the renderer
    renderer.autoClear = false;
    renderer.setClearColor(0);
    // @ts-ignore
    renderer.setClearAlpha();

    // write the first texture to the texture
    copyQuad.material.uniforms.tDiffuse.value = texture;
    copyQuad.camera.setViewOffset(width, height, 0, 0, targetWidth, targetHeight);

    renderer.setRenderTarget(target);
    renderer.clear();
    copyQuad.render(renderer);

    renderer.setRenderTarget(swapTarget);
    renderer.clear();
    copyQuad.render(renderer);

    let currWidth = width;
    let currHeight = height;
    let mip = 0;
    while (currWidth > 1 && currHeight > 1) {

      const X_FLAG = 1 << 0;
      const Y_FLAG = 1 << 1;
      const index =
        (currWidth % 2 === 0 ? X_FLAG : 0) |
        (currHeight % 2 === 0 ? Y_FLAG : 0);

      const material = mipMaterials[index];
      material.uniforms.map.value = swapTarget.texture;
      material.uniforms.parentLevel.value = mip;
      material.uniforms.parentMapSize.value.set(currWidth, currHeight);
      material.uniforms.originalMapSize.value.set(width, height);
      mipQuad.material = material;

      currWidth = Math.floor(currWidth / 2);
      currHeight = Math.floor(currHeight / 2);

      // Set the render view to currWidth x currHeight
      // Y offset is from the top but uvs from the bottom
      // Negate x, y offsets because the view offset function does the opposite

      // targetHeight -- movest offset from top of screen to bottom
      // 2 * currHeight -- 1 to leave space for other mips, 1 to draw current mip
      const yOffset = targetHeight - 2 * currHeight;
      renderer.setRenderTarget(target);
      mipQuad.camera.setViewOffset(currWidth, currHeight, - width, - yOffset, targetWidth, targetHeight);
      mipQuad.render(renderer);

      // TODO: Is this the fastest way to do this? Can I just copy the subframe from the original texture to the next?
      // Copy the subframe to the scratch target
      renderer.setRenderTarget(swapTarget);
      material.uniforms.map.value = target.texture;
      mipQuad.render(renderer);

      mip++;

    }

    renderer.setRenderTarget(originalRenderTarget);
    renderer.setClearAlpha(originalClearAlpha);
    renderer.setClearColor(_originalClearColor);
    renderer.autoClear = originalAutoClear;

    return mip + 1;

  }

  dispose() {

    this._swapTarget.dispose();
    this._mipQuad.dispose();
    this._copyQuad.dispose();
    this._mipMaterials.forEach(m => m.dispose());

  }

}