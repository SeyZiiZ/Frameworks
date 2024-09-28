<template>
    <div>
        <p>
            Question {{ value + 1 }}/{{ max }}
        </p>
        <progress :value :max="max"></progress>
    </div>
</template>

<script setup>

const props = defineProps({
    value: Number,
    max: Number
});

</script>