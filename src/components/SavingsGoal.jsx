import { useState } from "react"
import { Target } from "lucide-react"
import { setGoal } from "../lib/storage"
import { useLanguage } from "../lib/useLanguage"

export default function SavingsGoal({ entries, goal, onGoalChange }) {
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState(goal || "")
  const { t } = useLanguage()

  const netTotal = entries.reduce((sum, e) => sum + (e.sales - e.expenses), 0)
  const saved = Math.max(0, netTotal)
  const progress = goal > 0 ? Math.min(100, (saved / goal) * 100) : 0

  function handleSave(e) {
    e.preventDefault()
    const value = Number(input)
    if (value > 0) {
      setGoal(value)
      onGoalChange(value)
      setEditing(false)
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white flex items-center gap-2">
          <Target size={18} />
          {t.savingsGoal}
        </h2>
        <button
          onClick={() => setEditing(!editing)}
          className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          {goal > 0 ? t.edit : t.defineGoal}
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="flex gap-2">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.goalPlaceholder}
            className="flex-1 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-emerald-700 transition"
          >
            {t.save}
          </button>
        </form>
      ) : goal > 0 ? (
        <>
          <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>₹{saved.toLocaleString()} {t.goalSaved}</span>
            <span>{t.goalTarget}: ₹{goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {progress >= 100 ? t.goalComplete : `${progress.toFixed(0)}% ${t.goalProgress}`}
          </p>
        </>
      ) : (
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          {t.goalNoGoal}
        </p>
      )}
    </div>
  )
}