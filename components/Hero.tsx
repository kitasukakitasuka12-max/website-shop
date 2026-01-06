
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070" 
          alt="Future Fashion Hero"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 text-center max-w-4xl px-6">
        <div className="inline-block px-4 py-1 mb-6 rounded-full glass border border-white/10 text-xs font-bold tracking-widest text-purple-400 uppercase">
          Era Baru Estetika
        </div>
        <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 tracking-tight leading-[0.9]">
          MELAMPAUI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">CAKRAWALA</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Mengkurasi pakaian performa tinggi yang diinfus dengan teknologi masa depan. Dirancang untuk warga dunia hari esok.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 group">
            BELANJA KOLEKSI <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 glass border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
            LIHAT LOOKBOOK
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white" />
        <span className="text-[10px] tracking-widest uppercase">GULIR KE BAWAH</span>
      </div>
    </section>
  );
};

export default Hero;
