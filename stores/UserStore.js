import { defineStore } from 'pinia';
import axios from 'axios';
import { useCartStore } from './CartStore';

// Define the store named 'useUserStore'
export const useUserStore = defineStore('UserStore', {
    // Define the state of the store
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

    // Define actions
    actions: {
        //Register new user
        async registerUser(registrationData) {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/register');
            await axios.post(url.toString(), registrationData)
                .then(response => {
                        this.registerMessage = response.data.message
                })
                .catch(error => {
                    if (error.response.data.errors) {
                        this.registerMessage = error.response.data.message
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
                                this.confirmPasswordError = ''; // 
                            }, 10000);
                        }
                    }
                });
        },
        //Login user
        async loginUser(loginData) {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/login');
            try {
                const response = await axios.post(url.toString(), loginData);
                const userData = response.data;

                if (userData && userData.data && userData.data.token) {
                    // eslint-disable-next-line no-undef
                    const accessToken = useCookie("accessToken", { maxAge: 172800 });
                    accessToken.value = userData.data.token;
                    this.isLoggedIn = true;
                    await this.getUser();
                }

            } catch (error) {
                if (error.response && error.response.data.errors) {
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
            // eslint-disable-next-line no-undef
            if (useCookie("accessToken").value) {
                try {
                    const userResponse = await axios.get('/proxy/users/auth', {
                        headers: {
                            // eslint-disable-next-line no-undef
                            Authorization: `Bearer ${useCookie("accessToken").value}`
                        }
                    });
                    if (userResponse.status === 200) {
                        this.authUser = userResponse.data.data;
                        this.isLoggedIn = true;
                    }

                } catch (error) {
                    //
                }
            }
        },
        // Send email for password reset
        async sendPasswordReset(resetEmail) {
            console.log(resetEmail)
            axios
                // eslint-disable-next-line no-undef
                .post(useRuntimeConfig().public.APP_URL + "/proxy/users/forgot-password", {
                    email: resetEmail,
                })
                .then(() => {
                    this.resetMessage = "Reset Password sent successfull"
                })
                .catch(() => {
                    this.resetMessage = "Reset Password error"
                });
        },
        // Change or create default shipping data.
        async changeShippingData(addressData) {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/change-shipping-data');

            try {
                const response = await axios.put(url.toString(), addressData, {
                    headers: {
                        // eslint-disable-next-line no-undef
                        Authorization: `Bearer ${useCookie("accessToken").value}`
                    }
                });
                this.changeDataMsg = response.data.message;
            } catch (error) {
                this.changeDataMsg = error.response.data.message;
                console.log(error.response.data.message);
            }
        },
        // Load user default shipping data.
        async loadDefaultShippingData() {
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/get-shipping-data');

            // eslint-disable-next-line no-undef
            if (useCookie("accessToken").value) {
                try {
                    const response = await axios.get(url.toString(), {
                        headers: {
                            // eslint-disable-next-line no-undef
                            Authorization: `Bearer ${useCookie("accessToken").value}`
                        }
                    });
                    console.log(response.data);
                    this.defaultUserShippingData = response.data.data
                } catch (error) {
                    console.log(error.response.data.message);
                }
            }
        },
        // load order's user from id
        async loadOrderUser() {
            this.loading = true; // Shows the loader while loading
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + `/proxy/orders`);

            try {
                const response = await axios.get(url.toString(), {
                    headers: {
                        // eslint-disable-next-line no-undef
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
            // eslint-disable-next-line no-undef
            const url = new URL(useRuntimeConfig().public.APP_URL + '/proxy/users/logout');
            const userId = this.authUser.id;
            axios.post(url.toString(), userId, {
                headers: {
                    // eslint-disable-next-line no-undef
                    Authorization: `Bearer ${useCookie("accessToken").value}`
                }
            })
                .then(() => {
                    // eslint-disable-next-line no-undef
                    useCookie("accessToken").value = null;
                    this.isLoggedIn = false;
                    this.authUser = [];
                    // eslint-disable-next-line no-undef
                    useCartStore().cartItem.user_hash = useCookie("userHash").value;
                    this.$router.push("/shop")
                });
        },


    }
});
