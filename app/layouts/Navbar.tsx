import { Coffee } from 'lucide-react'
import React from 'react'

function Navbar() {
  return (
      <nav className="fixed w-full z-50 bg-kopi-900/90 backdrop-blur-md border-b border-emas-600/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emas-600/20 rounded-full blur-sm"></div>
              <Coffee className="w-6 h-6 text-emas-400 relative z-10" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-white tracking-widest leading-none">NUSANTARA</h1>
              <span className="text-[10px] text-emas-400 uppercase tracking-[0.2em] font-light">Coffee Intelligence</span>
            </div>
          </div>
        </div>
      </nav>

  )
}

export default Navbar