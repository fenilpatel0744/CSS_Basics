<!-- Simple form with v-model binding and list rendering -->
<template>
  <div class="box">
    <h2>Feedback Form</h2>
    <form @submit.prevent="submitFeedback">
      <input type="text" v-model="name" placeholder="Your Name" required />
      <input type="email" v-model="email" placeholder="Your Email" required />
      <textarea
        v-model="feedback"
        placeholder="Your Feedback"
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>

    <!-- Show submitted feedbacks -->
    <div v-if="feedbacks.length">
      <h3>Submitted Feedback</h3>
      <ul>
        <li v-for="(f, index) in feedbacks" :key="index">
          <p>
            <strong>{{ f.name }}</strong> ({{ f.email }})
          </p>
          <p>{{ f.feedback }}</p>
          <button @click="deleteFeedback(index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive form fields
const name = ref("");
const email = ref("");
const feedback = ref("");
const feedbacks = ref([]);

// Submit form data
const submitFeedback = () => {
  if (name.value && email.value && feedback.value) {
    feedbacks.value.push({
      name: name.value,
      email: email.value,
      feedback: feedback.value,
    });
    name.value = email.value = feedback.value = "";
  }
};

// Delete a feedback entry
const deleteFeedback = (index) => {
  feedbacks.value.splice(index, 1);
};
</script>

<style scoped>
.box {
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 6px;
}
input,
textarea {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
