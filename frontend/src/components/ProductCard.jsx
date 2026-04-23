import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

export function ProductCard({ product, index, onAddToCart }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-panel"
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-48 sm:h-72 transition duration-500 group-hover:scale-110">
          {product.image && product.image.length === 2 ? (
            <div className="flex w-full h-full relative">
              <div className="w-1/2 h-full relative">
                <img src={product.image[0]} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
              </div>
              <div className="w-1/2 h-full relative">
                <img src={product.image[1]} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)] z-20">
                  <span className="font-black text-xl leading-none mt-0.5">+</span>
                </div>
              </div>
            </div>
          ) : product.image && product.image.length > 2 ? (
            <div className="flex w-full h-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {product.image.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`${product.name} - Imagen ${i + 1}`}
                  className="h-full w-full shrink-0 snap-center object-cover"
                />
              ))}
            </div>
          ) : (
            <img
              src={product.image[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {product.image && product.image.length > 2 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {product.image.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 pointer-events-none" />
            <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-start justify-between gap-2">
              <span className={`inline-flex rounded-md px-2 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest ${product.isOffer ? 'bg-accent text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border border-white/10 bg-white/5 text-white'}`}>
                {product.isOffer ? 'OFERTA' : product.tag}
              </span>
              {product.isOffer && product.discount && (
                <span className="inline-flex rounded-md bg-red-500 px-2 py-1 text-[10px] sm:text-xs font-black uppercase text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] shrink-0">
                  {product.discount.toString().includes('%') ? product.discount : `${product.discount}%`} OFF
                </span>
              )}
            </div>
      </div>

      <div className="space-y-3 sm:space-y-5 p-3 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-1 sm:gap-4">
          <div className="w-full sm:w-auto sm:flex-1">
            <div className="flex items-center justify-between gap-1 sm:gap-2">
              <h3 className="text-sm sm:text-xl font-extrabold uppercase leading-tight text-white pr-2 line-clamp-1">{product.name}</h3>
              <div className="flex flex-col items-end shrink-0">
                {product.isOffer && product.originalPrice && (
                  <span className="text-[10px] sm:text-xs text-white/40 line-through leading-none mb-0.5">{product.originalPrice}</span>
                )}
                <p className="text-sm sm:text-lg font-black text-accent leading-none">{product.price}</p>
              </div>
            </div>
            <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm leading-4 sm:leading-6 text-white/58 line-clamp-2">
              {product.desc || "Fórmula seleccionada para entrenamientos intensos y progresión constante."}
            </p>
          </div>
        </div>

        <button onClick={onAddToCart} className="inline-flex w-full items-center justify-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-white transition hover:border-accent/40 hover:bg-accent hover:text-black">
          <ShoppingBag size={14} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Agregar al carrito</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      </div>
    </motion.article>
  )
}
