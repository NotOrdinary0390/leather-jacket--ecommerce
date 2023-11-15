<template>
  <div
    class="font-primary max-w-[450px] mx-auto mt-12 border border-gray-300 bg-white py-3"
  >
    <p class="font-wheightbold ml-3 my-5">
      EDIT SHIPPING ADDRESS
    </p>

    <form
      class="font-primary text-sm w-full" 
      @submit.prevent="handleChangeAddressData"
    >
      <div class="form-container">
        <label
          for="email"
          class="text-xs tracking-wider mb-2"
        >Email</label>
        <input
          id="email"
          v-model="addressData.contact_email"
          type="text"
          class="input-form"
        >
      </div>
      <div class="min-[750px]:flex">
        <div class="form-container">
          <label
            for="firstName"
            class="text-xs tracking-wider mb-2"
          >First Name</label>
          <input
            id="firstName"
            v-model="addressData.shipping_first_name"
            type="text"
            class="input-form"
          >
        </div>
        <div class="form-container">
          <label
            for="lastName"
            class="text-xs tracking-wider mb-2"
          >Last Name</label>
          <input
            id="lastName"
            v-model="addressData.shipping_last_name"
            type="text"
            class="input-form"
          >
        </div>
      </div>
      <div class="form-container">
        <label
          for="country"
          class="text-xs tracking-wider mb-2"
        >Country</label>
        <select
          id="country"
          v-model="addressData.shipping_country_code"
          class="input-form"
        >
          <option
            v-for="country in useShippingStore().countries"
            :key="country.iso2"
            :value="country.iso2"
          >
            {{ country.name }}
          </option>
        </select>
      </div>
      <div class="min-[750px]:flex">
        <div class="form-container min-[750px]:w-2/3">
          <label
            for="address"
            class="text-xs tracking-wider mb-2"
          >Address</label>
          <input
            id="address"
            v-model="addressData.shipping_address"
            type="text"
            class="input-form min-[750px]:w-full"
          >
        </div>
        <div class="form-container min-[750px]:w-[150px]">
          <label
            for="number"
            class="text-xs tracking-wider mb-2"
          >Street Number</label>
          <input
            id="number"
            v-model="addressData.shipping_street_number"
            type="text"
            class="input-form min-[750px]:w-[70px]"
          >
        </div>
      </div>
      <div class="min-[750px]:flex">
        <div class="form-container">
          <label
            for="city"
            class="text-xs tracking-wider mb-2"
          >City / Suburb</label>
          <input
            id="city"
            v-model="addressData.shipping_city"
            type="text"
            class="input-form"
          >
        </div>
        <div class="form-container">
          <label
            for="zip"
            class="text-xs tracking-wider mb-2"
          >Zip / Postcode</label>
          <input
            id="zip"
            v-model="addressData.shipping_zip_code"
            type="text"
            class="input-form"
          >
        </div>
      </div>
      <div class="form-container">
        <label
          for="mobile"
          class="text-xs tracking-wider mb-2"
        >Mobile Phone</label>
        <input
          id="mobile"
          v-model="addressData.contact_phone"
          type="tel"
          class="input-form"
        >
      </div>
      <button
        type="submit"
        class="btn-form w-[95%] mx-3"
      >
        SUBMIT
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/UserStore";
import { useShippingStore } from "~/stores/ShippingStore";
import notie from "notie";

const addressData = reactive({
  contact_email: "",
  shipping_first_name: "",
  shipping_last_name: "",
  shipping_country_code: "US",
  shipping_address: "",
  shipping_street_number: "",
  shipping_city: "",
  shipping_zip_code: "",
  contact_phone: "",
});

//function
function handleChangeAddressData() {
  useUserStore()
    .changeShippingData(addressData)
    .then(() => {
      if (
        useUserStore().changeDataMsg &&
        useUserStore().changeDataMsg.includes("failed")
      ) {
        notie.alert({
          type: "error",
          text: "Error : edit failed !",
          time: 5,
        });
      } else {
        notie.alert({ type: 1, text: useUserStore().changeDataMsg, time: 5 });
      }
    });

  // Reset
  addressData.contact_email = "";
  addressData.shipping_first_name = "";
  addressData.shipping_last_name = "";
  addressData.shipping_country_code = "";
  addressData.shipping_address = "";
  addressData.shipping_street_number = "";
  addressData.shipping_zip_code = "";
  addressData.contact_phone = "";
}

onMounted(() => {
  useShippingStore().getAllCountries();
});
</script>

<style scoped>
.notie-container {
  position: relative;
  z-index: 2;
}
</style>
