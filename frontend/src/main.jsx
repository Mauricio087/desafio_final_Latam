import './main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { enableMocking } from './config/environment'
import App from './App.jsx'

// Test de stores (solo en desarrollo)
if (import.meta.env.DEV) {
  import('./stores/test.js').then(({ testStores, testPersistence }) => {
    // Test después de que la app se monte
    setTimeout(() => {
      testStores()
      testPersistence()
    }, 1000)
  })
}

const renderApp = () => {
  const rootElement = document.getElementById('root')
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

enableMocking()
  .then(renderApp)
  .catch(console.error)
