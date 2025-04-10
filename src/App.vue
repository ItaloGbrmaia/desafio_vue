<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="bg-black min-h-screen flex items-center justify-center">
    <div class="text-center text-white">
      <h1 class="text-4xl font-bold mb-4">Dashboard Médico</h1>
      <p class="text-lg mb-6">Bem-vindo ao sistema de gestão de saúde.</p>

      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo green" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>

      <!-- <HelloWorld msg="Vite + Vue" /> -->
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 10em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.green:hover {
  filter: drop-shadow(0 0 2em #64ff92aa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #b842a6aa);
}
</style>
