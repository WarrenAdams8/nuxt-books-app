<script setup>
const { data, pending, error, refresh } = await useFetch('https://www.googleapis.com/books/v1/volumes?q=Harry Potter&maxResults=30&filter=paid-ebooks')
</script>
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-3">
    <BookCard v-for="book in data.items" :key="book.id" :book="book"/>
  </div>
</template>
