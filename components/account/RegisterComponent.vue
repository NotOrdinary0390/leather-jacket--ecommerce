<template>
  <div class="mx-4 max-[340px]:mx-1">
    <p class="text-sm tracking-wider mb-3 ml-4">
      Create Account
    </p>

    <form @submit.prevent="handleRegister">
      <div class="form-container font-primary">
        <label 
          class="text-xs tracking-wider mb-2" 
          for="email"
        >
          Email
        </label>
        <input 
          id="email"
          v-model="registrationData.email"
          type="email"
          class="input-form"
        >
        <strong class="text-red-500 text-xs">{{
          useUserStore().emailError
        }}</strong>
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="password"
        >Password</label>
        <input
          v-model="registrationData.password"
          type="password"
          class="input-form"
        >
        <strong class="text-red-500 text-xs">{{
          useUserStore().passwordError
        }}</strong>
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="password"
        >Confirm Password</label>
        <input
          v-model="registrationData.password_confirmation"
          type="password"
          class="input-form"
        >
        <strong class="text-red-500 text-xs">{{
          useUserStore().confirmPasswordError
        }}</strong>
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="password"
        >First Name</label>
        <input
          v-model="registrationData.first_name"
          type="text"
          class="input-form"
        >
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="password"
        >Last Name</label>
        <input
          v-model="registrationData.last_name"
          type="text"
          class="input-form"
        >
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="password"
        >Phone</label>
        <input
          v-model="registrationData.phone"
          type="text"
          class="input-form"
        >
        <button
          type="submit"
          class="btn-form"
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/UserStore";
import notie from "notie";

// Refs
const registrationData = reactive({
  email: "",
  password: "",
  password_confirmation: "",
  first_name: "",
  last_name: "",
  phone: "",
});

//function
function handleRegister() {
  useUserStore()
    .registerUser(registrationData)
    .then(() => {
      if (
        useUserStore().registerMessage &&
        useUserStore().registerMessage.includes("failed")
      ) {
        notie.alert({
          type: "error",
          text: useUserStore().registerMessage,
          time: 5,
        });
      } else {
        notie.alert({
          type: "success",
          text: useUserStore().registerMessage,
          time: 5,
        });

        // Reset
        registrationData.email = "";
        registrationData.password = "";
        registrationData.password_confirmation = "";
        registrationData.first_name = "";
        registrationData.last_name = "";
        registrationData.phone = "";
      }
    })
    .catch(() => {
      notie.alert({
        type: "error",
        text: useUserStore().registerMessage,
        time: 5,
      });
    });
}
</script>

<style scoped></style>
