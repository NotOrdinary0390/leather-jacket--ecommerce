<template>
  <div>
    <!-- <div v-if="useUserStore().loading" class="loader-container">
      <LoaderComponent />
    </div> -->
    <!-- <div v-else> -->
      <div v-if="useUserStore().orders.length > 0">
        <div
          v-for="order in useUserStore().orders"
          :key="order.id"
          class="order-item"
        >
          {{ order }}
        </div>
      </div>
      <div v-else>
        <hr class="my-5">
        You have not placed any orders<br />
        Continue browsing
        <nuxtLink to="shop" class="text-gray-400 underline">here</nuxtLink>
        <hr class="my-5">
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";

const orders = ref("");

//function
function loadOrders() {
  useUserStore().loadOrderUser();
}

// onMounted(() => {
//     loadOrders();
// }),
</script>

<style scoped></style>
