<template>
    <div>
        <h1>
            {{ quiz.title }}
        </h1>
        <progressBar 
            v-if="state === 'question'"
            :value="step" 
            :max="quiz.questions.length"
            >
        </progressBar>
        <question 
            v-if="state === 'question'"
            :question="questionNumber"
            @answer="addAnswer"
        >
        </question>
        <Recap 
            v-if="state === 'recap'"
            :answers="userAnswers"
            :quiz="quiz"
            @reset="resetQuiz"
        >
        </Recap>
    </div>
</template>

<script setup>
import question from './question.vue';
import progressBar from './progressBar.vue';
import Recap from './Recap.vue';
import { computed, ref } from 'vue';

const step = ref(0);

const props = defineProps({
    quiz: Object,
    Required: true
});

const questionNumber = computed(() => props.quiz.questions[step.value]);

const userAnswers = ref(props.quiz.questions.map(() => null));

const state = ref('question');
const addAnswer = (answer) => {
    userAnswers.value[step.value] = answer;
    if (step.value === props.quiz.questions.length - 1) {
        state.value = 'recap'
    } else {
        step.value++
    }
}

const resetQuiz = () => {
    step.value = 0;
    state.value = 'question'
    questionNumber.value = computed(() => props.quiz.questions[step.value]);
    userAnswers.value = props.quiz.questions.map(() => null);
}

</script>