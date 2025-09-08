<template>
  <UCard class="w-full">
    <template #header>
      <div>
        <p class="font-medium text-lg">{{ city }}</p>
        <p class="text-sm text-neutral-500">{{ flag }} {{ country }}, {{ state }}</p>
      </div>
    </template>

    {{ weatherData }}
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  flag: string;
  country: string;
  state: string;
  city: string;
  lat: number;
  lon: number
}>()

const weatherData = ref(null)

onMounted(async () => {
  try {
    weatherData.value = await $fetch('/api/weather', {
      method: 'POST',
      body: {
        lat: props.lat,
        lon: props.lon
      }
    })
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
})
</script>
