import { MapPin, Phone } from 'lucide-react'

const links = ['Inicio', 'Productos', 'Contacto']

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-accent">MB SUPLEMENTOS</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white">Links utiles</p>
          <div className="mt-5 space-y-3">
            {links.map((link) => (
              <a
                key={link}
                href={link === 'Contacto' ? 'https://wa.me/5493416879454' : `#${link.toLowerCase()}`}
                target={link === 'Contacto' ? '_blank' : undefined}
                rel={link === 'Contacto' ? 'noopener noreferrer' : undefined}
                className="block text-sm text-white/60 transition hover:text-accent"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white">Contacto</p>
          <div className="mt-5 space-y-4 text-sm text-white/60">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-accent" />
              Rosario, Argentina
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-accent" />
              +54 9 341 687-9454
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
