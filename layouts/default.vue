<template>
  <NavbarComponent />
  <div class="my-24">
    <main>
      <slot />
    </main>
  </div>
  <LayoutShared />
</template>

<script setup></script>

<style scoped>

body {
  background-color: #fff;
  font-family: "Gotham",serif;
}

.notie-container {
  z-index: 10000 !important;
}

/* Font import */

@font-face {
  font-family: "Gotham";
  src: local("Gotham"),
    url(../font/Gotham-Font/Gotham-Light.otf) format("opentype");
}

@font-face {
  font-family: "Gotham-medium";
  src: local("Gotham"),
    url(../font/Gotham-Font/GothamMedium.ttf) format("truetype");
}

@font-face {
  font-family: "Gotham-bold";
  src: local("Gotham"),
    url(../font/Gotham-Font/Gotham-Bold.otf) format("opentype");
}

</style>
