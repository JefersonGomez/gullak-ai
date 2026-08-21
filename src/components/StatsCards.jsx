import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useLanguage } from "../lib/useLanguage";

function getPeriodTotals(entries, startDaysAgo, endDaysAgo) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - startDaysAgo);
  const end = new Date(now);
  end.setDate(end.getDate() - endDaysAgo);

  const inRange = entries.filter((e) => {
    const d = new Date(e.date);
    return d >= start && d < end;
  });

  const sales = inRange.reduce((s, e) => s + e.sales, 0);
  const expenses = inRange.reduce((s, e) => s + e.expenses, 0);
  return { sales, expenses, net: sales - expenses };
}

function percentChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export default function StatsCards({ entries }) {
  const { t } = useLanguage();

  const totalSales = entries.reduce((sum, e) => sum + e.sales, 0);
  const totalExpenses = entries.reduce((sum, e) => sum + e.expenses, 0);
  const net = totalSales - totalExpenses;

  const currentPeriod = getPeriodTotals(entries, 7, 0);
  const previousPeriod = getPeriodTotals(entries, 14, 7);

  const salesChange = percentChange(currentPeriod.sales, previousPeriod.sales);
  const expensesChange = percentChange(
    currentPeriod.expenses,
    previousPeriod.expenses,
  );
  const netChange = percentChange(currentPeriod.net, previousPeriod.net);

  const cards = [
    {
      label: t.totalSales,
      value: totalSales,
      change: salesChange,
      goodDirection: "up",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      label: t.totalExpenses,
      value: totalExpenses,
      change: expensesChange,
      goodDirection: "down",
      icon: TrendingDown,
      color: "text-red-500 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/40",
    },
    {
      label: t.netSavings,
      value: net,
      change: netChange,
      goodDirection: "up",
      icon: Wallet,
      color:
        net >= 0
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-red-500 dark:text-red-400",
      bg:
        net >= 0
          ? "bg-emerald-50 dark:bg-emerald-950/40"
          : "bg-red-50 dark:bg-red-950/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(
        ({ label, value, change, goodDirection, icon: Icon, color, bg }, i) => {
          const isPositiveChange = change >= 0;
          const isGood =
            goodDirection === "up" ? isPositiveChange : !isPositiveChange;
          const hasComparison =
            previousPeriod.sales > 0 || previousPeriod.expenses > 0;

          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-5 flex items-center gap-4"
            >
              <div className={`${bg} ${color} p-3 rounded-xl`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {label}
                </p>
                <div className="flex items-center gap-2">
                  <p className={`text-xl font-bold ${color}`}>
                    ₹{value.toLocaleString()}
                  </p>
                  {hasComparison && (
                    <span
                      className={`flex items-center gap-0.5 text-xs font-medium ${
                        isGood ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {isPositiveChange ? (
                        <ArrowUp size={12} />
                      ) : (
                        <ArrowDown size={12} />
                      )}
                      {Math.abs(change).toFixed(0)}%{" "}
                      <span className="text-neutral-400 dark:text-neutral-500 font-normal">
                        {t.vsLastWeek}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        },
      )}
    </div>
  );
}
