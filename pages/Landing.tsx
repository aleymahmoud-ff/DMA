import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface Props {
  language: Language;
  onStart: () => void;
}

export const Landing: React.FC<Props> = ({ language, onStart }) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto px-6 ${isRtl ? 'font-arabic' : ''}`}>
      <div className="mb-8 p-4 bg-brand-50 rounded-full">
         {/* Simple Icon */}
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
        {t.welcome}
      </h1>
      <p className="text-xl text-slate-600 mb-10 leading-relaxed">
        {t.subtitle}
      </p>

      <button
        onClick={onStart}
        className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transform transition hover:scale-105"
      >
        {t.start}
      </button>
    </div>
  );
};
