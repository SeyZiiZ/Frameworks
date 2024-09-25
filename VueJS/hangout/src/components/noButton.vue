<template>
    <p v-if="numberClicker > 5">Accept for a surprise (Please)</p>
  <button
  @click.prevent="noButtonOnClick"
  :style="isClicked ? { position: 'absolute', top: updatedButtonY + 'px', left: updatedButtonX + 'px' } : {}"
  > {{ numberClicker < 6 ? quotes[numberClicker] : 'Looser' }} &#x274C;</button>
</template>

<script setup>

import { ref, defineProps } from 'vue';

const isClicked = ref(false);

const numberClicker = ref(0);

const updatedButtonX = ref(0);
const updatedButtonY = ref(0);

const props = defineProps({
  width: Number,
  heigth: Number
});

const quotes = ["No, I Dont want U", "Whats that ?", "I said no", "Let me escape !", "Wow ur coding skills are crazy (ik)", "How to escape the matrix ?"];

const noButtonOnClick = () => {
  numberClicker.value = numberClicker.value + 1;
  if (isClicked.value) {
  const maxWidth = props.width - 50;
  const maxHeight = props.heigth - 50;
  
  updatedButtonX.value = Math.min(Math.round(Math.random() * maxWidth), maxWidth);
  updatedButtonY.value = Math.min(Math.round(Math.random() * maxHeight), maxHeight);
  } else {
    isClicked.value = true;
  }
}

</script>