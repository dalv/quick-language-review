"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2 } from "lucide-react"

interface CardProps {
  isFlipped: boolean
  language: string
  frontText: string
  backText: string
  onFlipComplete: () => void
}

export default function Card({ isFlipped, language, frontText, backText, onFlipComplete }: CardProps) {
  const [displayedFront, setDisplayedFront] = useState(frontText)
  const [displayedBack, setDisplayedBack] = useState(backText)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    synthesisRef.current = window.speechSynthesis
    utteranceRef.current = new SpeechSynthesisUtterance()
  }, [])

  useEffect(() => {
    if (isFlipped) {
      speakText()
    } else {
      // Update the displayed text only when flipping to the front
      setDisplayedFront(frontText)
      setDisplayedBack(backText)
    }
  }, [isFlipped, frontText, backText])

  const speakText = () => {
    if (synthesisRef.current && utteranceRef.current) {
      synthesisRef.current.cancel()
      utteranceRef.current.text = displayedBack
      utteranceRef.current.lang = language === "id" ? "id-ID" : "zh-CN"
      synthesisRef.current.speak(utteranceRef.current)
    }
  }

  const handleTransitionEnd = () => {
    if (!isFlipped) {
      onFlipComplete()
    }
  }

  return (
    <div className="relative w-64 h-40 [perspective:1000px]">
      <div
        className={`absolute w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ${
          isFlipped ? "[transform:rotateY(-180deg)]" : ""
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg [backface-visibility:hidden] transition-colors duration-300">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{displayedFront}</p>
        </div>
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] transition-colors duration-300">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{displayedBack}</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              speakText()
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-300"
            aria-label="Speak text"
          >
            <Volume2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  )
}

