import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { ProductCard } from './ProductCard'

export function OffersSection({ offers, onAddToCart }) {
  if (!offers || offers.length === 0) {
    return null; // Ocultar si no hay ofertas reales
  }

  return (
    <section id="ofertas" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Ofertas"
          title="Packs armados para romper tus límites"
          description="Aprovechá estas combinaciones estratégicas diseñadas por expertos. Llevate el combo completo para tu objetivo y ahorrá a lo grande en tu transformación."
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <ProductCard key={offer.id} product={offer} onAddToCart={onAddToCart} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
