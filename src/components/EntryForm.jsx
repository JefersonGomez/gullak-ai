import { useState } from "react";

export default function EntryForm({ onAdd }) {
  const [sales, setSales] = useState("");
  const [expenses, setExpenses] = useState("");
  const [category, setCategory] = useState("Inventario");

  function handleSubmit(e) {
    e.preventDefault();
    if (!sales || !expenses) return;

    onAdd({
      date: new Date().toISOString().split("T")[0],
      sales: Number(sales),
      expenses: Number(expenses),
      category,
    });

    setSales("");
    setExpenses("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Registro de hoy
      </h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-neutral-600 dark:text-neutral-400">
          Ventas del día (₹)
        </label>
        <input
          type="number"
          value={sales}
          onChange={(e) => setSales(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="0"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-neutral-600 dark:text-neutral-400">
          Gastos del día (₹)
        </label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="0"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-neutral-600 dark:text-neutral-400">
          Categoría del gasto
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="Inventario">Inventario</option>
          <option value="Transporte">Transporte</option>
          <option value="Personal">Personal</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-emerald-600 text-white rounded-lg py-2 font-medium hover:bg-emerald-700 transition"
      >
        Guardar registro
      </button>
    </form>
  );
}
