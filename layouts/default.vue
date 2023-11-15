<template>
  <div>
    <NavbarComponent />
    <div class="my-24">
      <main class="main-body">
        <slot />
      </main>
      <LayoutShared />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

body {
  background-color: #fff;
  font-family: "Gotham",serif;
  overflow-y: hidden !important;
}

</style>
