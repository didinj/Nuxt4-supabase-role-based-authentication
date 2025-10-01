import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"
import { useAuth } from "../composables/useAuth"

export default defineNuxtRouteMiddleware((to) => {
    const { user } = useAuth()

    // Redirect to login if not authenticated
    if (!user.value && to.path !== "/login" && to.path !== "/register") {
        return navigateTo("/login")
    }
})
