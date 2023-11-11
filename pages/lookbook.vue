<template>
  <!-- <div class="my-4 ml-4 text-sm">Lookbook</div>
  <hr /> -->
  <div class="text-center my-20">
    <p class="text-[8pt]">AUGUST 24, 2023</p>
    <h1 class="text-lg my-1">Fall / Winter 2023 Lookbook</h1>
  </div>
  <div v-if="collectionsStore.loading" class="loader-container">
    <LoaderComponent />
  </div>
  <div v-else>
    <div
      v-for="product in collectionsStore.latestCollection.products"
      :key="product.id"
      class="section-collection"
    >
      <div v-for="stock in product.stocks" class="product-collection">
        <!-- {{ stock }} -->
        <nuxt-img
        v-if="stock.images && stock.images.length > 0"
          :src="useRuntimeConfig().public.MEDIA_URL + stock.images[0].image"
          class="img-product"
        ></nuxt-img>
        <!-- <p>{{ product.name }}</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCollectionStore } from "@/stores/CollectionStore";

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
.section-collection {
  /* border: 1px solid green; */
  display: flex;
}
.product-collection {
  width: 35%;
  overflow: hidden;
  margin: 8px;
}
.img-product {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16/20;
  /* border: 1px solid red; */
}
</style>
