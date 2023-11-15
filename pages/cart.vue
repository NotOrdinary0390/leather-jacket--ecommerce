<template>
  <div>
    <div
      v-if="cartStore.loading"
      class="loader-container"
    >
      <LoaderComponent />
    </div>
    <div
      v-else
      class="container-app"
    >
      <h1 class="text-lg">
        My Cart ({{ cartStore.cartItems.length }})
      </h1>
      <div class="text-sm mt-4 text-gray-400 flex justify-between">
        <div><p>AVAILABLE NOW</p></div>
        <div class="flex w-[230px] justify-between max-[550px]:hidden">
          <p>QUANTITY</p>
          <p>PRICE</p>
          <p>TOTAL</p>
        </div>
      </div>
      <hr class="mt-3">

      <div v-if="useCartStore().cartItems.length > 0">
        <CartProductComponent
          v-for="item in useCartStore().cartItems"
          :key="item.id"
          :item="item"
        />
      </div>
      <div
        v-else
        class="my-6 text-sm"
      >
        Your cart is currently empty.<br>
        Continue browsing
        <nuxtLink
          to="shop"
          class="text-gray-400 underline"
        >
          here
        </nuxtLink>.
      </div>

      <hr>
      <div
        v-if="useCartStore().cartItems.length > 0"
        class="text-sm mt-4 flex justify-between"
      >
        <div class="w-[320px] max-[550px]:hidden" />
        <div class="w-[320px] max-[550px]:w-full">
          <div class="my-5 flex justify-between text-[10pt]">
            <p class="text-gray-400">
              SUBTOTAL (VAT INCLUDED):
            </p>
            <p>€ {{ useCartStore().cartTotal }}</p>
          </div>
          <hr>
          <NuxtLink to="checkout">
            <button class="btn-checkout">
              CHECK OUT
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/CartStore";

// Define Store
const cartStore = useCartStore();

useHead({
  title: "Your Shopping Cart - Alessandra Grimoldi",
  meta: [
    {
      name: "Your Shopping Cart - Alessandra Grimoldi",
      content: "Shop Luxury Leather Jacket - Alessandra Grimoldi",
    },
  ],
});
</script>

<style scoped>
.btn-checkout {
  background-color: #000;
  height: 4rem;
  width: 100%;
  color: #fff;
  font-size: 8pt;
  margin-top: 3em;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s;
}

.btn-checkout:hover {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
}
</style>
