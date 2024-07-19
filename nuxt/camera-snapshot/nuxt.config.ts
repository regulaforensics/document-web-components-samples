// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['camera-snapshot'].includes(tag)
    }
  },

  compatibilityDate: '2024-07-19'
})
