import { defineStore } from "pinia";
import { PexelsRepository } from "../repositories/PexelsRepository";
import { AxiosHttpClient } from "../services/https/AxiosHttpClient";
import { ref } from "vue";
import type { Photo } from "../models/data_models";

const httpClient = new AxiosHttpClient();
const pexelsRepository = new PexelsRepository(httpClient);

export const usePhotosStore = defineStore("photos", () => {
  const photos = ref<Photo[]>([]);
  const loading = ref(false);
  const query = ref("");

  const currentPage = ref(1);
  const hasMore = ref(true);
  const error = ref<string | null>(null);

  async function fetchPhotos(newQuery: string, page = 1) {
    loading.value = true;
    error.value = null;

    query.value = newQuery;
    currentPage.value = 1;

    try {
      const result = await pexelsRepository.search(newQuery, page);
      photos.value = result;
      hasMore.value = result.length > 0;

      if (result.length === 0) {
        error.value = "Nenhuma imagem encontrada para esse termo.";
      }
    } catch (err: any) {
      error.value = `${err} - Erro inesperado ao buscar imagens.`;

      photos.value = [];
      hasMore.value = false;
    } finally {
      loading.value = false;
    }
  }

  async function loadMorePhotos() {
    if (loading.value || !hasMore.value) return;

    loading.value = true;
    error.value = null;
    try {
      const nextPage = currentPage.value + 1;
      const result = await pexelsRepository.search(query.value, nextPage);
      photos.value.push(...result);
      currentPage.value = nextPage;
      hasMore.value = result.length > 0;
    } catch (err: any) {
      error.value = `${err} - Erro inesperado ao buscar mais imagens.`;
    } finally {
      loading.value = false;
    }
  }

  return {
    photos,
    loading,
    fetchPhotos,
    loadMorePhotos,
    hasMore,
    error,
  };
});
