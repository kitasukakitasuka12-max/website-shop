
import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartToggle }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold font-heading tracking-tighter neon-text text-purple-400">
            LUMINA LUXE
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">COLLECTIONS</a>
            <a href="#" className="hover:text-white transition-colors">FUTURE WEAR</a>
            <a href="#" className="hover:text-white transition-colors">ACCESSORIES</a>
            <a href="#" className="hover:text-white transition-colors">ABOUT</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
            <User size={20} />
          </button>
          <button 
            onClick={onCartToggle}
            className="relative p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-purple-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
