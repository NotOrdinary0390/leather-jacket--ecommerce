<template>
  <div>
    <div class="text-center my-20">
      <p class="text-[8pt]">AUGUST 24, 2023</p>
      <h1 class="text-lg my-1">Fall / Winter 2023 Lookbook</h1>
    </div>
    <div v-if="collectionsStore.loading" class="loader-container">
      <LoaderComponent />
    </div>
    <div
      v-else
      class="flex flex-wrap justify-center"
    >
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
  title: "Lookbook - Alessandra Grimoldi",
  meta: [
    {
      name: "Lookbook - Alessandra Grimoldi",
      content: "Lookbook Luxury Leather Jacket - Alessandra Grimoldi",
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
