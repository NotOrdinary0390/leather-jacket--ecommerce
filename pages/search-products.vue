<template>
  <div>
    <div class="my-4 ml-4 text-sm">
      Products : {{ useSearchStore().searchTerm }}
    </div>
    <hr>
    <div class="container-app">
      <div
        v-if="searchStore.loading"
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
import { useSearchStore } from "@/stores/SearchStore";
import { onMounted, ref } from "vue";

const searchStore = useSearchStore();
const products = ref([]);

onMounted(async () => {
  try {
    await searchStore.searchNavProducts("");
    products.value = searchStore.products;
    console.log(products.value)
  } catch (error) {
    console.error(error);
  }
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
