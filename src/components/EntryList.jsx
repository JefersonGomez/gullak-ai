export default function EntryList({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-neutral-400">
        Aún no hay registros. Agrega el primero arriba.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-neutral-800 mb-4">Historial</h2>
      <div className="flex flex-col gap-2">
        {entries.map((entry) => {
          const net = entry.sales - entry.expenses
          return (
            <div
              key={entry.id}
              className="flex items-center justify-between border-b border-neutral-100 pb-2 last:border-0"
            >
              <div>
                <p className="text-sm text-neutral-500">{entry.date}</p>
                <p className="text-sm">
                  Ventas: ₹{entry.sales} · Gastos: ₹{entry.expenses}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-medium ${net >= 0 ? "text-emerald-600" : "text-red-500"}`}
                >
                  {net >= 0 ? "+" : ""}₹{net}
                </span>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-neutral-400 hover:text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}