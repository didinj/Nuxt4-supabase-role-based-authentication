<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">Login</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full border p-2 rounded"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Login
      </button>
    </form>

    <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useNuxtApp } from "nuxt/app"
import { useAuth } from "../../composables/useAuth"

const { $supabase } = useNuxtApp() as unknown as { $supabase: any }
const { user, getUser } = useAuth()

const email = ref("")
const password = ref("")
const error = ref("")

const handleLogin = async () => {
  error.value = ""

  const { data, error: signInError } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (signInError) {
    error.value = signInError.message
  } else {
    await getUser()
  }
}
</script>
