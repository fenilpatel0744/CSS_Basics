<!-- Child component: receives props and emits event -->
<template>
  <div>
    <p><strong>Child Received:</strong> {{ message }}</p>
    <button @click="sendToParent">Send Message to Parent</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["message"]);
const emit = defineEmits(["childEvent"]);

// Emit message to parent on button click
const sendToParent = () => {
  emit("childEvent", "Hello from Child");
};
</script>

<style scoped>
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
