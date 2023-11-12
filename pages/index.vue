<template>
  <nuxtLink to="shop" class="text-gray-400 underline">
    <div class="hidden-link"></div>
  </nuxtLink>
  <div class="home-container">
    <h1 class="text-home">
      <span class="text-xl tracking-wider">High-Quality Garments</span><br> All items are handcrafted in genuine Italian leather with premium accessories and finishes that make each jacket exclusive and one-of-a-kind.
    </h1>
  </div>
</template>


<script setup>
useHead({
  title: "Alessandra Grimoldi - Luxury Leather Fashion Brand",
  meta: [
    {
      name: "description",
      content: "Explore Alessandra Grimoldi's luxury fashion collection. Discover high-quality, handcrafted leather jackets that blend timeless elegance with modern style."
    },
    {
      name: "keywords",
      content: "Alessandra Grimoldi, Luxury Fashion, Leather Jackets, High-Quality Leatherwear, Designer Jackets, Handcrafted Fashion, Elegant Leather Apparel"
    },
  ],
});

definePageMeta({
  layout: "background",
});
</script>

<style scoped>

.home-container {
  backdrop-filter: blur(px);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  position: absolute;
  z-index: 1;
  bottom: 32px;
  right: 10%;
  left: 10%;
  color: #fff;
  text-align: justify;
}

.hidden-link {
  /* border: 1px solid white; */
  display: none;
  width: 100%;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, 0%);
}

.text-home {
  text-align: center;
  font-size: 10.4pt;
  font-weight: 900;
}

</style>
