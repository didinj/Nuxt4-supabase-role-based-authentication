import { serverSupabaseUser } from "#supabase/server"

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
    }

    return { message: `Hello ${user.email}, you are logged in!` }
})
