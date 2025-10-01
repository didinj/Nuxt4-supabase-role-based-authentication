<template>
  <nav class="flex gap-4 p-4 bg-gray-100">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink v-if="role === 'admin'" to="/admin">Admin</NuxtLink>
    <NuxtLink v-if="role === 'editor'" to="/editor">Editor</NuxtLink>
    <NuxtLink to="/profile">Profile</NuxtLink>

    <button
      v-if="user"
      @click="handleLogout"
      class="ml-auto bg-red-600 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
    <NuxtLink v-else to="/login" class="ml-auto">Login</NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from "../../composables/useAuth"

const { user, role, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>
