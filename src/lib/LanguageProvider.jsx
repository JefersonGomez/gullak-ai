import { useState } from "react"
import { LanguageContext } from "./LanguageContext"
import { translations } from "./translations"

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "es")

  function changeLang(newLang) {
    setLang(newLang)
    localStorage.setItem("lang", newLang)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}