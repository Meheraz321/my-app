
import React from 'react';
import { guideSections } from '../data/guideData';
import { LayoutGrid, Wrench, Terminal, Map, Layout, Zap, Package, Flame, Languages } from 'lucide-react';
import { Language } from '../App';

interface SidebarProps {
  activeSection: string;
  language: Language;
  onSelectSection: (id: string) => void;
  onToggleLanguage: () => void;
  isOpen: boolean;
}

const getIcon = (id: string) => {
  switch (id) {
    case 'intro': return <LayoutGrid size={18} />;
    case 'setup': return <Wrench size={18} />;
    case 'scripts': return <Terminal size={18} />;
    case 'scene': return <Map size={18} />;
    case 'ui': return <Layout size={18} />;
    case 'optimization': return <Zap size={18} />;
    case 'build': return <Package size={18} />;
    default: return <LayoutGrid size={18} />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, language, onSelectSection, onToggleLanguage, isOpen }) => {
  const t = {
    bn: {
      mainGuide: "মূল গাইড",
      community: "কমিউনিটি",
      tutorials: "টিউটোরিয়াল",
      langSwitch: "English এ দেখুন"
    },
    en: {
      mainGuide: "Main Guide",
      community: "Community",
      tutorials: "Tutorials",
      langSwitch: "Switch to বাংলা"
    }
  }[language];

  return (
    <aside className={`
      fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Flame className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter">BR DEV</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Studio</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          <div className="mb-4">
            <button 
              onClick={onToggleLanguage}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-orange-400 hover:bg-slate-750 transition-colors"
            >
              <Languages size={14} />
              {t.langSwitch}
            </button>
          </div>

          <p className="text-[10px] font-bold text-slate-500 uppercase px-4 py-2 tracking-widest">{t.mainGuide}</p>
          {guideSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
                ${activeSection === section.id 
                  ? 'bg-orange-600/10 text-orange-400 border border-orange-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}
              `}
            >
              <span className={activeSection === section.id ? 'text-orange-500' : 'text-slate-500'}>
                {getIcon(section.id)}
              </span>
              {language === 'bn' ? section.title : section.titleEn}
            </button>
          ))}
          
          <div className="pt-8">
             <p className="text-[10px] font-bold text-slate-500 uppercase px-4 py-2 tracking-widest">{t.community}</p>
             <a href="#" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white text-sm transition-all">
               <span className="text-slate-500">🎮</span>
               Unity Discord
             </a>
             <a href="#" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white text-sm transition-all">
               <span className="text-slate-500">📺</span>
               {t.tutorials}
             </a>
          </div>
        </nav>

        {/* Footer info */}
        <div className="p-6 bg-slate-950/50 border-t border-slate-800">
           <div className="text-[10px] text-slate-600 font-mono">
             v1.0.5 - BATTLE_ROYALE_MULTI
           </div>
        </div>
      </div>
    </aside>
  );
};
