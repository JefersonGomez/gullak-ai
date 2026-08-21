import { AlertCircle } from "lucide-react"
import { useLanguage } from "../lib/useLanguage"

export default function DailyReminder({ entries }) {
  const { t } = useLanguage()
  const today = new Date().toISOString().split("T")[0]
  const hasToday = entries.some((e) => e.date === today)

  if (hasToday) return null

  return (
    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-2xl px-5 py-3 flex items-center gap-3">
      <AlertCircle size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
      <p className="text-sm text-amber-800 dark:text-amber-300">{t.reminderText}</p>
    </div>
  )
}