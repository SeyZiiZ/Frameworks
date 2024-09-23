<template>
    <div class="layout">
        <header></header>
        <aside></aside>
        <main></main>
        <footer></footer>
    </div>
</template>

<style>
.layout {
    display: grid;
    grid-template-columns: 200px 1fr;
}

.layout > * {
    border: 1px solid red;
}

.layout header,
.layout footer {
    grid-column: 1 / -1;
}
</style>