<script setup>
import { useWishlistStore } from '@/stores/wishlistStore';

const store = useWishlistStore()
const { wishlist } = storeToRefs(store)
const { removeItemFromWishlist } = store

const client = useSupabaseClient()
const user = useSupabaseUser()


let { data: wishlist_items } = await useAsyncData('wishlist_items', async () => {
    const { data, error } = await client.from('wishlist_item').select("book_info").eq("user_id", user.value.id)

    const items = []
    data.forEach((item) => {
        items.push(item.book_info)
    })
    console.log(error)

    return items

})


//TODO:Duplicate code
const toast = useToast()
async function removeFromSupabase(id) {
    try {

        const { error } = await client.from('wishlist_item')
        .delete()
        .eq("user_id", user.value.id)
        .eq('book_id', id)


        toast.add({ title: "Book removed from wishlist" });
        


        const { data: new_wishlist_items } = await useAsyncData('wishlist_items', async () => {
            const { data, error } = await client.from('wishlist_item').select("book_info").eq("user_id", user.value.id)

            const items = []
            data.forEach((item) => {
                items.push(item.book_info)
            })
            console.log(error)

            return items

        })

        wishlist_items = new_wishlist_items

        if (error) throw error
    } catch (error) {
        alert(error.message)
    }

}


</script>
<template>
    <div v-if="user.role === 'authenticated'" class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
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