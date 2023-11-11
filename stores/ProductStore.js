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
        successMessage: "",
        errorMessage: ""
    }),

    // Define getters
    getters: {
        getVaritions: (state) => [].concat(...state.products.map(product => product.stocks)),
        getProduct: (state) => {
            return (productSlug) => {
                const product = state.products.find((product) => product.slug === slug);

                return product;
            };
        }
    },

    actions: {
        // Load Products from category id 
        async loadProducts(categoryId, page = 1) {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/api/products');
            const params = {
                "page": page,
                "category_id": categoryId,
                "stocks": "",
                "stock_images": "",
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            return axios
                .get(
                    url,
                )
                .then(response => {
                    this.products = response.data.data.data;
                    console.log(this.products)
                    this.successMessage = "Products loaded successfully.";
                    this.errorMessage = "";
                })
                .catch(error => {
                    this.products = [];
                    this.successMessage = "";
                    this.errorMessage = "Error loading products: " + error.message;
                }).finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },
        // Load single Product from slug
        async loadSingleProduct(slug) {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/api/products/' + slug);
            const params = {
                "stocks": "",
                "stock_images": "",
                "stock_sizes": "",
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            return axios
                .get(
                    url,
                )
                .then(response => {
                    this.product = response.data.data;
                    this.currentVariation = this.product.stocks[0];
                    this.successMessage = "Product slug loaded successfully.";
                    this.errorMessage = "";
                    //console.log(this.product)
                })
                .catch(error => {
                    this.successMessage = "";
                    this.errorMessage = "Error loading product slug: " + error.message;
                }).finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },
        // Change product variant 
        async setColorVariant(variation) {
            //console.log('ID:', id);
            this.currentVariation = variation;
            console.log(variation);
            useCartStore().cartItem.color = variation.color_name;
            useCartStore().cartItem.stock_id = variation.id;
            useCartStore().cartItem.product_price = variation.price;
        },
        // Select size variant
        async selectSizeVariant(id,size) {
            //console.log(size);
            useCartStore().cartItem.size_id = id;   
        },
        // Select quantity item
        async selectQuantity(quantity) {
            //console.log(quantity);
            useCartStore().cartItem.quantity = quantity;   
        },
    }
});
