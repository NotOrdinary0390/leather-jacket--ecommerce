<template>
  <div class="md:flex">
    <!-- box info product -->
    <div class="hidden md:flex md:flex-col w-[25%] min-h-[230px] self-center">
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

    <!-- Box info product mobile start -->
    <div class="flex md:hidden justify-between my-5">
      <h1 class="font-extrabold">
        {{ product.name }}
      </h1>
      <p class="font-extrabold text-sm mb-3">
        € {{ product.price }}
      </p>
    </div>
    <!-- Box info product mobile end -->

    <!-- Product info block start -->
    <div class="md:hidden">
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
    <!-- Product info block end -->

    <!-- Select variant product | Add to Cart | mobile start -->
    <div class="my-6 md:hidden">
      <div class="flex space-x-5">
        <ColorVariantComponent :product="product" />
        <QuantityComponent />
      </div>

      <SelectComponent :product="product" />
      <CartBtnComponent />
    </div>
    <!-- Select variant product | Add to Cart | mobile end -->

    <!-- Select variant product | Add to Cart | desktop start -->
    <div class="hidden md:flex md:flex-col w-[25%] min-h-[230px] self-center">
      <ColorVariantComponent :product="product" />

      <QuantityComponent class="mb-2" />

      <SelectComponent />
      <CartBtnComponent />
    </div>
    <!-- Select variant product | Add to Cart | desktop end -->
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

<style scoped></style>
