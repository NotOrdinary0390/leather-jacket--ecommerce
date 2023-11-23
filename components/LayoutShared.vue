<template>
  <div />
</template>

<script setup>

import { useUserStore } from "@/stores/UserStore";
import { useCartStore } from "@/stores/CartStore";
import md5 from "blueimp-md5";
import axios from "axios";

// Initialize environment variables
const runtimeConfig = useRuntimeConfig();

// Define stores
const userStore = useUserStore();
const cartStore = useCartStore();

const handleUserHash = () => {
  // Create user Hash temporary
  const hash = md5(new Date() + Math.random() * 1000000000);
  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const date = new Date();

  // Cookies Handler
  if (!useCookie("userHash").value) {
    const data = {
      user_hash: hash,
      expire_date: date.addDays(6),
    };
    axios
        .post(runtimeConfig.public.APP_URL + "/proxy/hash/store", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          const userHash = useCookie("userHash", { expires: date.addDays(5) });
          userHash.value = hash;
        });
  }
};

onMounted( async () => { 

  // Cookie Bot
  const cookieScript = document.createElement('script');
  cookieScript.setAttribute('src', 'https://consent.cookiebot.com/uc.js?cbid=fc7baf94-ca54-4f47-8262-cfed979af6a5');
  cookieScript.setAttribute('defer', 'true');
  cookieScript.setAttribute('async', 'true');

  document.head.appendChild(cookieScript);

  // Create user Hash temporary
  handleUserHash();

  // Get user data if exists
  await userStore.getUser().then(() => {
    cartStore.loadCartItems();
  });

});

</script>

<style></style>
