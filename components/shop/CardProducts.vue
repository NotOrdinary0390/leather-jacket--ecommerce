<template>
  <div class="card-products">
    <NuxtLink :to="'/product/' + props.variation.product.slug">
      <nuxt-img
        v-show="imgClasses.includes('block')"
        :src="
          useRuntimeConfig().public.MEDIA_URL +
          props.variation.images.filter(image => image.primary)[0].image
        "
        :alt="props.variation.images[0].image_meta"
        class="img-product"
        :class="imgClasses"
        @load="handleImageFadeIn"
      />
      <div class="w-full flex justify-center items-center h-[350px]" v-show="imgClasses.includes('hidden')">
        <LoaderComponent />
      </div>
      <div class="flex justify-between mt-1 font-primary font-extrabold">
        <h2 class="capitalize text-sm max-[650px]:text-xs">{{ props.variation.product.name }}</h2>
        <h2 class="capitalize text-sm max-[650px]:text-xs mr-5">€ {{ props.variation.price }}</h2>
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

const imgClasses = ref(['hidden']);

const handleImageFadeIn = () => {
  imgClasses.value = ['block', 'animate-fade-in'];
};

</script>

<style scoped>

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.card-products {
  width: 49%;
  margin: 10px 2px 0 0;
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
