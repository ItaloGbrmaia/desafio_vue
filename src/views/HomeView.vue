<template>
  <div class="p-4">
    <input
      v-model="query"
      @keyup.enter="searchPhotos"
      placeholder="Buscar imagens..."
      class="border px-4 py-2 rounded w-full mb-4"
    />

    <button
      @click="searchPhotos"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    >
      Buscar
    </button>

    <div v-if="loading">Carregando...</div>

    <div v-else class="grid">
      <img
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.src.medium"
        class="rounded shadow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePhotosStore } from "../stores/usePhotosStore";
import { storeToRefs } from "pinia";

// Store setup
const query = ref("pessoa");
const photosStore = usePhotosStore();
const { photos, loading } = storeToRefs(photosStore);

// Função de busca
function searchPhotos() {
  photosStore.fetchPhotos(query.value);
}

// Busca inicial
searchPhotos();
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
