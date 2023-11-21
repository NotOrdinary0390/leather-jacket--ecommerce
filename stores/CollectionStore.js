import { defineStore } from 'pinia';
import axios from 'axios';

// Define the 'CollectionStore' store
export const useCollectionStore = defineStore('CollectionStore', {
    // Define state
    state: () => ({
        collections: [],
        latestCollection: {},
        collection: [],
        currentCollectionStocks: [],
        loading: true,
        pagination: {
            currentPage: 1,
            lastPage: 0,
            totalProducts: 0,
        },
    }),

    // Define getters (computed properties)
    getters: {

    },

    // Define actions (methods that can be called to perform asynchronous operations)
    actions: {
        // Load all collections
        async loadCollections() {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/collections');
            const params = {
                "year": "",
                "products": "",
                "images": "",
                "page": this.pagination.currentPage,
            };

            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            return axios
                .get(
                    url.toString(),
                )
                .then(response => {
                    this.collections = response.data.data.data;
                    this.pagination.currentPage = response.data.data.meta.current_page;
                    this.pagination.totalProducts = response.data.data.meta.total;
                    this.pagination.lastPage = response.data.data.meta.last_page;
                })
                .catch(() => {
                    this.collections = [];
                })
                .finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },

        // Load the latest collection
        async loadLatestCollection() {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/collections/look-book');

            return axios
                .get(
                    url.toString(),
                )
                .then(response => {
                    this.latestCollection = response.data.data;
                })
                .catch(error => {
                    //
                })
                .finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },

        // Load a collection by its slug
        async getCollectionBySlug(collectionSlug) {
            const url = new URL(useRuntimeConfig().public.APP_URL + `/proxy/collections/${collectionSlug}`);

            return axios
                .get(
                    url.toString(),
                )
                .then(response => {
                    this.collection = response.data.data;
                    this.currentCollectionStocks = this.collection.products.map(product => product.stocks).flat();
                })
                .catch(error => {
                    console.error('Error loading collection by slug:', error);
                    throw error;
                });
        },

        // Get product variations for a collection
        getVariations(collection) {
            return collection.products.map(product => product.stocks).flat();
        }
    }
});
