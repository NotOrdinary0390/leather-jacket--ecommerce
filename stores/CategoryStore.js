import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('CategoryStore', {
    // Define state
    state: () => ({
        categories: [],
        loading: true,
    }),

    // Define getters
    getters: {

    },

    actions: {
        // Load Categories 
        async loadCategories() {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/categories');
            const params = {
                'no-paginate': '',
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            return axios
                .get(
                    url.toString(),
                )
                .then(response => {
                    this.categories = response.data.data;
                    console.log(this.categories);
                })
                .catch(() => {
                    this.categories = [];
                }).finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },
        
    }
});
