const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent`

export async function getSavingsAdvice(entries) {
  if (entries.length === 0) {
    return "Agrega al menos un registro para recibir un consejo."
  }

  const recent = entries.slice(0, 7)
  const totalSales = recent.reduce((sum, e) => sum + e.sales, 0)
  const totalExpenses = recent.reduce((sum, e) => sum + e.expenses, 0)

  const prompt = `Eres un asesor financiero para pequeños comerciantes en India rural.
Datos de los últimos ${recent.length} días:
- Ventas totales: ₹${totalSales}
- Gastos totales: ₹${totalExpenses}
- Ganancia neta: ₹${totalSales - totalExpenses}

Da un consejo corto y práctico de ahorro en 2-3 líneas, en tono amigable y sencillo, como si hablaras con alguien sin educación financiera formal.`

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
      return "No se pudo generar un consejo en este momento."
    }

    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar un consejo en este momento."
  } catch (err) {
    console.error("Network error:", err)
    return "Error al conectar con el asesor. Revisa tu conexión."
  }
}