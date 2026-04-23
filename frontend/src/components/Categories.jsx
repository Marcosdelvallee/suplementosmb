import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { useState } from 'react'

export function Categories({ categories, onSelectCategory, selectedCategory }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="px-4 pt-10 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Mobile Dropdown Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition hover:border-accent/50"
          >
            {selectedCategory ? `Filtro: ${selectedCategory}` : 'Filtrar por Categoría'}
            <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 flex flex-col gap-2 bg-[#0a0a0a] border border-white/10 p-3 rounded-xl">
                  <button 
                    onClick={() => {onSelectCategory(null); setIsOpen(false)}} 
                    className={`text-left px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition ${selectedCategory === null ? 'bg-accent text-black' : 'text-white/70 hover:bg-white/5'}`}
                  >
                    Todos los productos
                  </button>
                  {categories.map((category) => (
                    <button 
                      key={category.name}
                      onClick={() => {onSelectCategory(category.name); setIsOpen(false)}} 
                      className={`text-left px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition ${selectedCategory === category.name ? 'bg-accent text-black' : 'text-white/70 hover:bg-white/5'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Pills */}
        <div className="hidden md:flex gap-3 overflow-x-auto pb-4 hide-scrollbar items-center">
          <button
            onClick={() => onSelectCategory(null)}
            className={`shrink-0 whitespace-nowrap rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition border ${
              selectedCategory === null 
                ? 'border-accent bg-accent text-black' 
                : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className={`shrink-0 whitespace-nowrap rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition border ${
                selectedCategory === category.name 
                  ? 'border-accent bg-accent text-black' 
                  : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
