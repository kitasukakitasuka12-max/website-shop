
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import AiChat from './components/AiChat';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartToggle={() => setIsCartOpen(!isCartOpen)} 
      />
      
      <main>
        <Hero />
        
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
          <ProductList onAddToCart={handleAddToCart} />
        </div>

        <section className="py-24 px-6 border-t border-white/5 bg-[#080808]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="text-xl font-bold font-heading mb-6 tracking-tighter text-purple-400">LUMINA LUXE</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Mendefinisikan ulang hubungan antara ekspresi manusia dan evolusi teknologi.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-xs">IG</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-xs">TW</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-xs">TK</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Navigasi</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Manifesto</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Katalog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Arsip Drop</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Protokol Ukuran</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Layanan Klien</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Dukungan Saraf</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Lacak Pesanan</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Pengembalian Aman</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Pembaruan</h4>
              <p className="text-sm text-gray-500 mb-4">Sinkronkan jaringan saraf Anda dengan drop terbaru kami.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="comm-link@host.net" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-purple-500"
                />
                <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-purple-500 hover:text-white transition-all">
                  SINKRON
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 text-[10px] text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 LUMINA LUXE SYSTEMS. HAK CIPTA DILINDUNGI.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">PROTOKOL PRIVASI</a>
              <a href="#" className="hover:text-white">SYARAT KETENTUAN</a>
            </div>
          </div>
        </section>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />

      <AiChat />
    </div>
  );
};

export default App;
