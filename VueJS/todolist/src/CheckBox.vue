<template>
    <label>
        <input type="checkbox" v-model="model">
        {{ label }}
    </label>
</template>

<script setup>

const props = defineProps({
    label: {
        type: String,
        required: true
    }
});

const model = defineModel();

const emits = defineEmits(['check', 'uncheck']);

</script>