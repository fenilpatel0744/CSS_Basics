<!-- Root component: handles navigation and routing -->
<template>
  <div class="container">
    <h1>Vue.js Basics Demo</h1>
    <nav>
      <!-- Navigation Links -->
      <router-link to="/lifecycle">Lifecycle</router-link>
      <router-link to="/directives">Directives</router-link>
      <router-link to="/parent-child">Parent & Child</router-link>
      <router-link to="/feedback">Feedback Form</router-link>
    </nav>
    <!-- Render route components -->
    <router-view />
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}
nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
nav a {
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}
nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
