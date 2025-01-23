"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "lucide-react"

interface SelectorProps {
  label: string
  options: { value: string; label: string }[]
  selectedValue: string
  onChange: (value: string) => void
}

export default function Selector({ label, options, selectedValue, onChange }: SelectorProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {label}: {options.find((opt) => opt.value === selectedValue)?.label}
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white dark:bg-gray-800 rounded-md p-1 shadow-md"
          sideOffset={5}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <DropdownMenu.Item
              key={option.value}
              className="text-sm text-gray-700 dark:text-gray-300 rounded-md px-2 py-2 outline-none cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onSelect={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

