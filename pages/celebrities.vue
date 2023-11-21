<template>
  <div>
    <h1 class="my-4 ml-4 text-sm">Celebrities</h1>
    <hr />
    <div class="flex flex-wrap justify-center">
      <CardCelebrities
        v-for="(celebrity, index) in celebrities"
        :key="index"
        :celebrity="celebrity"
      />
    </div>
  </div>
</template>

<script setup>
/* Celebreties */
const celebrities = ref([
  {
    image: "/images/celebrities/kandi.webp",
    alt: "kandi model fashion grimoldi",
    name: "Kandi",
  },
  {
    image: "/images/celebrities/lalovetheboss.webp",
    alt: "lalovetheboss model fashion grimoldi",
    name: "La Love The Bo$$",
  },
]);

useHead({
  title: "Celebreties - Alessandra Grimoldi",
  meta: [
    {
      name: "description",
      content:
        "Discover the celebrities wearing luxury leather jackets from Alessandra Grimoldi. Explore our celebrity fashion collection for a stylish wardrobe.",
    },
    {
      name: "keywords",
      content:
        "Alessandra Grimoldi, celebrities, fashion, luxury leather jackets, celebrity fashion collection",
    },
  ],
});
</script>

<style scoped></style>
