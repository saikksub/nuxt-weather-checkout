<template>
  <UCard class="w-full">
    <template #header>
      <div class="flex items-start gap-3">
        <div class="space-y-2">
          <p class="font-medium text-lg">{{ city }}</p>
          <p class="text-sm text-neutral-500">{{ flag }} {{ country }}, {{ state }}</p>
        </div>

        <div class="grow" />

        <UButton :loading="misc.isLoading" size="lg" icon="i-lucide-refresh-ccw" variant="outline" @click="init" />
      </div>
    </template>

    <div class="space-y-3">
      <p class="text-6xl">
        {{ processWeatherData?.temperature.celsius.toFixed(1) }}°C
      </p>

      <div class="grid grid-cols-2 gap-6">
        <div class="col-span-1">
          <p class="text-sm text-neutral-500">Humidity</p>
          <p class="text-lg font-medium">
            {{ processWeatherData?.humidity }}%
          </p>
        </div>

        <div class="col-span-1">
          <p class="text-sm text-neutral-500">Wind Speed</p>
          <p class="text-lg font-medium">
            {{ processWeatherData?.windSpeed }} m/s
          </p>
        </div>

        <div class="col-span-2">
          <p class="text-sm text-neutral-500">Description</p>
          <p class="text-lg font-medium capitalize">
            {{ processWeatherData?.description }}
          </p>
        </div>
      </div>
    </div>
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

const weatherData = ref<{
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
  }[]
} | null>(null)

const misc = reactive({
  isLoading: false,
})

function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin: number): number {
  const celsius = kelvinToCelsius(kelvin);
  return (celsius * 9/5) + 32;
}

const processWeatherData = computed(() => {
  if (!weatherData.value) return null;

  return {
    temperature: {
      kelvin: weatherData.value.main.temp,
      celsius: kelvinToCelsius(weatherData.value.main.temp),
      fahrenheit: kelvinToFahrenheit(weatherData.value.main.temp)
    },
    humidity: weatherData.value.main.humidity,
    windSpeed: weatherData.value.wind.speed,
    description: weatherData.value.weather[0].description,
  }
})

const init = async () => {
  misc.isLoading = true;
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
  } finally {
    misc.isLoading = false;
  }
}

onMounted(() => {
  init()
})
</script>
