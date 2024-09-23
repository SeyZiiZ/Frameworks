<template>
    <label>
      <input type="checkbox" v-model="model">
      <p v-if="model == false">Masquer les taches complétées</p>
      <p v-else>Démasquer les taches complétées</p>
    </label>
</template>

<script setup>

const model  = defineModel();

</script>