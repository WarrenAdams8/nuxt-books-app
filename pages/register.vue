<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const { auth } = useSupabaseClient();
const errorMsg = ref(null)
const successMsg = ref("")

async function onSignUp(event: FormSubmitEvent<Schema>) {

  try {
    const { data, error } = await auth.signUp({
      email: event.data.email,
      password: event.data.password,
    });
    if (error) throw error;
    successMsg.value = "Check your email to confirm your account";
  } catch (error : any){
    errorMsg.value = error.message

  }


  console.log(event.data.email)
  console.log(event.data.password)
}
</script>

<template>
  <div class="w-[350px] mx-auto m-16">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSignUp">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>

