<template>
  <div
    class="aspect-[3/2] overflow-hidden rounded-[10px] transition-transform duration-300 hover:scale-108"
  >
    <img
      :src="photo.src.medium"
      :alt="photo.photographer"
      class="w-full h-full object-cover"
      v-lazy
    />
  </div>
</template>

<script setup lang="ts">
import type { Photo } from "../models/data_models";

defineProps<{
  photo: Photo;
}>();
</script>
