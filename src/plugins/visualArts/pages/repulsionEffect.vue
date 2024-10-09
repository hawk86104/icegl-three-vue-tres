<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-09 16:57:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-09 17:09:51
-->
<script setup lang="ts">
import repulsionEffectSence from '../components/repulsionEffectSence.vue'

const gl = {
    alpha: true,
    shadows: true,
    powerPreference: 'high-performance',
    windowSize: true,
}
</script>

<template>
    <div class="repulsion-effect__content">
        <h2>ICE.GL</h2>
        <h3>图形学社区</h3>
    </div>
    <div class="repulsion-effect__bg" />
    <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="[0, 65, 0]" :rotation-x="-1.57" :fov="20" />
        <TresAmbientLight color="#ffffff" />
        <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, -20]" />
        <TresPointLight color="#79573e" :intensity="5" :decay="0" :position="[35, 5, 0]" />
        <TresPointLight color="#c27439" :intensity="5" :decay="0" :position="[-35, 5, 0]" />
        <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, 20]" />

        <TresSpotLight color="#7bccd7" :decay="0" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048" :position="[0, 25, 0]" />

        <TresRectAreaLight color="#341212" :decay="0" :width="1000" :height="1000" :position="[5, 20, 50]" :look-at="[0, 0, 0]" />

        <repulsionEffectSence />
    </TresCanvas>
</template>

<style lang="scss" scoped>
.repulsion-effect__bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: #d8bcac;
    pointer-events: none;
}
.repulsion-effect__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

h3 {
  color: #c13535;
  font-size: 7vw;
  font-family: 'Sacramento', cursive;
  font-weight: 400;
  margin: 0;
  line-height: 1;
}

h2 {
  font-size: 13vw;
  color: #48271b;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
  line-height: 1;
}
canvas {
  z-index: 2;
}
</style>
