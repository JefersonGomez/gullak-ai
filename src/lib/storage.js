
const KEY = "gullak_entries"

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