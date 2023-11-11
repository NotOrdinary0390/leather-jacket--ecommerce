<template>
  <h1 class="my-4 ml-4 text-sm">Shop</h1>
  <hr />
  <div class="container-app">
    <div class="w-fit mx-auto p-1">
      <div class="my-8 flex justify-center items-center w-[230px]">
        {{ useCategoryStore.categories }}
        <p
          v-for="category in useCategoryStore().categories"
          :key="category.id"
          class="select-section border-gray"
          :class="{
            'bg-black text-white': isSelectedCategory(category),
            'bg-gray-50 text-gray-400 border-gray-400': !isSelectedCategory(category),
          }"
          @click="showCategory(category.id)"
        >
          {{ category.name }}
        </p>
      </div>
    </div>
    <div v-if="useProductStore().loading" class="loader-container">
      <LoaderComponent />
    </div>
    <div v-else class="mx-auto">
      <div class="flex flex-wrap">
        <CardProducts
            v-for="variation in useProductStore().getVariations"
            :key="variation.id"
            :variation="variation"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from "@/stores/CategoryStore";
import { useProductStore } from "@/stores/ProductStore";

/*------------------------
Define reactive variables
-------------------------*/
const selectedCategoryId = ref(null);

/* --------------- 
  Define functions 
  -----------------*/
const showCategory = (id) => {
  selectedCategoryId.value = id;
  useProductStore().loadProducts(selectedCategoryId.value)
};

const isSelectedCategory = (category) => {
  return selectedCategoryId.value === category.id;
};

onMounted(() => {
  useCategoryStore().loadCategories().then(() => {
    const firstCategoryId = useCategoryStore().categories[0].id;
    showCategory(firstCategoryId);
  });
});


useHead({
  title: "Shop - Alessandra Grimoldi",
  meta: [
    {
      name: "Shop - Alessandra Grimoldi",
      content: "Shop Luxury Leather Jacket - Alessandra Grimoldi",
    },
  ],
});
</script>

<style scoped></style>
