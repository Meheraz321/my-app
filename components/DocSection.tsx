
import React from 'react';
import { GuideSection } from '../data/guideData';
import { CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { Language } from '../App';

interface DocSectionProps {
  section: GuideSection;
  language: Language;
}

export const DocSection: React.FC<DocSectionProps> = ({ section, language }) => {
  const title = language === 'bn' ? section.title : section.titleEn;
  const content = language === 'bn' ? section.content : section.contentEn;
  const steps = language === 'bn' ? section.steps : section.stepsEn;

  const t = {
    bn: {
      stepsTitle: "কার্যকরী ধাপসমূহ (Steps)",
      note: "মনে রাখবেন: কোডিং বা ইউনিটির যেকোনো সমস্যায় ডানদিকের AI চ্যাট হেল্পার ব্যবহার করতে পারেন।"
    },
    en: {
      stepsTitle: "Implementation Steps",
      note: "Remember: For any coding or Unity issues, you can use the AI Chat helper on the right."
    }
  }[language];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-orange-500 mb-2 font-mono text-sm">
          <span>{section.category.toUpperCase()}</span>
          <ChevronRight size={14} />
          <span>{section.id.toUpperCase()}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white flex items-center gap-4">
          <span className="text-5xl">{section.icon}</span>
          {title}
        </h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <span className="text-9xl font-black">{section.icon}</span>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-line space-y-4">
            {content.split('\n').map((line, i) => {
              if (line.trim().startsWith('-')) {
                return (
                  <div key={i} className="flex gap-3 items-start pl-4 group">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform" />
                    <span className="flex-1">{line.trim().substring(1)}</span>
                  </div>
                );
              }
              if (line.trim().startsWith('**')) {
                return (
                  <h3 key={i} className="text-xl font-bold text-white mt-6 mb-2">
                    {line.trim().replace(/\*\*/g, '')}
                  </h3>
                );
              }
              return <p key={i}>{line}</p>;
            })}
          </div>
        </div>

        {steps && (
          <div className="mt-12 bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
            <h4 className="flex items-center gap-2 text-white font-bold mb-4 uppercase tracking-wider text-sm">
              <CheckCircle2 size={18} className="text-green-500" />
              {t.stepsTitle}
            </h4>
            <ul className="space-y-3">
              {steps.map((step, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-400 group">
                  <span className="text-xs font-mono bg-slate-800 text-slate-400 w-6 h-6 flex items-center justify-center rounded-md group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 p-4 bg-orange-950/20 border border-orange-900/30 rounded-xl flex gap-3 items-start">
           <Info className="text-orange-500 mt-1 flex-shrink-0" size={20} />
           <p className="text-sm text-orange-200/80 italic">
             {t.note}
           </p>
        </div>
      </div>
      
      {/* Navigation Hint */}
      <div className="mt-10 flex justify-between items-center text-slate-500 text-sm font-medium">
         <div className="flex items-center gap-2">
           <div className="w-8 h-[1px] bg-slate-800" />
           BATTLE ROYALE MOBILE DEV
         </div>
      </div>
    </div>
  );
};
