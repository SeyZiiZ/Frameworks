<template>
    <div class="myDiv" v-if="!hasOwner && !hasRepo">
        <input type="text" name="getOwner" id="getOwner" placeholder="Enter the name of the owner ->" v-model="repoOwner">
        <input type="text" name="getRepo" id="getRepo" placeholder="Enter the name of the repository ->" v-model="repoName">
        <button 
            :disabled="!repoOwner || !repoName"
            @click.prevent="sendRepoInfos"
        >Enter</button>
    </div>
</template>

<script setup>
import { ref, defineEmits, inject } from 'vue';

const hasOwner = ref(false);
const repoOwner = ref('');
const hasRepo = ref(false);
const repoName = ref('');

const emits = defineEmits(['sendInfos']);

const sendRepoInfos = () => {
    emits('sendInfos', {owner: repoOwner.value, repo: repoName.value})
}

</script>

<style scoped>
.myDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
input {
    width: 80vw;
}
</style>