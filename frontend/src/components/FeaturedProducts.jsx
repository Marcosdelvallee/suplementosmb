import { SectionHeading } from './SectionHeading'
import { ProductCard } from './ProductCard'

export function FeaturedProducts({ products, onAddToCart, selectedCategory }) {
  return (
    <section id="productos" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Productos destacados"
          title="Nuestros suplementos"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onAddToCart={() => onAddToCart(product)} />
          ))}
        </div>
      </div>
    </section>
  )
}
