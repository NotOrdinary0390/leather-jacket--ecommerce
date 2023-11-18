<template>
  <form class="search-form" @submit.prevent="searchProducts">
    <div class="input-container">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="SEARCH FOR"
        class="input-search-nav"
      />
      <label for="searchIcon" class="search-icon">
        <span id="searchIcon" class="material-symbols-outlined">search</span>
      </label>
    </div>
    <button type="submit" class="hidden">Search</button>
  </form>
</template>

<script setup>
import { useProductStore } from "@/stores/ProductStore";
import { useRouter } from "vue-router";

const searchTerm = ref("");
const router = useRouter();

function searchProducts() {
  useProductStore()
    .loadSearchProducts(searchTerm.value)
    .then(() => {
      router.push('/search-products');
    });
}
</script>

<style scoped>
.search-form {
  display: flex;
  align-items: center;
}

.input-container {
  position: relative;
  width: 95%;
}

.input-search-nav {
  background-color: transparent;
  border-bottom: 1px solid #fff;
  width: 100%;
  padding: 0.5em 0;
  outline: 0;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
