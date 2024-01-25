<script setup>
import { useWishlistStore } from '@/stores/wishlistStore';
import { useBagStore } from '@/stores/bagStore';

const store = useWishlistStore()
const BagStore = useBagStore()

const toast = useToast()



const route = useRoute()
const { data, pending, error, refresh } = await useFetch(`https://www.googleapis.com/books/v1/volumes/${route.params.id}`)

const supabase = useSupabaseClient()
async function addToSupabase() {
    try {
        const user = useSupabaseUser()

        const updates = {
            user_id: user.value.id,
            book_id: data.value.id,
            book_info: data.value,
        }

        const { error } = await supabase.from('wishlist_item')
        .upsert(updates, { returning: 'minimal' })
        .eq("user_id", user.value.id)

        toast.add({ title: "Book added to wishlist" });

        if (error) throw error
    } catch (error) {
        console.log(error.code)
    }

}



const img = data.value.volumeInfo.imageLinks.thumbnail + '&fife=w800-h900'

let strippedHtml = ""

if (data.value.volumeInfo.description) {

    strippedHtml = data.value.volumeInfo.description.replace(/(<([^>]+)>)/gi, "")
} else {
    strippedHtml = 'No description'
}
</script>
<template>
    <img class="mx-auto" :src="img" />
    <p>{{ strippedHtml }}</p>
    <UButton label="add to supabase" class="m-4" @click="addToSupabase" />
    <UButton label="add to wishlist" class="m-4" @click="store.addToWishlist(data)" />
    <UButton label="add to bag" class="m-4" @click="BagStore.addToBag(data)" />
</template>