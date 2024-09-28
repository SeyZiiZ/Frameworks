<template>
    <div class="question">
        <h3>{{ question.question }}</h3>
    </div>
    <ul>
        <li 
            v-for="(choice, index) in question.choices"
            :key="choice"
        >
            <label :for="`answer${index}`">
                <input 
                    :for="`answer${index}`" 
                    type="radio" 
                    name="answer"
                    :value="choice"
                    v-model="answer"
                >
                {{ choice }}
            </label>
        </li>
    </ul>
    <button 
        @click.prevent="emits('answer', answer)"
        :disabled="hasChoosen"
    >
        Next Question ->
    </button>
</template>

<script setup>
import { defineEmits, ref, computed, watch } from 'vue';

const props = defineProps({
    question: Object
});

const emits = defineEmits(['answer']);
const answer = ref(null);

const hasChoosen = computed(() => answer.value === null)

watch(() => props.question, () => {
    answer.value = null;
});

</script>

<style>
button  {
    background-color: #524ED2;
}
</style>