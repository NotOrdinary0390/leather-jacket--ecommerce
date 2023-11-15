<template>
  <div class="mx-4 max-[340px]:mx-1">
    <p class="text-sm tracking-wider mb-3 ml-4">
      My Account
    </p> 

    <form @submit.prevent="handleLogin">
      <div class="form-container font-primary">
        <label
          class="text-xs tracking-wider mb-2"
          for="email"
        >Email</label>
        <input
          v-model="loginData.email"
          type="email"
          class="input-form"
        >
        <strong class="text-red-500 text-xs">{{
          useUserStore().emailLoginError
        }}</strong>
        <div class="flex justify-between">
          <label
            class="text-xs tracking-wider mt-6 mb-2"
            for="password"
          >Password</label>
          <p
            class="text-[8pt] text-gray-400 cursor-pointer mt-6 mb-2"
            @click="showRecoveryPassword"
          >
            Forgot Password?
          </p>
        </div>
        <input
          v-model="loginData.password"
          type="password"
          class="input-form"
        >
        <strong class="text-red-500 text-xs">{{
          useUserStore().passwordLoginError
        }}</strong>
        <button
          type="submit"
          class="btn-form"
        >
          SIGN IN
        </button>
      </div>
    </form>
    <form @submit.prevent="handleResetPassword()">
      <div
        v-if="showRecovery"
        class="form-container"
      >
        <p class="text-sm tracking-wider mb-3">
          Retrieve Password
        </p>
        <label
          class="text-xs tracking-wider mb-2 font-primary"
          for="email"
        >Email</label>
        <input
          v-model="resetEmail"
          type="email"
          class="input-form font-primary"
        >
        <strong class="text-red-500 text-xs font-primary">{{
          useUserStore().resetMessage
        }}</strong>
        <button
          type="submit"
          class="btn-form font-primary"
        >
          RESET PASSWORD
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const router = useRouter();

// Ref
const showRecovery = ref(false);
const resetEmail = ref("");

const loginData = reactive({
  email: "",
  password: "",
});

/* --------------- 
  Define functions 
  -----------------*/
const handleLogin = () => {
  //console.log(email.value);
  useUserStore().loginUser(loginData)
  .then(() => {
    if (useUserStore().isLoggedIn === true) {
      router.push( { path: "profile" });
    }  
  });

  // Reset
  // loginData.email = "";
  // loginData.password = "";
};

const showRecoveryPassword = () => {
  showRecovery.value = !showRecovery.value;
};

const handleResetPassword = () => {
  //console.log(resetEmail);
  useUserStore().sendPasswordReset(resetEmail.value);
};
</script>

<style scoped></style>
