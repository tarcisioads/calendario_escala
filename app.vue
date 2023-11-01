<script setup>
  import { ref, onMounted } from 'vue'

  useSeoMeta({
    title: 'Escala Calendario',
    description: 'App para exibir escala no calendario.'
  })

  const data = ref('2 - Paula \n5 - Roberta');
</script>

<template>
  <div class="antialiased sans-serif bg-gray-100 h-screen">
    <div class="container mx-auto px-4 py-2 md:py-24 ">
      <div class="px-4 py-2 ">
        <label for="data" class="block mb-2 text-sm font-medium text-gray-900">Escala: </label>
        <textarea id="data" v-model.trim="data" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Exemplo: 
2/11 - Paula 
5/11 - Roberta 
9/11 - Bia 
12/11 - Aline 
16/11 - Roberta 
19/11 - Paula 
23/11 - Tarcisio
26/11 - Marina 
30/11 - Aline"></textarea>
        
      </div>
      <Calendar :data="data"></Calendar>
    </div>
  </div>
</template>


