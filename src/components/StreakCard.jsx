import { Flame } from "lucide-react"

function calculateStreak(entries) {
  // Ordenamos por fecha descendente (más reciente primero)
  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))

  let streak = 0
  for (const entry of sorted) {
    const net = entry.sales - entry.expenses
    if (net > 0) {
      streak++
    } else {
      break
    }
  }
  return streak
}

export default function StreakCard({ entries }) {
  const streak = calculateStreak(entries)

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-5 flex items-center gap-4">
      <div className="bg-orange-50 dark:bg-orange-950/40 text-orange-500 dark:text-orange-400 p-3 rounded-xl">
        <Flame size={22} />
      </div>
      <div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Racha de días positivos</p>
        <p className="text-xl font-bold text-orange-500 dark:text-orange-400">
          {streak} {streak === 1 ? "día" : "días"}
        </p>
      </div>
    </div>
  )
}