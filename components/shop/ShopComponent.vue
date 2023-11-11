<template>
  <div class="flex flex-wrap">
    <ShopCardProducts
      v-for="variation in productStore.getVaritions"
      :key="variation.id"
      :variation="variation"
    />
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/ProductStore";

// Define Store
const productStore = useProductStore();
</script>

<style scoped></style>
