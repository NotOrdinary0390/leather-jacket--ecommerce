<template>
  <div class="my-5 ">
    <button
      class="btn-cart"
      @click="addToCart"
    >
      ADD TO CART  
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/CartStore';

const addToCart = () => {
    useCartStore().AddToCart();
}
</script>

<style scoped>
.btn-cart {
    background-color: #000;
    height: 4rem;
    width: 99.7%;
    color: #fff;
    font-size: 8pt;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s, color 0.5s;
}

.btn-cart:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
}

</style>
