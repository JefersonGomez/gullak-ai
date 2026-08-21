import { Trash2, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { exportToCSV } from "../lib/storage"
import { useLanguage } from "../lib/useLanguage"

export default function EntryList({ entries, onDelete }) {
  const { t } = useLanguage()

  if (entries.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 text-center text-neutral-400 dark:text-neutral-500">
        {t.noEntries}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
          {t.history}
        </h2>
        <button
          onClick={() => exportToCSV(entries)}
          className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <Download size={14} />
          {t.exportCSV}
        </button>
      </div>
      <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
        <AnimatePresence>
          {entries.map((entry) => {
            const net = entry.sales - entry.expenses
            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2 last:border-0"
              >
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {entry.date}
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {t.salesShort}: ₹{entry.sales} · {t.expensesShort}: ₹{entry.expenses}
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
                    aria-label={t.deleteEntry}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}