# 💰 GullakAI

**Tu asesor financiero personal con IA, para pequeños comerciantes.**

GullakAI ayuda a comerciantes informales a registrar sus ventas y gastos diarios, entender su salud financiera de un vistazo, y recibir consejos de ahorro generados por IA — todo en español, inglés o hindi.

🔗 **Demo en vivo:** https://gullak-ai-psi.vercel.app/

## 🎯 El problema

Millones de pequeños comerciantes en zonas rurales manejan su negocio sin hojas de cálculo ni apps bancarias, lo que dificulta saber si realmente están ahorrando o creciendo.

## ✨ Features

- 📊 **Dashboard financiero** — registro diario de ventas y gastos, con historial y gráfico visual
- 🤖 **Consejos de ahorro con IA** — powered by Gemini, adaptados al idioma del usuario
- 🎯 **Metas de ahorro** — con barra de progreso visual
- 🔥 **Racha de días positivos** — gamifica el hábito de ahorro
- 🥧 **Categorías de gastos** — desglose visual de en qué se va el dinero
- 📈 **Reportes avanzados** — filtros por período, promedio diario, y proyección a 30 días
- 📥 **Exportar a CSV** — para compartir con bancos o socios
- 🌐 **Multi-idioma** — Español, English, हिंदी
- 🌙 **Modo oscuro** con transiciones suaves
- 📱 Diseño responsive, sin necesidad de backend (usa localStorage)

## 🛠️ Stack técnico

- **Frontend:** React + Vite
- **Estilos:** Tailwind CSS v4
- **Gráficos:** Chart.js
- **Animaciones:** Framer Motion
- **IA:** Google Gemini API
- **Routing:** React Router
- **Almacenamiento:** localStorage (sin backend, 100% gratuito)
- **Deploy:** Vercel

## 🚀 Correr el proyecto localmente

\`\`\`bash
git clone https://github.com/JefersonGomez/gullak-ai.git
cd gullak-ai
npm install
\`\`\`

Crea un archivo \`.env\` en la raíz con tu API key de Gemini:

\`\`\`
VITE_GEMINI_API_KEY=tu_api_key_aqui
\`\`\`

Obtén una gratis en [Google AI Studio](https://aistudio.google.com/apikey).

\`\`\`bash
npm run dev
\`\`\`

## 👥 Equipo

- [Jeferson Bustamante Gomez] — [https://github.com/JefersonGomez]

## 🏆 Hecho en HackDays Fatehpur 2026

Proyecto desarrollado en 3 días durante el hackathon, con foco en accesibilidad financiera para comerciantes de zonas rurales.