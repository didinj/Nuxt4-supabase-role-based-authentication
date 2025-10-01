import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    // Create Supabase client using runtime config
    const supabase: SupabaseClient = createClient(
        config.public.supabaseUrl as string,
        config.public.supabaseKey as string
    )

    return {
        provide: {
            supabase
        }
    }
})
