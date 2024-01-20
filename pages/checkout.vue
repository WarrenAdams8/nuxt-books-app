<script setup>

import { useBagStore } from '@/stores/bagStore';

const store = useBagStore()

const { bag } = storeToRefs(store)
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
        <UCard v-for="book in bag">
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