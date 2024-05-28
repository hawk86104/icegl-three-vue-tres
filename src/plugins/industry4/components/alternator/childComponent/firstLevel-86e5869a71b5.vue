<template>
    <!-- name:bj uuid:8d062f1d-8d00-4f4f-804d-8492626bc26c type:Group -->
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
