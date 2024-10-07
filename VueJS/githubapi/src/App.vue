<template>
  <div class="myDiv">
    <getInfos @sendInfos="handleInfos" v-if="!gotData"></getInfos>
    <h1 v-if="gotData && !hasFetchedData">Loading Data...</h1>
    <ShowData :theData="fetchedData" :link="repo" v-if="fetchedData"></ShowData>
  </div>
</template>

<script setup>
import {ref, shallowRef, watch} from 'vue';
import getInfos from './components/getInfos.vue';
import ShowData from './components/ShowData.vue';
import { fetchData } from '../composable/fetchData';

const gotData = ref(false);
const data = ref();
const repo = shallowRef('');
const handleInfos = (infos) => {
  data.value = infos;
  gotData.value = true;
  repo.value = `https://api.github.com/repos/${data.value.owner}/${data.value.repo}`;
}

const hasFetchedData = ref(false);
const fetchedData = ref();
watch(gotData, async (newValue) => {
  if (newValue) {
    fetchedData.value = await fetchData(data.value);
    hasFetchedData.value = true;
  }
});

</script>

<style>
#app {
  grid-template-columns: 0fr 0fr
}
</style>