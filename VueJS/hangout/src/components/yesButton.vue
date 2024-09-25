<template>
    <button
    v-if="isClicked == false" 
    class="yes"
    @click.prevent="accept"
    >
        Yes, Ofc I want &#x1F60D;
    </button>
    <h3 v-else>{{ message }} 555......</h3>
</template>

<script setup>
import { ref } from 'vue';

const isClicked = ref(false);
const message = ref('');

const accept = () => {
    isClicked.value = true;
    message.value = 'Ok here is my number shawwwty : '
}

</script>
