<!-- Demonstrates lifecycle hooks with console logs -->
<template>
  <div class="box">
    <h2>Lifecycle Hook Demo</h2>
    <p>Open the console to see lifecycle logs.</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("Component Mounted");
});

onUnmounted(() => {
  console.log("Component Unmounted");
});
</script>

<style scoped>
.box {
  background-color: #f8f8f8;
  padding: 1rem;
  border: 1px dashed #aaa;
}
</style>
