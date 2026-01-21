import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, Session } from '../types';
import { ApiService } from '../services/apiService';

interface Props {
  language: Language;
  onSuccess: (session: Session) => void;
}

export const CodeEntry: React.FC<Props> = ({ language, onSuccess }) => {
  const t = TRANSLATIONS[language];
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');

    try {
      const session = await ApiService.validateCode(code.trim());
      onSuccess(session);
    } catch (err) {
      setError(t.invalidCode);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      <h2 className={`text-2xl font-bold mb-6 text-center ${language === 'ar' ? 'font-arabic' : ''}`}>{t.enterCode}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder={t.codePlaceholder}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-center text-lg tracking-widest uppercase"
            disabled={loading}
          />
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading || !code.trim()}
          className={`w-full bg-brand-600 text-white py-3 rounded-lg font-medium transition-colors ${loading ? 'opacity-70' : 'hover:bg-brand-700'}`}
        >
          {loading ? t.loading : t.validate}
        </button>
      </form>
    </div>
  );
};
