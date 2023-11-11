<template>
  <div class="accordion-header" @click="toggleAccordion">
    <p class="text-[9.5pt] font-wheightbold" v-html="headerText"></p>
    <span v-if="!isOpen" class="material-symbols-outlined"> expand_more </span>
    <span v-else class="material-symbols-outlined"> expand_less </span>
  </div>
  <div v-if="isOpen" class="accordion-content">
    <p class="text-[9pt]" v-html="contentText"></p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  headerText: String,
  contentText: String,
});

const isOpen = ref(false);

function toggleAccordion() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 0.5em;
  border-bottom: 1px solid #000;
}

.accordion-content {
  padding: 10px;
  font-size: 8pt;
  animation: slideIn .7s ease;
}

@keyframes slideIn {
  from {
    max-height: 0;
    opacity: 0;
  }
  50% {
    max-height: fit-content; 
    opacity: .5; 
  }
  to {
    max-height: fit-content; 
    opacity: 1; 
  }
}
</style>
