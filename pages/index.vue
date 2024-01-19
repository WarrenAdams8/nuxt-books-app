<script setup>
</script>
<template>
  <UCard class="m-10 max-w-96 mx-auto my-72" :ui="{ background: 'bg-book-paper-white-500' }">
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-xl font-medium">Welcome to Nuxt UI Starter</h1>
      </div>
    </template>
    <div class="flex justify-between">
      <UButton class="mx-1" size="xl" to="https://ui.nuxt.com" target="_blank" variant="solid">Nuxt UI</UButton>
      <UButton class="mx-1" size="xl" to="https://ui.nuxt.com" target="_blank" variant="outline">Nuxt UI</UButton>
      <UButton class="mx-1" size="xl" to="https://ui.nuxt.com" target="_blank" variant="ghost">Nuxt UI</UButton>
    </div>
  </UCard>
  </template>
