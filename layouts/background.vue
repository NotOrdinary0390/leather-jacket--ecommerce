<template>
  <div class="home-bg h-[1000px] w-full">
    <NavbarComponentHome />
    <div>
      <main>
        <slot />
      </main>
    </div>
  </div>
  <LayoutShared />
</template>

<script setup>
</script>

<style scoped>

.home-bg {
  background-image: url("/images/bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  font-family: "Gotham",serif;
}

.notie-container {
  z-index: 1000 !important;
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
