<!-- eslint-disable no-console -->
<script setup lang="ts">
import { sendMessage } from 'webext-bridge/popup'

const kopasEnabledState = ref(false)
watch(kopasEnabledState, async (value) => {
  try {
    const tabs = await browser.tabs.query({ currentWindow: true, active: true })
    if (tabs && tabs[0]) {
      sendMessage('toggle-kopas', { enabled: value }, { context: 'content-script', tabId: tabs[0].id! })
        .then(() => console.log('toggle-kopas message sent'))
        .catch(err => console.error(err))

      sendMessage('toggle-kopas-indicator', { enabled: value }, { context: 'content-script', tabId: tabs[0].id! })
        .then(() => console.log('toggle-kopas message sent'))
        .catch(err => console.error(err))
    }
  }
  catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <main class="w-[300px]">
    <div
      class="bg-[#000D81] flex flex-col items-center justify-center p-6 w-full"
    >
      <img src="../assets/icon-512.png" alt="Kopas Logo" height="100" width="100">
      <p class="text-white">
        Copy Paste Tool
      </p>
    </div>
    <div class="bg-white p-4 text-gray-700">
      <label
        for="kopas-toggle"
        class="flex w-full items-center justify-between select-none"
      >
        Aktifkan Ekstensi
        <input id="kopas-toggle" v-model="kopasEnabledState" :checked="kopasEnabledState" type="checkbox">
      </label>
    </div>
  </main>
</template>
