<template>
  <div class="container-app font-primary">
    <div v-if="product">
      <div class="min-[750px]:block hidden">
        <ProductDesktopSingleProductComponent :product="product" />
      </div>
      <div class="block min-[750px]:hidden">
        <ProductMobileSingleProductComponent :product="product" />
      </div>
    </div>

    <div v-else class="loader-container">
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
const slug = ref(null);

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
    //console.log(slug.value);
    if (slug.value) {
      productStore.loadSingleProduct(slug.value).then((response) => {
        product.value = productStore.product;
        console.log(product.value);
      });
    }
  }
);
</script>
<style scoped>
.box-25 {
  width: 25%;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
