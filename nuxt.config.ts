// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      script: [
        {
          src: 'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js',
        },
      ]
    }  
  }
  
})
