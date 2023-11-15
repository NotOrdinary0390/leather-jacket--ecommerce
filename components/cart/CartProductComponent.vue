<template>
  <!-- products cart div & info -->
  <div class="flex justify-between items-center">
    <!-- single product cart div -->
    <div class="flex my-5"> 
      <img
        :src="
          useRuntimeConfig().public.MEDIA_URL +
            props.item.stock?.images[0].image
        "
        :alt="props.item.stock?.images[0].image_meta"
        class="w-[100px] h-[100px] object-cover"
      >
      <div class="ml-3">
        <p>{{ props.item.stock.product.name }}</p>
        <p class="text-sm text-gray-400">
          {{ props.item.stock.color_name }} / {{ props.item.size?.size }}
        </p>
        <p
          class="text-xs mt-10 cursor-pointer"
          @click="handleRemoveItem"
        >
          REMOVE
        </p>
        <LoaderComponent v-if="isLoading" />
      </div>
    </div>
    <!-- info quantity price total-->
    <div class="box-price-quantity">
      <div class="flex items-center">
        <p class="text-[7pt] mr-1">
          QTY
        </p>
        <div
          class="w-9 h-9 border border-black flex items-center justify-center"
        >
          <p class="text-[10pt]">
            {{ props.item.quantity }}
          </p>
        </div>
      </div>
      <p class="text-[10pt] max-[550px]:hidden">
        € {{ props.item.price }}
      </p>
      <p class="text-[10pt]">
        € {{ calcTotalPrice(props.item.price, props.item.quantity) }}
      </p>
    </div>
  </div>
</template>

<script setup>

/*------------------------
  Define props
  -------------------------*/
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });

//Ref
const isLoading = ref(false);

/* --------------- 
  Define functions 
  -----------------*/
function calcTotalPrice(price, qty) {
  return price * qty;
}

const handleRemoveItem = () => {
  const stock_id = props.item.stock.id;
  const quantity = props.item.quantity;
  const size_id = props.item.size.id;
  const product_price = props.item.price;
  useCartStore()
    .removeCartItem(stock_id, quantity, size_id, product_price)
    .then(() => {
      isLoading.value = false;
    });
};
</script>

<style scoped>
.box-price-quantity {
  display: flex;
  width: 230px;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 550px) {
  .box-price-quantity {
    flex-direction: column;
    width: 80px;
    height: 100px;
    align-items: end;
  }
}
</style>
