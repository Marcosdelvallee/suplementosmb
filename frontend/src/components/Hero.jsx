import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const stats = [
  { value: 'Clientes activos', label: '' },
  { value: '4.9/5', label: 'Valoración promedio' },
]

const perks = [
  { icon: ShieldCheck, label: 'Productos 100% originales' },
  { icon: Sparkles, label: 'Selección premium' },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="mx-auto flex flex-col items-center text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            E-commerce fitness de alto rendimiento
          </span>
          <h1 className="mt-8 text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Potencia tu rendimiento al maximo
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/100 sm:text-lg">
            Suplementacion premium, formulas seleccionadas y una experiencia de compra creada para atletas que no
            negocian resultados.
          </p>

          <div className="mt-10 flex flex-col w-full sm:w-auto sm:flex-row gap-4 justify-center">
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02] hover:shadow-neon"
            >
              Comprar ahora
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#combos"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Ver combos
            </a>
          </div>

          <div className="mt-14 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center rounded-3xl border border-white/10 bg-white/5 p-6 shadow-panel min-h-[104px]">
                {stat.value && (
                  <p className={`${stat.label ? 'text-4xl' : 'text-2xl'} font-black text-white uppercase`}>
                    {stat.value}
                  </p>
                )}
                {stat.label && <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50">{stat.label}</p>}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {perks.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72"
              >
                <Icon size={16} className="text-accent" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
