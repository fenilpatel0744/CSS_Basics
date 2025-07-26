<!-- Demonstrates Vue directives: v-model, v-if, v-else, v-for, @click -->
<template>
  <div class="box">
    <h2>Directive Demo</h2>
    <input type="text" v-model="inputText" placeholder="Type something..." />
    <!-- <button @click="toggleMessage">Toggle Message</button> -->
    <button v-on:click="toggleMessage">Toggle Message</button>

    <!-- v-if / v-else directive -->
    <p v-if="showMessage">{{ inputText }}</p>
    <p v-else>No message shown.</p>

    <!-- v-for directive -->
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
const inputText = ref("");
const showMessage = ref(true);
const items = ["Item A", "Item B", "Item C"];

// Toggle display message
const toggleMessage = () => {
  showMessage.value = !showMessage.value;
};
</script>

<style scoped>
.box {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 6px;
  background-color: #fafafa;
}
input {
  margin-bottom: 1rem;
  padding: 0.4rem;
  width: 100%;
}
button {
  background-color: #42b983;
  border: none;
  color: white;
  padding: 0.4rem 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
ul {
  padding-left: 1rem;
}
</style>
