/* eslint-disable no-console */
import { onMessage } from 'webext-bridge/content-script'
import { createApp } from 'vue'
import App from './views/App.vue'
import { setupApp } from '~/logic/common-setup'

const kopasHandler = () => {
  let selection = window.getSelection()?.toString()
  setTimeout(() => {
    if (!selection || selection.length === 0)
      return

    if (selection.startsWith('Rp')) {
      selection = selection.split('Rp').join('').split('.').join('')
      if (selection.includes(',00'))
        selection = selection.split(',00').join('')
      selection = selection.trim()
    }
    window.navigator.clipboard.writeText(selection)
  }, 300)
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  window.removeEventListener('mouseup', kopasHandler)
  onMessage('toggle-kopas', ({ data }) => {
    window.removeEventListener('mouseup', kopasHandler)
    if (data.enabled) {
      window.addEventListener('mouseup', kopasHandler)
      console.log('[kopas] kopas event handler registered.')
    }
  })

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  container.id = __NAME__
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  const app = createApp(App)
  setupApp(app)
  app.mount(root)
})()
