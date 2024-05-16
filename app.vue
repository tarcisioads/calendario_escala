<script setup>
  import { ref, onMounted } from 'vue'

  useSeoMeta({
    title: 'Escala Calendario',
    description: 'App para exibir escala no calendario.'
  })

  const data = ref('2 - Paula \n5 - Roberta');

  function handleChange(value){
    console.log(value)
    data.value = value
  }
</script>

<template>
  <div class="antialiased sans-serif bg-gray-100 h-screen">
    <div class="container mx-auto px-4 py-2 md:py-24 ">
     <InputData :data="data" @change="handleChange"></InputData>
     <Calendar :data="data"></Calendar>
    </div>
  </div>
</template>


