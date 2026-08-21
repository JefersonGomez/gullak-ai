import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { PiggyBank, TrendingUp, Sparkles } from "lucide-react"
import { useLanguage } from "../lib/useLanguage"
import LanguageSelector from "../components/LanguageSelector"
import ThemeToggle from "../components/ThemeToggle"

export default function Landing() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4 transition-colors relative">
      <div className="absolute top-6 right-6 flex gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full text-center flex flex-col items-center gap-6"
      >
        <div className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl">
          <PiggyBank size={40} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{t.appName}</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            {t.landingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 flex flex-col gap-2">
            <TrendingUp size={20} className="text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{t.feature1}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 flex flex-col gap-2">
            <Sparkles size={20} className="text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{t.feature2}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 flex flex-col gap-2">
            <PiggyBank size={20} className="text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{t.feature3}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-emerald-600 text-white rounded-lg px-8 py-3 font-medium hover:bg-emerald-700 transition"
        >
          {t.start}
        </button>
      </motion.div>
    </div>
  )
}