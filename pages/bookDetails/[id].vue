<script setup>
import { useWishlistStore } from '@/stores/wishlistStore';
import { useBagStore } from '@/stores/bagStore';

const store = useWishlistStore()
const BagStore = useBagStore()

const toast = useToast()

const route = useRoute()
const { data } = await useFetch(`https://www.googleapis.com/books/v1/volumes/${route.params.id}`, {
    transform: (response) => {
        console.log(useTransformBook(response))
        return useTransformBook(response)
    }
})
//TODO:Make wishlist max out at 100
const user = useSupabaseUser()
const supabase = useSupabaseClient()
async function addToSupabase() {
    try {

        const updates = {
            user_id: user.value.id,
            book_id: data.value.id,
            book_info: data.value,
        }

        const { error } = await supabase.from('wishlist_item')
            .upsert(updates, { returning: 'minimal' })
            .eq("user_id", user.value.id)


        if (error) {
            toast.add({ title: "Book already in wishlist" });
            throw error
        } else {
            toast.add({ title: "Book added to wishlist" });
        }
    } catch (error) {
        console.log(error.code)
    }

}


</script>
<template>
    <div id="colored-overlay">
        <img class="mx-auto w-1/2 py-5 drop-shadow-2xl" :src="data.image" />
    </div>
    <div class="prose prose-h2:text-stone-500 m-4">
        <h1>{{ data.title }}</h1>
        <h2>{{ data.authors[0] }}</h2>
        <p>{{ data.description }}</p>
    </div>
    <div class="flex justify-evenly sticky h-16 bottom-0 z-50 border-t border-book-blue-500 bg-background/75 backdrop-blur">
        <UButton v-if="user" label="add to Wishlist" class="m-2" size="xl" @click="addToSupabase" />
        <UButton v-else label="add to wishlist" class="m-2" size="xl" @click="store.addToWishlist(data)" />
        <UButton label="add to bag" class="m-2" size="xl" @click="BagStore.addToBag(data)" />
    </div>
</template>