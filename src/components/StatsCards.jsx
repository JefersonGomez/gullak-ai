import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

export default function StatsCards({ entries }) {
  const totalSales = entries.reduce((sum, e) => sum + e.sales, 0)
  const totalExpenses = entries.reduce((sum, e) => sum + e.expenses, 0)
  const net = totalSales - totalExpenses

  const cards = [
    {
      label: "Ventas totales",
      value: totalSales,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      label: "Gastos totales",
      value: totalExpenses,
      icon: TrendingDown,
      color: "text-red-500 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/40",
    },
    {
      label: "Ahorro neto",
      value: net,
      icon: Wallet,
      color: net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400",
      bg: net >= 0 ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-red-50 dark:bg-red-950/40",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-5 flex items-center gap-4"
        >
          <div className={`${bg} ${color} p-3 rounded-xl`}>
            <Icon size={22} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
            <p className={`text-xl font-bold ${color}`}>₹{value.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}