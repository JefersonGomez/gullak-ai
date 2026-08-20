const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

/* Qué hace: toma los últimos 7 registros, calcula totales, 
arma un prompt claro, y le pide a Gemini un consejo corto. Maneja errores de red con un mensaje
 amigable (importante para UX si el WiFi del hackathon falla en la demo). */
export async function getSavingsAdvice(entries) {
  if (entries.length === 0) {
    return "Agrega al menos un registro para recibir un consejo.";
  }

  const recent = entries.slice(0, 7);
  const totalSales = recent.reduce((sum, e) => sum + e.sales, 0);
  const totalExpenses = recent.reduce((sum, e) => sum + e.expenses, 0);

  const prompt = `Eres un asesor financiero para pequeños comerciantes en India rural.
Datos de los últimos ${recent.length} días:
- Ventas totales: ₹${totalSales}
- Gastos totales: ₹${totalExpenses}
- Ganancia neta: ₹${totalSales - totalExpenses}

Da un consejo corto y práctico de ahorro en 2-3 líneas, en tono amigable y sencillo, como si hablaras con alguien sin educación financiera formal.`;

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    const data = await res.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se pudo generar un consejo en este momento."
    );
  } catch (err) {
    return ("Error al conectar con el asesor. Revisa tu conexión.", err);
  }
}
