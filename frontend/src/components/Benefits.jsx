import { motion } from 'framer-motion'
import { Headset, PackageCheck, Rocket } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const benefits = [
  {
    icon: PackageCheck,
    title: 'Productos originales',
    description: 'Curaduría premium, presentación impecable y foco total en confianza para compra recurrente.',
  },
  {
    icon: Headset,
    title: 'Soporte personalizado',
    description: 'Atención humana y estratégica para guiar la compra, responder dudas y sostener la recompra.',
  },
]

export function Benefits() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(212,175,55,0.08),rgba(255,255,255,0.02),rgba(212,175,55,0.06))] p-6 sm:p-8 md:p-12">
        <SectionHeading
          eyebrow="Beneficios"
          title="Confianza construida para vender más"
          description="La conversión no depende solo del diseño: también de señales sólidas de seguridad, cumplimiento y acompañamiento."
        />

        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5 sm:p-6 backdrop-blur-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-xl font-black uppercase text-white sm:text-2xl">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80 sm:leading-7">{benefit.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
