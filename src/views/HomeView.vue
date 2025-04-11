<template>
  <div class="p-4 max-w-6xl mx-auto">
    <div class="flex gap-2 mb-4">
      <input
        v-model="query"
        @keyup.enter="searchPhotos"
        placeholder="Buscar imagens"
        class="flex-1 border border-gray-300 px-4 py-2 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-gray-200"
      />
      <button
        @click="searchPhotos"
        class="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
      >
        Buscar
      </button>
    </div>

    <div
      v-if="loading && photos.length === 0"
      class="text-gray-500 text-center my-6"
    >
      Carregando...
    </div>

    <div
      v-if="showAlert && error"
      class="bg-red-100 text-red-800 border border-red-300 rounded-lg px-4 py-3 mb-4 relative"
      role="alert"
    >
      <strong class="font-semibold">Erro:</strong> {{ error }}
      <button
        @click="showAlert = false"
        class="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg font-bold"
        aria-label="Fechar"
      >
        &times;
      </button>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo" />
    </div>

    <div
      v-if="loading && photos.length > 0"
      class="text-center mt-4 text-sky-800"
    >
      Carregando mais...
    </div>

    <div ref="sentinel" class="h-10"></div>

    <div
      v-if="!hasMore && photos.length > 0"
      class="text-center text-gray-400 mt-6"
    >
      Sem mais resultados
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { usePhotosStore } from "../stores/usePhotosStore";
import { storeToRefs } from "pinia";
import { useIntersectionObserver } from "@vueuse/core";
import { debouncedRef } from "@vueuse/core";
import PhotoCard from "../components/PhotosCard.vue";

const photosStore = usePhotosStore();
const { photos, loading, hasMore, error } = storeToRefs(photosStore);

const query = ref("Natureza");
const debouncedQuery = debouncedRef(query, 300);

watch(debouncedQuery, (value) => {
  if (value.trim() !== "") {
    photosStore.fetchPhotos(value);
  }
});

function searchPhotos() {
  const term = query.value.trim();

  if (term === "") {
    alert("Insira um texto para buscar.");
    return;
  }

  photosStore.fetchPhotos(term);
}

onMounted(() => {
  searchPhotos();
});

const sentinel = ref(null);
useIntersectionObserver(sentinel, ([{ isIntersecting }]) => {
  if (isIntersecting && !loading.value && hasMore.value) {
    photosStore.loadMorePhotos();
  }
});

const showAlert = ref(false);

watch(error, (val) => {
  if (val) {
    showAlert.value = true;
    hasMore.value = false;
  }
});
</script>
