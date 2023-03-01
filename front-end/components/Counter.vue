<template>
    <button type="button" @click="increment">Increment</button>
    <p>{{count}}</p>
    <button type="button" @click="decrement">Decrement</button>
</template>

<script setup>

    let count = ref(0);
    const increment = () => count.value++

    const decrement = () => count.value--

</script>