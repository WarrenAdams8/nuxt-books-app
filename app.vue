<script setup>
const groups = [{
  key: 'users',
  debounce: 300,
  label: q => q && `Users matching “${q}”...`,
  search: async (q) => {
    if (!q) {
      return []
    }

    const books = await $fetch('https://www.googleapis.com/books/v1/volumes', { params: { q } })
    if (!books.items) {
      return []
    }
    console.log(books.items)

    return books.items.map(book => ({
      id: book.id,
      label: book.volumeInfo.title,
      suffix: book.volumeInfo.authors ? book.volumeInfo.authors[0] : "N/A"
    }))
  }
}]

async function onSelect(option) {
  console.log(option.id)
  await navigateTo(`/bookDetails/${option.id}`)
}

const ui = {
  wrapper: 'flex flex-col flex-1 min-h-0 divide-y divide-gray-200 dark:divide-gray-700 bg-book-paper-white-500 dark:bg-gray-800',
  container: 'relative flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 scroll-py-2',
  input: {
    base: 'w-full h-14 px-4 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none'
  },
  group: {
    label: 'px-2 my-2 text-xs font-semibold text-gray-500 dark:text-gray-400',
    container: 'text-primary-blue',
    command: {
      base: 'flex justify-between select-none cursor-default items-center rounded-md px-2 py-2 gap-2 relative',
      active: 'bg-clay-ash-300 text-primary-blue',
      inactive: 'text-red',
      container: 'flex items-center gap-3 min-w-0',
      icon: {
        base: 'flex-shrink-0 w-5 h-5',
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-400 dark:text-gray-500'
      },
      avatar: {
        size: '2xs'
      }
    }
  }
}

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
  <CommandPalette />
</template>
