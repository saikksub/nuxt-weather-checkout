<template>
  <UContainer>
    <div class="flex items-center gap-3 h-14">
      <UNavigationMenu color="neutral" :items="items" class="w-full" />
    </div>

    <UCard variant="subtle">
      <div class="h-[20vh] flex items-center justify-center">
        <div class="space-y-6">
          <div class="flex items-center gap-3 block">
            <USelect placeholder="Select Country" class="min-w-[200px]" />
            <USelect placeholder="Select State" class="min-w-[200px]" />
            <USelect placeholder="Select City" class="min-w-[200px]" />
            <UButton color="primary">Add to watch list</UButton>
          </div>

          <p class="text-center text-sm text-neutral-500 w-full max-w-md mx-auto">
            This app uses openweathermap API to fetch the weather data. Any extensive usage might hit the rate limits of the free tier.
          </p>
        </div>
      </div>
    </UCard>

    <p class="text-left text-sm text-neutral-500 mt-4">
      Your weather watch list
    </p>

    <UAlert
      variant="outline"
      color="neutral"
      class="mt-4"
      title="Your watch list is empty"
      description="You have not added any locations to your watch list. Please add a location to see the weather details."
    />
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

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
</script>
