<script setup>
import { useBagStore } from '@/stores/bagStore';

const store = useBagStore()

const { bag, total } = storeToRefs(store)
const { removeItemFromBag } = store


</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
        <UCard v-for="book in bag">
            <template #header>
                <NuxtLink :to="`/bookDetails/${book.id}`">
                    <p>{{ book.title }}</p>
                </NuxtLink>
            </template>
            <NuxtLink :to="`/bookDetails/${book.id}`">
                <img :src="book.thumbnail" alt="" class="mx-auto">
            </NuxtLink>
            <template #footer>
                <UButton label="remove" @click="removeItemFromBag(book)" color="red" />
                <p>{{ book.price }}</p>
            </template>
        </UCard>
    </div>
    <div>
        <p class="text-3xl p-10">${{ total }}</p>
    </div>
    <NuxtLink to="/checkout">
        <UButton class="m-10" label="checkout" @click="" color="red" />
    </NuxtLink>
</template>