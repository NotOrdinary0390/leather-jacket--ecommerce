<template>
  <div class="flex justify-center mt-16">
    <nav aria-label="Page navigation">
      <ul class="inline-flex text-sm">
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click.prevent="goToPreviousPage(props.currentPage - 1)"
          >Previous</a>
        </li>
        <li
          v-for="(page, index) in props.lastPage"
          :key="index"
          value="page"
        >
          <a
            href="#"
            :class="{
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                page !== currentPage,
              'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white':
                page === currentPage,
            }"
            @click.prevent="goToPage(index +1 )"
          >
            {{ index + 1 }}
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click.prevent="goToNextPage(props.currentPage + 1)"
          >Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: false,
    default: 0,
  },
});

const goToPage = (pageNumber) => {
  emits("change-page", pageNumber);
};

const goToPreviousPage = (page) => {
  if (page < 1 ) {
    goToPage(props.lastPage);
  } else {
    goToPage(page)
  }
};

const goToNextPage = (page) => {
  if (page > props.lastPage) {
    goToPage(1);
  } else {
    goToPage(page)
  }
};

// Define emits
const emits = defineEmits(["change-page"]);
</script>

<style scoped>

</style>
