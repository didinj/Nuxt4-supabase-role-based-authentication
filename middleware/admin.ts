import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"
import { useAuth } from "../composables/useAuth"

export default defineNuxtRouteMiddleware(() => {
    const { role } = useAuth()

    if (role.value !== "admin") {
        return navigateTo("/") // Redirect non-admins to home
    }
})