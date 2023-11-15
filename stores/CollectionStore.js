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
        pagination: {
            currentPage: 1,
            lastPage: 0,
            totalProducts: 0,
        },
    }),

    // Define getters
    getters: {

    },

    actions: {
        // Load all Collections 
        async loadCollections() {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/collections');
            const params = {
                "year": "",
                "products": "",
                "images": "",
                "page": this.pagination.currentPage,
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
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
                }).finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },
        // Load latest Collection 
        async loadLatestCollection() {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/collections/look-book');

            return axios
                .get(
                    url.toString(),
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

            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + `/proxy/collections/${collectionSlug}`);

            return axios
                .get(
                    url.toString(),
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
