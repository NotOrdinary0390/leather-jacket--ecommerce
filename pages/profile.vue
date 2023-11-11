<template>
  <div class="bg-[#f8f7f7] min-h-[100vh] h-fit-contain">
    <div class="container-app">
      <div class="text-end text-xs cursor-pointer underline" @click="signOut">SIGN OUT</div>
      <p class="my-4 capitalize text-lg">
        Welcome {{ useUserStore().authUser.first_name }}
        <span class="waving-hand text-2xl ml-2">👋</span>
      </p>
      <div class="flex max-[750px]:flex-col justify-center items-center w-full">
        <p
          class="select-section border-gray"
          :class="{
            'bg-black text-white': showOrderSection,
            'bg-gray-50 text-gray-300 border-gray-600': !showOrderSection,
          }"
          @click="showSection('order')"
        >
          Order History
        </p>
        <p
          class="select-section border-gray"
          :class="{
            'bg-black text-white': showAdresseSection,
            'bg-gray-50 text-gray-300 border-gray-600': !showAdresseSection,
          }"
          @click="showSection('address')"
        >
          Manage Addresses
        </p>
        <p
          class="select-section border-gray"
          :class="{
            'bg-black text-white': showAccountDetailSection,
            'bg-gray-50 text-gray-300 border-gray-600':
              !showAccountDetailSection,
          }"
          @click="showSection('account')"
        >
          Account Details
        </p>
      </div>
      <div v-if="showOrderSection" class="mt-8">
        <ProfileOrderComponente />
      </div>
      <div v-if="showAdresseSection" class="mt-8">
        <ProfileAddressesComponent />
      </div>
      <div v-if="showAccountDetailSection" class="mt-8">
        <ProfileAccountDeatilsComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/UserStore";

/*------------------------
  Define reactive variables
  -------------------------*/
const showOrderSection = ref(true);
const showAdresseSection = ref(false);
const showAccountDetailSection = ref(false);

/*------------------------
  Define functions
  -------------------------*/
function signOut() {
  useUserStore().logoutUser();
}

const showSection = (section) => {
  switch (section) {
    case "order":
      showOrderSection.value = true;
      showAdresseSection.value = false;
      showAccountDetailSection.value = false;
      break;
    case "address":
      showOrderSection.value = false;
      showAdresseSection.value = true;
      showAccountDetailSection.value = false;
      break;
    case "account":
      showOrderSection.value = false;
      showAdresseSection.value = false;
      showAccountDetailSection.value = true;
      break;
  }
};

useHead({
  title: "My Profile - Alessandra Grimoldi",
  meta: [
    {
      name: "My Profile - Alessandra Grimoldi",
      content: "luxury leather jacket fashion",
    },
  ],
});
</script>

<style scoped>
@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(16deg);
  }
  20% {
    transform: rotate(-6deg);
  }
  30% {
    transform: rotate(16deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(16deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.waving-hand {
  animation: wave 2.1s 0.6s infinite;
  transform-origin: 75% 75%;
  display: inline-block;
  position: absolute;
  z-index: 0;
}
@media screen and (min-width: 750px) {
  .select-section {
    min-width: 250px;
  }
}

</style>
