import { defineStore } from 'pinia';
import { useProductStore } from './ProductStore';
import { useUserStore } from './UserStore';
import axios from 'axios';

// Define the 'CartStore' store
export const useCartStore = defineStore('CartStore', {
    // Define the initial state of the store
    state: () => ({
        cartTotal: 0,
        cartItems: [],
        cartItem: {
            user_id: null,
            user_hash: null,
            color: "",
            size_id: "",
            stock_id: null,
            quantity: 1,
            product_price: useProductStore().currentVariation?.price,
        },
        loading: true,
        sizeError: false,
    }),

    // Define getters (currently empty)
    getters: {
        // Getter methods can be added here
    },

    // Define actions (methods that can be called to perform asynchronous operations)
    actions: {
        // Add To Cart
        async AddToCart() {
            // Check user login status and set appropriate values in 'cartItem'
            if (useUserStore().isLoggedIn === true) {
                this.cartItem.user_id = useUserStore().authUser.id;
                this.cartItem.user_hash = null;
            } else {
                this.cartItem.user_id = null;
                this.cartItem.user_hash = useCookie("userHash").value;
            }

            // Construct the URL for the API endpoint
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/cart/add');

            // Make a POST request to add an item to the cart
            return axios
                .post(url.toString(), this.cartItem)
                .then(() => {
                    // Refresh cart items and reset sizeError
                    this.loadCartItems();
                    this.sizeError = false;
                })
                .catch(error => {
                    // Handle errors and set sizeError if there is an issue with size_id
                    if (error.response.data.errors.size_id) {
                        this.sizeError = true;
                        console.log(this.sizeError);
                    }
                })
                .finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },

        // Load items in the cart
        async loadCartItems() {
            // Construct the URL for the API endpoint
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/cart');
            
            // Prepare data for the POST request
            const data = {
                "user_hash": !useUserStore().isLoggedIn ? useCookie("userHash").value : null,
                "user_id": useUserStore().isLoggedIn ? useUserStore().authUser.id : null,
            };

            // Make a POST request to load cart items
            return axios
                .post(url.toString(), data)
                .then(response => {
                    // Update cartItems and cartTotal based on the response
                    this.cartItems = response.data.data.cart_items;
                    this.cartTotal = response.data.data.total_price;

                    // Update canCheckout cookie based on the presence of items in the cart
                    if (this.cartItems.length > 0) {
                        const canCheckout = useCookie("canCheckout");
                        canCheckout.value = "true";
                    } else {
                        const canCheckout = useCookie("canCheckout");
                        canCheckout.value = null;
                    }
                })
                .catch(() => {
                    this.cartItems = [];
                })
                .finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },

        // Remove item from the cart
        async removeCartItem(stock_id, quantity, size_id, product_price) {
            // Construct the URL for the API endpoint
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/cart/remove');
            
            // Prepare data for the POST request
            const data = {
                "user_hash": !useUserStore().isLoggedIn ? useCookie("userHash").value : null,
                "user_id": useUserStore().isLoggedIn ? useUserStore().authUser.id : null,
                "stock_id": stock_id,
                "quantity": quantity,
                "size_id": size_id,
                "product_price": product_price
            };

            // Make a POST request to remove an item from the cart
            return axios
                .post(url.toString(), data)
                .then(() => {
                    // Refresh cart items after removing an item
                    this.loadCartItems();
                })
                .catch(() => {
                    this.cartItems = [];
                });
        },
    }
});
