<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'
import { onMessage } from 'webext-bridge/content-script'

const [show, toggle] = useToggle(false)

const showIndicator = ref(false)
onMessage('toggle-kopas-indicator', ({ data }) => {
  showIndicator.value = data.enabled
})
</script>

<template>
  <div v-if="showIndicator" class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg">
        Kopas Enabled
      </h1>
      <SharedSubtitle />
    </div>
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none flex items-center justify-center overflow-hidden"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <img src="../../../extension/assets/icon-512.png" alt="Logo" width="35" height="35">
    </button>
  </div>
</template>
