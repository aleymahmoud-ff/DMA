import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, Role } from '../types';

interface Props {
  language: Language;
  onSelect: (role: Role) => void;
}

export const RoleSelection: React.FC<Props> = ({ language, onSelect }) => {
  const t = TRANSLATIONS[language];
  const roles = Object.values(Role);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-arabic' : ''}`}>{t.roleSelection}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onSelect(role)}
            className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-brand-500 transition-all group"
          >
            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-4 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              {/* Dynamic Icon based on role could go here, using generic for now */}
              <span className="text-xl font-bold">{role.charAt(0)}</span>
            </div>
            <h3 className={`font-semibold text-lg text-slate-800 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.roles[role]}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};
