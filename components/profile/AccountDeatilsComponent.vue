<template>
  Account Details
  <div class="font-primary text-sm"> 
    <p class="mt-5">
      <span class="font-extrabold">Email</span> :
      {{ useUserStore().authUser.email }}
    </p>
    <p class="mt-5">
      <span class="font-extrabold">First Name : </span>{{ useUserStore().authUser.first_name }}
    </p>
    <p class="mt-5">
      <span class="font-extrabold">Last Name: </span>{{ useUserStore().authUser.last_name }}
    </p>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
</script>

<style scoped></style>
