import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Download } from "lucide-react"
import { getEntries, exportToCSV } from "../lib/storage"
import ThemeToggle from "../components/ThemeToggle"
import ExpenseCategoryChart from "../components/ExpenseCategoryChart"

export default function Reports() {
  const [entries] = useState(() => getEntries())
  const [range, setRange] = useState("all") // all | 7 | 30

  const filtered = entries.filter((e) => {
    if (range === "all") return true
    const days = Number(range)
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)
    return new Date(e.date) >= cutoff
  })

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))

  const totalSales = filtered.reduce((s, e) => s + e.sales, 0)
  const totalExpenses = filtered.reduce((s, e) => s + e.expenses, 0)
  const net = totalSales - totalExpenses
  const avgDaily = filtered.length > 0 ? net / filtered.length : 0
  const projected30 = avgDaily * 30

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
              aria-label="Volver al dashboard"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Reportes</h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">Análisis detallado de tu negocio</p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <div className="flex gap-2">
          {[
            { key: "7", label: "Últimos 7 días" },
            { key: "30", label: "Últimos 30 días" },
            { key: "all", label: "Todo" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setRange(opt.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                range === opt.key
                  ? "bg-emerald-600 text-white"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Ganancia neta del período</p>
            <p className={`text-2xl font-bold ${net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
              ₹{net.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Promedio diario</p>
            <p className="text-2xl font-bold text-neutral-800 dark:text-white">₹{avgDaily.toFixed(0)}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-emerald-700 dark:text-emerald-400">Proyección a 30 días</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">₹{projected30.toFixed(0)}</p>
          </div>
        </div>

        {/* NUEVA ESTRUCTURA CON GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
                Detalle ({sorted.length} registros)
              </h2>
              <button
                onClick={() => exportToCSV(sorted)}
                className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <Download size={14} />
                Exportar CSV
              </button>
            </div>

            {sorted.length === 0 ? (
              <p className="text-center text-neutral-400 dark:text-neutral-500 py-8">
                No hay registros en este período.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-neutral-500 dark:text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">
                      <th className="pb-2 font-medium">Fecha</th>
                      <th className="pb-2 font-medium">Ventas</th>
                      <th className="pb-2 font-medium">Gastos</th>
                      <th className="pb-2 font-medium">Neto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((e) => {
                      const n = e.sales - e.expenses
                      return (
                        <tr key={e.id} className="border-b border-neutral-50 dark:border-neutral-800/50">
                          <td className="py-2 text-neutral-700 dark:text-neutral-300">{e.date}</td>
                          <td className="py-2 text-neutral-700 dark:text-neutral-300">₹{e.sales}</td>
                          <td className="py-2 text-neutral-700 dark:text-neutral-300">₹{e.expenses}</td>
                          <td className={`py-2 font-medium ${n >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                            {n >= 0 ? "+" : ""}₹{n}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <ExpenseCategoryChart entries={filtered} />
        </div>
      </div>
    </div>
  )
}