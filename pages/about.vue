<template>
  <div>
    <h1 class="my-4 ml-4 text-sm">
      About
    </h1>
    <hr>
    <div class="container-app">
      <!-- <div v-html="about.content?.rendered" class="font-primary"></div> -->
      <img
        src="/images/about-me.webp"
        alt="alessandra grimoldi stylist leather jacket"
        class="mx-auto w-full md:w-1/2"
      >
      <div class="text-about font-primary">
        <p class="mt-12">
          Alessandra Grimoldi, always connected to the world of fashion, showed
          her interest in fashion from a very young age by attending stylistic
          workshops for high-end brands, growing up between Milan, Rome, and
          Florence.
        </p>
        <p class="mt-5">
          Alessandra, with her determined character, embraces the philosophy of
          always believing in something, which is why for her professional path in
          the world of fashion, she initially decided to embark on her
          entrepreneurial journey by opening a store, exclusively featuring luxury
          brands, first in Rome and later in Milan.
        </p>
        <p class="mt-5">
          Each collection by Alessandra tells her story, her travels, her way of
          living, encapsulating her values, emotions, and memories, where each
          individual piece carries its essence. Her vision of fashion is art,
          creativity, madness, fun, inventiveness, and a desire to communicate.
        </p>
        <p class="mt-5">
          With Alessandra Grimoldi, a new concept of fashion and luxury is born,
          where craftsmanship discovers new frontiers and where each meticulously
          crafted piece, down to the smallest detail, is both "easy so much", to
          be worn both day and night.
        </p>
        <p class="mt-5">
          In the world of stylist Grimoldi, stereotypes fall away, and everything
          is seen in a new light. Her unique and personal style dresses an
          international woman, one that is sexy and versatile, who loves to
          express her femininity with seduction, provocation, sensuality, and
          elegance. The man, on the other hand, is street-savvy, cosmopolitan, and
          appreciates quality, authenticity, and the search for precious and
          high-performance materials.
        </p>
        <p class="mt-5">
          Of all the collections by Alessandra Grimoldi, the undeniable
          "must-have" is the biker jacket, a staple that fits like a glove, almost
          like a second skin, projecting the wearer into a reality of luxury,
          precious moments experienced, and moments yet to live.
        </p>
        <p class="mt-5">
          After creating and launching various brands, particularly in leather
          goods, Alessandra Grimoldi's collections quickly became successful cult
          pieces, worn by international figures in entertainment and sports.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
  title: "About Alessandra Grimoldi - Luxury Leather Jackets",
  meta: [
    {
      name: "description",
      content:
        "Learn more about Alessandra Grimoldi and explore the world of luxury leather jackets. Discover our commitment to quality, craftsmanship, and timeless style.",
    },
    {
      name: "keywords",
      content: "Alessandra Grimoldi, leather jackets, luxury fashion, craftsmanship",
    },
  ],
});
</script>

<style scoped>
.text-about {
  font-size: 11.3pt;
  letter-spacing: 1px;
  text-align: center;
}
</style>
