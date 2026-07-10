import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App' // Прибираємо .tsx
import './i18n'      // Прибираємо .js (перейменуйте i18n.js на i18n.ts пізніше)

// Додаємо ! в кінці getElementById('root')
const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)