<template>

  <div class="flex justify-between items-center">
    <!-- single product cart div -->
    <div class="flex my-5">
      <img
        :src="
          useRuntimeConfig().public.MEDIA_URL +
          props.item.stock?.images[0].image
        "
        :alt="props.item.stock?.images[0].image_meta"
        class="w-[100px] h-[100px] object-cover"
      />
      <!-- products cart div & info -->
      <div class="ml-3">
        <p>{{ props.item.stock.product.name }}</p>
        <p class="text-sm text-gray-400">
          {{ props.item.stock.color_name }} / {{ props.item.size.size }}
        </p>
        <p class="text-[10pt]">Qty : {{ props.item.quantity }}</p>
        <p class="text-[10pt]">Price : € {{ props.item.price }}</p>
      </div>
    </div>

    <div class="">
      <p class="text-lg max-[550px]:text-sm">
        € {{ calcTotalPrice(props.item.price, props.item.quantity) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

/*------------------------
    Define props
    -------------------------*/
const props = defineProps(["item"]);

/* --------------- 
    Define functions 
    -----------------*/
function calcTotalPrice(price, qty) {
  return price * qty;
}
</script>

<style scoped></style>
