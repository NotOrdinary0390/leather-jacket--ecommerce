<template>
  <div>
    <!-- Slideshow images -->
    <SlideShowComponent :product="product" />

    <!-- box info product -->
    <div class="flex justify-between my-5">
      <h1 class="font-extrabold">{{ product.name }}</h1>
      <p class="font-extrabold text-sm mb-3">€ {{ product.price }}</p>
    </div>
    <AccordionComponent
      headerText="Product Detail and Sizing"
      :contentText="product.description"
    />
    <AccordionComponent
      headerText="Delivery and Returns"
      contentText="All international orders are shipped via DHL.<br /> Order processing may take up to 7 days.<br /> An email containing the tracking number will be sent to you when the order ships.<br /> All packages are insured and trackable.<br />
                      Please note, our standard delivery & return policies do not apply to made-to-order products.<br />
                      If we anticipate longer delivery times for a specific product, that information will be listed above as well as in checkout and in the order confirmation email."
    />

    <!-- Select variant product | Add to Cart -->
    <div class="my-6">
      <div class="flex space-x-5">
        <ColorVariantComponent :product="product" />
        <QuantityComponent />
      </div>

      <SelectComponent :product="product" />
      <CartBtnComponent />
    </div>
  </div>
</template>

<script setup>
// Define the "product" prop
const props = defineProps(["product"]);

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
