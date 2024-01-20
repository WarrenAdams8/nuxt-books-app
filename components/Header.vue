<script setup>
</script>
<template>
    <nav class="sticky h-16 top-0 z-50 border-b border-book-blue-500 bg-background/75 backdrop-blur">
        <div class="flex items-center justify-between mx-auto px-12">
            <ULink class="font-bold text-xl" to="/" active-class="text-primary-blue" inactive-class="text-primary-blue">
                BOOKS.
            </ULink>

            <div class="flex items-center gap-1.5 justify-end">
                <CommandPalette />
                <NuxtLink to="/wishlist">
                    <UButton icon="i-heroicons-heart" size="xl" color="primary" variant="ghost" class="p-1" />
                </NuxtLink>
                <NuxtLink to="/checkout">
                    <UButton icon="i-heroicons-shopping-bag" size="xl" color="primary" variant="ghost" class="p-1" />
                </NuxtLink>
                <UPopover mode="hover">
                    <UAvatar src="https://avatar.iran.liara.run/public/47" alt="avatar" size="md" />
                    <template #panel>
                        <div class="flex flex-col p-4">
                            <ULink class="pb-1">Account</ULink>
                            <ULink>Sign out</ULink>
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>

    </nav>
</template>