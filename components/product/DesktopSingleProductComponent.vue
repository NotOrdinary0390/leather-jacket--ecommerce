<template>
  <div class="flex">
    <!-- box info product -->
    <div class="box-25">
      <h1 class="font-extrabold">
        {{ product.name }}
      </h1>
      <p class="font-extrabold text-sm mb-3">
        € {{ useProductStore().currentVariation.price }}
      </p>
      <AccordionComponent
        header-text="Product Detail and Sizing"
        :content-text="product.description"
      />
      <AccordionComponent
        header-text="Delivery and Returns"
        content-text="All international orders are shipped via DHL.<br /> Order processing may take up to 7 days.<br /> An email containing the tracking number will be sent to you when the order ships.<br /> All packages are insured and trackable.<br />
                      Please note, our standard delivery & return policies do not apply to made-to-order products.<br />
                      If we anticipate longer delivery times for a specific product, that information will be listed above as well as in checkout and in the order confirmation email."
      />
    </div>

    <!-- Slideshow images -->
    <SlideShowComponent /> 

    <!-- Select variant product | Add to Cart -->
    <div class="box-25">
      <ColorVariantComponent :product="product" />

      <QuantityComponent class="mb-2" />

      <SelectComponent />
      <CartBtnComponent />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/ProductStore";

// Define the "product" prop
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Initialize a ref to track the product
const product = ref(props.product);
</script>

<style scoped>
.box-25 {
  width: 25%;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
