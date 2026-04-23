import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingCart } from 'lucide-react'

const navItems = ['Inicio', 'Combos', 'Productos', 'Contacto']

export function Navbar({ cartCount = 0, onCartClick, categories = [], onSelectCategory }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/65 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-lg font-black text-accent shadow-neon">
            MB
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-white">MB SUPLEMENTOS</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Premium Performance</p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white/70 transition hover:text-accent"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button onClick={onCartClick} className="relative rounded-full border border-white/10 p-3 text-white/80 transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-full border border-white/10 p-3 text-white md:hidden"
        >
          <Menu size={18} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-black/90 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
              <div className="mb-1 text-xs font-bold text-accent uppercase tracking-widest">Filtros de Catálogo</div>
              <button
                onClick={() => { if(onSelectCategory) onSelectCategory(null); setIsOpen(false); }}
                className="text-left rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-accent hover:text-accent"
              >
                Todos los productos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => { if(onSelectCategory) onSelectCategory(cat.name); setIsOpen(false); }}
                  className="text-left rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-accent hover:text-accent"
                >
                  {cat.name}
                </button>
              ))}
              
              <div className="mt-4 mb-1 text-xs font-bold text-white/50 uppercase tracking-widest">Menú Principal</div>
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-white/8 bg-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
