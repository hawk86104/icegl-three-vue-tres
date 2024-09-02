<script setup lang="ts">
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { ViewHelper } from '../common/ViewHelper.js'
import { watch } from 'vue'

const props = withDefaults(
    defineProps<{
        placement?: string
    }>(),
    {
        placement: 'bottom-right', // bottom top center  'bottom-right' 'center-right'
    },
)

const { camera, renderer, controls } = useTresContext()
let viewHelper = null as any
watch(
    () => controls.value,
    (v) => {
        if (v) {
            if (!viewHelper) viewHelper = new ViewHelper(camera.value, renderer.value, props.placement)
            viewHelper.setControls(v)
        }
    },
)

const { onAfterLoop } = useRenderLoop()
onAfterLoop(({ delta }) => {
    if (!viewHelper) return
    viewHelper?.render(delta)
})
</script>
