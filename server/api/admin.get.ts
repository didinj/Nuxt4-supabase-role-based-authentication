import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
    }

    // Fetch user role from profiles
    const { data: profile } = await client
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

    if (!profile || profile.role !== "admin") {
        throw createError({ statusCode: 403, statusMessage: "Forbidden: Admins only" })
    }

    return { message: "Welcome, Admin! 🎉 You can access this API." }
})
