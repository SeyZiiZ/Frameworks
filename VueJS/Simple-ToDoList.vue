<template>
  <h1>My To-Do-List</h1>

  <form action="" @submit.prevent="addToDo">
    <fieldset role="group">
      <input 
      type="text" 
      placeholder="Ajouter une tache"
      v-model="toDoInput"
      > 
      <button :disabled="toDoInput.length < 1">Ajouter</button>  
    </fieldset>
  </form>

  <p v-if="toDoList.length == 0">La to do list est vide :ç</p>
  <div v-else>
    <ul>
      <li 
      v-for="toDo in sortedToDo()" 
      :key="toDo.date"
      :class="{completed: toDo.completed}"
      > 
        <label class="title">
          <input type="checkbox" v-model="toDo.completed">
          {{ toDo.title }}
        </label>
        <label>
          <button @click.prevent="deleteToDo(toDo.date)">Supprimer</button>
        </label>
      </li>
    </ul>
    <label>
      <input type="checkbox" v-model="hideCompleted">
      Masquer les taches complétées
    </label>
  </div>
</template>

<script setup>

import { ref } from 'vue';

const hideCompleted = ref(false);
const toDoInput = ref('');
const toDoList = ref([]);

const addToDo = () => {
  toDoList.value.push({
  title: toDoInput.value,
  completed: false,
  date: Date.now()
  });
  toDoInput.value = '';
  addToLocalStorage();
}

const sortedToDo = () => {
  const sortedToDo = toDoList.value.toSorted((a, b) => a.completed > b.completed ? 1 : -1);
  if (hideCompleted.value == true) {
    return sortedToDo.filter(t => t.completed == false)
  }
  return sortedToDo
}

const addToLocalStorage = () => {
  localStorage.removeItem('tasks');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  toDoList.value.forEach(element => {
    tasks.push(element)
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadTasks = () => {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  toDoList.value = tasks
}

const deleteToDo = (key) => {
  localStorage.removeItem('tasks');
  toDoList.value = toDoList.value.filter(element => element.date !== key);
  let tasks = toDoList.value;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
})

</script>

<style scoped>
.completed {
  opacity: .5;
  text-decoration: line-through;
}
li {
  display: flex;
}
.title {
  font-size: 1.5rem;
}
button {
  margin-left: 15%;
}
</style>
