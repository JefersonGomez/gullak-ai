const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent`

const PROMPTS = {
  es: (totalSales, totalExpenses, days) => `Eres un asesor financiero para pequeños comerciantes en India rural.
Datos de los últimos ${days} días:
- Ventas totales: ₹${totalSales}
- Gastos totales: ₹${totalExpenses}
- Ganancia neta: ₹${totalSales - totalExpenses}

Da un consejo corto y práctico de ahorro en 2-3 líneas, en tono amigable y sencillo, como si hablaras con alguien sin educación financiera formal. Responde en español.`,

  en: (totalSales, totalExpenses, days) => `You are a financial advisor for small shopkeepers in rural India.
Data from the last ${days} days:
- Total sales: ₹${totalSales}
- Total expenses: ₹${totalExpenses}
- Net profit: ₹${totalSales - totalExpenses}

Give a short, practical savings tip in 2-3 lines, in a friendly and simple tone, as if speaking to someone without formal financial education. Respond in English.`,

  hi: (totalSales, totalExpenses, days) => `आप ग्रामीण भारत में छोटे दुकानदारों के लिए एक वित्तीय सलाहकार हैं।
पिछले ${days} दिनों का डेटा:
- कुल बिक्री: ₹${totalSales}
- कुल खर्च: ₹${totalExpenses}
- शुद्ध लाभ: ₹${totalSales - totalExpenses}

2-3 पंक्तियों में एक छोटी, व्यावहारिक बचत सलाह दें, एक मित्रवत और सरल लहजे में, जैसे कि आप किसी ऐसे व्यक्ति से बात कर रहे हों जिसे औपचारिक वित्तीय शिक्षा नहीं है। हिंदी में उत्तर दें।`,
}

const FALLBACK_MESSAGES = {
  es: {
    empty: "Agrega al menos un registro para recibir un consejo.",
    error: "No se pudo generar un consejo en este momento.",
    network: "Error al conectar con el asesor. Revisa tu conexión.",
  },
  en: {
    empty: "Add at least one entry to receive advice.",
    error: "Couldn't generate advice right now.",
    network: "Error connecting to the advisor. Check your connection.",
  },
  hi: {
    empty: "सलाह पाने के लिए कम से कम एक एंट्री जोड़ें।",
    error: "अभी सलाह नहीं दी जा सकी।",
    network: "सलाहकार से कनेक्ट करने में त्रुटि। अपना कनेक्शन जांचें।",
  },
}

export async function getSavingsAdvice(entries, lang = "es") {
  const messages = FALLBACK_MESSAGES[lang] || FALLBACK_MESSAGES.es

  if (entries.length === 0) {
    return messages.empty
  }

  const recent = entries.slice(0, 7)
  const totalSales = recent.reduce((sum, e) => sum + e.sales, 0)
  const totalExpenses = recent.reduce((sum, e) => sum + e.expenses, 0)

  const buildPrompt = PROMPTS[lang] || PROMPTS.es
  const prompt = buildPrompt(totalSales, totalExpenses, recent.length)

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("Gemini API error:", res.status, errText)
      return messages.error
    }

    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || messages.error
  } catch (err) {
    console.error("Network error:", err)
    return messages.network
  }
}