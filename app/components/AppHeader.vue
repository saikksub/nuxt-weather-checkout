<template>
  <UNavigationMenu color="neutral" :items="items" class="w-full" />
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
      to: 'https://github.com/saikksub',
      target: '_blank'
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/saikksub/nuxt-weather-checkout',
      target: '_blank'
    }
  ]
])
</script>