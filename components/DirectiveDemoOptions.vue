<template>
  <div class="box">
    <h2>Directive Demo (Options API)</h2>

    <!-- v-model for two-way binding -->
    <input type="text" v-model="inputText" placeholder="Type something..." />

    <!-- v-on for click -->
    <button v-on:click="toggleMessage">Toggle Message</button>

    <!-- Conditional rendering -->
    <p v-if="showMessage">{{ inputText }}</p>
    <p v-else>No message shown.</p>

    <!-- v-for for looping through items -->
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DirectiveDemoOptions",
  data() {
    return {
      inputText: "", // text bound to input
      showMessage: true, // controls visibility of message
      items: ["Item A", "Item B", "Item C"], // list to render
    };
  },
  methods: {
    toggleMessage() {
      this.showMessage = !this.showMessage;
    },
  },
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
