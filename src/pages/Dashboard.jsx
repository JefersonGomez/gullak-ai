import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { getEntries, addEntry, deleteEntry, getGoal } from "../lib/storage"
import EntryForm from "../components/EntryForm"
import EntryList from "../components/EntryList"
import SavingsChart from "../components/SavingsChart"
import AdviceCard from "../components/AdviceCard"
import StatsCards from "../components/StatsCards"
import ThemeToggle from "../components/ThemeToggle"
import LanguageSelector from "../components/LanguageSelector"
import SavingsGoal from "../components/SavingsGoal"
import StreakCard from "../components/StreakCard"
import { useLanguage } from "../lib/useLanguage"

export default function Dashboard() {
  const [entries, setEntries] = useState(() => getEntries())
  const [goal, setGoalState] = useState(() => getGoal())
  const { t } = useLanguage()

  function handleAdd(entry) {
    setEntries(addEntry(entry))
  }

  function handleDelete(id) {
    setEntries(deleteEntry(id))
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.appName}</h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/reports"
              className="flex items-center gap-1.5 text-sm bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <BarChart3 size={16} />
              {t.reports}
            </Link>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </header>

        <StatsCards entries={entries} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SavingsGoal entries={entries} goal={goal} onGoalChange={setGoalState} />
          </div>
          <StreakCard entries={entries} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SavingsChart entries={entries} />
          <AdviceCard entries={entries} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EntryForm onAdd={handleAdd} />
          <EntryList entries={entries} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}
