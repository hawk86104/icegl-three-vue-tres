<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-28 15:17:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-31 13:15:18
-->
<template>
    <!-- name:103 uuid:f3ddf9ae-40de-4416-aa55-de0df5267f60 type:Mesh -->
    <primitive :object="object[0]" />
    <!-- name:Line005 uuid:8bd1f5e9-fa84-4ebd-8049-1b277af45da7 type:Mesh -->
    <primitive :object="object[1]" />
    <!-- name:Box002 uuid:2ea5ba62-7455-4a23-9636-f80a681b739d type:Mesh -->
    <primitive :object="object[2]" />
    <!-- name:gm00 uuid:5db561fc-8728-46b6-98ad-e0a6d5d27b7a type:Mesh -->
    <primitive :object="object[3]" />
    <!-- name:gm01 uuid:ef1bac09-c322-4322-9c09-50855ffbd608 type:Group -->
    <primitive :object="object[4]" />
    <!-- name:gm02 uuid:69049cd8-ca3f-485a-904b-dd2a9a2a203d type:Mesh -->
    <primitive :object="object[5]" />
    <!-- name:gm03 uuid:8453cf46-30aa-4124-a661-3db104356b17 type:Mesh -->
    <primitive :object="object[6]" />
    <!-- name:gm04 uuid:d60b5467-ccc4-47d9-9ab9-a413e55e69b9 type:Group -->
    <primitive :object="object[7]" />
    <!-- name:gm05 uuid:b402b548-4796-4ede-b96a-678a3817f5c8 type:Group -->
    <primitive :object="object[8]" />
    <!-- name:Cylinder002 uuid:3ada61e8-0ffe-4353-9dd1-77155c6e9f68 type:Group -->
    <primitive :object="object[9]" />
    <!-- name:Box004 uuid:d7c175d3-8835-4e3e-a228-139c58017f0e type:Group -->
    <primitive :object="object[10]" />
    <!-- name:Box006 uuid:451d0757-02fc-4b1b-9835-75a0f54d6341 type:Group -->
    <primitive :object="object[11]" />
    <!-- name:Hose003 uuid:57dce6f1-bf74-48d9-b89c-a23428db9479 type:Mesh -->
    <primitive :object="object[12]" />
    <!-- name:Cylinder007 uuid:ddcce890-9cbe-4b12-8064-aa82db31627e type:Group -->
    <primitive :object="object[13]" />
    <!-- name:Hose006 uuid:8c0b5342-989d-4259-a6a9-2ba86bbe2fc7 type:Mesh -->
    <primitive :object="object[14]" />
    <!-- name:Line006 uuid:c3e2ee48-5cdb-488f-b6ec-84dc5db95cfc type:Mesh -->
    <primitive :object="object[15]" />
    <!-- name:Box007 uuid:26f869bf-dcfb-4515-aad5-ab5f9f94f705 type:Group -->
    <primitive :object="object[16]" />
    <!-- name:Line056 uuid:b6df7dc1-aaaf-4658-801a-79d942cd9320 type:Mesh -->
    <primitive :object="object[17]" />
    <!-- name:Line062 uuid:19425b8c-28a1-40b9-9009-1cbdcf8c1d6c type:Mesh -->
    <primitive :object="object[18]" />
    <!-- name:Line063 uuid:11624393-901f-4db5-a4ee-8f860d223035 type:Mesh -->
    <primitive :object="object[19]" />
    <!-- name:Line069 uuid:c431f249-ecb6-45ad-954d-030e1c152c2d type:Mesh -->
    <primitive :object="object[20]" />
    <!-- name:Line070 uuid:038d2b39-0db2-43a3-95d9-b7307bed322e type:Mesh -->
    <primitive :object="object[21]" />
    <!-- name:Line071 uuid:d801af07-4df3-4d2e-9dd1-96e647a86ceb type:Mesh -->
    <primitive :object="object[22]" />
    <!-- name:Line066 uuid:ea47beda-9e41-4d8f-bdd3-89aaf664c45e type:Mesh -->
    <primitive :object="object[23]" />
    <!-- name:Line067 uuid:1ababc27-d0c6-4eaf-b231-c211ef156249 type:Mesh -->
    <primitive :object="object[24]" />
    <!-- name:Line068 uuid:eb526026-acd6-4399-b397-32464e8676f8 type:Mesh -->
    <primitive :object="object[25]" />
    <!-- name:Cylinder008 uuid:3fbac617-c962-40bf-8c41-362e5a86dbbc type:Group -->
    <primitive :object="object[26]" />
    <!-- name:Cylinder009 uuid:f4332569-03a1-4944-93f2-9f246c04cb56 type:Group -->
    <primitive :object="object[27]" />
    <!-- name:102 uuid:75a05d93-2840-453c-a5c3-cf5d9f04a831 type:Mesh -->
    <primitive :object="object[28]" />
    <!-- name:101 uuid:055c362c-6e2c-410c-ab45-76d6b13a9482 type:Mesh -->
    <primitive :object="object[29]" />
    <!-- name:100 uuid:865c32e0-fab0-4b8e-a62e-083d5ca7921d type:Group -->
    <primitive :object="object[30]" />
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        object: any
        reflectorRotateX: any
    }>(),
    {
        reflectorRotateX: null,
    },
)
import { watch } from 'vue'
import * as THREE from 'three'
import { Reflector, ReflectorMaterial } from 'PLS/floor/lib/alienJS/all.three.js'

props.object[25].material.color.setHex(0x009194)
props.object[25].material.emissive.setHex(0x000000)
props.object[13].children[3].material.color.setHex(0x0053fa)
props.object[11].children[1].material.color.setHex(0x004d47)

const ob = props.object[26].children[1]
const reflector = new Reflector({
    width: 1024,
    height: 1024,
})

const material = new ReflectorMaterial({
    reflectivity: 0.6, //反射率
    mirror: 10.88,
    mixStrength: 6,
    color: new THREE.Color('#666'),
    normalMap: ob.material.normalMap.clone(),
    normalScale: new THREE.Vector2(0.3, -0.3),
    dithering: true,
})
material.uniforms.tReflect = reflector.renderTargetUniform
// material.uniforms.tReflect = { value: reflector.renderTarget.texture }
// material.uniforms.tReflectBlur = reflector.renderTargetUniform

material.uniforms.uMatrix = reflector.textureMatrixUniform

const geometry = ob.geometry.clone()
geometry.rotateX(Math.PI / 2)
const meshOB = new THREE.Mesh(geometry, material)

// meshOB.rotateX(-Math.PI / 2)
meshOB.rotateX(props.reflectorRotateX.value)
// console.log(props.reflectorRotateX.value)

meshOB.add(reflector)
meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
    meshOB.visible = false
    reflector.update(rendererSelf, sceneSelf, cameraSelf)
    meshOB.visible = true
}
props.object[26].remove(ob)
props.object[26].add(meshOB)

watch(
    () => props.reflectorRotateX.value,
    (newVal) => {
        meshOB.rotation.x = newVal
    },
)
</script>
