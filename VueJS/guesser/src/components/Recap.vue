<template>
    <h2>Summary : </h2>
    <h3>{{ hasWon }}</h3>
    <p>
        Your Score : {{ score }} / {{ maxScore }}
    </p>
    <button 
        @click.prevent="emits('reset')"
    >
    Replay ?
    </button>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    answers: Array,
    quiz: Object
});

const maxScore = props.quiz.questions.length;
const messageToUser = ref('');

const score = computed(() => {
    return props.quiz.questions.reduce((acc, question, k) => {
        if (question.correct_answer === props.answers[k]) {
            return acc+1
        }
        return acc
    }, 0);
});

const hasWon = computed(() => {
    return score.value >= props.quiz.minimum_score 
    ? messageToUser.value = props.quiz.success_message 
    : messageToUser.value = props.quiz.failure_message;
});

const emits = defineEmits(['reset']);

</script>