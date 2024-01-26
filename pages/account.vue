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

// console.log(user.value.email)
</script>
<template>
    <div class="container mx-auto p-32">
        {{ user?.email }}
        <UButton label="logout" @click="logout" />
    </div>
</template>