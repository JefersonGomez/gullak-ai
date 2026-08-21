import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './lib/LanguageProvider.jsx'
// Aplica el tema guardado, o oscuro por defecto si es la primera visita
const savedTheme = localStorage.getItem("theme")
const isDark = savedTheme ? savedTheme === "dark" : true
document.documentElement.classList.toggle("dark", isDark)
if (!savedTheme) localStorage.setItem("theme", "dark")

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <LanguageProvider>
    <App />
  </LanguageProvider>
</BrowserRouter>
  </StrictMode>,
)