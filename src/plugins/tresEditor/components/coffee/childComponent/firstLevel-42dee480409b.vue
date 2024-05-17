<template>
    <!-- name:baked uuid:12eca843-ed7c-4c19-b44e-e1203f066826 type:Mesh -->
        <primitive :object="object[0]" />
        
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        object: any
    }>(),
    {},
)
</script>
