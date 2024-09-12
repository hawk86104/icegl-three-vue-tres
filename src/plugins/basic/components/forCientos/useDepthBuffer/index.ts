/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-12 16:47:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 16:58:34
 */
import { useTresContext } from '@tresjs/core'
const { sizes } = useTresContext()

export function useDepthBuffer({ size = 256, frames = Infinity }: { size?: number; frames?: number } = {}) {
	const dpr = sizes.aspectRatio.value
	const width = sizes.width.value
	const height = sizes.height.value
  const w = size || width * dpr
	const h = size || height * dpr
	
	const depthConfig = 
    const depthTexture = new DepthTexture(w, h)
    depthTexture.format = DepthFormat
    depthTexture.type = UnsignedShortType
    return { depthTexture }


  // return target
}
