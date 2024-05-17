<script setup>
import { ref, onMounted } from 'vue'

useSeoMeta({
  title: 'Escala Calendario',
  description: 'App para exibir escala no calendario.'
})

// const data = ref('02 - Paula Cristina\n02 - Aline\n02 - Tarcísio Ads\n02 - Roberta\n02 - Gaby\n05 - Aline\n09 - Tarcísio\n12 - Paula\n16 - Aline\n19 - Paula\n23 - Tarcísio\n26 - Gaby\n30 -  Aline');
const data = ref('');

function handleChange(value) {
  data.value = value
}

function downloadCalendar() {
  var width = document.getElementById('app').offsetWidth;
  var height = document.getElementById('app').offsetHeight;
  if (width < 1080) {
    width = 1180
  }
  if (height < 900) {
    height = 900
  }
  html2canvas(document.querySelector("#app"), 

    { backgroundColor: '#ffffff', removeContainer: true, height: height, width: width } ).then(canvas => {

    canvas.toBlob(function (blob) {
      window.saveAs(blob, 'escala.jpg');
    });
  });
}

</script>

<template>
  <div id="app" class="bg-gray-100">
    <div class="mx-auto px-4 py-2" data-html2canvas-ignore="true">
      <InputData :data="data" @change="handleChange"></InputData>
    </div>
    <div class="mx-auto px-4 py-2" data-html2canvas-ignore="true">
      <button @click="downloadCalendar()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Download</span>
      </button>
    </div>

    <div class="mx-auto px-4 py-2">
      <Calendar :data="data"></Calendar>
    </div>
  </div>
</template>


