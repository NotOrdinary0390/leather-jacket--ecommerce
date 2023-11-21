<template>
  <div>
    <div class="text-center my-20">
      <p class="text-[8pt]">AUGUST 24, 2023</p>
      <h1 class="text-lg my-1">Fall / Winter 2023 Lookbook</h1>
    </div>
    <div v-if="collectionsStore.loading" class="loader-container">
      <LoaderComponent />
    </div>
    <div v-else class="flex flex-wrap justify-center">
      <div
        v-for="stock in collectionsStore.getVariations(
          collectionsStore.latestCollection
        )"
        :key="stock.id"
        class="product-collection"
      >
        <!-- {{ stock.id }} -->
        <nuxt-img
          v-if="stock.images && stock.images.length > 0"
          :src="useRuntimeConfig().public.MEDIA_URL + stock.images[0].image"
          class="img-product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCollectionStore } from "@/stores/CollectionStore";
import { onMounted } from "vue";

const collectionsStore = useCollectionStore();

onMounted(() => {
  useCollectionStore().loadLatestCollection();
});

useHead({
  title: "Lookbook - Alessandra Grimoldi: Explore Our Luxury Leather Jackets",
  meta: [
    {
      name: "description",
      content:
        "Browse through Alessandra Grimoldi's Lookbook and discover a curated collection of luxury leather jackets. Elevate your style with our handcrafted, high-quality designs that blend timeless elegance and modern fashion trends.",
    },
    {
      name: "keywords",
      content:
        "Lookbook, Alessandra Grimoldi, Leather Jackets, Luxury Fashion, High-Quality Leatherwear, Designer Apparel, Fashion Trends",
    },
  ],
});
</script>

<style scoped>
.product-collection {
  flex: 0 0 33.3%;
  box-sizing: border-box;
  padding: 3.2px;
  margin: 0;
  /* border: 1px solid red; */
}

.img-product {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16/20;
  /* border: 1px solid red; */
}
</style>
