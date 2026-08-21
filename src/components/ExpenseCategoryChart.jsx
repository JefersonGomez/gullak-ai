import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie } from "react-chartjs-2"
import { useLanguage } from "../lib/useLanguage"

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = {
  Inventario: "#10b981",
  Transporte: "#3b82f6",
  Personal: "#f59e0b",
  Otros: "#a78bfa",
}

export default function ExpenseCategoryChart({ entries }) {
  const { t } = useLanguage()
  const totals = entries.reduce((acc, e) => {
    const cat = e.category || "Otros"
    acc[cat] = (acc[cat] || 0) + e.expenses
    return acc
  }, {})

  const labels = Object.keys(totals)

  if (labels.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 text-center text-neutral-400 dark:text-neutral-500">
        {t.noCategoryData}
      </div>
    )
  }

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((l) => totals[l]),
        backgroundColor: labels.map((l) => COLORS[l] || "#a3a3a3"),
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
        {t.categoryChartTitle}
      </h2>
      <div className="max-w-[240px] mx-auto">
        <Pie data={data} options={{ plugins: { legend: { position: "bottom" } } }} />
      </div>
    </div>
  )
}