// Import necessary dependencies
import { defineStore } from 'pinia';
import axios from 'axios';
import { useCartStore } from './CartStore';

// Define the 'UserStore' store
export const useUserStore = defineStore('UserStore', {
    // Define the initial state of the store
    state: () => {
        return {
            authUser: [],
            isLoggedIn: false,
            registerMessage: "",
            emailLoginError: "",
            passwordLoginError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            resetMessage: "",
            setDataShipping: "",
            changeDataMsg: "",
            defaultUserShippingData: [],
            orders: "",
            loading: true,
        }
    },

    // Define getters
    getters: {
        login: (state) => state.isLoggedIn,
        user: (state) => state.authUser,
    },

    // Define actions (methods that can be called to perform asynchronous operations)
    actions: {
        // Register new user
        async registerUser(registrationData) {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/register');

            try {
                const response = await axios.post(url.toString(), registrationData);
                this.registerMessage = response.data.message;
            } catch (error) {
                if (error.response.data.errors) {
                    this.registerMessage = error.response.data.message;

                    // Handle specific errors and update state variables accordingly
                    if (error.response.data.errors.email) {
                        this.emailError = error.response.data.errors.email[0];
                        setTimeout(() => {
                            this.emailError = '';
                        }, 10000);
                    }
                    if (error.response.data.errors.password) {
                        this.passwordError = error.response.data.errors.password[0];
                        setTimeout(() => {
                            this.passwordError = '';
                        }, 10000);
                    }
                    if (error.response.data.errors.password_confirmation) {
                        this.confirmPasswordError = error.response.data.errors.password_confirmation[0];
                        setTimeout(() => {
                            this.confirmPasswordError = '';
                        }, 10000);
                    }
                }
            }
        },

        // Login user
        async loginUser(loginData) {

            // Add days to date
            Date.prototype.addDays = function (days) {
                const date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
            const date = new Date();

            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/login');

            try {
                const response = await axios.post(url.toString(), loginData);
                const userData = response.data;

                if (userData && userData.data && userData.data.token) {
                    const accessToken = useCookie("accessToken", { expires: date.addDays(5) });
                    accessToken.value = userData.data.token;
                    this.isLoggedIn = true;
                    await this.getUser();
                }
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    // Handle specific errors and update state variables accordingly
                    if (error.response.data.errors.email) {
                        this.emailLoginError = error.response.data.errors.email[0];
                        setTimeout(() => {
                            this.emailLoginError = "";
                        }, 10000);
                    }
                    if (error.response.data.errors.password) {
                        this.passwordLoginError = error.response.data.errors.password[0];
                        setTimeout(() => {
                            this.passwordLoginError = "";
                        }, 10000);
                    }
                }
            }
        },

        // Get the logged-in user
        async getUser() {
            if (useCookie("accessToken").value) {
                try {
                    const userResponse = await axios.get('/proxy/users/auth', {
                        headers: {
                            Authorization: `Bearer ${useCookie("accessToken").value}`
                        }
                    });
                    if (userResponse.status === 200) {
                        this.authUser = userResponse.data.data;
                        this.isLoggedIn = true;
                    }
                } catch (error) {
                    // Handle errors if necessary
                }
            }
        },

        // Send email for password reset
        async sendPasswordReset(resetEmail) {
            axios.post(useRuntimeConfig().public.APP_URL + "/proxy/users/forgot-password", {
                email: resetEmail,
            })
                .then(() => {
                    this.resetMessage = "Reset Password sent successfully";
                })
                .catch(() => {
                    this.resetMessage = "Reset Password error";
                });
        },

        // Change or create default shipping data
        async changeShippingData(addressData) {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/change-shipping-data');

            try {
                const response = await axios.put(url.toString(), addressData, {
                    headers: {
                        Authorization: `Bearer ${useCookie("accessToken").value}`
                    }
                });
                this.changeDataMsg = response.data.message;
            } catch (error) {
                this.changeDataMsg = error.response.data.message;
            }
        },

        // Load user default shipping data
        async loadDefaultShippingData() {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/get-shipping-data');

            if (useCookie("accessToken").value) {
                try {
                    const response = await axios.get(url.toString(), {
                        headers: {
                            Authorization: `Bearer ${useCookie("accessToken").value}`
                        }
                    });
                    this.defaultUserShippingData = response.data.data;
                } catch (error) {
                    // Handle errors if necessary
                }
            }
        },

        // Load user orders
        async loadOrderUser() {
            this.loading = true; // Shows the loader while loading
            const url = new URL(useRuntimeConfig().public.APP_URL + `/proxy/orders`);

            try {
                const response = await axios.get(url.toString(), {
                    headers: {
                        Authorization: `Bearer ${useCookie("accessToken").value}`
                    }
                });

                this.orders = response.data;
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                this.loading = false; // Hides the loader after loading
            }
        },

        // Logout user
        logoutUser() {
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/logout');
            const userId = this.authUser.id;

            axios.post(url.toString(), userId, {
                headers: {
                    Authorization: `Bearer ${useCookie("accessToken").value}`
                }
            })
                .then(() => {
                    useCookie("accessToken").value = null;
                    this.isLoggedIn = false;
                    this.authUser = [];
                    useCartStore().cartItem.user_hash = useCookie("userHash").value;
                    this.$router.push("/shop");
                });
        },
    }
});
