<template>
  <UContainer>
    <div class="flex items-center gap-3 h-14">
      <UNavigationMenu color="neutral" :items="items" class="w-full" />
    </div>

    <UCard variant="subtle">
      <div class="h-auto py-3 flex items-center justify-center">
        <div class="space-y-6">
          <div class="flex items-center gap-3 block">
            <UInputMenu
              v-model="form.country"
              :items="countries"
              valueKey="value" 
              placeholder="Select Country"
              class="min-w-[200px]"
            />
            <UInputMenu
              v-model="form.state"
              :disabled="!form.country"
              :items="states"
              valueKey="value" 
              placeholder="Select State"
              class="min-w-[200px]"
            />
            <UInputMenu
              v-model="form.city"
              :disabled="!form.state"
              :items="cities"
              valueKey="value" 
              placeholder="Select City"
              class="min-w-[200px]"
            />
            <UButton
              :disabled="
                !form.country || !form.state || !form.city
              "
              color="primary"
              @click="onSubmit"
            >
              Add to watch list
            </UButton>
          </div>

          <p class="text-center text-sm text-neutral-500 w-full max-w-md mx-auto">
            This app uses <a href="https://openweathermap.org" target="_blank" class="underline">OpenWeather API</a> to fetch the weather data. Any extensive usage might hit the rate limits of the free tier.
          </p>
        </div>
      </div>
    </UCard>

    <p class="text-left text-sm text-neutral-500 mt-4">
      Your weather watch list
    </p>

    <UAlert
      v-if="watchlist.length === 0"
      variant="outline"
      color="neutral"
      class="mt-4"
      title="Your watch list is empty"
      description="You have not added any locations to your watch list. Please add a location to see the weather details."
    />

    <div class="grid grid-cols-4 gap-6 mt-3">
      <WeatherInfo
        v-for="(location, index) in watchlist"
        :key="index"
        v-bind="location"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useStorage } from '@vueuse/core'
import { Country, State, City }  from 'country-state-city';

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Weather Application',
      to: '/'
    }
  ],
  [
    {
      label: 'About',
      to: '/about',
      target: '_blank'
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/saikksub',
      target: '_blank'
    }
  ]
])

const watchlist = useStorage<{
  flag: string;
  country: string;
  state: string;
  city: string;
  lat: number;
  lon: number
}[]>('watchlist', [])

const form = reactive({
  country: '',
  state: '',
  city: ''
})

const countries = (Country.getAllCountries() ?? []).map(country => ({
  label: `${country.flag} ${country.name}`,
  value: country.isoCode,
  name: country.name,
  flag: country.flag
}));

const states = computed(() => {
  if (!form.country) return [];

  return (State.getStatesOfCountry(form.country) ?? []).map(state => ({
    label: state.name,
    value: state.isoCode,
    name: state.name
  }))
})

const cities = computed(() => {
  if (!form.state || !form.country) return [];

  return (City.getCitiesOfState(form.country, form.state) ?? []).map(city => ({
    label: city.name,
    value: city.name,
    name: city.name,
    lat: city.latitude,
    lon: city.longitude
  }))
})

const onSubmit = function () {
  if (!form.country || !form.state || !form.city) return;

  const selectedCity = cities.value.find(city => city.value === form.city);
  if (!selectedCity) return;

  const selectedCountry = countries.find(country => country.value === form.country);
  if (!selectedCountry) return;

  const selectedState = states.value.find(state => state.value === form.state);
  if (!selectedState) return;

  watchlist.value.push({
    flag: selectedCountry.flag,
    country: selectedCountry.name,
    state: selectedState.name,
    city: selectedCity.name,
    lat: Number(selectedCity.lat),
    lon: Number(selectedCity.lon)
  })

  form.country = '';
  form.state = '';
}
</script>
