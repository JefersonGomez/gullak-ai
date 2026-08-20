import { Trash2 } from "lucide-react"

export default function EntryList({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 text-center text-neutral-400 dark:text-neutral-500">
        Aún no hay registros. Agrega el primero.
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">Historial</h2>
      <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
        {entries.map((entry) => {
          const net = entry.sales - entry.expenses
          return (
            <div
              key={entry.id}
              className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2 last:border-0"
            >
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{entry.date}</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Ventas: ₹{entry.sales} · Gastos: ₹{entry.expenses}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-medium ${net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}
                >
                  {net >= 0 ? "+" : ""}₹{net}
                </span>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 transition"
                  aria-label="Eliminar registro"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}