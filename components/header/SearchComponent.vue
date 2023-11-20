<template>
  <form class="search-form">
    <div class="input-container">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="SEARCH FOR"
        class="input-search-nav"
      />
      <nuxt-link :to="'/search-products?search=' + searchTerm">
        <label for="searchIcon" class="search-icon">
          <span id="searchIcon" class="material-symbols-outlined">search</span>
        </label>
      </nuxt-link>
    </div>
  </form>
</template>

<script setup>
const searchTerm = ref("");
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
