import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useotherConfigStore = defineStore('otherConfig', () => {
    const activeModel = ref('modelList')

    return { activeModel }
})
