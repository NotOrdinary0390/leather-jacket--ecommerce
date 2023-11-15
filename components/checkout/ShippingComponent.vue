<template>
  <form @submit.prevent="handleSubmit">
    <div class="min-[900px]:flex min-[900px]:space-x-10 mt-10">
      <div class="text-sm w-full">
        <p class="font-wheightbold">
          BILLING ADDRESS
        </p> 
        <div class="border border-black mt-2 mb-10" />
        <div class="form-address">
          <label
            for="firstName"
            class="label-address"
          >First Name</label>
          <input
            id="firstName"
            v-model="shippingData.legal_first_name"
            type="text"
            class="input-address"
            :placeholder="useShippingStore().setFirstName"
          >
        </div>
        <div class="form-address">
          <label
            for="lastName"
            class="label-address"
          >Last Name</label>
          <input
            id="lastName"
            v-model="shippingData.legal_last_name"
            type="text"
            class="input-address"
            :placeholder="useShippingStore().setLastName"
          >
        </div>
        <div class="form-address">
          <label
            for="email"
            class="label-address"
          >Email</label>
          <input
            id="email"
            v-model="shippingData.contact_email"
            type="email"
            class="input-address"
            :placeholder="useShippingStore().setEmail"
          >
        </div>
        <div class="form-address">
          <label
            for="country"
            class="label-address"
          >Country</label>
          <select
            id="country"
            v-model="shippingData.legal_country_code"
            class="select-address"
          >
            <option :value="useShippingStore().setCountry" />
            <option
              v-for="country in useShippingStore().countries"
              :key="country.iso2"
              :value="country.iso2"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        <p class="text-[7.5pt] text-red-500 text-center">
          {{ useShippingStore().setCountry }}
        </p>
        <div class="form-address">
          <label
            for="address"
            class="label-address"
          >Address Line</label>
          <input
            id="address"
            v-model="shippingData.legal_address"
            type="text"
            class="input-address"
            :placeholder="useShippingStore().setAddress"
          >
        </div>
        <div class="form-address">
          <label
            for="streetNumber"
            class="label-address"
          >Street Num</label>
          <input
            id="streetNumber"
            v-model="shippingData.legal_street_number"
            type="text"
            class="input-address"
            :placeholder="useShippingStore().setStreetN"
          >
        </div>
        <div class="form-address">
          <label
            for="city"
            class="label-address"
          >City / Suburb</label>
          <input
            id="city"
            v-model="shippingData.legal_city"
            type="text"
            class="input-address"
            :placeholder="useShippingStore().setCity"
          >
        </div>
        <div class="form-address">
          <label
            for="zip"
            class="label-address"
          >Zip / Postcode</label>
          <input
            id="zip"
            v-model="shippingData.legal_zip_code"
            type="text"
            class="input-address"
            pattern="\d{5}"
            :placeholder="useShippingStore().setZipCode"
          >
        </div>
        <div class="form-address">
          <label
            for="mobile"
            class="label-address"
          >Mobile Phone</label>
          <input
            id="mobile"
            v-model="shippingData.legal_contact_phone"
            type="tel"
            class="input-address"
            :placeholder="useShippingStore().setPhone"
          >
        </div>
      </div>
      <!-- Different address data -->
      <div class="max-[901px]:mt-12 font-primary text-sm w-full">
        <p class="font-wheightbold">
          DELIVERY ADDRESS
        </p>
        <div class="border border-black mt-2 mb-10" />

        <!-- Radio button for show optional address form -->
        <div class="flex items-center mb-2">
          <input
            v-model="useAlternativeAddress"
            type="radio"
            class="mr-2"
            value="false"
          >
          <p class="text-xs">
            Default (same as billing address)
          </p>
        </div>
        <div class="flex items-center">
          <input
            v-model="useAlternativeAddress"
            type="radio"
            class="mr-2"
            value="true"
          >
          <p
            class="text-xs"
            @click="showOptionalAddressForm"
          >
            Add an alternative delivery address
          </p>
        </div>

        <div
          v-if="useAlternativeAddress === 'true'"
          class="font-primary text-sm w-full"
        >
          <div class="form-address">
            <label
              for="firstName2"
              class="label-address"
            >First Name</label>
            <input
              id="firstName2"
              v-model="shippingData.shipping_first_name"
              type="text"
              class="input-address"
              :placeholder="useShippingStore().setFirstName"
            >
          </div>
          <div class="form-address">
            <label
              for="lastName2"
              class="label-address"
            >Last Name</label>
            <input
              id="lastName2"
              v-model="shippingData.shipping_last_name"
              type="text"
              class="input-address"
              :placeholder="useShippingStore().setLastName"
            >
          </div>
          <div class="form-address">
            <label
              for="country"
              class="label-address"
            >Country</label>
            <select
              id="country"
              v-model="shippingData.shipping_country_code"
              class="select-address"
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
          <p class="text-[8pt] text-red-500 text-center">
            {{ useShippingStore().setCountry }}
          </p>
          <div class="form-address">
            <label
              for="address"
              class="label-address"
            >Address Line</label>
            <input
              id="address"
              v-model="shippingData.shipping_address"
              type="text"
              class="input-address"
              :placeholder="useShippingStore().setAddress"
            >
          </div>
          <div class="form-address">
            <label
              for="streetNumber2"
              class="label-address"
            >Street Num</label>
            <input
              id="streetNumber2"
              v-model="shippingData.shipping_street_number"
              type="text"
              class="input-address"
              :placeholder="useShippingStore().setStreetN"
            >
          </div>
          <div class="form-address">
            <label
              for="city"
              class="label-address"
            >City / Suburb</label>
            <input
              id="city"
              v-model="shippingData.shipping_city"
              type="text"
              class="input-address"
              :placeholder="useShippingStore().setCity"
            >
          </div>
          <div class="form-address">
            <label
              for="zip"
              class="label-address"
            >Zip / Postcode</label>
            <input
              id="zip"
              v-model="shippingData.shipping_zip_code"
              type="text"
              class="input-address"
              pattern="\d{5}"
              :placeholder="useShippingStore().setZipCode"
            >
          </div>
          <div class="form-address">
            <label
              for="mobile"
              class="label-address"
            >Mobile Phone</label>
            <input
              id="mobile"
              v-model="shippingData.shipping_contact_phone"
              type="tel"
              class="input-address"
              :placeholder="useShippingStore().setPhone"
            >
          </div>
        </div>
      </div>
    </div>
    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script setup>
import { useUserStore } from "~/stores/UserStore";
import { useShippingStore } from "~/stores/ShippingStore";
import notie from "notie";

const useAlternativeAddress = ref("false");

const shippingData = reactive({
  legal_first_name: "",
  legal_last_name: "",
  contact_email: "",
  legal_country_code: "",
  legal_address: "",
  legal_street_number: "",
  legal_city: "",
  legal_zip_code: "",
  legal_contact_phone: "",
  different_shipping: false,
  shipping_first_name: "",
  shipping_last_name: "",
  shipping_country_code: "",
  shipping_address: "",
  shipping_street_number: "",
  shipping_city: "",
  shipping_zip_code: "",
  shipping_contact_phone: "",
});

const handleSubmit = () => {
  useShippingStore()
    .sendShippingData(shippingData)
    .then(() => {
      if (
        useShippingStore().setDataMsg &&
        useShippingStore().setDataMsg.includes("failed")
      ) {
        notie.alert({
          type: "error",
          text: useShippingStore().setDataMsg,
          time: 5,
        });
      } else {
        notie.alert({
          type: "success",
          text: useShippingStore().setDataMsg,
          time: 5,
        });
      }
    })
    .catch(() => {
      notie.alert({
        type: "error",
        text: useShippingStore().setDataMsg,
        time: 5,
      });
    });
};

const showOptionalAddressForm = () => {
  useAlternativeAddress.value = "true";
};

watch(useAlternativeAddress, (newValue) => {
  shippingData.different_shipping = newValue === "true";
});

onMounted(() => {
  useShippingStore().getAllCountries();
  useUserStore()
    .loadDefaultShippingData()
    .then(() => {
      shippingData.legal_first_name = useUserStore().defaultUserShippingData.shipping_first_name;

    });
});
</script>

<style scoped>
.input-address::placeholder,
.select-address::placeholder {
  color: red;
  font-size: 8pt;
}
button {
  background-color: #000;
  color: #fff;
  min-width: 310px;
  max-width: 410px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 41px;
}

button:hover {
  background-color: #000000bc;
}
</style>
