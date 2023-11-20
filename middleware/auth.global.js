export default defineNuxtRouteMiddleware((to) => {
    const accessToken = useCookie("accessToken").value;
    if (accessToken && to.path === "/account") {
        return navigateTo("/profile")
    }
    if (!accessToken && to.path === "/profile") {
        return navigateTo("/account")
    }
    if (to.path === "/checkout" && !useCookie("canCheckout").value) {
        return navigateTo("/shop")
    }
})
