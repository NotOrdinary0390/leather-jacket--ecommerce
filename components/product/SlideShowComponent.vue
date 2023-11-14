<template>
  <div class="slideshow mx-auto min-[750px]:mx-3">
    <div class="flex justify-between">
      <button @click="prevSlide">Previous</button>
      <button @click="nextSlide">Next</button>
    </div>
    <nuxt-img
      v-for="(image, index) in useProductStore().currentVariation.images"
      :key="image.id"
      :src="useRuntimeConfig().public.MEDIA_URL + image.image"
      :alt="image.image_meta"
      class="mx-auto w-full min-[900px]:min-h-[600px] object-fit"
      :class="[{ active: index === currentIndex }, imgClasses]"
      @mouseover="stopAutoSlide"
      @mouseleave="startAutoSlide"
      @load="handleImageFadeIn"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "~/stores/ProductStore";

// Initialize a ref to track the currently displayed image
const currentIndex = ref(0);

let intervalId = null;

const imgClasses = ref([]);

const handleImageFadeIn = () => {
  imgClasses.value = ["animate-fade-in"];
};

function stopAutoSlide() {
  clearInterval(intervalId); // Stop automatic slide
}

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 5000); // Start automatic slide every 5 seconds
}

function prevSlide() {
  stopAutoSlide()
  currentIndex.value =
    (currentIndex.value - 1 + useProductStore().currentVariation.images.length) %
    useProductStore().currentVariation.images.length; // Move to the previous slide
    startAutoSlide()
}

function nextSlide() {
  stopAutoSlide()
  currentIndex.value = (currentIndex.value + 1) % useProductStore().currentVariation.images.length; // Move to the next slide
  startAutoSlide()
}

// Automatically start sliding images on component mount
onMounted(startAutoSlide);

</script>

<style scoped>

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

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

@media screen and (max-width: 850px) {
  .slideshow {
    max-height: 650px;
    width: 70%;
    overflow: hidden;
  }
}

@media screen and (max-width: 630px) {
  .slideshow {
    max-height: 800px;
    width: 99%;
    overflow: hidden;
  }
}

</style>
