import { useState } from "react"
import { Sparkles } from "lucide-react"
import { getSavingsAdvice } from "../lib/gemini"

export default function AdviceCard({ entries }) {
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const result = await getSavingsAdvice(entries)
    setAdvice(result)
    setLoading(false)
  }

  return (
    <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
        <Sparkles size={18} />
        Consejo de ahorro
      </h2>

      {advice && (
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{advice}</p>
      )}

      <button
        onClick={handleClick}
        disabled={loading}
        className="self-start bg-emerald-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-emerald-700 transition disabled:opacity-50"
      >
        {loading ? "Pensando..." : "Dame un consejo"}
      </button>
    </div>
  )
}