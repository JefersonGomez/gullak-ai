import { useState } from "react"
import { getEntries, addEntry, deleteEntry } from "./lib/storage"
import EntryForm from "./components/EntryForm"
import EntryList from "./components/EntryList"
import SavingsChart from "./components/SavingsChart"
import AdviceCard from "./components/AdviceCard"
import StatsCards from "./components/StatsCards"
import ThemeToggle from "./components/ThemeToggle"

export default function App() {
  const [entries, setEntries] = useState(() => getEntries())

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
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">GullakAI</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Tu asesor de ahorro diario</p>
          </div>
          <ThemeToggle />
        </header>

        <StatsCards entries={entries} />

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