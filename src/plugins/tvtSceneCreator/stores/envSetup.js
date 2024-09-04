import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnvSetupStore = defineStore('envSetup', () => {
    const isLightFormer = ref(false)
    const colorA = ref('#ff0000')
    const colorB = ref('#0000ff')
    const blur = ref(1)
    const pos = ref({ x: 0, y: 0, z: 0 })
    const rotate = ref({ x: 0, y: 0, z: 0 })
    const scale = ref({ x: 1, y: 1, z: 1 })

    const envHDR = ref({
        name: '',
        src: null,
    })

    const setEnvHDR = ref()

    return { isLightFormer, colorA, colorB, blur, pos, rotate, scale, envHDR, setEnvHDR }
})
