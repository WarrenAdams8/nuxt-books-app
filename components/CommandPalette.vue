<script setup>
const regex = /\d{4}/g;
const groups = [{
    key: 'books',
    debounce: 300,
    label: q => q && `Books matching “${q}”...`,
    search: async (q) => {
        if (!q) {
            return []
        }

        const books = await $fetch('https://www.googleapis.com/books/v1/volumes', { params: { q } })
        if (!books.items) {
            return []
        }
        console.log(books.items)

        return books.items.map(book => ({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors : "N/A",
            date: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.match(regex)[0] : "N/A",
            rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : "N/A",
            img: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "N/A",
            PageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "N/A",
            maturityRating: book.volumeInfo.maturityRating ? book.volumeInfo.maturityRating : "N/A",
        }))
    }
}]

async function onSelect(option) {
    console.log(option.id)
    await navigateTo(`/bookDetails/${option.id}`)
}

const ui = {
    wrapper: 'bg-book-paper-white-500',
    group: {
        container: 'text-primary-blue divide-y divide-slate-200 font-medium',
        command: {
            active: 'bg-clay-ash-300 text-primary-blue font-medium',
            container: ''
        }
    }
}

const modalUi = {
    height: 'max-h-96'
}

const isOpen = ref(false)

</script>
<template>
    <UButton label="Open" @click="isOpen = true" size="xl" class="m-6" />
    <UModal v-model="isOpen" :ui="modalUi">
        <UCommandPalette :ui="ui" :groups="groups" :autoselect="false" @update:model-value="onSelect">
            <template #books-command="{ command }">
                <h1>{{ command.title }}</h1>
            </template>
        </UCommandPalette>
    </UModal>
</template>
