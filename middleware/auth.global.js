
// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware((to) => {
    // eslint-disable-next-line no-undef
    const accessToken = useCookie("accessToken").value;
    if (accessToken && to.path === "/account") {
        // eslint-disable-next-line no-undef
        return navigateTo("/profile")
    }
    if (!accessToken && to.path === "/profile") {
        // eslint-disable-next-line no-undef
        return navigateTo("/account")
    }
    // eslint-disable-next-line no-undef
    if (to.path === "/checkout" && !useCookie("canCheckout").value) {
        // eslint-disable-next-line no-undef
        return navigateTo("/shop")
    }
})
