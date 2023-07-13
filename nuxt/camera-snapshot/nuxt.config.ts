export default defineNuxtConfig({
  devtools: { enabled: true },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['camera-snapshot'].includes(tag)
    }
  }
})
