<template>
  <div class="my-4 ml-4 text-sm">Account</div>
  <hr />
  <div class="body-account">
    <div class="container-app max-[340px]:p-0">
      <div class="w-fit my-8 p-1 mx-auto bg-white border border-gray-300">
        <div
          class="mb-8 flex justify-center items-center w-[300px] min-[380px]:w-[360px] min-[410px]:w-[390px]"
        >
          <p
            class="select-section"
            :class="{
              'bg-black text-white': showLoginForm,
              'bg-gray-50 text-gray-400 border-gray-400': !showLoginForm,
            }"
            @click="showLogin"
          >
            SIGN IN
          </p>
          <p
            class="select-section"
            :class="{
              'bg-black text-white': showRegisterForm,
              'bg-gray-50 text-gray-400 border-gray-400': !showRegisterForm,
            }"
            @click="showRegister"
          >
            CREATE ACCOUNT
          </p>
        </div>
        <div v-if="showLoginForm">
          <SignInComponent />
        </div>
        <div v-if="showRegisterForm" class="">
          <RegisterComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

useHead({
  title: "Account - Alessandra Grimoldi",
  meta: [{ name: "", content: "" }],
});

/*------------------------
Define reactive variables
-------------------------*/
const showLoginForm = ref(true);
const showRegisterForm = ref(false);

/* --------------- 
  Define functions 
  -----------------*/
const showLogin = () => {
  showLoginForm.value = true;
  showRegisterForm.value = false;
};

const showRegister = () => {
  showLoginForm.value = false;
  showRegisterForm.value = true;
};
</script>

<style scoped>
.body-account {
  background-color: #f8f7f7;
  font-family: "Roboto", sans-serif;
}
</style>
