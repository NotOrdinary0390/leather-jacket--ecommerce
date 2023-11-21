import { defineStore } from 'pinia';
import axios from 'axios';

// Define the 'CategoryStore' store
export const useCategoryStore = defineStore('CategoryStore', {
    // Define state
    state: () => ({
        categories: [],
        loading: true,
    }),

    // Define getters (computed properties)
    getters: {

    },

    // Define actions (methods that can be called to perform asynchronous operations)
    actions: {
        // Load categories
        async loadCategories() {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/categories');
            const params = {
                'no-paginate': '',
            };

            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            return axios
                .get(
                    url.toString(),
                )
                .then(response => {
                    this.categories = response.data.data;
                })
                .catch(() => {
                    this.categories = [];
                })
                .finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },
    }
});
