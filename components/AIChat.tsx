
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, User, Bot, Loader2, RefreshCw } from 'lucide-react';
import { Language } from '../App';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  language: Language;
}

export const AIChat: React.FC<AIChatProps> = ({ language }) => {
  const t = {
    bn: {
      initial: 'আমি আপনার ইউনিটি গেম ডেভেলপমেন্ট অ্যাসিস্ট্যান্ট। আপনি আমাকে ইউনিটি, C# স্ক্রিপ্টিং বা ব্যাটেল রয়্যাল গেমের মেকানিক্স সম্পর্কে যেকোনো প্রশ্ন করতে পারেন (বাংলা বা ইংরেজিতে)।',
      placeholder: 'আপনার প্রশ্নটি এখানে লিখুন...',
      loading: 'AI গাইড চিন্তা করছে...',
      clear: 'চ্যাট ক্লিয়ার করুন',
      error: 'সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      noResponse: 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।'
    },
    en: {
      initial: 'I am your Unity Game Development Assistant. You can ask me anything about Unity, C# scripting, or Battle Royale mechanics (in English or Bengali).',
      placeholder: 'Type your question here...',
      loading: 'AI Guide is thinking...',
      clear: 'Clear Chat',
      error: 'Server error. Please try again later.',
      noResponse: 'Sorry, I cannot respond at the moment.'
    }
  }[language];

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.initial }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset initial message on language change if chat is fresh
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{ role: 'assistant', content: t.initial }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are an expert Unity Game Developer specializing in Battle Royale games (like Free Fire). 
          The user is currently using the app in ${language === 'bn' ? 'Bengali' : 'English'}.
          Always provide clear, concise, and technical advice. 
          If the user asks in ${language === 'bn' ? 'Bengali, respond primarily in Bengali mixed with English technical terms' : 'English, respond in English'}.
          Focus on Unity 2021.3+, URP, C# scripting, and mobile optimization.`
        }
      });

      const assistantMessage = response.text || t.noResponse;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: t.initial }]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-orange-600' : 'bg-slate-700'}`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-orange-400" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm
                ${msg.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}
              `}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <Loader2 size={16} className="text-orange-400 animate-spin" />
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 text-slate-500 italic">
                {t.loading}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-2">
           <button 
             onClick={clearChat}
             className="text-[10px] uppercase tracking-tighter text-slate-500 hover:text-slate-300 flex items-center gap-1 font-bold"
           >
             <RefreshCw size={10} /> {t.clear}
           </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all text-white placeholder:text-slate-600"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-800 text-white p-3 rounded-xl transition-all shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
