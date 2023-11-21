import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './UserStore';

// Define the store named 'useShippingStore'
export const useShippingStore = defineStore('ShippingStore', {
    // Define the initial state of the store
    state: () => {
        return {
            // Various state variables related to shipping and error messages
            emailError: "",
            setDataMsg: "",
            countries: "",
            isShippingDataSubmitted: false,
            loading: true,
            // Shipping errors
            setEmail: "",
            setFirstName: "",
            setLastName: "",
            setCountry: "",
            setAddress: "",
            setStreetN: "",
            setCity: "",
            setZipCode: "",
            setPhone: "",
        }
    },
    // Define getters (currently empty)
    getters: {
        // Getter methods can be added here
    },
    // Define actions (methods that can be called to perform asynchronous operations)
    actions: {
        // Get all countries for select country 
        async getAllCountries() {
            // API endpoint for fetching countries
            const url = "https://api.countrystatecity.in/v1/countries";
            
            // Make an API request to get countries
            axios
                .get(url, {
                    headers: {
                        "X-CSCAPI-KEY": `eFFaN05wc3ZhQ25nTTFIQ01FODluMm9QTUxma3V3TWVrRzBlMTJrQg==`,
                    },
                })
                .then((response) => {
                    // Update the 'countries' state variable with the received data
                    this.countries = response.data;
                })
                .catch((error) => {
                   //
                });
        },
        
        // Change or create default shipping data.
        async sendShippingData(shippingData) {
            // Modify shippingData object based on user login status
            shippingData.user_id = useUserStore().isLoggedIn ? useUserStore().authUser.id : null;
            shippingData.user_hash = !useUserStore().isLoggedIn ? useCookie("userHash").value : null;
            
            // Set default values for shipping data properties
            shippingData.shipping_first_name = shippingData.shipping_first_name || null;
            shippingData.shipping_last_name = shippingData.shipping_last_name || null;
            // (other properties follow the same pattern)
            
            // Construct the URL for the API endpoint
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/orders/set-shipping');

            try {
                // Make a POST request to update shipping data
                const response = await axios.post(url.toString(), shippingData, {
                    headers: {
                        Authorization: `Bearer ${useCookie("accessToken").value}`
                    }
                });
                
                // Update 'setDataMsg' with the response message
                this.setDataMsg = response.data.message;
                this.checkShippingData();
            } catch (error) {
                // Handle errors and update state variables accordingly
                if (error.response && error.response.data && error.response.data.message) {
                    // (handling specific errors and updating corresponding state variables)
                }
            }
        },
        
        // New action to check if shipping data is submitted
        async checkShippingData() {
            try {
                // Construct the URL for the API endpoint
                const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/orders/check-shipping');
                
                // Prepare data for the POST request
                const data = {
                    "user_hash": !useUserStore().isLoggedIn ? useCookie("userHash").value : null,
                    "user_id": useUserStore().isLoggedIn ? useUserStore().authUser.id : null,
                };

                // Make a POST request to check shipping data
                const response = await axios.post(url.toString(), data, {
                    headers: {
                        Authorization: `Bearer ${useCookie("accessToken").value}`
                    }
                });

                // Update 'isShippingDataSubmitted' true
                this.isShippingDataSubmitted = response.data.data;
            } catch (error) {
                //
            }
        },
    }
});
