<template>
    <div class="myDiv">
        <h1>Owner : {{ owner.login }}</h1>
        <h1>Repository : {{ name }}</h1>
        <h3> All infos in the JSON :<a :href="link" target="_blank"> {{ link }} </a></h3>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    theData: Object,
    link: String
});

const {owner, name} = props.theData;

</script>

<style scoped>
.myDiv {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 70vw;
}
</style>