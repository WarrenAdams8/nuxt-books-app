<script setup>
import { useWishlistStore } from '@/stores/wishlistStore';

const store = useWishlistStore()
const { wishlist } = storeToRefs(store)
const { removeItemFromWishlist } = store

const client = useSupabaseClient()
const user = useSupabaseUser()

let { data: wishlist_items, refresh } = await useAsyncData('wishlist_items', async () => {
    const { data, error } = await client.from('wishlist_item').select("book_info").eq("user_id", user.value.id)

    const items = []
    data.forEach((item) => {
        items.push(item.book_info)
    })

    return items

})


const toast = useToast()
async function removeFromSupabase(id) {
    try {

        const { error } = await client.from('wishlist_item')
        .delete()
        .eq("user_id", user.value.id)
        .eq('book_id', id)


        toast.add({ title: "Book removed from wishlist" });
        
        refresh()

        if (error) throw error
    } catch (error) {
        alert(error.message)
    }

}


</script>
<template>
    <div v-if="user" class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
        <UCard v-for="book in wishlist_items">
            <template #header>
                <NuxtLink :to="`/bookDetails/${book.id}`">
                    <p>{{ book.volumeInfo.title }}</p>
                </NuxtLink>
            </template>
            <NuxtLink :to="`/bookDetails/${book.id}`">
                <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" class="mx-auto">
            </NuxtLink>
            <template #footer>
                <UButton label="Remove" color="red" @click="removeFromSupabase(book.id)" />
            </template>
        </UCard>
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
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