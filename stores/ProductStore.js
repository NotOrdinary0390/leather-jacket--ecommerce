import { defineStore } from 'pinia';
import axios from 'axios';
import { useCartStore } from './CartStore';

export const useProductStore = defineStore('ProductStore', {
    // Define state
    state: () => ({
        products: [],
        product: {},
        productVariations: [],
        currentVariation: {},
        loading: true,
        pagination: {
            currentPage: 1,
            lastPage: 0,
            totalProducts: 0,
        },
    }),

    // Define getters
    getters: {
        getVariations: (state) => [].concat(...state.products.map(product => product.stocks)),
    },

    actions: {

        // Load Products from category id 
        async loadProducts(categoryId) {

            axios.post('/api/products', {
                page: this.pagination.currentPage,
                category_id: categoryId,
            })
                .then(response => {
                    this.products = response.data.data;
                    this.pagination.currentPage = response.data.meta.current_page;
                    this.pagination.totalProducts = response.data.meta.total;
                    this.pagination.lastPage = response.data.meta.last_page;
                }).finally(() => {
                    this.loading = false;
                });

        },

        // Load single Product from slug
        async loadSingleProduct(slug) {
            this.loading = true;
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/products/' + slug);
            const params = {
                "stocks": "",
                "stock_images": "",
                "stock_sizes": "",
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            return axios.get(url.toString())
                .then(response => {
                    this.product = response.data.data;
                    this.currentVariation = this.product.stocks[0];
                }).finally(() => {
                    this.loading = false;
                });
        },

        // Change product variant 
        async setColorVariant(variation) {
            this.currentVariation = variation;
            useCartStore().cartItem.color = variation.color_name;
            useCartStore().cartItem.stock_id = variation.id;
            useCartStore().cartItem.product_price = variation.price;
        },

        // Select size variant
        async selectSizeVariant(id) {
            useCartStore().cartItem.size_id = id;
        },

        // Select quantity item
        async selectQuantity(quantity) {
            useCartStore().cartItem.quantity = quantity;
        },
    }
});
