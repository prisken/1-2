'use client'

import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const STORAGE_KEY = 'onboarding_shown_v1'

export default function OnboardingTooltip() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const shown = localStorage.getItem(STORAGE_KEY)
      if (!shown) {
        // Delay slightly to avoid layout shift
        const t = setTimeout(() => setVisible(true), 600)
        return () => clearTimeout(t)
      }
    } catch (_) {}
  }, [])

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch (_) {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-20 z-50 px-4 safe-area-inset">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-2xl shadow-xl bg-white/95 backdrop-blur border border-gray-200 p-4 pr-12">
          <button
            aria-label="Close"
            onClick={dismiss}
            className="absolute top-2 right-2 p-2 rounded-lg text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          <p className="text-sm text-gray-800 font-medium mb-1">Tips for easier shopping</p>
          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
            <li>Use the bottom bar for Home, Shop, Cart, and About</li>
            <li>Tap Filter to narrow products by category or price</li>
            <li>On product pages, use the sticky bar to add quickly</li>
          </ul>
          <div className="mt-3">
            <button onClick={dismiss} className="inline-flex items-center px-3 py-2 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600">
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


