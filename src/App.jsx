import { useState } from "react"
import { getEntries, addEntry, deleteEntry } from "./lib/storage"
import EntryForm from "./components/EntryForm"
import EntryList from "./components/EntryList"
import SavingsChart from "./components/SavingsChart"
import AdviceCard from "./components/AdviceCard"

export default function App() {
  // Inicialización perezosa: solo ejecuta getEntries() en el primer render
  const [entries, setEntries] = useState(() => getEntries())

  function handleAdd(entry) {
    setEntries(addEntry(entry))
  }

  function handleDelete(id) {
    setEntries(deleteEntry(id))
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">GullakAI</h1>
          <p className="text-neutral-500">Tu asesor de ahorro diario</p>
        </header>

        <EntryForm onAdd={handleAdd} />
        <SavingsChart entries={entries} />
        <AdviceCard entries={entries} />
        <EntryList entries={entries} onDelete={handleDelete} />
      </div>
    </div>
  )
}