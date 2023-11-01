<script setup>
import { ref, toRef, watch, onMounted } from 'vue'

 
onMounted(() => {
  loadCalendar();
})

const currentDate = new Date();
const currentYear = ref(currentDate.getFullYear());
const currentMonth = ref(currentDate.getMonth());

const props = defineProps(['data'])
const data = toRef(props, 'data');
let events = mountObject();

watch(data, async (newData, oldData) => {
  events = mountObject() 
  loadCalendar();
})
 
const MONTHS_NAMES = ref([
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
]);
const DAYS = ref(['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']);

const no_of_days = ref([])
const blankdays = ref([])


function loadCalendar(){
  let daysInMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();
  console.log(daysInMonth)

  // find where to start calendar day of week
  let dayOfWeek = new Date(currentYear.value, currentMonth.value).getDay();
  console.log(dayOfWeek)
  let blankdaysArray = [];
  for ( var i=1; i <= dayOfWeek; i++) {
    blankdaysArray.push(i);
  }

  let daysArray = [];
  for ( var i=1; i <= daysInMonth; i++) {
    const rndInt = randomIntFromInterval(1, 5)
    let list = [];
    events.forEach(element => {
      if (element.day == i){
        list.push({event_title: element.name, event_theme: rndInt})
      }
    }); 
    daysArray.push({day:i, events: list});
  }
  
  blankdays.value = blankdaysArray;
  no_of_days.value = daysArray;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function mountObject(){
  let lines = data.value.split("\n");
  let result = [];

  for(var i=0;i<lines.length;i++){
    let [dayMonth, nome] = lines[i].split("-").map((str) => str.trim());
    let [day, month, year] = dayMonth.split("/").map((str) => str.trim());
    if (!month){
      month = currentDate.getMonth();
    }
    if (!year){
      year = currentDate.getFullYear();
    }
    day = Number(day);
    month = parseInt(month);
    year = parseInt(year);
    currentMonth.value = month
    currentYear.value = year

    var obj = {day: day, month: month, year: year, name: nome.trim()};
    
    result.push(obj);
  }

  return result; //JavaScript object
}

</script>


<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    {{ data }}
    <div class="flex items-center justify-between py-2 px-6">
      <div>
        <span class="text-lg font-bold text-gray-800">{{MONTHS_NAMES[currentMonth-1]}}</span>
        <span class="ml-1 text-lg text-gray-600 font-normal">{{currentYear}}</span>
        {{currentMonth}}
      </div>
    </div>	

    <div class="-mx-1 -mb-1">
      <div class="flex flex-wrap" style="margin-bottom: -40px;">
          <div v-for="day in DAYS" style="width: 14.26%" class="px-2 py-2">
            <div
              class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{{day}}</div>
          </div>
      </div>

      <div class="flex flex-wrap border-t border-l">
        <div v-for="blankday in blankdays"
          style="width: 14.28%; height: 120px"
          class="text-center border-r border-b px-4 pt-2"	
        ></div>
          <div v-for="(date, dateIndex) in no_of_days" style="width: 14.28%; height: 120px" class="px-4 pt-2 border-r border-b relative">
            <div
              class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 text-gray-700 hover:bg-blue-200"
              >{{date.day}}</div>
            <div style="height: 80px;" class="overflow-y-auto mt-1">

              <div v-for="event in date.events">
                <div
                  class="px-2 py-1 rounded-lg mt-1 overflow-hidden border"
                  v-bind:class="{
                    'border-blue-200 text-blue-800 bg-blue-100': event.event_theme === 1,
                    'border-red-200 text-red-800 bg-red-100': event.event_theme === 2,
                    'border-yellow-200 text-yellow-800 bg-yellow-100': event.event_theme === 3,
                    'border-green-200 text-green-800 bg-green-100': event.event_theme === 4,
                    'border-purple-200 text-purple-800 bg-purple-100': event.event_theme === 5
                  }"
                >
                <p class="text-sm truncate leading-tight">{{event.event_title}}</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>


<style>



</style>
