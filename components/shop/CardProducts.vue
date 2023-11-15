<template>
  <div class="card-products gap-2">
    <NuxtLink :to="'/product/' + props.variation.product.slug">
      <div
        v-if=" props.variation.images.length > 0 && props.variation.images.filter((image) => image.primary).length > 0
        "
      >
        <nuxt-img
          v-show="imgClasses.includes('block')"
          :src="
            useRuntimeConfig().public.MEDIA_URL +
              props.variation.images.filter((image) => image.primary)[0].image
          "
          :alt="props.variation.images[0].image_meta"
          class="img-product"
          :class="imgClasses"
          @load="handleImageFadeIn"
        />
      </div>
      <div
        v-else
        class="h-[350px] flex items-center border border-gray-300"
      >
        <nuxt-img
          v-show="imgClasses.includes('block')"
          src="/images/logo-black.jpeg"
          alt="product without image"
          class="img-product object-fit "
          :class="imgClasses"
          @load="handleImageFadeIn"
        />
      </div>
      <div 
        v-show="imgClasses.includes('hidden')"
        class="w-full flex justify-center items-center h-[350px]"
      >
        <LoaderComponent />
      </div>
      <div class="flex justify-between mt-1 font-primary font-extrabold">
        <h2 class="capitalize text-sm max-[650px]:text-xs">
          {{ props.variation.product.name }}
        </h2>
        <h2 class="capitalize text-sm max-[650px]:text-xs mr-5">
          € {{ props.variation.price }}
        </h2>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
/*------------------------
  Define props
  -------------------------*/
const props = defineProps({
  variation: {
    type: Object,
    required: true,
  }
});

const imgClasses = ref(["hidden"]);

const handleImageFadeIn = () => {
  imgClasses.value = ["block", "animate-fade-in"];
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
