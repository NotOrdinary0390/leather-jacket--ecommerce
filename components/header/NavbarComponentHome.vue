<template>
  <div class="header-container flex justify-between items-center">
    <span
      class="material-symbols-outlined text-white max-[500px]:text-[19pt] text-4xl cursor-pointer"
      @click="toggleMenu"
    >
      {{ isMenuVisible ? "close" : "menu" }}
    </span>
    <!-- Menu -->
    <nav ref="menu" class="menu" :class="{ visible: isMenuVisible }">
      <div class="text-end">
        <span
          class="material-symbols-outlined text-white text-2xl cursor-pointer"
          @click="toggleMenu"
        >
          close
        </span>
      </div>
      <div class="ml-4 mt-4 px-1">
        <ul>
          <li class="my-6">
            <nuxtLink to="shop">SHOP</nuxtLink>
          </li>
          <li class="my-5">
            <nuxtLink to="collections">COLLECTIONS</nuxtLink>
          </li>
          <li class="my-6">
            <nuxtLink to="lookbook">FW23 LOOKBOOK</nuxtLink>
          </li>
          <li class="my-6">
            <nuxtLink to="news">NEWS</nuxtLink>
          </li>
          <li class="my-6">
            <nuxtLink to="about">ABOUT</nuxtLink>
          </li>
          <li class="my-6">
            <nuxtLink to="stores">STORES</nuxtLink>
          </li>
          <li class="my-6">
            <nuxtLink to="celebrities">CELEBRITIES</nuxtLink>
          </li>
          <li class="my-6 flex items-center">
            <nuxtLink to="/account" @click="toggleMenu">ACCOUNT</nuxtLink>
            <div v-if="useUserStore().isLoggedIn" class="logged-in"></div>
          </li>
          <li class="my-12">
            <SearchComponent />
          </li>
          <!--  -------------------------------------------------------   -->
          <li class="mt-14 text-xs">
            <nuxtLink to="/client-service" @click="toggleMenu"
              >Client Service</nuxtLink
            >
          </li>
          <li class="my-3 text-xs">
            <nuxtLink to="/contact-us" @click="toggleMenu">Contact Us</nuxtLink>
          </li>
          <li class="my-3 text-xs">
            <nuxtLink to="/privacy-policy" @click="toggleMenu"
              >Privacy Policy</nuxtLink
            >
          </li>
          <li class="my-3 text-xs">
            <nuxtLink to="https://www.instagram.com/alegrimoldi/"
              >Instagram</nuxtLink
            >
          </li>
        </ul>
        <p class="mt-28 text-xs">
          info@alessandragrimoldi.com | Phone +39 351 7116761
        </p>
        <p class="text-xs">
          Returns address: Via Tiziano 21 - 20145 - Milano | VAT 03542920123
        </p>
        <p class="mt-2 text-sm">
          © 2023 Alessandra Grimoldi All Rights Reserved
        </p>
      </div>
    </nav>

    <nuxt-link
      to="/"
      class="w-[245px] max-[500px]:w-[225px] max-[410px]:w-[205px]"
    >
      <img src="/images/logo.png" alt="AlessandraGrimoldi.com Logo" width="887" height="194" />
    </nuxt-link>

    <Nuxt-link to="/cart">
      <div class="mr-2 max-[500px]:mr-1 max-[350px]:mr-0">
        <p class="number-items-cart" v-if="useCartStore().cartItems.length > 0">
          {{ cartLength }}
        </p>
        <span
          class="material-symbols-outlined text-white max-[500px]:text-[19pt] text-3xl cursor-pointer"
        >
          shopping_cart
        </span>
      </div>
    </Nuxt-link>
  </div>
</template>
<script setup>
import { ref } from "vue";

/*------------------------
Define reactive variables
-------------------------*/
const isMenuVisible = ref("");
const cartLength = ref(0);

/* --------------- 
Define functions 
-----------------*/
// Show menu
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

watchEffect(() => {
  //console.log(useCartStore().cartItems)
  cartLength.value = useCartStore().cartItems.length;
});
</script>

<style scoped>
.header-container {
  position: absolute;
  z-index: 10;
  height: 70px;
  width: 100%;
  background-color: #0505054d;
  padding: 0.5em;
  box-shadow: 0 5px 10px 0px #ffffff5e;
}

.number-items-cart {
  position: absolute;
  right: 40px;
  top: 12px;
  background-color: #131313;
  color: #fffdfd;
  font-size: 8pt;
  font-weight: 900;
  border: 1px solid #131313;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 500px) {
  .header-container {
    padding: 1em;
  }
  .number-items-cart {
    right: 57px;
    top: 10px;
  }
}
</style>
