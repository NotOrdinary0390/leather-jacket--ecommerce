<template>
  <div class="home-bg h-screen w-full">
    <NavbarComponentHome />
    <div>
      <main class="main-body">
        <slot />
      </main>
    </div>
    <LayoutShared />
  </div>
</template>

<script setup>
</script>

<style>

body {
  overflow-y: hidden !important;
}

.home-bg {
  background-image: url("/images/bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  font-family: "Gotham",serif;
}

@media screen and (max-width: 750px) {
  .home-bg {
    background-image: url("/images/bg_mobile.webp");
  }
}

</style>
