export default defineNuxtConfig({
  devtools: { enabled: true },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['document-reader'].includes(tag)
    }
  }
})
