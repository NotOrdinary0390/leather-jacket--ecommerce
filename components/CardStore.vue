<template>
  <div class="card-store">
    <img
      :src="store.image"
      :alt="store.alt"
      class="w-full"
    >
    <p class="mt-2 font-bold">
      {{ props.store.name }}
    </p>
    <p class="mt-1 font-primary text-sm">
      {{ props.store.address }}
    </p>
    <p class="font-semibold font-primary text-xs">
      {{ props.store.city }} {{ props.store.cap }} 
    </p>
  </div>
</template>

<script setup>

const props = defineProps({
    store: {
      type: Object,
      required: true
    }
});

</script>

<style scoped>
.card-store {
  margin: 25px 15px 15px 15px;
}

@media screen and (min-width: 200px) {
  .card-store {
    width: 100%;
  }
}

@media screen and (min-width: 550px) and (max-width: 1008px) {
  .card-store {
    width: 40%;
  }
}

@media screen and (min-width: 1008px){
  .card-store {
    width: 30%;
  }
}
</style>
