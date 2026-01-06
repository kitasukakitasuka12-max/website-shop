
import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-heading font-bold mb-4 tracking-tight">DROP UNGGULAN</h2>
          <p className="text-gray-400">Inovasi terbaru dalam teknologi pakaian futuristik.</p>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-bold text-gray-400 hover:text-white border-b border-transparent hover:border-white transition-all pb-1">SEMUA</button>
          <button className="text-sm font-bold text-gray-400 hover:text-white border-b border-transparent hover:border-white transition-all pb-1">PAKAIAN</button>
          <button className="text-sm font-bold text-gray-400 hover:text-white border-b border-transparent hover:border-white transition-all pb-1">ALAS KAKI</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 mb-4 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all"
                >
                  <Plus size={24} />
                </button>
              </div>
              {product.featured && (
                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-purple-400">
                  Drop Terbatas
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-col mb-1">
                <h3 className="text-lg font-bold font-heading">{product.name}</h3>
                <span className="text-purple-400 font-bold tracking-tight">{formatPrice(product.price)}</span>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
