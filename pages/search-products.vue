<template>
  <div>
    <div class="my-4 ml-4 text-sm">
      Products : {{ useProductStore().searchTerm }}
    </div>
    <hr>
    <div class="container-app">
      <div
        v-if="useProductStore().loading"
        class="loader-container"
      >
        <LoaderComponent />
      </div>
      <div
        v-else
        class="font-primary"
      >
        <div class="flex flex-wrap">
          <CardProducts
            v-for="variation in products.map((product) => product.stocks).flat()"
            :key="variation.id"
            :variation="variation"
            :slug="variation.product.slug"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/ProductStore";

const products = ref([]);

watchEffect(async () => {
    products.value = useProductStore().products;
});

useHead({
  title: "Leather Jacket - Alessandra Grimoldi",
  meta: [
    {
      name: "Leather Jacket - Alessandra Grimoldi",
      content: "Leather Jacket Luxury - Alessandra Grimoldi",
    },
  ],
});
</script>
