/* eslint-disable no-undefined */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurMeshListStore = defineStore('curMeshList', () => {
    const controlState = ref('sel') // rotate scale translate

    const mlist = ref([])

    const addMesh = (mesh) => {
        const one = {
            name: mesh.name !== undefined ? mesh.name : 'deMesh',
            type: mesh.type ? mesh.type : 'Mesh',
            position: mesh.position ? mesh.position : [0, 0, 0],
            rotation: mesh.rotation ? mesh.rotation : [0, 0, 0],
            scale: mesh.scale ? mesh.scale : [1, 1, 1],
            visible: mesh.visible !== undefined ? mesh.visible : true,
            renderOrder: mesh.renderOrder ? mesh.renderOrder : 0,
            receiveShadow: mesh.receiveShadow !== undefined ? mesh.receiveShadow : false,
            castShadow: mesh.castShadow !== undefined ? mesh.castShadow : false,
            geometry: mesh.geometry ? mesh.geometry : 'BoxGeometry',
            args: mesh.args ? mesh.args : [1, 1, 1],
            material: mesh.material ? mesh.material : 'MeshStandardMaterial',
            metalness: mesh.metalness ? mesh.metalness : 0,
            roughness: mesh.roughness ? mesh.roughness : 0.5,
            color: mesh.color ? mesh.color : '#ffffff',
            intensity: mesh.intensity ? mesh.intensity : 1,
            url: mesh.url ? mesh.url : '',
        }
        mlist.value.push(one)
    }

    const removeMesh = (index) => {
        mlist.value.splice(index, 1)
    }

    const hasAmbientLight = () => mlist.value.some((mesh) => mesh.type === 'AmbientLight')

    const selectedMeshIndex = ref(null)

    const clearMesh = () => {
        mlist.value = []
        selectedMeshIndex.value = null
    }

    const tresGroup = ref(null)

    return { controlState, mlist, addMesh, removeMesh, selectedMeshIndex, tresGroup, hasAmbientLight,clearMesh }
})
