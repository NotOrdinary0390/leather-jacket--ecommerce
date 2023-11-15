<template>
  <div>
    <p class="font-extrabold text-[7pt]">
      QUANTITY
    </p>
    <div class="flex items-center mt-2">
      <button
        class="direction"
        :disabled="counter <= 1" 
        @click="changeCounter('-')"
      >
        -
      </button>
      <div class="box">
        <p class="text-[10pt]">
          {{ counter }}
        </p>
      </div>
      <button
        class="direction"
        :disabled="counter >= 5"
        @click="changeCounter('+')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
const counter = ref(1);

const changeCounter = (direction) => {
  if (direction === "+") {
    counter.value++;
  } else {
    counter.value--;
  }
};

function productQuantity() {
  useProductStore().selectQuantity(counter.value);
}

watch(counter, () => {
  productQuantity();
});
</script>

<style scoped>
.box {
  width: 30px;
  height: 32px;
  border: 1px solid #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.direction {
  border: 1px solid #c4c4c4;
  height: 32px;
  width: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

button:hover {
  transition: all 0.7s;
  background-color: #000;
  color: #fff;
}
</style>
