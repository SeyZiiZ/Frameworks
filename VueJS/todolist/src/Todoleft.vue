<template>
    <span v-if="number > 0">
        Il vous reste {{ number }} taches a faire
    </span>
    <span v-else>
        Vous avez fait toutes vos taches, Bravo !
    </span>
</template>

<script setup>

const props = defineProps({
    number: {
        type: Number,
        required: true
    }
});

</script>