<script setup>
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
</template>