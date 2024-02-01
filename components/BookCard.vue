<script setup>
import { useBagStore } from '@/stores/bagStore';

const BagStore = useBagStore()


const props = defineProps(['book'])
</script>
<template>
    <div class="flex relative w-48 h-80 border-2 border-cyan-400">
        <div>
            <NuxtLink :to="`/bookDetails/${book.id}`">
                <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" class="mx-auto w-40">
                <p class="line-clamp-2 overflow-hidden text-ellipsis">{{ book.volumeInfo.title }}</p>
                <p class="text-slate-400">{{ book.volumeInfo.authors[0] }}</p>
            </NuxtLink>
        </div>
    </div>
</template> 