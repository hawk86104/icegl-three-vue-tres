/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-30 09:23:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-30 10:39:45
 */
import { useTresContext } from '@tresjs/core'
import * as THREE from 'three'
import { HalfFloatType, Fog, FogExp2, WebGLCubeRenderTarget } from 'three'
import type { Ref } from 'vue'
import { onBeforeUnmount, ref,watch } from 'vue'

export type CubeCameraOptions = {
  /** Resolution of the FBO, 256 */
  resolution?: number
  /** Camera near, 0.1 */
  near?: number
  /** Camera far, 1000 */
  far?: number
  /** Custom environment map that is temporarily set as the scenes background */
  envMap?: THREE.Texture
  /** Custom fog that is temporarily set as the scenes fog */
  fog?: Fog | FogExp2
}

export function useCubeCamera({ resolution = 256, near = 0.1, far = 1000, envMap, fog }: CubeCameraOptions = {}) {
	const { renderer, scene } = useTresContext()
	
	const fbo: Ref<WebGLCubeRenderTarget | null> = ref(null)
	const resolutionR = ref(resolution)
	const nearR = ref(near)
	const farR = ref(far)
	const camera: Ref<THREE.CubeCamera | null> = ref(null)

	watch(()=>resolutionR, (r) => {
		fbo.value?.dispose()
		fbo.value = new WebGLCubeRenderTarget(r.value)
		fbo.value.texture.type = HalfFloatType
	 }, { immediate: true })

	watch([nearR, farR, fbo], ([n, fa, fb]) => {
		if (fb) {
			camera.value = new THREE.CubeCamera(n, fa, fb)
		}
	}, { immediate: true })

	onBeforeUnmount(() => {
    fbo.value?.dispose()
	})
	
	let originalFog
  let originalBackground
  const update = () => {
    originalFog = scene.value.fog
    originalBackground = scene.value.background
    scene.value.background = envMap || originalBackground
    scene.value.fog = fog || originalFog
    camera.value?.update(renderer.value, scene.value)
    scene.value.fog = originalFog
    scene.value.background = originalBackground
	}
	
	return {
    fbo,
    camera,
    update,
  }
}