<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Admin Dashboard</h1>
    <p>Welcome, only admins can see this page.</p>
  </div>
</template>

<script setup lang="ts">
// Protect this page with admin middleware
definePageMeta({
  middleware: ["auth", "admin"],
})
</script>
