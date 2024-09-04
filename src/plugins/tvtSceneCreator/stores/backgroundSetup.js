import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBackgroundSetupStore = defineStore('backgroundSetup', () => {
    const color = ref('#333333')
    const img = ref({
        name: '',
        src: '',
    })
    const useBackImg = ref(true)
    const setupEnvBackground = ref(null)

    return { color, img, useBackImg, setupEnvBackground }
})
