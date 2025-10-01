<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">Register</h2>

    <form @submit.prevent="handleRegister" class="space-y-4">
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
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>

    <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-3">Registration successful! 🎉</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useNuxtApp } from "nuxt/app"

const { $supabase } = useNuxtApp() as unknown as { $supabase: any }

const email = ref("")
const password = ref("")
const error = ref("")
const success = ref(false)

const handleRegister = async () => {
  error.value = ""
  success.value = false

  const { data, error: signUpError } = await $supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (signUpError) {
    error.value = signUpError.message
  } else {
    // Insert user profile with default role = 'user'
    if (data.user) {
      await $supabase.from("profiles").insert([
        {
          id: data.user.id,
          email: data.user.email,
          role: "user",
        },
      ])
    }
    success.value = true
  }
}
</script>
