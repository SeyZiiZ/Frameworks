<template>
    <getInfos @sendInfos="handleInfos" v-if="!gotData"></getInfos>
    <h1 v-if="gotData && !hasFetchedData">Loading Data...</h1>
    <ShowData 
      :theData="fetchedData" 
      v-if="fetchedData && gotData"
      @reset="reset"
    ></ShowData>
</template>

<script setup>
import {provide, ref, shallowRef, watch} from 'vue';
import getInfos from './components/getInfos.vue';
import ShowData from './components/ShowData.vue';
import { fetchData } from '../composable/fetchData';

const gotData = ref(false);
const data = ref();
const repo = shallowRef('');
provide('repoLink', repo);
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

const reset = () => {
  gotData.value = false;
  hasFetchedData.value = false;
};

</script>

<style>
#app {
  grid-template-columns: 0fr 0fr
}
</style>