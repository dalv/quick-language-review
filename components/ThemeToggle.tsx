"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="theme-toggle p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-blue-500" />}
    </button>
  )
}

