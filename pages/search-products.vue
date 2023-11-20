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

const route = useRoute();

const products = ref([]);

onMounted(() => {
  useProductStore().loadSearchProducts(route.query.search)
      .then(() => {
        products.value = useProductStore().products;
      });
});

useHead({
  title: "Leather Jackets - Alessandra Grimoldi",
  meta: [
    {
      name: "description",
      content: "Discover the latest luxury leather jackets by Alessandra Grimoldi. Elevate your style with our exclusive collection of high-quality leather jackets.",
    },
    {
      name: "keywords",
      content: "leather jackets, luxury fashion, Alessandra Grimoldi, made in Italy",
    },
  ],
});
</script>
