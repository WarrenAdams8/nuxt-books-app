<script setup>
import { loadStripe } from '@stripe/stripe-js'
import { useBagStore } from '@/stores/bagStore';

const store = useBagStore()

const { bag, total } = storeToRefs(store)
const { removeItemFromBag } = store

async function takePayment() {
    const config = useRuntimeConfig()
    console.log(config)
    const stripe = await loadStripe(config.public.stripePk)

    const lineItems = []
    bag.value.forEach(book => {
        lineItems.push({
            price_data: {
                currency: "usd",
                unit_amount:
                    book.saleInfo.listPrice.amount.toFixed(2) * 100,
                product_data: {
                    name: book.volumeInfo.title
                }
            },
            quantity: 1,
        })
    })

    console.log(lineItems)

    const { error } = await stripe.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: `${config.public.appUrl}/success`,
        cancelUrl: `${config.public.appUrl}`
    })
}


</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-10">
        <UCard v-for="book in bag">
            <template #header>
                <NuxtLink :to="`/bookDetails/${book.id}`">
                    <p>{{ book.volumeInfo.title }}</p>
                </NuxtLink>
            </template>
            <NuxtLink :to="`/bookDetails/${book.id}`">
                <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" class="mx-auto">
            </NuxtLink>
            <template #footer>
                <UButton label="remove" @click="removeItemFromBag(book)" color="red" />
                <p>{{ book.saleInfo.listPrice.amount }}</p>
            </template>
        </UCard>
    </div>
    <div>
        <p class="text-3xl p-10">${{ total.toFixed(2) }}</p>
    </div>
    <UButton class="m-10" label="checkout" @click="takePayment" color="red" />
</template>