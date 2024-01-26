// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appUrl: "http://localhost:3000",
      stripePk:
        "pk_test_51OctRmJMy9YqO9u2wDgKSNPE0mhaFGLLHwpaZFe7fnvpt4im8L0UlVMQ4RbAkcvHvpIFSiAHJhYNWasEWFB9loCp00DHyiHtL6",
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/supabase",
  ],
  colorMode: {
    preference: "light",
  },
  googleFonts: {
    families: {
      "Open+Sans": true,
      Open_Sans: true,
    },
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      exclude: [],
    },
  },
});
