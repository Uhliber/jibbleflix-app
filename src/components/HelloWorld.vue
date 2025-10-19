<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="text-center text-xl">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped></style>
