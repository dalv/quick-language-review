"use client"

import { useState, useEffect } from "react"
import Card from "../components/Card"
import ThemeToggle from "../components/ThemeToggle"
import Selector from "../components/Selector"
import SettingsModal from "../components/SettingsModal"
import { Settings } from "lucide-react"

const languages = [
  { value: "id", label: "Indonesian" },
  { value: "zh", label: "Chinese" },
]

interface CardData {
  front: string
  back: string
}

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [language, setLanguage] = useState("id")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [cards, setCards] = useState<CardData[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const handleFlip = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (
      !target.closest(".theme-toggle") &&
      !target.closest("[data-radix-dropdown-menu-trigger]") &&
      !target.closest('[role="menuitem"]') &&
      !target.closest(".settings-button")
    ) {
      setIsFlipped((prev) => !prev)
    }
  }

  const handleFlipComplete = () => {
    setCurrentCardIndex(Math.floor(Math.random() * cards.length))
  }

  const handleSettingsSubmit = (input: string) => {
    const newCards = input.split("\n").map((line) => {
      const [front, back] = line.split("|").map((s) => s.trim())
      return { front, back }
    })
    setCards(newCards)
    setCurrentCardIndex(Math.floor(Math.random() * newCards.length))
    setIsSettingsOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setIsFlipped((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24 bg-white dark:bg-gray-900 transition-colors duration-300"
      onClick={handleFlip}
    >
      <div className="absolute top-4 left-4 flex space-x-4">
        <Selector label="Language" options={languages} selectedValue={language} onChange={setLanguage} />
      </div>
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="settings-button p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
          aria-label="Open settings"
        >
          <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <ThemeToggle />
      </div>
      <Card
        isFlipped={isFlipped}
        language={language}
        frontText={cards[currentCardIndex]?.front || "Add cards in settings"}
        backText={cards[currentCardIndex]?.back || "Add cards in settings"}
        onFlipComplete={handleFlipComplete}
      />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onSubmit={handleSettingsSubmit} />
    </main>
  )
}

