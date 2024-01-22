// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
