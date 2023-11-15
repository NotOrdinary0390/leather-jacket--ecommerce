import { defineStore } from 'pinia';
import { useProductStore } from './ProductStore';
import { useUserStore } from './UserStore';
import axios from 'axios';

export const useCartStore = defineStore('CartStore', {
    // Define state
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

    // Define getters
    getters: {
       
    },

    actions: {

        //Add To Cart
        async AddToCart() {
            //console.log(this.cartItem.stock_id);
            //console.log(cartItem)
            if (useUserStore().isLoggedIn === true) {
                
                this.cartItem.user_id = useUserStore().authUser.id;
                //console.log(useUserStore().authUser)
                this.cartItem.user_hash = null; 

              } else {

                this.cartItem.user_id = null; //
                // eslint-disable-next-line no-undef
                this.cartItem.user_hash = useCookie("userHash").value;
              }
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/cart/add');
            return axios

                .post(url.toString(), this.cartItem)
                .then(() => {

                    this.loadCartItems();
                    this.sizeError = false;

                })
                .catch(error => {
                    // const fullError = error.response.data;

                    if(error.response.data.errors.size_id) {
                        //this.sizeError = error.response.data.errors.size_id[0];
                        this.sizeError = true;
                        console.log(this.sizeError);
                    } 

                }).finally(() => {

                    this.loading = false; // Hides the loader after loading

                });
        },

        // Load items Cart 
        async loadCartItems() {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/cart');
            const params = {
                //
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            const data = {
                // eslint-disable-next-line no-undef
                "user_hash": !useUserStore().isLoggedIn ? useCookie("userHash").value : null,
                "user_id": useUserStore().isLoggedIn ? useUserStore().authUser.id : null,
            }
            //console.log(useUserStore().isLoggedIn);
            return axios
                .post(
                    url.toString(), data
                )
                .then(response => {
                    this.cartItems = response.data.data.cart_items;
                    this.cartTotal = response.data.data.total_price;
                    console.log(this.cartItems)
                    if (this.cartItems.length > 0) {
                        // eslint-disable-next-line no-undef
                        const canCheckout = useCookie("canCheckout")
                        canCheckout.value = "true";
                    } else {
                        // eslint-disable-next-line no-undef
                        const canCheckout = useCookie("canCheckout")
                        canCheckout.value = null;
                    }
                    //console.log(response.data)
                })
                .catch(() => {
                    this.cartItems = [];
                }).finally(() => {
                    this.loading = false; // Hides the loader after loading
                });
        },

        // Remove item Cart 
        async removeCartItem(stock_id, quantity, size_id, product_price) {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/cart/remove');
            const params = {
                //
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            const data = {
                // eslint-disable-next-line no-undef
                "user_hash": !useUserStore().isLoggedIn ? useCookie("userHash").value : null,
                "user_id": useUserStore().isLoggedIn ? useUserStore().authUser.id : null,
                "stock_id": stock_id,
                "quantity": quantity,
                "size_id": size_id,
                "product_price": product_price
            }
            return axios
                .post(
                    url.toString(), data
                )
                .then(() => {
                    this.loadCartItems();
                })
                .catch(() => {
                    this.cartItems = [];
                });
        },
        
    }
});
