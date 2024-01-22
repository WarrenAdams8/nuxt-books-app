<script setup>

import { useWishlistStore } from '@/stores/wishlistStore';

const store = useWishlistStore()

const { wishlist } = storeToRefs(store)

const { removeItemFromWishlist } = store
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
        <UCard v-for="book in wishlist">
            <template #header>
                <NuxtLink :to="`/bookDetails/${book.id}`">
                    <p>{{ book.volumeInfo.title }}</p>
                </NuxtLink>
            </template>
            <NuxtLink :to="`/bookDetails/${book.id}`">
                <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" class="mx-auto">
            </NuxtLink>
            <template #footer>
                <UButton label="Remove" color="red" @click="removeItemFromWishlist(book)" />
            </template>
        </UCard>
    </div>
</template>