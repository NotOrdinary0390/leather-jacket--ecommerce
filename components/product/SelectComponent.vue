<template>
  <p>Size Error: {{ isError }}</p>
  <div class="custom-select border-gray" :class="{ 'border-red': isError }">
    <div class="select-header" :class="{ 'error': cartStore.getSizeError }" @click="toggleOptions">
      <span class="text-xs w-2/3 py-2 px-2">{{
        selectedSize || "Select size"
      }}</span>
      <div class="w-[41px] py-2 border-l border-gray-400 flex justify-center">
        <span v-if="!isOpen" class="material-symbols-outlined">
          expand_more
        </span>
        <span v-else class="material-symbols-outlined"> expand_less </span>
      </div>
    </div>
    <ul class="options border-gray" v-show="isOpen" ref="selectSizes">
      <li
        v-for="size in productStore.currentVariation.sizes"
        :key="size"
        @click="selectSize(size.id, size.size)"
      >
      
        <p v-if="size.pivot.quantity === 0" class="">{{ size.size }} - Not available</p>
        <p v-else>{{ size.size }} </p>        
      </li>
    </ul>
  </div>
  <p>Size Error: {{ isError }}</p>
</template>

<script setup>
import { useProductStore } from "~/stores/ProductStore";
import { useCartStore } from "~/stores/CartStore";
import { onClickOutside } from "@vueuse/core";

const productStore = useProductStore();
const cartStore = useCartStore();

// Refs
const isOpen = ref(false);
const selectedSize = ref(null);
const selectSizes = ref(null);

const isError = computed(() => cartStore.getSizeError);

function toggleOptions(event) {
  event.stopPropagation();
  isOpen.value = !isOpen.value;
}

function selectSize(id, size) {
  productStore.selectSizeVariant(id, size);
  selectedSize.value = size;
  isOpen.value = false;
  //console.log(size)
}

onClickOutside(selectSizes, (e) => {
  isOpen.value = false;
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}
.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.options {
  position: absolute;
  z-index: 13;
  list-style-type: none;
  background-color: #fff;
  width: 100%;
  margin: 0;
  padding: 0;
}

.options li {
  padding: 10px;
  border-bottom: 1px solid #c4c4c4;
  font-size: 9pt;
  cursor: pointer;
}

.options li:hover {
  background-color: #f5f5f5;
}

.border-red {
  border:1px solid red;
}
.error {
  background-color: #f40808b9;
}
</style>
