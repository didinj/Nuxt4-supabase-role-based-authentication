<script setup lang="ts">
import { ref } from "vue"

const publicMessage = ref("")
const protectedMessage = ref("")
const adminMessage = ref("")
const error = ref("")

const loadData = async () => {
  try {
    publicMessage.value = await $fetch("/api/public").then(r => r.message)
    protectedMessage.value = await $fetch("/api/protected").then(r => r.message)
    adminMessage.value = await $fetch("/api/admin").then(r => r.message)
  } catch (err: any) {
    error.value = err?.data?.statusMessage || "Error fetching API"
  }
}

onMounted(loadData)
</script>

<template>
  <div class="p-6 space-y-3">
    <h1 class="text-2xl font-bold">Profile API Test</h1>

    <p><strong>Public:</strong> {{ publicMessage }}</p>
    <p><strong>Protected:</strong> {{ protectedMessage }}</p>
    <p><strong>Admin:</strong> {{ adminMessage }}</p>
    <p v-if="error" class="text-red-600">Error: {{ error }}</p>
  </div>
</template>
