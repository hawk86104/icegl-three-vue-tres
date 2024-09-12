/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-15 11:08:17
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 18:13:42
 */
import { useRenderLoop, useTresContext } from '@tresjs/core'
import type { Camera, WebGLRenderTargetOptions } from 'three'
import { DepthTexture, DepthFormat, UnsignedShortType, HalfFloatType, LinearFilter, WebGLRenderTarget } from 'three'
import type { Ref } from 'vue'
import { isReactive, onBeforeUnmount, reactive, ref, toRefs, watchEffect, toRaw } from 'vue'

export interface FboOptions {
    /*
     * The width of the frame buffer object. Defaults to the width of the canvas.
     *
     * @type {number}
     * @memberof FboProps
     */
    width?: number

    /*
     * The height of the frame buffer object. Defaults to the height of the canvas.
     *
     * @type {number}
     * @memberof FboProps
     */
    height?: number

    /*
     * If set, the scene depth will be rendered into buffer.depthTexture.
     *
     * @default false
     * @type {boolean}
     * @memberof FboProps
     */
    depth?: boolean

    /*
     * Additional settings for the render target.
     * See https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget for more information.
     *
     * @default {}
     * @type {WebGLRenderTargetOptions}
     * @memberof FboProps
     */
    settings?: WebGLRenderTargetOptions

    isLoop?: boolean
}

export function useFBO(options: FboOptions) {
    const target: Ref<WebGLRenderTarget | null> = ref(null)

    const { height, width, settings, depth, isLoop } = isReactive(options) ? toRefs(options) : toRefs(reactive(options))

    const { onLoop } = useRenderLoop()
    const { camera, renderer, scene, sizes } = useTresContext()

    watchEffect(() => {
        target.value?.dispose()
        target.value = new WebGLRenderTarget(width?.value || sizes.width.value, height?.value || sizes.height.value, {
            minFilter: LinearFilter,
            magFilter: LinearFilter,
            type: HalfFloatType,
            ...settings?.value,
        })

        if (depth?.value) {
            target.value.depthTexture = new DepthTexture(
                width?.value || sizes.width.value,
                height?.value || sizes.height.value,
                // FloatType,
            )
            target.value.depthTexture.format = DepthFormat
            target.value.depthTexture.type = UnsignedShortType
        }
    })

    onLoop(() => {
        if (isLoop?.value) {
            renderer.value.setRenderTarget(toRaw(target.value))
            renderer.value.clear()
            renderer.value.render(toRaw(scene.value), toRaw(camera.value) as Camera)

            renderer.value.setRenderTarget(null)
        }
    })

    onBeforeUnmount(() => {
        target.value?.dispose()
    })

    return target
}
