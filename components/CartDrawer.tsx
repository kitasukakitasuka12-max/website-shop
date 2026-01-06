
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#0a0a0a] h-full shadow-2xl border-l border-white/10 flex flex-col">
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-purple-400" />
            <h2 className="text-xl font-bold font-heading">YOUR CART</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm">Your manifest is empty.</p>
              <button onClick={onClose} className="text-purple-400 font-bold hover:underline">Start Exploring</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-24 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm truncate">{item.name}</h3>
                    <span className="text-purple-400 text-sm font-bold">${item.price * item.quantity}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 glass rounded-full px-3 py-1 scale-90 -ml-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 glass bg-white/5">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 text-sm tracking-widest uppercase">Subtotal</span>
              <span className="text-2xl font-bold font-heading">${total}</span>
            </div>
            <button className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all shadow-lg shadow-purple-500/10">
              INITIATE CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
