import { Languages } from "lucide-react"
import { useLanguage } from "../lib/useLanguage"

export default function LanguageSelector() {
  const { lang, changeLang } = useLanguage()

  return (
    <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 rounded-lg px-2 py-2">
      <Languages size={16} className="text-neutral-400" />
      <select
        value={lang}
        onChange={(e) => changeLang(e.target.value)}
        className="bg-transparent text-sm text-neutral-600 dark:text-neutral-300 focus:outline-none"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  )
}