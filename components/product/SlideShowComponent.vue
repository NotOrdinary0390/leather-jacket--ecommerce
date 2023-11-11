<template>
  <div class="slideshow mx-auto min-[750px]:mx-3">
    <div class="flex justify-between">
      <button @click="prevSlide">Previous</button>
      <button @click="nextSlide">Next</button>
    </div>
    <img
      v-for="(image, index) in useProductStore().currentVariation.images"
      :key="image.id"
      :src="useRuntimeConfig().public.MEDIA_URL + image.image"
      :alt="image.image_meta"
      class="mx-auto"
      :class="{ active: index === currentIndex }"
      @mouseover="stopAutoSlide"
      @mouseleave="startAutoSlide"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useProductStore } from "~/stores/ProductStore";

// Initialize a ref to track the currently displayed image
const currentIndex = ref(0);

let intervalId = null;

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 5000); // Start automatic slide every 5 seconds
}

function stopAutoSlide() {
  clearInterval(intervalId); // Stop automatic slide
}

function prevSlide() {
  currentIndex.value =
    (currentIndex.value - 1 + useProductStore().currentVariation.images.length) %
    useProductStore().currentVariation.images.length; // Move to the previous slide
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % useProductStore().currentVariation.images.length; // Move to the next slide
}

onMounted(() => {
  currentIndex.value = 0; // Reset the index when the product changes
  startAutoSlide();
  // Listen for changes in the "product" prop
  console.log(useProductStore().currentVariation);
  // watch(
  //   () => props.product,
  //   (newProduct) => {
  //     product.value = newProduct;
  //     currentIndex.value = 0; // Reset the index when the product changes
  //     startAutoSlide(); // Automatically start sliding images
  //   }
  // );
});

// Automatically start sliding images on component mount
onMounted(startAutoSlide);
</script>

<style scoped>
.slideshow {
  height: 90%;
  width: 45%;
  overflow: hidden;
}

img {
  object-fit: cover;
}

.slideshow img {
  display: none;
}

.slideshow img.active {
  display: block;
}

@media screen and (max-width: 750px) {
  .slideshow {
    height: 90%;
    width: 95%;
    overflow: hidden;
  }
}
</style>
