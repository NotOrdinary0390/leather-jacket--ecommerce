<template>
  <div class="container-app">
    <div class="flex">
      <nuxt-link to="/collections">
        collections >
      </nuxt-link>
      <h1 class="font-weight-bold mb-5 text-lg">
        {{ useCollectionStore().collection.name }}
      </h1>
    </div>
    <div class="flex flex-wrap">
      <CardProducts
        v-for="variation in useCollectionStore().currentCollectionStocks"
        :key="variation.id"
        :variation="variation" 
      />
    </div>
  </div>
</template>

<script setup>
import { useCollectionStore } from "@/stores/CollectionStore";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  const collectionSlug = route.params.slug;
  useCollectionStore().getCollectionBySlug(collectionSlug);
});
</script>

<style scoped>

.font-weight-bold {
  font-weight: bold;
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}
</style>
