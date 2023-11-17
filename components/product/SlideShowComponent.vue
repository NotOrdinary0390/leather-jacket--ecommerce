<template>
  <div class="mx-auto min-[750px]:mx-3 w-full md:w-[45%] overflow-hidden">
    <div class="glide relative w-full">
      <!-- Slider buttons start -->
      <div
        v-if="useProductStore().currentVariation.images.length > 1"
        class="glide__arrows flex justify-between"
        data-glide-el="controls"
      >
        <button
          class="glide__arrow glide__arrow--left"
          data-glide-dir="<"
        >
          prev
        </button>
        <button
          class="glide__arrow glide__arrow--right"
          data-glide-dir=">"
        >
          next
        </button>
      </div>
      <!-- Slider buttons end -->

      <!-- Main slider start -->
      <div
        class="glide__track w-full"
        data-glide-el="track"
      >
        <ul class="glide__slides w-full">
          <li
            v-for="image in useProductStore().currentVariation.images"
            :key="image.id"
            class="glide__slide w-full"
          >
            <nuxt-img
              :src="useRuntimeConfig().public.MEDIA_URL + image.image"
              :alt="image.image_meta"
              class="mx-auto w-full min-[900px]:min-h-[600px] object-contain"
            />
          </li>
        </ul>
      </div>
      <!-- Main slider end -->
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/ProductStore";

// Automatically start sliding images on component mount
let mountSlider = null;

onMounted(() => {
  if (process.client) {
    if (useProductStore().currentVariation.images.length > 1) {
      mountSlider = new window.Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        autoplay: 5000
      }).mount();
    }
  }
});

watch(() => useProductStore().currentVariation, () => {
  if (process.client) {
    if (useProductStore().currentVariation.images.length > 1) {
      mountSlider.destroy();
      setTimeout(() => {
        mountSlider = new window.Glide('.glide', {
          type: 'carousel',
          startAt: 0,
          autoplay: 5000
        }).mount();
      }, 200);
    }
  }
});

</script>

<style scoped>

img {
  object-fit: cover;
}

</style>
