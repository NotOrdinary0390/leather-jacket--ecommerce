import { defineStore } from 'pinia';
import axios from 'axios';

// Define the store named 'useShippingStore'
export const useShippingStore = defineStore('ShippingStore', {
    // Define the state of the store
    state: () => {
        return {
            // authUser: [],
            // isLoggedIn: false,
            emailError: "",
            setDataMsg: "",
            countries: "",
            loading: true,
            // shipping errors
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
        //
    },
    // Define actions
    actions: {
        // get all countries for select country 
        async getAllCountries() {
            const url = "https://api.countrystatecity.in/v1/countries";
            axios
                .get(url, {
                    headers: {
                        "X-CSCAPI-KEY": `eFFaN05wc3ZhQ25nTTFIQ01FODluMm9QTUxma3V3TWVrRzBlMTJrQg==`,
                    },
                })
                .then((response) => {
                    //console.log(JSON.stringify(response.data));
                    this.countries = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        // Change or create default shipping data.
        async sendShippingData(shippingData) {
            console.log(shippingData)

            // eslint-disable-next-line no-undef
            shippingData.user_id = useUserStore().isLoggedIn ? useUserStore().authUser.id : null;
            // eslint-disable-next-line no-undef
            shippingData.user_hash = !useUserStore().isLoggedIn ? useCookie("userHash").value : null;
            shippingData.shipping_first_name = shippingData.shipping_first_name || null;
            shippingData.shipping_last_name = shippingData.shipping_last_name || null;
            shippingData.shipping_country_code = shippingData.shipping_country_code || null;
            shippingData.shipping_address = shippingData.shipping_address || null;
            shippingData.shipping_street_number = shippingData.shipping_street_number || null;
            shippingData.shipping_city = shippingData.shipping_city || null;
            shippingData.shipping_zip_code = shippingData.shipping_zip_code || null;
            shippingData.shipping_contact_phone = shippingData.shipping_contact_phone || null;

            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/orders/set-shipping');

            try {
                const response = await axios.post(url.toString(), shippingData, {
                    headers: {
                        // eslint-disable-next-line no-undef
                        Authorization: `Bearer ${useCookie("accessToken").value}`
                    }
                });
                //console.log(response.data);
                this.setDataMsg = response.data.message;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.setDataMsg = error.response.data.message;
                    if (error.response.data.errors.contact_email) {
                        this.setEmail = error.response.data.errors.contact_email[0];
                        setTimeout(() => {
                            this.setEmail = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_first_name) {
                        this.setFirstName = error.response.data.errors.legal_first_name[0];
                        setTimeout(() => {
                            this.setFirstName = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_last_name) {
                        this.setLastName = error.response.data.errors.legal_last_name[0];
                        setTimeout(() => {
                            this.setLastName = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_country_code) {
                        this.setCountry = error.response.data.errors.legal_country_code[0];
                        setTimeout(() => {
                            this.setCountry = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_address) {
                        this.setAddress = error.response.data.errors.legal_address[0];
                        setTimeout(() => {
                            this.setAddress = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_street_number) {
                        this.setStreetN = error.response.data.errors.legal_street_number[0];
                        setTimeout(() => {
                            this.setStreetN = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_city) {
                        this.setCity = error.response.data.errors.legal_city[0];
                        setTimeout(() => {
                            this.setCity = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_zip_code) {
                        this.setZipCode = error.response.data.errors.legal_zip_code[0];
                        setTimeout(() => {
                            this.setZipCode = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.legal_contact_phone) {
                        this.setPhone = error.response.data.errors.legal_contact_phone[0];
                        setTimeout(() => {
                            this.setPhone = "";
                        }, 10000);
                    }
                }
            }
        },
    }
});
