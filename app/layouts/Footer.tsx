import { Flower2 } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
        <div className="mt-16 text-center opacity-40">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-emas-600"></div>
            <Flower2 className="w-4 h-4 text-emas-600" />
            <div className="h-px w-12 bg-emas-600"></div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-kopi-500">Dilatih dengan 54 Varietas Kopi Indonesia</p>
        </div>
  )
}
