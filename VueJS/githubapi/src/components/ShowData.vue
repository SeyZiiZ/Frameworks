<template>
    <div class="mainDiv">
        <div v-if="theData.message" class="myDiv">
            <h1>You Have exceed the amount of request with the same IP address</h1>
            <p>{{ theData.message }}</p>
        </div>
        <div class="myDiv" v-else>
            <h1>Owner : {{ owner.login }}</h1>
            <h1>Repository : {{ name }}</h1>
            <h3> All infos in the JSON :<a :href="repoLink" target="_blank"> {{ repoLink }} </a></h3>
        </div>
        <button @click.prevent="emits('reset')">Reset & Find a New Repo</button>
    </div>
</template>

<script setup>
import { inject, defineEmits } from 'vue';

const props = defineProps({
    theData: Object,
});

const {name, owner} = props.theData;

const repoLink = inject('repoLink');

const emits = defineEmits(['reset']);

</script>

<style scoped>
.mainDiv {
    display: flex;
    flex-direction: column
}
.myDiv {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 70vw;
}
button {
    width: 30%;
    margin: 0 auto;
}
</style>