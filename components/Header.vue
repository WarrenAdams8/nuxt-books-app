<script setup>

const user = useSupabaseUser();
const router = useRouter();
const { auth } = useSupabaseClient();

async function logout() {
    try {
        const { error } = await auth.signOut();
        if (error) throw error;
        router.push("/login");
    } catch (error) {
        console.log(error.message);
    }
}



</script>
<template>
    <nav class="sticky h-16 top-0 z-50 border-b border-book-blue-500 bg-background/75 backdrop-blur">
        <div class="flex items-center justify-between mx-auto px-4 md:px-12">
            <ULink class="font-bold text-xl" to="/" active-class="text-primary-blue" inactive-class="text-primary-blue">
                BOOKS.
            </ULink>

            <div class="flex items-center gap-1.5 justify-end">
                <CommandPalette />
                <NuxtLink to="/wishlist">
                    <UButton icon="i-heroicons-heart" size="xl" color="primary" variant="ghost" class="p-1" />
                </NuxtLink>
                <NuxtLink to="/bag">
                    <UButton icon="i-heroicons-shopping-bag" size="xl" color="primary" variant="ghost" class="p-1" />
                </NuxtLink>
                <UPopover mode="hover">
                    <UAvatar src="https://avatar.iran.liara.run/public/47" alt="avatar" size="md" />
                    <template #panel>
                        <div class="flex flex-col p-4">
                            <NuxtLink to="/account">
                                <UButton label="account" size="xl" color="primary" variant="ghost" class="p-1" />
                            </NuxtLink>
                            <NuxtLink v-if="!user" to="/login">
                                <UButton label="sign in" size="xl" color="primary" variant="ghost" class="p-1" />
                            </NuxtLink>
                            <UButton v-else label="sign out" size="xl" color="primary" variant="ghost" class="p-1"
                                @click="logout" />
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>

    </nav>
</template>