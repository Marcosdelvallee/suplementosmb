import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { ProductCard } from './ProductCard'

export function CombosSection({ combos, onAddToCart }) {
  if (!combos || combos.length === 0) {
    return null; // Ocultar si no hay combos
  }

  return (
    <section id="combos" className="px-4 pt-20 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Combos Especiales"
          title="Llevá más, pagá menos"
          description="Packs diseñados estratégicamente para resultados extremos. Ahorrá llevando el stack completo en lugar de comprar por separado."
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {combos.map((combo, index) => (
            <ProductCard key={combo.id} product={combo} onAddToCart={onAddToCart} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
