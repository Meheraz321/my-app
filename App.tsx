
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DocSection } from './components/DocSection';
import { AIChat } from './components/AIChat';
import { guideSections } from './data/guideData';
import { Trophy, Flame, Code, Book, Rocket, HelpCircle, Languages } from 'lucide-react';

export type Language = 'bn' | 'en';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(guideSections[0]?.id || '');
  // const [activeSection, setActiveSection] = useState<string>(guideSections[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [language, setLanguage] = useState<Language>('bn');

  // Sync scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
  }, [activeSection]);

  const currentSectionData = guideSections.find(s => s.id === activeSection) || guideSections[0];

  const t = {
    bn: {
      aiGuide: "AI গাইড",
      expertAi: "Unity এক্সপার্ট AI",
      guide: "গাইড",
      setup: "সেটআপ",
      ui: "UI",
      tips: "টিপস"
    },
    en: {
      aiGuide: "AI Guide",
      expertAi: "Unity Expert AI",
      guide: "Guide",
      setup: "Setup",
      ui: "UI",
      tips: "Tips"
    }
  }[language];

  const toggleLanguage = () => setLanguage(prev => prev === 'bn' ? 'en' : 'bn');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-500" size={24} />
          <h1 className="text-lg font-bold uppercase tracking-wider text-orange-400">BR DEV STUDIO</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-slate-300 border border-slate-700"
          >
            <Languages size={14} />
            {language === 'bn' ? 'EN' : 'BN'}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        language={language}
        onSelectSection={(id) => {
          setActiveSection(id);
          setIsMobileMenuOpen(false);
        }}
        onToggleLanguage={toggleLanguage}
        isOpen={isMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24">
          <DocSection section={currentSectionData} language={language} />
        </div>

        {/* Global Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <button
            onClick={() => setShowAI(!showAI)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <HelpCircle size={20} />
            <span>{t.aiGuide}</span>
          </button>
        </div>

        {/* AI Chat Overlay */}
        {showAI && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-2xl h-[80vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
              <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-400">
                  <Rocket size={20} />
                  <span className="font-bold">{t.expertAi}</span>
                </div>
                <button onClick={() => setShowAI(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <div className="flex-1 overflow-hidden">
                <AIChat language={language} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 z-40">
        <button
          onClick={() => setActiveSection('intro')}
          className={`flex flex-col items-center gap-1 ${activeSection === 'intro' ? 'text-orange-400' : 'text-slate-500'}`}
        >
          <Book size={20} />
          <span className="text-[10px]">{t.guide}</span>
        </button>
        <button
          onClick={() => setActiveSection('setup')}
          className={`flex flex-col items-center gap-1 ${activeSection === 'setup' ? 'text-orange-400' : 'text-slate-500'}`}
        >
          <Rocket size={20} />
          <span className="text-[10px]">{t.setup}</span>
        </button>
        <button
          onClick={() => setActiveSection('ui')}
          className={`flex flex-col items-center gap-1 ${activeSection === 'ui' ? 'text-orange-400' : 'text-slate-500'}`}
        >
          <Code size={20} />
          <span className="text-[10px]">{t.ui}</span>
        </button>
        <button
          onClick={() => setActiveSection('tips')}
          className={`flex flex-col items-center gap-1 ${activeSection === 'tips' ? 'text-orange-400' : 'text-slate-500'}`}
        >
          <Trophy size={20} />
          <span className="text-[10px]">{t.tips}</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
