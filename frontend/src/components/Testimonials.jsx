import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

export function Testimonials({ testimonials }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonios"
          title="Prueba social con tono de marca real"
          description="Opiniones que refuerzan legitimidad, experiencia premium y percepcion de una tienda lista para escalar campanas."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-8 text-white/78">“{testimonial.quote}”</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-base font-bold uppercase tracking-[0.12em] text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm text-white/45">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
