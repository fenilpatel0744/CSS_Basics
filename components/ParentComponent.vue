<!-- Parent component demonstrating props and emit -->
<template>
  <div class="box">
    <h2>Parent Component</h2>
    <!-- Pass prop to child and listen for event -->
    <ChildComponent :message="parentMessage" @childEvent="handleChildEvent" />
    <p><strong>Message from Child:</strong> {{ childMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChildComponent from "./ChildComponent.vue";

const parentMessage = "Hello from Parent";
const childMessage = ref("");

// Handle custom event from child
const handleChildEvent = (msg) => {
  childMessage.value = msg;
};
</script>

<style scoped>
.box {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
