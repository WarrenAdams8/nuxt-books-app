<script setup>
import { useWishlistStore } from '@/stores/wishlistStore';
import { useBagStore } from '@/stores/bagStore';

const store = useWishlistStore()
const BagStore = useBagStore()


const route = useRoute()
const { data, pending, error, refresh } = await useFetch(`https://www.googleapis.com/books/v1/volumes/${route.params.id}`)
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
    <UButton label="add to wishlist" class="m-4" @click="store.addToWishlist(data)"  />
    <UButton label="add to bag" class="m-4" @click="BagStore.addToBag(data)"/>
</template>