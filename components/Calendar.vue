<script setup>
import { ref, toRef, watch, onMounted } from 'vue'


onMounted(() => {
  loadCalendar();
})

const currentDate = new Date();
const showDate = ref(currentDate);
const currentYear = ref(currentDate.getFullYear());
const currentMonth = ref(currentDate.getMonth() + 1);

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
const DAYS = ref(['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']);

const no_of_days = ref([])
const blankdays = ref([])


function loadCalendar() {
  let daysInMonth = new Date(currentYear.value, currentMonth.value - 1, 0).getDate();
  const names = [...new Set(events.map(element => element.name))]
  const namesObj = []
  let theme = 1
  names.forEach(element => {
    namesObj.push({ name: element, theme: theme })
    theme++
    if (theme > 15) {
      theme = 1
    }
  })
  events.forEach(element => {
    const obj = namesObj.filter(value =>
      value.name === element.name
    ).shift()
    element.theme = obj.theme
  });


  // find where to start calendar day of week
  showDate.value = new Date(currentYear.value, currentMonth.value - 1)
  let dayOfWeek = new Date(currentYear.value, currentMonth.value - 1).getDay();
  let blankdaysArray = [];
  for (var i = 1; i <= dayOfWeek; i++) {
    blankdaysArray.push(i);
  }

  let daysArray = [];
  for (var i = 1; i <= daysInMonth; i++) {
    let list = [];
    events.forEach(element => {
      if (element.day == i) {
        list.push({ event_title: element.name, event_theme: element.theme })
      }
    });
    daysArray.push({ day: i, events: list });
  }

  blankdays.value = blankdaysArray;
  no_of_days.value = daysArray;
}


function mountObject() {
  let lines = data.value.split("\n");
  let result = [];

  for (var i = 0; i < lines.length; i++) {
    let [dayMonth, nome] = lines[i].split("-").map((str) => str.trim());
    let [day, month, year] = dayMonth.split("/").map((str) => str.trim());
    day = Number(day);
    if (!month) {
      month = currentDate.getMonth() + 1;
    }
    month = parseInt(month);
    if (!year) {
      if (month < (currentDate.getMonth() + 1)) {
        year = currentDate.getFullYear() + 1;
      } else {
        year = currentDate.getFullYear();
      }
    }
    if (year.toString().length == 2) {
      year = currentDate.getFullYear().toString().substring(0, 2) + year
    }
    year = parseInt(year);
    currentMonth.value = month
    currentYear.value = year

    var obj = { day: day, month: month, year: year, name: (nome || '').trim() };

    result.push(obj);
  }

  return result;
}


</script>


<template>
  <div class="bg-white rounded-lg shadow overflow-hidden" style="min-width: 1080px">

    <div class="flex items-center justify-between py-2 px-6">
      <div>
        <span class="text-lg font-bold text-gray-800">{{ MONTHS_NAMES[currentMonth - 1] }}</span>
        <span class="ml-1 text-lg text-gray-600 font-normal">{{ currentYear }}</span>
      </div>
    </div>

    <div class="-mx-1 -mb-1">
      <div class="flex flex-wrap">
        <div v-for="day in DAYS" style="width: 14.26%" class="px-2 py-2 border-t">
          <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{{ day }}</div>
        </div>
      </div>

      <div class="flex flex-wrap border-t border-l">
        <div v-for="blankday in blankdays" style="width: 14.28%;"
          class="text-center border-r border-b px-4 pt-2 grow"></div>
        <div v-for="(date, dateIndex) in no_of_days" style="width: 14.28%;"
          class="px-4 pt-2 border-r border-b relative">
          <div
            class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 text-gray-700 hover:bg-blue-200">
            {{ date.day }}</div>
          <div style="min-height: 120px;" class="overflow-y-auto mt-1 flex flex-col flex-wrap">

            <div class="grow" v-for="event in date.events">
              <div class="grow rounded-lg px-1 overflow-hidden border p-1" v-bind:class="{
                'border-blue-200 text-blue-800 bg-blue-100': event.event_theme === 1,
                'border-red-200 text-red-800 bg-red-100': event.event_theme === 2,
                'border-yellow-200 text-yellow-800 bg-yellow-100': event.event_theme === 3,
                'border-green-200 text-green-800 bg-green-100': event.event_theme === 4,
                'border-purple-200 text-purple-800 bg-purple-100': event.event_theme === 5,
                'border-orange-200 text-orange-800 bg-orange-100': event.event_theme === 6,
                'border-lime-200 text-lime-800 bg-lime-100': event.event_theme === 7,
                'border-cyan-200 text-cyan-800 bg-cyan-100': event.event_theme === 8,
                'border-violet-200 text-violet-800 bg-violet-100': event.event_theme === 9,
                'border-fuchsia-200 text-fuchsia-800 bg-fuchsia-100': event.event_theme === 10,
                'border-pink-200 text-pink-800 bg-pink-100': event.event_theme === 11,
                'border-rose-200 text-rose-800 bg-rose-100': event.event_theme === 12,
                'border-indigo-200 text-indigo-800 bg-indigo-100': event.event_theme === 13,
                'border-sky-200 text-sky-800 bg-sky-100': event.event_theme === 14,
                'border-teal-200 text-teal-800 bg-teal-100': event.event_theme === 15,
              }">
                <!-- <p class="grow text-md truncate leading-tight">{{ event.event_title }}</p> -->
                <p class="">{{ event.event_title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style></style>
