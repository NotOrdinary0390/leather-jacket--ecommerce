<template>
  <div class="container-app font-primary">
    <div v-if="!productStore.loading">
      <div v-if="product">
        <div class="min-[750px]:block hidden">
          <DesktopSingleProductComponent :product="product" />
        </div>
        <div class="block min-[750px]:hidden">
          <MobileSingleProductComponent :product="product" />
        </div>
      </div>
    </div>

    <div
      v-if="productStore.loading"
      class="loader-container"
    >
      <LoaderComponent />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "~/stores/ProductStore";

// Define stores
const productStore = useProductStore();

// Initialize route
const route = useRoute();

// Define refs
const product = ref(null);
const slug = ref('');

useHead(() => {
  return {
    title: product.value ? product.value.name + ' - Alessandra Grimoldi' : 'Alessandra Grimoldi',
    meta: [
      {
        name: 'description',
        content: product.value ? product.value.description : '',
      },
    ],
  };
});

onMounted(() => {
  // Set product slug
  slug.value = route.params.slug;
});

watch(
  () => slug.value,
  () => {
    if (slug.value) {
      productStore.loadSingleProduct(slug.value).then(() => {
        product.value = productStore.product;
      });
    }
  }
);
</script>

<style scoped></style>
