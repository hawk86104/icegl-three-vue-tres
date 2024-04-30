<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-29 15:57:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-29 16:41:15
-->
<template>
    <Levioso :floatFactor="15" :speed="2">
        <TresMesh castShadow :position="[0, 5, 0]">
            <TresSphereGeometry />
            <TresMeshBasicMaterial color="hotpink" :roughness="1" />
        </TresMesh>
    </Levioso>
</template>

<script lang="ts" setup>
import { Levioso } from '@tresjs/cientos'
</script>
