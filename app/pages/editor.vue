<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Editor Dashboard</h1>
    <p>Welcome, editors can see this page.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"], // Require login
})
</script>
