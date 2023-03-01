<template>
    <div>
      <HomeWelcome /> <!-- Or -->
      <!-- <home-welcome /> This -->
      <button @click="toggle">Toggle</button><br>
      <!-- <Counter /><br> -->
      <component :is="MyComponent" /> <!-- Dynamic Component -->
    </div>
  </template>
  
  <script setup>
    const MyComponent = shallowRef(resolveComponent('Counter'));
    const toggle = () => MyComponent.value = resolveComponent('HomeWelcome');
  </script>