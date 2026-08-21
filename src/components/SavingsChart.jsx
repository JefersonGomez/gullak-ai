import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { useLanguage } from "../lib/useLanguage"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SavingsChart({ entries }) {
  const { t } = useLanguage()
  if (entries.length === 0) return null

  const recent = [...entries].reverse().slice(-7)

  const data = {
    labels: recent.map((e) => e.date.slice(5)),
    datasets: [
      {
        label: t.salesShort,
        data: recent.map((e) => e.sales),
        backgroundColor: "#10b981",
        borderRadius: 6,
      },
      {
        label: t.expensesShort,
        data: recent.map((e) => e.expenses),
        backgroundColor: "#f87171",
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
        {t.chartTitle.replace("{n}", recent.length)}
      </h2>
      <Bar data={data} options={options} />
    </div>
  )
}