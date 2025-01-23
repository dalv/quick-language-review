"use client"

import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (input: string) => void
}

export default function SettingsModal({ isOpen, onClose, onSubmit }: SettingsModalProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(input)
    setInput("")
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-full">
          <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Settings</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-40 p-2 border rounded mb-4 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              placeholder="Enter card data (one per line):&#10;Front | Back"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                OK
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

