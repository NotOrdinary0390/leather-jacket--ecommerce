// Import necessary dependencies
import { defineStore } from 'pinia';
import axios from 'axios';
import { useCartStore } from './CartStore';

// Define the 'ProductStore' store
export const useProductStore = defineStore('ProductStore', {
    // Define the initial state of the store
    state: () => ({
        products: [],
        product: {},
        productVariations: [],
        currentVariation: {},
        searchTerm: "",
        loading: true,
        pagination: {
            currentPage: 1,
            lastPage: 0,
            totalProducts: 0,
        },
    }),

    // Define getters (computed properties)
    getters: {
        getVariations: (state) => [].concat(...state.products.map(product => product.stocks)),
    },

    // Define actions (methods that can be called to perform asynchronous operations)
    actions: {
        // Load products from a specific category id
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
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // Load products based on a search term
        async loadSearchProducts(searchTerm) {
            this.searchTerms = searchTerm;
            this.loading = true;

            try {
                const response = await axios.get(useRuntimeConfig().public.APP_URL + '/proxy/products', {
                    params: {
                        search: searchTerm,
                        stocks: "",
                        stock_images: "",
                        stock_sizes: "",
                    }
                });
                this.products = response.data.data.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        // Load a single product based on its slug
        async loadSingleProduct(slug) {
            this.loading = true;
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/products/' + slug);
            const params = {
                "stocks": "",
                "stock_images": "",
                "stock_sizes": "",
            };

            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            return axios.get(url.toString())
                .then(response => {
                    this.product = response.data.data;
                    this.currentVariation = this.product.stocks[0];
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // Change the product variant color
        async setColorVariant(variation) {
            this.currentVariation = variation;
            useCartStore().cartItem.color = variation.color_name;
            useCartStore().cartItem.stock_id = variation.id;
            useCartStore().cartItem.product_price = variation.price;
        },

        // Select the size variant
        async selectSizeVariant(id) {
            useCartStore().cartItem.size_id = id;
        },

        // Select the quantity of the item
        async selectQuantity(quantity) {
            useCartStore().cartItem.quantity = quantity;
        },
    }
});
