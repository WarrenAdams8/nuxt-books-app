<script setup>
const regex = /\d{4}/g;
const groups = [{
    key: 'books',
    debounce: 300,
    search: async (q) => {
        if (!q) {
            return []
        }

        const books = await $fetch('https://www.googleapis.com/books/v1/volumes',
            {
                params: {
                    q: q,
                    filter: 'paid-ebooks',
                }
            })

        if (!books.items) {
            return []
        }
        console.log(books.items)

        return books.items.map(book => ({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors : "",
            date: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.match(regex)[0] : "N/A",
            rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : "N/A",
            img: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "N/A",
            pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "N/A",
            maturityRating: book.volumeInfo.maturityRating ? book.volumeInfo.maturityRating : "N/A",
        }))
    }
}]

async function onSelect(option) {
    await navigateTo(`/bookDetails/${option.id}`)
}

const ui = /*ui*/ {
    wrapper: 'flex flex-col flex-1 min-h-0 divide-y divide-gray-300 bg-book-paper-white-500',
    input: {
        base: 'w-full h-14 px-4 placeholder-gray-400 bg-transparent border-0 text-gray-900 focus:ring-0 focus:outline-none'
    },
    group: {
        wrapper: "p-0",
        container: 'text-primary-blue divide-y divide-gray-300 font-medium',
        command: {
            base: 'rounded-none',
            active: 'bg-clay-ash-300 text-primary-blue font-medium',
        }
    }
}

const modalUi = {
    height: 'max-h-96'
}

const isOpen = ref(false)

</script>
<template>
    <UButton @click="isOpen = true" size="xl" variant="outline" icon="i-heroicons-magnifying-glass-20-solid"
        class="m-2 sm:max-w-20 sm:hidden " />
    <UButton label="Search" @click="isOpen = true" size="xl" variant="outline" icon="i-heroicons-magnifying-glass-20-solid"
        class="w-44 m-2 max-sm:hidden" />
    <UModal v-model="isOpen" :ui="modalUi">
        <UCommandPalette :ui="ui" :groups="groups" :autoselect="false" @update:model-value="onSelect">
            <template #books-command="{ command }" @click="isOpen = false">
                <article class="flex items-start space-x-6 p-6">
                    <img :src="command.img" alt="" width="60" height="88" class="flex-none rounded-md bg-slate-200" />
                    <div class="min-w-0 relative flex-auto">
                        <h2 class="font-semibold text-primary-blue-500 truncate pr-10">{{ command.title }}</h2>
                        <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                            <div class="absolute top-0 right-0 flex items-center space-x-1">
                                <dt class="text-book-blue-400">
                                    <span class="sr-only">star rating</span>
                                    <UIcon name="i-heroicons-star-20-solid" />
                                </dt>
                                <dd>{{ command.rating }}</dd>
                            </div>
                            <div v-if="command.maturityRating && command.maturityRating === 'MATURE'">
                                <dt class="sr-only">Rating</dt>
                                <dd class="px-1.5 ring-1 ring-slate-200 rounded">{{ command.maturityRating }}</dd>
                            </div>
                            <div class="ml-2">
                                <dt class="sr-only">Year</dt>
                                <dd>{{ command.date }}</dd>
                            </div>
                            <div>
                                <dt class="sr-only">page count</dt>
                                <dd class="flex items-center">
                                    <svg width="2" height="2" fill="currentColor" class="mx-2 text-slate-600"
                                        aria-hidden="true">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                    {{ command.pageCount }} pages
                                </dd>
                            </div>
                            <div class="flex-none w-full mt-2 font-normal">
                                <dt class="sr-only">Authors</dt>
                                <dd v-for="author in command.authors" class="text-slate-600">{{ author }}</dd>
                            </div>
                        </dl>
                    </div>
                </article>
            </template>
        </UCommandPalette>
    </UModal>
</template>
