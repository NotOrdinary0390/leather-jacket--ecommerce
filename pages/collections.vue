<template>
  <div>
    <div class="my-4 ml-4 text-sm">
      Collections
    </div>
    <hr>
    <div class="container-app">
      <div
        v-if="collectionsStore.loading"
        class="loader-container"
      >
        <LoaderComponent />
      </div>
      <div
        v-else
        class="font-primary"
      >
        <div
          v-for="collection in collectionsStore.collections"
          :key="collection.id"
        >
          <h1 class="font-wheightbold">
            {{ collection.name }}
          </h1>
          <div class="flex flex-wrap max-[500px]:flex-wrap">
            <CardProducts
              v-for="variation in collectionsStore.getVariations(collection)"
              :key="variation.id"
              :variation="variation"
            />
          </div>
          <nuxt-link
            :key="collection.slug"
            :to="'/collection/' + collection.slug"
          >
            <div
              class="collection-link py-5 mx-auto mt-10 mb-20"
              @click="setCollection(collection.slug)"
            >
              <p class="">
                VIEW MORE
              </p>
            </div>
          </nuxt-link>
        </div>

        <PaginationComponent
          :total-products="useCollectionStore().pagination.totalProducts"
          :current-page="useCollectionStore().pagination.currentPage"
          :last-page="useCollectionStore().pagination.lastPage"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCollectionStore } from "@/stores/CollectionStore";

const collectionsStore = useCollectionStore();

function setCollection(collectionSlug) {
  collectionsStore.getCollectionBySlug(collectionSlug);
}

onMounted(() => {
  collectionsStore.loadCollections();
  // .then(() => {
  //   collectionsStore.getVariations;
  // });
});

useHead({
  title: "Collections - Alessandra Grimoldi",
  meta: [
    {
      name: "Collections - Alessandra Grimoldi",
      content: "Collections Luxury Leather Jacket - Alessandra Grimoldi",
    },
  ],
});
</script>

<style scoped>
.collection-link {
  text-align: center;
  font-size: 8pt;
  width: 350px;
  background-image: linear-gradient(to right, #000, #333);
  background-size: 200% 100%; /* Doppia larghezza per coprire tutto lo spazio */
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: background-position 0.3s;
}

.collection-link:hover {
  background-position: -100% 0; /* Sposta il gradiente a destra */
}

@media screen and (max-width: 450px) {
  .collection-link {
    width: 100%;
  }
}
</style>
