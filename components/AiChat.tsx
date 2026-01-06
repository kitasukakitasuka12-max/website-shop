
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageCircle } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Salam. Saya Lumina, AI gaya pribadi Anda. Bagaimana saya bisa membantu meningkatkan estetika Anda hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMsg);
      if (response) {
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Saya mengalami gangguan transmisi saraf. Mohon coba lagi sebentar lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-purple-500/20 hover:scale-110 transition-transform active:scale-95 group"
        >
          <Sparkles className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 bg-white w-3 h-3 rounded-full animate-ping" />
        </button>
      )}

      {isOpen && (
        <div className="w-[380px] h-[500px] bg-[#0d0d0d] glass border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-heading leading-tight">LUMINA AI</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Sistem Aktif</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-gray-400 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya Lumina tentang gaya..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1.5 w-9 h-9 bg-white text-black rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-500 hover:text-white transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-600 mt-3 uppercase tracking-tighter">AI mungkin menghasilkan tren gaya spekulatif.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChat;
