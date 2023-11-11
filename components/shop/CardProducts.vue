<template>
  <div class="card-products">
    <NuxtLink :to="'/product/' + variation.product.slug">
      <nuxt-img
        :src="
          useRuntimeConfig().public.MEDIA_URL +
          variation.images.filter(image => image.primary)[0].image
        "
        :alt="variation.images[0].image_meta"
        class="img-product"
      />
      <div class="flex justify-between mt-1 font-primary font-extrabold">
        <h2 class="capitalize text-sm max-[650px]:text-xs">{{ variation.product.name }}</h2>
        <h2 class="capitalize text-sm max-[650px]:text-xs mr-5">€ {{ variation.price }}</h2>
      </div>   
    </NuxtLink>
  </div>
</template>

<script setup>

/*------------------------
  Define props
  -------------------------*/
const props = defineProps({
  variation: Object,
});

onMounted(() => {
  console.log(props.variation);
});
</script>

<style scoped>
.card-products {
  width: 49%;
  margin: 10px 2px 0px 0px;
  /* border: 1px solid red; */
}
.img-product {
  width: 100%;
  /* border: 1px solid rgb(0, 255, 17); */
}

@media screen and (min-width: 880px) {
  .card-products {
    width: 24%;
    margin: 15px auto;
  }
}
@media screen and (max-width: 500px) {
  .card-products {
    width: 100%;
    margin: 15px auto;
  }
}
</style>
