import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearchStore = defineStore('SearchStore', {
    state: () => {
        return {
            products: {},
            loading: false,
            searchTerm: "",
        }
    },
    getters: {
        //
    },
    actions: {
        async searchNavProducts(searchTerm) {
            this.searchTerm = searchTerm;
            this.loading = true;
            try {
                // eslint-disable-next-line no-undef
                const response = await axios.get(useRuntimeConfig().public.APP_URL + '/proxy/products', {
                    params: {
                        search: searchTerm,
                        stocks: "",
                        stock_images: "",
                        stock_sizes: "",
                    }
                });
                this.products = response.data.data.data;
                console.log('Prod :', this.products)
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        }
    }
});
