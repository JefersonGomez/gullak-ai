import Papa from "papaparse"
const KEY = "gullak_entries"
const GOAL_KEY = "gullak_goal"
//Esta funcion lee todos los registros guradados
export function getEntries(){
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
}

//agrega un nuevo registro con un id unico basado en la hora
export function addEntry(entry) {
    const entries = getEntries()
    const newEntry = {...entry,id:Date.now()}
    const updated = [newEntry, ...entries]
    localStorage.setItem(KEY,JSON.stringify(updated))
    return updated
}

//borra un registro si por si paso un accidente
export function deleteEntry(id) {
    const updated = getEntries().filter(e=>e.id !==id)
    localStorage.setItem(KEY, JSON.stringify(updated))
    return updated
}

export function getGoal() {
  const raw = localStorage.getItem(GOAL_KEY)
  return raw ? Number(raw) : 0
}

export function setGoal(amount) {
  localStorage.setItem(GOAL_KEY, amount)
}

export function exportToCSV(entries) {
    const rows = entries.map((e)=>({
        Fecha : e.date,
        Ventas: e.sales,
        Gastos: e.expenses,
        "Ganancia Neta":e.sales - e.expenses
    }))

    const csv = Papa.unparse(rows)
    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"})
    const url = URL.createObjectURL(blob)


       const link = document.createElement("a")
    link.href = url
    link.download = `gullak-reporte-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

