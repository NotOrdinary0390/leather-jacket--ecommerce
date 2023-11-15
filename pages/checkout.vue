<template>
  <div class="container-app">
    <div class="mt-8 flex justify-between">
      <p class="font-wheightbold text-sm">
        ORDER SUMMARY
      </p>

      <p>TOTAL</p>
    </div>
    <div class="border border-black mt-2 mb-3" />
    
    <OrderSummaryComponent
      v-for="item in useCartStore().cartItems"
      :key="item.id"
      :item="item"
    /> 

    <hr>
    <div class="flex justify-between">
      <div class="w-1/2" />
      <div class="w-[230px]">
        <div class="my-3 flex justify-between">
          <p>ITEMS TOTAL:</p>
          <p class="text-lg">
            € {{ useCartStore().cartTotal }}
          </p>
        </div>
      </div>
    </div>

    <ShippingComponent class="mt-16" />

    <PaymentComponent />
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/CartStore";

// Define Store
const cartStore = useCartStore();

useHead({
  title: "Checkout - Alessandra Grimoldi",
  meta: [
    {
      name: "Checkout - Alessandra Grimoldi",
      content: "Shop Luxury Leather Jacket - Alessandra Grimoldi",
    },
  ],
});

onMounted(() => {
  cartStore.loadCartItems();
});

</script>

<style scoped></style>
