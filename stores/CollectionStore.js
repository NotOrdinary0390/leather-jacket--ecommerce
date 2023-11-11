import { defineStore } from 'pinia';
import axios from 'axios';

export const useCollectionStore = defineStore('CollectionStore', {
    // Define state
    state: () => ({
        collections: [],
        latestCollection: {},
        collection: [],
        currentCollectionStocks: [],
        loading: true,
    }),

    // Define getters
    getters: {
        // getVariations: (state) => {
        //     const products = state.collections.map(collection => collection.products).flat();
        //     const variations = products.map(product => product.stocks).flat();
        //     return variations
        // }
    },

    actions: {
        // Load all Collections 
        async loadCollections() {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/api/collections');
            const params = {
                "year": "",
                "products": "",
                "images": "",
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            return axios
                .get(
                    url,
                )
                .then(response => {
                    this.collections = response.data.data.data;
                    console.log(this.collections)                 
                })
                .catch(error => {
                    this.collections = [];
                }).finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },
        // Load latest Collection 
        async loadLatestCollection() {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/api/collections/look-book');

            return axios
                .get(
                    url,
                )
                .then(response => {
                    this.latestCollection = response.data.data;
                    console.log(this.latestCollection)
                })
                .catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },
        // load collection by slug
        async getCollectionBySlug(collectionSlug) {

            const url = new URL(useRuntimeConfig().public.APP_URL + `/api/collections/${collectionSlug}`);

            return axios
                .get(
                    url,
                )
                .then(response => {
                    this.collection = response.data.data;
                    this.currentCollectionStocks = this.collection.products.map(product => product.stocks).flat();
                    console.log(this.collection)
                })
                .catch(error => {
                    console.error('Error loading collection by slug:', error);
                    throw error;
                });
        },
        // Load product variations for collection
        getVariations(collection) {
            return collection.products.map(product => product.stocks).flat();
        }
    }
});