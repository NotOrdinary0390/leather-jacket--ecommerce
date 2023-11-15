<template>
  <div class="container-form">
    <form @submit.prevent="handleContact">
      <div class="form-contact">
        <p class="mb-8 font-extratbold text-lg">
          Submit a request
        </p>
        <label
          class="text-xs tracking-wider mb-2"
          for="email"
        >Email *</label>
        <input
          id="email"
          v-model="contactData.email"
          type="email"
          class="input-form" 
        >
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="order"
        >Order # (optional)
        </label>
        <input
          id="order"
          v-model="contactData.order_number"
          type="text"
          class="input-form"
        >
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="subject"
        >Subject *</label>
        <input
          id="subject"
          v-model="contactData.subject"
          type="text"
          class="input-form"
        >
        <label
          class="text-xs tracking-wider mt-6 mb-2"
          for="description"
        >Description *</label>
        <textarea
          id="description"
          v-model="contactData.message"
          type="text"
          class="input-contact-text-area"
        />

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
import axios from "axios";
import notie from 'notie';

const contactData = reactive({
  email: "",
  order_number: "",
  subject: "",
  message: "",
});

async function handleContact() {
  try {
    const response = await axios.post(
      useRuntimeConfig().public.APP_URL + "/proxy/emails/contact-us",
      contactData
    );
    notie.alert({ type: 'success', text: response.data.message , time: 5 });
  } catch (error) {
    console.error(error);
    notie.alert({ type: 'error', text: error.response.data.message, time: 5 });
  }
}

useHead({
  title: "Contact Us - Alessandra Grimoldi",
  meta: [
    {
      name: "Contact Us brand Luxury fashion brand leather jacket",
      content: "Contact Us brand Luxury fashion brand leather jacket",
    },
  ],
});
</script>

<style scoped>
.container-form {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: #f8f7f7;
  padding: 5em 0;
}
.form-contact {
  min-width: 330px;
  display: flex;
  flex-direction: column;
}

.input-contact-text-area {
  border: 1px solid #e0dfdf;
  padding: 0.3em 1em 0.3em 1em;
  min-height: 100px;
  outline: none;
}

.input-contact-text-area:focus {
  border-color: #000;
}
</style>
