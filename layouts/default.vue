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

</style>
