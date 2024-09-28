<template>
  <div v-if="state === 'error'">
    <p>
      Unable to load the quiz
    </p>
  </div>
  <div :aria-busy="state === 'loading'">
    <quiz :quiz="quizData" v-if="quizData !== null"></quiz>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import quiz from './components/quiz.vue';

const quizData = ref(null);
const state = ref('loading');

onMounted(() => {
  fetch('/quiz.json')
  .then(r => {
    if (r.ok) {
      return r.json();
    }
    throw new Error('Unable to retrieve data');
  })
  .then(data => {
    quizData.value = data;
    state.value = 'idle';
  })
  .catch(e => {
    state.value = 'error';
  });
});
</script>
