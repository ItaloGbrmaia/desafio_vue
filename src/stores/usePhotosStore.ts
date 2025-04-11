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

  async function fetchPhotos(query: string, page = 1) {
    try {
      loading.value = true;

      photos.value = await pexelsRepository.search(query, page);
      console.log("Store data");
      console.log(photos.value);
    } finally {
      loading.value = false;
    }
  }

  return {
    photos,
    loading,
    fetchPhotos,
  };
});
