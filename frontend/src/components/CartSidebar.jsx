import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'

export function CartSidebar({ isOpen, onClose, cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + (item.numericPrice || 0), 0)

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let message = "¡Hola! Me gustaría comprar los siguientes suplementos:%0A%0A";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.price}%0A`;
    });
    message += `%0ATotal: $${total.toLocaleString('es-AR')}%0A%0A¿Tienen stock?`;
    
    window.open(`https://wa.me/5493416879454?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="text-xl font-black uppercase text-white">Tu Carrito</h2>
              <button onClick={onClose} className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <p className="text-center text-white/50 mt-10">Tu carrito está vacío.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center rounded-2xl border border-white/10 bg-white/5 p-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <p className="text-sm font-black text-accent">{item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="p-2 text-white/40 hover:text-red-500 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-5 bg-black/50">
              <div className="flex justify-between items-center mb-4 text-lg font-black text-white">
                <span>Total:</span>
                <span className="text-accent">${total.toLocaleString('es-AR')}</span>
              </div>
              <button onClick={handleCheckout} className="w-full rounded-full bg-accent py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-white disabled:opacity-50" disabled={cart.length === 0}>
                Finalizar Compra
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
