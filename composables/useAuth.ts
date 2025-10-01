import { useNuxtApp, useState } from "nuxt/app"

export const useAuth = () => {
    const user = useState<any>("user", () => null)
    const role = useState<string>("role", () => "guest")
    const { $supabase } = useNuxtApp() as unknown as { $supabase: any }

    const getUser = async () => {
        const { data, error } = await $supabase.auth.getUser()
        if (!error && data.user) {
            user.value = data.user

            // Fetch role from profiles table
            const { data: profile } = await $supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single()

            if (profile) {
                role.value = profile.role
            }
        }
    }

    // 🔥 New: check for active session on app start
    const initAuth = async () => {
        const {
            data: { session },
        } = await $supabase.auth.getSession()

        if (session?.user) {
            user.value = session.user

            const { data: profile } = await $supabase
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single()

            if (profile) {
                role.value = profile.role
            }
        }
    }

    const logout = async () => {
        await $supabase.auth.signOut()
        user.value = null
        role.value = "guest"
    }

    return { user, role, getUser, initAuth, logout }
}