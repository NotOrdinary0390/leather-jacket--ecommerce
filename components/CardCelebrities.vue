<template>
  <div class="card-store">
    <div class="div-img">
      <img
        :src="props.celebrity.image"
        :alt="props.celebrity.alt"
        class="img"
      >
    </div>
    <p class="mt-2 font-bold">
      {{ props.celebrity.name }}
    </p> 
  </div>
</template>

<script setup>

const props = defineProps({
  celebrity: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>
.card-store {
  margin: 65px 15px 4px 15px;
}

.div-img {
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 100%;
}

/* media queries  */
@media screen and (max-width: 700px) {
  .card-store {
    width: 100%;
    margin: 55px 3px 3px 3px;
  }
  .div-img {
    height: fit-content;
  }
  .img {
    height: auto;
  }
}
</style>
