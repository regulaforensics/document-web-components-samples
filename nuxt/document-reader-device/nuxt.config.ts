// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['document-reader-device'].includes(tag)
    }
  },

  compatibilityDate: '2024-07-19'
})

