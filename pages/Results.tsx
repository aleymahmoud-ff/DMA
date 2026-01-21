import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import ReactMarkdown from 'react-markdown';
import { TRANSLATIONS } from '../constants';
import { Language, AssessmentResult, UserInfo, Role } from '../types';
import { GeminiService } from '../services/geminiService';

interface Props {
  language: Language;
  result: AssessmentResult;
  userInfo?: UserInfo;
  role?: Role;
}

export const Results: React.FC<Props> = ({ language, result, userInfo, role }) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleGenerateAi = async () => {
    if (!userInfo || !role) return;
    setLoadingAi(true);
    const recs = await GeminiService.generateRecommendations(result, userInfo, role, language);
    setRecommendations(recs);
    setLoadingAi(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const chartData = result.domainScores.map(ds => ({
    subject: ds.domain,
    A: ds.score,
    fullMark: 5,
  }));

  return (
    <div className={`max-w-5xl mx-auto space-y-8 ${isRtl ? 'font-arabic' : ''}`}>
      
      {/* Header Card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 print:shadow-none print:border-none">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.results}</h2>
             {userInfo && <p className="text-slate-500">{userInfo.organization} | {new Date().toLocaleDateString()}</p>}
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-right">
              <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider">{t.overallScore}</p>
              <p className="text-4xl font-bold text-brand-600">{result.overallScore}</p>
            </div>
            <div className="h-12 w-px bg-slate-300 mx-2"></div>
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
                ${result.overallScore >= 3.5 ? 'bg-green-100 text-green-700' : 
                  result.overallScore >= 1.9 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {t.maturityLevels[result.maturityLevel.toLowerCase() as keyof typeof t.maturityLevels] || result.maturityLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block">
        
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 print:break-inside-avoid">
          <h3 className="text-lg font-bold mb-4 text-slate-800 text-center">{t.domain} Breakdown</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
                <Radar
                  name="Maturity Score"
                  dataKey="A"
                  stroke="#0284c7"
                  fill="#0ea5e9"
                  fillOpacity={0.5}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain List Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 print:break-inside-avoid">
           <h3 className="text-lg font-bold mb-6 text-slate-800">{t.domain} Scores</h3>
           <div className="space-y-6">
             {result.domainScores.map(ds => (
               <div key={ds.domain}>
                 <div className="flex justify-between mb-1">
                   <span className="font-medium text-slate-700">{ds.domain}</span>
                   <span className="font-bold text-brand-600">{ds.score} / 5</span>
                 </div>
                 <div className="w-full bg-slate-100 rounded-full h-2">
                   <div 
                      className="bg-brand-500 h-2 rounded-full" 
                      style={{ width: `${(ds.score / 5) * 100}%` }}
                    ></div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-100 print:break-before-page">
        <div className="flex justify-between items-center mb-6 no-print">
          <h3 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
             {/* Sparkles Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-500">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM1.5 16.5a.75.75 0 0 1 .721.544l.554 1.94a2.25 2.25 0 0 0 1.546 1.546l1.94.554a.75.75 0 0 1 0 1.442l-1.94.554a2.25 2.25 0 0 0-1.546 1.546l-.554 1.94a.75.75 0 0 1-1.442 0l-.554-1.94a2.25 2.25 0 0 0-1.546-1.546l-1.94-.554a.75.75 0 0 1 0-1.442l1.94-.554a2.25 2.25 0 0 0 1.546-1.546l.554-1.94a.75.75 0 0 1 .721-.544Zm19.5-12a.75.75 0 0 1 .721.544l.554 1.94a2.25 2.25 0 0 0 1.546 1.546l1.94.554a.75.75 0 0 1 0 1.442l-1.94.554a2.25 2.25 0 0 0-1.546 1.546l-.554 1.94a.75.75 0 0 1-1.442 0l-.554-1.94a2.25 2.25 0 0 0-1.546-1.546l-1.94-.554a.75.75 0 0 1 0-1.442l1.94-.554a2.25 2.25 0 0 0 1.546-1.546l.554-1.94a.75.75 0 0 1 .721-.544Z" clipRule="evenodd" />
            </svg>
            {t.recommendations}
          </h3>
          {!recommendations && (
            <button 
              onClick={handleGenerateAi} 
              disabled={loadingAi}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition disabled:opacity-50"
            >
              {loadingAi ? t.loading : t.generateAi}
            </button>
          )}
        </div>

        {/* Print view Header for AI Section */}
        <h3 className="hidden print:block text-2xl font-bold text-slate-900 mb-4">{t.recommendations}</h3>

        {recommendations ? (
          <div className="prose prose-indigo max-w-none prose-headings:font-bold prose-headings:text-indigo-900">
            <ReactMarkdown>{recommendations}</ReactMarkdown>
          </div>
        ) : (
          !loadingAi && <p className="text-slate-500 italic text-center py-8">{isRtl ? 'انقر أعلاه لتوليد توصيات مخصصة.' : 'Click above to generate personalized insights based on your results.'}</p>
        )}
        
        {loadingAi && (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
            <div className="h-4 bg-indigo-200 rounded w-full"></div>
            <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-8 no-print">
         <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-8 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {t.downloadPdf}
         </button>
      </div>
    </div>
  );
};
