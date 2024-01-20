<script setup>
const { data, pending, error, refresh } = await useFetch('https://www.googleapis.com/books/v1/volumes?q=Harry Potter&maxResults=30&filter=paid-ebooks')
</script>
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
    <UCard v-for="book in data.items">
      <template #header>
        <NuxtLink :to="`/bookDetails/${book.id}`">
          <p>{{ book.volumeInfo.title }}</p>
        </NuxtLink>
      </template>
      <NuxtLink :to="`/bookDetails/${book.id}`">
        <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" class="mx-auto">
      </NuxtLink>
    </UCard>
  </div>
</template>
