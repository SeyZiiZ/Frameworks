<template>
  <h1>Wanna Hang Out W Me ?</h1>
  <yesButton></yesButton>
  <noButton
  :width="width"
  :heigth="heigth"
  ></noButton>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import noButton from './components/noButton.vue';
import yesButton from './components/yesButton.vue';

const width = ref(0);
const heigth = ref(0);

const updateWindowSize = () => {
  width.value = window.innerWidth;
  heigth.value = window.innerHeight;
}

onMounted(() => {
  updateWindowSize();
});

window.addEventListener('resize', updateWindowSize);

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});

</script>

<style>
body {
  position: relative;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.yes {
  margin-right: 15px;
}

button {
  position: relative;
}

@media screen and (max-width: 900px) {
  .yes {
    margin-bottom: 15px;
  }
}
</style>
