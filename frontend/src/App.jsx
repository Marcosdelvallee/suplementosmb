import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { categories as defaultCategories, featuredProducts as defaultProducts, offers, testimonials } from './data/store'
import { Benefits } from './components/Benefits'
import { Categories } from './components/Categories'
import { FeaturedProducts } from './components/FeaturedProducts'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { CombosSection } from './components/CombosSection'
import { Testimonials } from './components/Testimonials'
import { CartSidebar } from './components/CartSidebar'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "store", "catalog"), (docSnap) => {
      if (docSnap.exists()) {
        const items = docSnap.data().items || [];
        const formatted = items.map(p => ({
          id: p.id,
          name: p.name,
          price: `$${p.price.toLocaleString('es-AR')}`,
          numericPrice: p.price,
          image: Array.isArray(p.img) ? p.img : (p.img ? [p.img] : []),
          tag: p.category || 'Novedad',
          desc: p.desc,
          isOffer: p.isOffer,
          originalPrice: p.originalPrice,
          discount: p.discount
        }))
        setProducts(formatted)
      } else {
        setProducts([])
      }
    }, (err) => {
      console.error("Error loading products from Firebase:", err);
    });

    return () => unsub();
  }, [])

  const addToCart = (product) => {
    setCart([...cart, product])
    setIsCartOpen(true)
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const normalizeStr = (str) => {
    return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
  }

  const regularProducts = products.filter(p => p.tag !== 'Combos');
  const displayedProducts = selectedCategory 
    ? regularProducts.filter(p => normalizeStr(p.tag) === normalizeStr(selectedCategory))
    : regularProducts;
  return (
    <div className="min-h-screen bg-base text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.08),transparent_25%),linear-gradient(180deg,#0B0B0B_0%,#050505_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-[size:42px_42px] opacity-20" />

      <Navbar 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)} 
        categories={defaultCategories}
        onSelectCategory={setSelectedCategory}
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} removeFromCart={removeFromCart} />
      <main>
        <Hero />
        <Categories categories={['Proteínas', 'Creatina', 'Pre-Entrenos', 'Vitaminas', 'Aminoácidos', 'Otros'].map(c => ({name: c}))} onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <FeaturedProducts products={displayedProducts} onAddToCart={addToCart} selectedCategory={selectedCategory} />
        <CombosSection combos={products.filter(p => p.tag === 'Combos')} onAddToCart={addToCart} />
        <Benefits />
        <Testimonials testimonials={testimonials} />
      </main>
      <Footer />
    </div>
  )
}

export default App
