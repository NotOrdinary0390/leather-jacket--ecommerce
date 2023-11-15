<template>
  <div class="mb-3">
    <p class="font-extrabold text-[7pt]">
      SELECT COLOR
    </p>
    <div>
      <div
        v-if="stocks.length > 0"
        class="flex mt-2"
      >
        <div
          v-for="variation in stocks"
          :key="variation.id"
          class="box-color mr-3"
          :class="{ 'selected-variant': isSelected(variation) }"
          :style="`background-color: ${variation.color_code}`"
          @click="selectColor(variation)"
        />
      </div>
      <div
        v-else
        class="no-color-variant"
      />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/ProductStore";
import { useCartStore } from "~/stores/CartStore";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const stocks = props.product.stocks;

// Select first variant
onMounted(() => {
  if (stocks.length > 0) {
    useProductStore().setColorVariant(stocks[0]);
  }
});

function selectColor(variation) {
  useProductStore().setColorVariant(variation)
}

function isSelected(variation) {
  return useCartStore().cartItem.stock_id === variation.id;
}
</script>

<style scoped>
.box-color {
  width: 32px;
  height: 32px;
  border: 1px solid #c4c4c4;
  cursor: pointer;
}
.selected-variant {
  transition: all 0.6s;
  border: 1px solid black;
  width: 35px;
  height: 35px;
}
.box-color:hover {
  border: 1px solid #000;
}
.no-color-variant {
  width: 32px;
  height: 32px;
  border: 1px solid #c4c4c4;
  position: relative;
}

.no-color-variant::after {
  content: "X";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
