import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ current, onChange }) => {
  return (
    <div className="flex bg-slate-200 rounded-full p-1 w-fit no-print">
      <button
        onClick={() => onChange('en')}
        className={`px-4 py-1 text-sm font-medium rounded-full transition-colors ${
          current === 'en' ? 'bg-white shadow text-brand-600' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onChange('ar')}
        className={`px-4 py-1 text-sm font-medium rounded-full transition-colors font-arabic ${
          current === 'ar' ? 'bg-white shadow text-brand-600' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        العربية
      </button>
    </div>
  );
};
