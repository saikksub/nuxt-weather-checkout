<template>
  <UCard class="w-full">
    <template #header>
      <div>
        <p class="font-medium text-lg">{{ city }}</p>
        <p class="text-sm text-neutral-500">{{ flag }} {{ country }}, {{ state }}</p>
      </div>
    </template>
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
</script>
