<template>
  <div class="home-bg h-[1000px] w-full">
    <NavbarComponentHome />
    <div>
      <main>
        <slot />
      </main>
    </div>
  </div>
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
    let date = new Date(this.valueOf());
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
      .then((response) => {
        const userHash = useCookie("userHash", { maxAge: 518400 });
        userHash.value = hash;
      })
      .catch((error) => {
        //
      });
  }
};

onMounted(async () => {
  // Create user Hash temporary
  handleUserHash();

  // Get user data if exists
  await userStore.getUser().then(() => {
    cartStore.loadCartItems();
  });
});
</script>
<style scoped>
.home-bg {
  background-image: url("/images/bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  font-family: "Gotham",serif;
}

.notie-container {
  z-index: 1000 !important;
}

/* Font import */

@font-face {
  font-family: "Gotham";
  src: local("Gotham"),
    url(../font/Gotham-Font/Gotham-Light.otf) format("opentype");
}

@font-face {
  font-family: "Gotham-medium";
  src: local("Gotham"),
    url(../font/Gotham-Font/GothamMedium.ttf) format("truetype");
}

@font-face {
  font-family: "Gotham-bold";
  src: local("Gotham"),
    url(../font/Gotham-Font/Gotham-Bold.otf) format("opentype");
}
</style>
